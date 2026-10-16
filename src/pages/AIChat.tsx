import { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../data/mockData';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content: '您好！我是智能马桶检测标准AI助手，基于RAG（检索增强生成）技术构建。我可以帮您查询检测标准、判定规则、过程能力分析等质量知识。请问有什么可以帮您的？',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate API call with RAG
    setTimeout(() => {
      const result = searchKnowledge(input);
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: generateResponse(input, result.content),
        sources: result.sources,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 1200);
  };

  const generateResponse = (query: string, knowledge: string): string => {
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
        <div>
          <h3 className="font-semibold text-gray-800">AI智能问答</h3>
          <p className="text-xs text-gray-500">基于RAG技术 · 检测标准知识库 · DeepSeek大模型</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-green-600">在线</span>
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
                <span className="text-xs text-gray-500">正在检索知识库并生成回答...</span>
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
          🔒 回答基于检索增强生成（RAG）技术，引用来源已标注。如遇问题请联系质检主管确认。
        </p>
      </div>
    </div>
  );
}
