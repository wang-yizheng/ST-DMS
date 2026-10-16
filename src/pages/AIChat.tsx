import { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../data/mockData';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
}

// DeepSeek API 配置
interface DeepSeekConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  useRealApi: boolean;
}

const DEFAULT_CONFIG: DeepSeekConfig = {
  apiKey: '',
  baseUrl: 'https://api.deepseek.com',
  model: 'deepseek-chat',
  useRealApi: false,
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content: '您好！我是智能马桶检测标准AI助手，基于RAG（检索增强生成）技术构建。我可以帮您查询检测标准、判定规则、过程能力分析等质量知识。请问有什么可以帮您的？\n\n💡 点击右上角设置按钮可配置 DeepSeek API，接入真实大模型问答。',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState<DeepSeekConfig>(() => {
    const saved = localStorage.getItem('deepseek_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 保存配置到 localStorage
  useEffect(() => {
    localStorage.setItem('deepseek_config', JSON.stringify(config));
  }, [config]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // RAG 知识库检索
  const searchKnowledge = (query: string): { content: string; sources: string[] } => {
    const keywords = query.toLowerCase().split(/[，。？?！!\s]+/).filter(w => w.length > 1);
    let bestMatch = { content: '', sources: [] as string[], score: 0 };

    for (const item of knowledgeBase) {
      let score = 0;
      for (const keyword of keywords) {
        if (item.content.toLowerCase().includes(keyword)) score += 2;
        for (const kw of item.keywords) {
          if (kw.includes(keyword) || keyword.includes(kw)) score += 3;
        }
      }
      if (score > bestMatch.score) {
        bestMatch = { content: item.content, sources: [item.content.split('依据')[1] || '内部知识库'], score };
      }
    }

    if (bestMatch.score === 0) {
      return {
        content: '抱歉，我暂时无法找到与您问题直接相关的标准条文。建议您查阅GB/T 34549—2024《卫生洁具 智能坐便器》标准原文，或联系质检主管获取更详细的信息。',
        sources: [],
      };
    }

    return bestMatch;
  };

  // 构建 RAG Prompt
  const buildRagPrompt = (question: string, context: string): string => {
    return `你是智能马桶检测标准AI助手。请基于以下检测标准知识回答用户问题。
回答必须准确、专业，并标注所引用的标准条文出处。
如果知识库中没有相关信息，请明确告知用户。

=== 参考知识 ===
${context}

=== 用户问题 ===
${question}

=== 回答要求 ===
1. 回答要准确引用标准条文
2. 标注出处（如：依据GB/T 34549—2024第X.X.X条）
3. 语言简洁专业
4. 如知识库信息不足，可基于专业知识补充，但需明确标注`;
  };

  // 调用 DeepSeek API
  const callDeepSeekApi = async (prompt: string): Promise<string> => {
    const response = await fetch(`${config.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: '你是智能马桶检测标准AI助手，专注于回答与智能坐便器检测标准、质量管理相关的问题。回答要准确、专业，并标注标准条文出处。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API请求失败 (${response.status})`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '抱歉，未能生成回答。';
  };

  // 模拟模式下的回答生成
  const generateMockResponse = (query: string, knowledge: string): string => {
    if (query.includes('Cpk') || query.includes('过程能力')) {
      return `根据检索到的知识：\n\n${knowledge}\n\n**总结：** Cpk是衡量工序过程能力的重要统计指标。在实际检测工作中，建议您对关键检测项目（如冲洗性能、泄漏电流等）定期计算Cpk值，当Cpk<1.33时应引起关注并考虑工艺改进。`;
    }
    if (query.includes('冲洗') || query.includes('冲水')) {
      return `根据GB/T 34549—2024标准规定：\n\n${knowledge}\n\n**检测要点：** 在实际检测中，需使用标准试验污物，按标准规定的试验方法进行冲洗测试，记录冲洗用水量并观察冲洗效果。`;
    }
    if (query.includes('不合格') || query.includes('处置')) {
      return `根据质量管理体系要求：\n\n${knowledge}\n\n**操作建议：** 发现不合格品后，应及时在系统中登记不良记录，填写不良现象描述，由质检主管指定处置方式并进行审批跟踪。`;
    }
    return `根据检索到的标准知识：\n\n${knowledge}\n\n如需了解更多详细信息，建议查阅相关标准原文或联系质检主管。`;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setLoading(true);

    try {
      let answer = '';
      let sources: string[] = [];

      if (config.useRealApi && config.apiKey) {
        // 真实 API 模式：RAG + DeepSeek
        const ragResult = searchKnowledge(currentInput);
        const prompt = buildRagPrompt(currentInput, ragResult.content);
        answer = await callDeepSeekApi(prompt);
        sources = ragResult.sources;
      } else {
        // 模拟模式
        await new Promise(resolve => setTimeout(resolve, 800));
        const ragResult = searchKnowledge(currentInput);
        answer = generateMockResponse(currentInput, ragResult.content);
        sources = ragResult.sources;
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: answer,
        sources,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `❌ 请求失败：${error instanceof Error ? error.message : '未知错误'}\n\n请检查：\n1. API Key 是否正确\n2. 网络连接是否正常\n3. API 额度是否充足\n\n点击右上角设置按钮可重新配置。`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    '冲洗性能的标准是什么？',
    '这个Cpk值算正常吗？',
    '不合格品如何处置？',
    '泄漏电流限值是多少？',
    '防水等级IPX4的含义？',
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-xl border border-gray-200 p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg">
          🤖
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">AI智能问答</h3>
          <p className="text-xs text-gray-500">
            基于RAG技术 · {config.useRealApi && config.apiKey ? 'DeepSeek API' : '模拟模式'} · 检测标准知识库
          </p>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="API 设置"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-pulse ${config.useRealApi && config.apiKey ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          <span className={`text-xs ${config.useRealApi && config.apiKey ? 'text-green-600' : 'text-yellow-600'}`}>
            {config.useRealApi && config.apiKey ? 'API已连接' : '模拟模式'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 border-x border-gray-200 p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'order-2' : ''}`}>
              <div className={`rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}>
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {msg.sources.map((src, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      📎 {src}
                    </span>
                  ))}
                </div>
              )}
              <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-right text-gray-400' : 'text-gray-400'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-xs text-gray-500">
                  {config.useRealApi && config.apiKey ? '正在调用 DeepSeek API...' : '正在检索知识库并生成回答...'}
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="bg-gray-50 border-x border-gray-200 px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">💡 您可以这样提问：</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => { setInput(q); }}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white rounded-b-xl border border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="请输入您的问题，如：冲洗性能标准是什么？"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            发送
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          🔒 {config.useRealApi && config.apiKey
            ? '已通过 DeepSeek API + RAG 技术回答，引用来源已标注。'
            : '当前为模拟模式，点击右上角设置配置 DeepSeek API Key 可接入真实大模型。'}
        </p>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">DeepSeek API 设置</h3>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-4">
              {/* Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">启用 DeepSeek API</p>
                  <p className="text-xs text-gray-500">关闭则使用模拟知识库回答</p>
                </div>
                <button
                  onClick={() => setConfig({ ...config, useRealApi: !config.useRealApi })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${config.useRealApi ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${config.useRealApi ? 'translate-x-6' : 'translate-x-0.5'}`}></span>
                </button>
              </div>

              {/* API Key */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">API Key</label>
                <input
                  type="password"
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  前往 <a href="https://platform.deepseek.com/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">platform.deepseek.com</a> 获取 API Key
                </p>
              </div>

              {/* Base URL */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">API Base URL</label>
                <input
                  type="text"
                  value={config.baseUrl}
                  onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">模型</label>
                <select
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="deepseek-chat">deepseek-chat (DeepSeek-V3)</option>
                  <option value="deepseek-reasoner">deepseek-reasoner (DeepSeek-R1)</option>
                </select>
              </div>

              {/* Info */}
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-blue-700">
                  <strong>💡 RAG 工作流程：</strong><br />
                  1. 用户提问 → 2. 向量检索知识库 → 3. 拼接 Prompt → 4. 调用 DeepSeek API → 5. 返回带引用的回答
                </p>
              </div>

              {/* Test Connection */}
              {config.apiKey && (
                <button
                  onClick={async () => {
                    try {
                      setLoading(true);
                      await callDeepSeekApi('你好，请回复"连接成功"');
                      alert('✅ API 连接成功！');
                    } catch (error) {
                      alert(`❌ 连接失败：${error instanceof Error ? error.message : '未知错误'}`);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="w-full py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  测试连接
                </button>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">关闭</button>
              <button
                onClick={() => {
                  setConfig(DEFAULT_CONFIG);
                  localStorage.removeItem('deepseek_config');
                }}
                className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
              >
                重置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
