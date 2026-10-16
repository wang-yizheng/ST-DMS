import { useState } from 'react';

type BackendTab = 'architecture' | 'api' | 'database' | 'deploy' | 'code';

export default function BackendArchitecture() {
  const [activeTab, setActiveTab] = useState<BackendTab>('architecture');
  const [selectedApi, setSelectedApi] = useState('auth-login');
  const [selectedTable, setSelectedTable] = useState('sys_user');
  const [expandedCode, setExpandedCode] = useState('controller');

  const tabs = [
    { key: 'architecture' as BackendTab, label: '🏗️ 技术架构', desc: '系统分层架构与技术选型' },
    { key: 'api' as BackendTab, label: '🔌 API接口', desc: 'RESTful接口文档' },
    { key: 'database' as BackendTab, label: '🗄️ 数据库设计', desc: 'E-R图与表结构' },
    { key: 'deploy' as BackendTab, label: '🚀 部署方案', desc: '生产环境部署架构' },
    { key: 'code' as BackendTab, label: '💻 核心代码', desc: '关键业务代码实现' },
  ];

  // API接口数据
  const apiGroups = [
    {
      group: '认证授权',
      apis: [
        { id: 'auth-login', method: 'POST', path: '/api/auth/login', desc: '用户登录（JWT）', auth: false },
        { id: 'auth-logout', method: 'POST', path: '/api/auth/logout', desc: '用户登出', auth: true },
        { id: 'auth-sms', method: 'POST', path: '/api/auth/sms/send', desc: '发送短信验证码', auth: false },
        { id: 'auth-sms-login', method: 'POST', path: '/api/auth/sms/login', desc: '短信验证码登录', auth: false },
        { id: 'auth-info', method: 'GET', path: '/api/auth/info', desc: '获取当前用户信息', auth: true },
      ]
    },
    {
      group: '系统管理',
      apis: [
        { id: 'sys-user-list', method: 'GET', path: '/api/system/users', desc: '用户列表（分页）', auth: true },
        { id: 'sys-user-add', method: 'POST', path: '/api/system/users', desc: '新增用户', auth: true },
        { id: 'sys-user-update', method: 'PUT', path: '/api/system/users/{id}', desc: '修改用户', auth: true },
        { id: 'sys-role-list', method: 'GET', path: '/api/system/roles', desc: '角色列表', auth: true },
        { id: 'sys-menu-tree', method: 'GET', path: '/api/system/menus/tree', desc: '菜单树结构', auth: true },
        { id: 'sys-log-list', method: 'GET', path: '/api/system/logs', desc: '操作日志查询', auth: true },
      ]
    },
    {
      group: '基础数据',
      apis: [
        { id: 'base-product', method: 'GET', path: '/api/base/products', desc: '产品型号列表', auth: true },
        { id: 'base-item', method: 'GET', path: '/api/base/detection-items', desc: '检测项目库', auth: true },
        { id: 'base-standard', method: 'GET', path: '/api/base/standards', desc: '检测标准列表', auth: true },
        { id: 'base-equipment', method: 'GET', path: '/api/base/equipment', desc: '检测设备管理', auth: true },
      ]
    },
    {
      group: '检测任务',
      apis: [
        { id: 'task-list', method: 'GET', path: '/api/tasks', desc: '检测任务列表', auth: true },
        { id: 'task-create', method: 'POST', path: '/api/tasks', desc: '创建检测任务', auth: true },
        { id: 'task-assign', method: 'PUT', path: '/api/tasks/{id}/assign', desc: '任务派工', auth: true },
        { id: 'task-status', method: 'PUT', path: '/api/tasks/{id}/status', desc: '更新任务状态', auth: true },
      ]
    },
    {
      group: '检测数据',
      apis: [
        { id: 'record-list', method: 'GET', path: '/api/records', desc: '检测记录查询', auth: true },
        { id: 'record-add', method: 'POST', path: '/api/records', desc: '录入检测数据', auth: true },
        { id: 'record-import', method: 'POST', path: '/api/records/import', desc: 'Excel批量导入', auth: true },
        { id: 'record-judge', method: 'POST', path: '/api/records/judge', desc: '自动判定', auth: true },
      ]
    },
    {
      group: '不合格品',
      apis: [
        { id: 'nc-list', method: 'GET', path: '/api/non-conforming', desc: '不合格记录列表', auth: true },
        { id: 'nc-create', method: 'POST', path: '/api/non-conforming', desc: '创建不合格记录', auth: true },
        { id: 'nc-approve', method: 'PUT', path: '/api/non-conforming/{id}/approve', desc: '审批处置方案', auth: true },
        { id: 'nc-recheck', method: 'POST', path: '/api/non-conforming/{id}/recheck', desc: '提交复检结果', auth: true },
      ]
    },
    {
      group: '质量分析',
      apis: [
        { id: 'qa-trend', method: 'GET', path: '/api/analysis/trend', desc: '合格率趋势', auth: true },
        { id: 'qa-pareto', method: 'GET', path: '/api/analysis/pareto', desc: '不良项柏拉图', auth: true },
        { id: 'qa-spc', method: 'GET', path: '/api/analysis/spc', desc: 'SPC控制图数据', auth: true },
        { id: 'qa-cpk', method: 'GET', path: '/api/analysis/cpk', desc: '过程能力指数', auth: true },
      ]
    },
    {
      group: 'AI问答',
      apis: [
        { id: 'ai-ask', method: 'POST', path: '/api/ai/ask', desc: '智能问答（RAG）', auth: true },
        { id: 'ai-history', method: 'GET', path: '/api/ai/history', desc: '问答历史记录', auth: true },
        { id: 'ai-knowledge', method: 'GET', path: '/api/ai/knowledge', desc: '知识库管理', auth: true },
      ]
    },
  ];

  // 数据库表
  const tables = [
    {
      name: 'sys_user',
      comment: '系统用户表',
      fields: [
        { name: 'id', type: 'BIGINT', pk: true, comment: '主键ID' },
        { name: 'username', type: 'VARCHAR(50)', pk: false, comment: '用户名' },
        { name: 'password', type: 'VARCHAR(200)', pk: false, comment: '密码（BCrypt加密）' },
        { name: 'real_name', type: 'VARCHAR(50)', pk: false, comment: '真实姓名' },
        { name: 'phone', type: 'VARCHAR(20)', pk: false, comment: '手机号' },
        { name: 'email', type: 'VARCHAR(100)', pk: false, comment: '邮箱' },
        { name: 'role_id', type: 'BIGINT', pk: false, comment: '角色ID' },
        { name: 'dept_id', type: 'BIGINT', pk: false, comment: '部门ID' },
        { name: 'status', type: 'TINYINT', pk: false, comment: '状态(0禁用 1启用)' },
        { name: 'create_time', type: 'DATETIME', pk: false, comment: '创建时间' },
        { name: 'update_time', type: 'DATETIME', pk: false, comment: '更新时间' },
        { name: 'deleted', type: 'TINYINT', pk: false, comment: '逻辑删除' },
      ]
    },
    {
      name: 'sys_role',
      comment: '角色表',
      fields: [
        { name: 'id', type: 'BIGINT', pk: true, comment: '主键ID' },
        { name: 'role_name', type: 'VARCHAR(50)', pk: false, comment: '角色名称' },
        { name: 'role_code', type: 'VARCHAR(50)', pk: false, comment: '角色编码' },
        { name: 'description', type: 'VARCHAR(200)', pk: false, comment: '描述' },
        { name: 'status', type: 'TINYINT', pk: false, comment: '状态' },
        { name: 'create_time', type: 'DATETIME', pk: false, comment: '创建时间' },
      ]
    },
    {
      name: 'base_product_model',
      comment: '产品型号表',
      fields: [
        { name: 'id', type: 'BIGINT', pk: true, comment: '主键ID' },
        { name: 'model_code', type: 'VARCHAR(50)', pk: false, comment: '型号编码' },
        { name: 'model_name', type: 'VARCHAR(100)', pk: false, comment: '型号名称' },
        { name: 'category', type: 'VARCHAR(50)', pk: false, comment: '产品分类' },
        { name: 'supplier_id', type: 'BIGINT', pk: false, comment: '供应商ID' },
        { name: 'description', type: 'VARCHAR(500)', pk: false, comment: '描述' },
        { name: 'status', type: 'TINYINT', pk: false, comment: '状态' },
        { name: 'create_time', type: 'DATETIME', pk: false, comment: '创建时间' },
      ]
    },
    {
      name: 'base_detection_item',
      comment: '检测项目表',
      fields: [
        { name: 'id', type: 'BIGINT', pk: true, comment: '主键ID' },
        { name: 'item_code', type: 'VARCHAR(50)', pk: false, comment: '项目编号' },
        { name: 'item_name', type: 'VARCHAR(100)', pk: false, comment: '项目名称' },
        { name: 'category', type: 'VARCHAR(50)', pk: false, comment: '项目分类' },
        { name: 'unit', type: 'VARCHAR(20)', pk: false, comment: '单位' },
        { name: 'standard_value', type: 'DECIMAL(10,2)', pk: false, comment: '标准值' },
        { name: 'upper_limit', type: 'DECIMAL(10,2)', pk: false, comment: '上限' },
        { name: 'lower_limit', type: 'DECIMAL(10,2)', pk: false, comment: '下限' },
        { name: 'judgment_rule', type: 'VARCHAR(20)', pk: false, comment: '判定规则' },
        { name: 'standard_ref', type: 'VARCHAR(200)', pk: false, comment: '标准依据' },
      ]
    },
    {
      name: 'detection_task',
      comment: '检测任务表',
      fields: [
        { name: 'id', type: 'BIGINT', pk: true, comment: '主键ID' },
        { name: 'task_code', type: 'VARCHAR(50)', pk: false, comment: '任务编号' },
        { name: 'product_id', type: 'BIGINT', pk: false, comment: '产品ID' },
        { name: 'batch_no', type: 'VARCHAR(50)', pk: false, comment: '批次号' },
        { name: 'quantity', type: 'INT', pk: false, comment: '检测数量' },
        { name: 'task_type', type: 'VARCHAR(20)', pk: false, comment: '任务类型' },
        { name: 'status', type: 'VARCHAR(20)', pk: false, comment: '任务状态' },
        { name: 'assignee_id', type: 'BIGINT', pk: false, comment: '检测员ID' },
        { name: 'deadline', type: 'DATETIME', pk: false, comment: '截止日期' },
        { name: 'pass_rate', type: 'DECIMAL(5,2)', pk: false, comment: '合格率' },
        { name: 'create_time', type: 'DATETIME', pk: false, comment: '创建时间' },
      ]
    },
    {
      name: 'detection_record',
      comment: '检测记录表',
      fields: [
        { name: 'id', type: 'BIGINT', pk: true, comment: '主键ID' },
        { name: 'task_id', type: 'BIGINT', pk: false, comment: '任务ID' },
        { name: 'serial_no', type: 'VARCHAR(50)', pk: false, comment: '产品序列号' },
        { name: 'item_id', type: 'BIGINT', pk: false, comment: '检测项目ID' },
        { name: 'measured_value', type: 'DECIMAL(10,4)', pk: false, comment: '实测值' },
        { name: 'result', type: 'VARCHAR(10)', pk: false, comment: '判定结果' },
        { name: 'inspector_id', type: 'BIGINT', pk: false, comment: '检测员ID' },
        { name: 'inspect_time', type: 'DATETIME', pk: false, comment: '检测时间' },
        { name: 'image_url', type: 'VARCHAR(500)', pk: false, comment: '现场图片' },
        { name: 'remark', type: 'VARCHAR(500)', pk: false, comment: '备注' },
      ]
    },
    {
      name: 'non_conforming',
      comment: '不合格品记录表',
      fields: [
        { name: 'id', type: 'BIGINT', pk: true, comment: '主键ID' },
        { name: 'record_code', type: 'VARCHAR(50)', pk: false, comment: '记录编号' },
        { name: 'record_id', type: 'BIGINT', pk: false, comment: '检测记录ID' },
        { name: 'defect_level', type: 'VARCHAR(10)', pk: false, comment: '不良等级' },
        { name: 'defect_desc', type: 'VARCHAR(500)', pk: false, comment: '不良描述' },
        { name: 'cause_analysis', type: 'VARCHAR(500)', pk: false, comment: '原因分析' },
        { name: 'responsible_dept', type: 'VARCHAR(50)', pk: false, comment: '责任部门' },
        { name: 'disposal_method', type: 'VARCHAR(20)', pk: false, comment: '处置方式' },
        { name: 'status', type: 'VARCHAR(20)', pk: false, comment: '状态' },
        { name: 'approver_id', type: 'BIGINT', pk: false, comment: '审批人ID' },
        { name: 'create_time', type: 'DATETIME', pk: false, comment: '创建时间' },
      ]
    },
    {
      name: 'ai_knowledge',
      comment: 'AI知识库表',
      fields: [
        { name: 'id', type: 'BIGINT', pk: true, comment: '主键ID' },
        { name: 'title', type: 'VARCHAR(200)', pk: false, comment: '知识标题' },
        { name: 'content', type: 'TEXT', pk: false, comment: '知识内容' },
        { name: 'source', type: 'VARCHAR(200)', pk: false, comment: '来源标准' },
        { name: 'keywords', type: 'VARCHAR(500)', pk: false, comment: '关键词' },
        { name: 'embedding', type: 'VECTOR(768)', pk: false, comment: '向量嵌入' },
        { name: 'create_time', type: 'DATETIME', pk: false, comment: '创建时间' },
      ]
    },
  ];

  // 代码片段
  const codeSnippets = {
    controller: {
      title: 'DetectionRecordController.java',
      lang: 'java',
      code: `@RestController
@RequestMapping("/api/records")
@RequiredArgsConstructor
public class DetectionRecordController {

    private final DetectionRecordService recordService;

    /**
     * 录入检测数据并自动判定
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('INSPECTOR','SUPERVISOR')")
    public Result<DetectionRecordVO> addRecord(
            @RequestBody @Valid DetectionRecordDTO dto) {
        return Result.ok(recordService.addRecord(dto));
    }

    /**
     * 分页查询检测记录
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('INSPECTOR','SUPERVISOR','ADMIN')")
    public Result<PageResult<DetectionRecordVO>> listRecords(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String taskCode,
            @RequestParam(required = false) String batchNo) {
        return Result.ok(recordService.pageQuery(pageNum, pageSize, taskCode, batchNo));
    }

    /**
     * Excel批量导入检测数据
     */
    @PostMapping("/import")
    @PreAuthorize("hasAnyRole('INSPECTOR','SUPERVISOR')")
    public Result<ImportResultVO> importRecords(@RequestParam("file") MultipartFile file) {
        return Result.ok(recordService.importFromExcel(file));
    }
}`,
    },
    service: {
      title: 'DetectionRecordServiceImpl.java',
      lang: 'java',
      code: `@Service
@RequiredArgsConstructor
public class DetectionRecordServiceImpl implements DetectionRecordService {

    private final DetectionRecordMapper recordMapper;
    private final DetectionItemMapper itemMapper;
    private final NonConformingService nonConformingService;
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public DetectionRecordVO addRecord(DetectionRecordDTO dto) {
        // 1. 获取检测项目标准
        DetectionItem item = itemMapper.selectById(dto.getItemId());
        if (item == null) {
            throw new BusinessException("检测项目不存在");
        }

        // 2. 自动判定合格/不合格
        String result = autoJudge(dto.getMeasuredValue(), item);

        // 3. 保存检测记录
        DetectionRecord record = BeanUtil.copyProperties(dto, DetectionRecord.class);
        record.setResult(result);
        record.setInspectorId(SecurityUtils.getCurrentUserId());
        record.setInspectTime(LocalDateTime.now());
        recordMapper.insert(record);

        // 4. 不合格自动生成不良记录
        if ("不合格".equals(result)) {
            nonConformingService.createFromRecord(record, item);
        }

        // 5. 清除缓存
        redisTemplate.delete("task:stats:" + dto.getTaskId());

        return BeanUtil.copyProperties(record, DetectionRecordVO.class);
    }

    /**
     * 自动判定逻辑
     */
    private String autoJudge(BigDecimal measured, DetectionItem item) {
        switch (item.getJudgmentRule()) {
            case "上限判定":
                return measured.compareTo(item.getUpperLimit()) <= 0 ? "合格" : "不合格";
            case "下限判定":
                return measured.compareTo(item.getLowerLimit()) >= 0 ? "合格" : "不合格";
            case "区间判定":
            default:
                return measured.compareTo(item.getLowerLimit()) >= 0
                        && measured.compareTo(item.getUpperLimit()) <= 0
                        ? "合格" : "不合格";
        }
    }
}`,
    },
    security: {
      title: 'SecurityConfig.java',
      lang: 'java',
      code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/sms/**",
                    "/api/ai/ask",
                    "/doc.html", "/webjars/**"
                ).permitAll()
                .requestMatchers("/api/system/**").hasRole("ADMIN")
                .requestMatchers("/api/analysis/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .anyRequest().authenticated()
            )
            .authenticationProvider(authProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
    },
    rag: {
      title: 'AiQuestionService.java（RAG实现）',
      lang: 'java',
      code: `@Service
@RequiredArgsConstructor
public class AiQuestionServiceImpl implements AiQuestionService {

    private final KnowledgeVectorStore vectorStore;
    private final DeepSeekClient deepSeekClient;
    private final AiChatHistoryMapper historyMapper;

    @Override
    public AiAnswerVO askQuestion(String question, Long userId) {
        // 1. 将用户问题向量化
        float[] questionEmbedding = deepSeekClient.embed(question);

        // 2. 从向量数据库中检索相似知识（Top-K）
        List<KnowledgeChunk> relevantChunks = vectorStore.search(
            questionEmbedding,
            3,      // Top-3
            0.7     // 相似度阈值
        );

        // 3. 构建RAG提示词
        String context = relevantChunks.stream()
            .map(chunk -> String.format("【%s】\\n%s", chunk.getSource(), chunk.getContent()))
            .collect(Collectors.joining("\\n\\n"));

        String prompt = String.format(RAG_PROMPT_TEMPLATE, context, question);

        // 4. 调用DeepSeek大模型API生成回答
        String answer = deepSeekClient.chat(prompt);

        // 5. 提取引用来源
        List<String> sources = relevantChunks.stream()
            .map(KnowledgeChunk::getSource)
            .distinct()
            .collect(Collectors.toList());

        // 6. 保存问答历史
        saveChatHistory(userId, question, answer, sources);

        return AiAnswerVO.builder()
            .answer(answer)
            .sources(sources)
            .build();
    }

    private static final String RAG_PROMPT_TEMPLATE = """
        你是智能马桶检测标准AI助手。请基于以下检测标准知识回答用户问题。
        回答必须准确、专业，并标注所引用的标准条文出处。
        如果知识库中没有相关信息，请明确告知用户。

        === 参考知识 ===
        %s

        === 用户问题 ===
        %s

        === 回答要求 ===
        1. 回答要准确引用标准条文
        2. 标注出处（如：依据GB/T 34549—2024第X.X.X条）
        3. 语言简洁专业
        """;
}`,
    },
    spc: {
      title: 'SpcAnalysisService.java',
      lang: 'java',
      code: `@Service
public class SpcAnalysisServiceImpl implements SpcAnalysisService {

    /**
     * 计算过程能力指数Cpk
     * Cpk = min((USL - μ) / 3σ, (μ - LSL) / 3σ)
     */
    @Override
    public CpkResult calculateCpk(Long itemId, String dateRange) {
        // 1. 查询检测数据
        List<DetectionRecord> records = recordMapper.selectByItemAndDate(itemId, dateRange);
        if (records.size() < 20) {
            throw new BusinessException("样本数量不足（至少需要20个）");
        }

        // 2. 计算均值和标准差
        List<BigDecimal> values = records.stream()
            .map(DetectionRecord::getMeasuredValue)
            .collect(Collectors.toList());

        double mean = calculateMean(values);
        double stdDev = calculateStdDev(values, mean);

        // 3. 获取规格限
        DetectionItem item = itemMapper.selectById(itemId);
        double usl = item.getUpperLimit().doubleValue();
        double lsl = item.getLowerLimit().doubleValue();

        // 4. 计算Cp和Cpk
        double cp = (usl - lsl) / (6 * stdDev);
        double cpu = (usl - mean) / (3 * stdDev);
        double cpl = (mean - lsl) / (3 * stdDev);
        double cpk = Math.min(cpu, cpl);

        // 5. 判定工序能力等级
        String level;
        if (cpk >= 1.67) level = "过剩";
        else if (cpk >= 1.33) level = "充分";
        else if (cpk >= 1.0) level = "尚可";
        else if (cpk >= 0.67) level = "不足";
        else level = "严重不足";

        return CpkResult.builder()
            .mean(mean).stdDev(stdDev)
            .cp(cp).cpk(cpk).cpu(cpu).cpl(cpl)
            .level(level)
            .sampleSize(records.size())
            .build();
    }

    /**
     * 生成Xbar-R控制图数据
     */
    @Override
    public SpcChartData generateXbarRChart(Long itemId) {
        // 按子组（每5个样本一组）计算均值和极差
        // ... 实现略
    }
}`,
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🖥️</span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">后端架构设计</h1>
            <p className="text-slate-300 text-sm">SpringBoot + MyBatis-Plus + MySQL + Redis + DeepSeek API</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6">
          {/* Architecture Tab */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">系统分层架构</h3>
                <div className="space-y-3">
                  {/* Presentation Layer */}
                  <div className="border-2 border-blue-300 rounded-xl p-4 bg-blue-50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">表现层</span>
                      <span className="text-sm text-gray-600">Presentation Layer</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="bg-white rounded-lg p-3 text-center border border-blue-200">
                        <p className="text-xs text-gray-500">前端框架</p>
                        <p className="text-sm font-medium">Vue 3</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-blue-200">
                        <p className="text-xs text-gray-500">UI组件库</p>
                        <p className="text-sm font-medium">Element Plus</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-blue-200">
                        <p className="text-xs text-gray-500">可视化</p>
                        <p className="text-sm font-medium">ECharts</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-blue-200">
                        <p className="text-xs text-gray-500">HTTP客户端</p>
                        <p className="text-sm font-medium">Axios</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span className="text-gray-400 text-xl">↕ RESTful API (JSON)</span>
                  </div>

                  {/* Controller Layer */}
                  <div className="border-2 border-green-300 rounded-xl p-4 bg-green-50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">控制层</span>
                      <span className="text-sm text-gray-600">Controller Layer (SpringMVC)</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="bg-white rounded-lg p-3 text-center border border-green-200">
                        <p className="text-xs text-gray-500">认证授权</p>
                        <p className="text-sm font-medium">Spring Security</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-green-200">
                        <p className="text-xs text-gray-500">令牌机制</p>
                        <p className="text-sm font-medium">JWT</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-green-200">
                        <p className="text-xs text-gray-500">参数校验</p>
                        <p className="text-sm font-medium">Validation</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-green-200">
                        <p className="text-xs text-gray-500">接口文档</p>
                        <p className="text-sm font-medium">Knife4j</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span className="text-gray-400 text-xl">↕</span>
                  </div>

                  {/* Service Layer */}
                  <div className="border-2 border-orange-300 rounded-xl p-4 bg-orange-50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-orange-600 text-white text-xs rounded">业务层</span>
                      <span className="text-sm text-gray-600">Service Layer (业务逻辑)</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="bg-white rounded-lg p-3 text-center border border-orange-200">
                        <p className="text-xs text-gray-500">核心框架</p>
                        <p className="text-sm font-medium">SpringBoot 3.x</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-orange-200">
                        <p className="text-xs text-gray-500">事务管理</p>
                        <p className="text-sm font-medium">@Transactional</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-orange-200">
                        <p className="text-xs text-gray-500">AI问答</p>
                        <p className="text-sm font-medium">RAG + DeepSeek</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-orange-200">
                        <p className="text-xs text-gray-500">SPC算法</p>
                        <p className="text-sm font-medium">Cpk计算</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span className="text-gray-400 text-xl">↕</span>
                  </div>

                  {/* Persistence Layer */}
                  <div className="border-2 border-purple-300 rounded-xl p-4 bg-purple-50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">持久层</span>
                      <span className="text-sm text-gray-600">Persistence Layer (数据访问)</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                        <p className="text-xs text-gray-500">ORM框架</p>
                        <p className="text-sm font-medium">MyBatis-Plus</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                        <p className="text-xs text-gray-500">关系数据库</p>
                        <p className="text-sm font-medium">MySQL 8.0</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                        <p className="text-xs text-gray-500">缓存中间件</p>
                        <p className="text-sm font-medium">Redis</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                        <p className="text-xs text-gray-500">向量数据库</p>
                        <p className="text-sm font-medium">Milvus/ES</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology Stack */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">技术栈清单</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">后端技术</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• SpringBoot 3.2.x — 应用框架</li>
                      <li>• Spring Security 6.x — 安全认证</li>
                      <li>• JWT (jjwt 0.12.x) — 令牌机制</li>
                      <li>• MyBatis-Plus 3.5.x — 持久层框架</li>
                      <li>• MySQL 8.0 — 关系数据库</li>
                      <li>• Redis 7.x — 缓存中间件</li>
                      <li>• Knife4j 4.x — API文档</li>
                      <li>• Apache POI 5.x — Excel处理</li>
                      <li>• Hutool 5.x — 工具库</li>
                      <li>• MapStruct — 对象映射</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">AI与智能问答</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• DeepSeek API — 大语言模型</li>
                      <li>• LangChain4j — 检索链编排</li>
                      <li>• Milvus / Elasticsearch — 向量存储</li>
                      <li>• text-embedding-v2 — 文本向量化</li>
                      <li>• RAG技术 — 检索增强生成</li>
                    </ul>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 mt-4">部署与运维</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Nginx — 反向代理/静态资源</li>
                      <li>• Docker — 容器化部署</li>
                      <li>• Jenkins — 持续集成</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Tab */}
          {activeTab === 'api' && (
            <div className="flex flex-col lg:flex-row gap-4">
              {/* API List */}
              <div className="lg:w-80 shrink-0">
                <div className="bg-gray-50 rounded-lg p-3 space-y-4 max-h-[600px] overflow-y-auto">
                  {apiGroups.map(group => (
                    <div key={group.group}>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">{group.group}</h4>
                      <div className="space-y-1">
                        {group.apis.map(api => (
                          <button
                            key={api.id}
                            onClick={() => setSelectedApi(api.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedApi === api.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                api.method === 'GET' ? 'bg-green-100 text-green-700' :
                                api.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                                'bg-orange-100 text-orange-700'
                              }`}>{api.method}</span>
                              <span className="truncate text-xs">{api.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Detail */}
              <div className="flex-1">
                {(() => {
                  const api = apiGroups.flatMap(g => g.apis).find(a => a.id === selectedApi);
                  if (!api) return null;
                  return (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-sm font-mono font-bold px-3 py-1 rounded ${
                          api.method === 'GET' ? 'bg-green-100 text-green-700' :
                          api.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>{api.method}</span>
                        <code className="text-sm text-gray-800 font-mono">{api.path}</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{api.desc}</p>

                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">请求头</h5>
                          <div className="bg-white rounded-lg p-3 font-mono text-xs">
                            <p>Content-Type: application/json</p>
                            {api.auth && <p>Authorization: Bearer {'<JWT Token>'}</p>}
                          </div>
                        </div>

                        {(api.method === 'POST' || api.method === 'PUT') && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">请求体示例</h5>
                            <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto">
{api.id === 'auth-login' ? `{
  "username": "liming",
  "password": "123456"
}` : api.id === 'record-add' ? `{
  "taskId": 2,
  "serialNo": "SN202",
  "itemId": 1,
  "measuredValue": 5.85,
  "remark": "首件检测"
}` : api.id === 'ai-ask' ? `{
  "question": "冲洗性能标准是什么？"
}` : `{
  // 请求参数
}`}
                            </pre>
                          </div>
                        )}

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">响应示例</h5>
                          <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto">
{`{
  "code": 200,
  "message": "success",
  "data": {
    // 响应数据
  }
}`}
                          </pre>
                        </div>

                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">需要认证：{api.auth ? '是' : '否'}</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">响应格式：JSON</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Database Tab */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              {/* E-R Diagram */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">核心实体关系（E-R图）</h3>
                <div className="bg-gray-50 rounded-xl p-6 overflow-x-auto">
                  <div className="min-w-[700px] relative">
                    {/* Entities */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white border-2 border-blue-400 rounded-lg p-3">
                        <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 text-center">sys_user</div>
                        <p className="text-xs text-gray-600">用户表</p>
                      </div>
                      <div className="bg-white border-2 border-green-400 rounded-lg p-3">
                        <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 text-center">detection_task</div>
                        <p className="text-xs text-gray-600">检测任务表</p>
                      </div>
                      <div className="bg-white border-2 border-orange-400 rounded-lg p-3">
                        <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 text-center">detection_record</div>
                        <p className="text-xs text-gray-600">检测记录表</p>
                      </div>
                      <div className="bg-white border-2 border-red-400 rounded-lg p-3">
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 text-center">non_conforming</div>
                        <p className="text-xs text-gray-600">不合格品表</p>
                      </div>
                    </div>
                    {/* Relations */}
                    <div className="mt-4 text-center text-xs text-gray-500 space-y-1">
                      <p>sys_user (1) ←→ (N) detection_task  [检测员-任务]</p>
                      <p>detection_task (1) ←→ (N) detection_record  [任务-记录]</p>
                      <p>detection_record (1) ←→ (0..1) non_conforming  [记录-不合格]</p>
                      <p>base_product_model (1) ←→ (N) detection_task  [型号-任务]</p>
                      <p>base_detection_item (1) ←→ (N) detection_record  [项目-记录]</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Selector */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">数据表结构</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tables.map(table => (
                    <button
                      key={table.name}
                      onClick={() => setSelectedTable(table.name)}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        selectedTable === table.name ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {table.name}
                    </button>
                  ))}
                </div>

                {/* Table Detail */}
                {(() => {
                  const table = tables.find(t => t.name === selectedTable);
                  if (!table) return null;
                  return (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="font-medium text-gray-800">{table.name}</h4>
                        <p className="text-xs text-gray-500">{table.comment}</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left px-4 py-2 font-medium text-gray-600">字段名</th>
                              <th className="text-left px-4 py-2 font-medium text-gray-600">类型</th>
                              <th className="text-left px-4 py-2 font-medium text-gray-600">主键</th>
                              <th className="text-left px-4 py-2 font-medium text-gray-600">说明</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.fields.map(field => (
                              <tr key={field.name} className="border-t border-gray-100 hover:bg-gray-50">
                                <td className="px-4 py-2 font-mono text-gray-800">{field.name}</td>
                                <td className="px-4 py-2 text-gray-600 font-mono text-xs">{field.type}</td>
                                <td className="px-4 py-2">{field.pk ? <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">PK</span> : ''}</td>
                                <td className="px-4 py-2 text-gray-600">{field.comment}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Deploy Tab */}
          {activeTab === 'deploy' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800 mb-4">生产环境部署架构</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-4">
                  {/* Client */}
                  <div className="border-2 border-blue-300 rounded-xl p-4 bg-blue-50">
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-800 mb-2">👤 用户终端</p>
                      <div className="flex justify-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-white rounded-lg text-xs border border-blue-200">PC浏览器</span>
                        <span className="px-3 py-1 bg-white rounded-lg text-xs border border-blue-200">平板电脑</span>
                        <span className="px-3 py-1 bg-white rounded-lg text-xs border border-blue-200">工业平板</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-gray-400">↕ HTTPS</div>

                  {/* Nginx */}
                  <div className="border-2 border-green-300 rounded-xl p-4 bg-green-50">
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-800 mb-2">🌐 Nginx 反向代理</p>
                      <div className="flex justify-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-white rounded-lg text-xs border border-green-200">静态资源</span>
                        <span className="px-3 py-1 bg-white rounded-lg text-xs border border-green-200">负载均衡</span>
                        <span className="px-3 py-1 bg-white rounded-lg text-xs border border-green-200">SSL终止</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-gray-400">↕</div>

                  {/* Application Servers */}
                  <div className="border-2 border-orange-300 rounded-xl p-4 bg-orange-50">
                    <div className="text-center">
                      <p className="text-sm font-medium text-orange-800 mb-2">⚙️ SpringBoot 应用服务</p>
                      <div className="flex justify-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-white rounded-lg text-xs border border-orange-200">应用实例1 (Port:8080)</span>
                        <span className="px-3 py-1 bg-white rounded-lg text-xs border border-orange-200">应用实例2 (Port:8081)</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-gray-400">↕</div>

                  {/* Data Layer */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="border-2 border-purple-300 rounded-xl p-4 bg-purple-50 text-center">
                      <p className="text-sm font-medium text-purple-800 mb-2">🗄️ MySQL 8.0</p>
                      <p className="text-xs text-gray-600">主从复制 · 定时备份</p>
                    </div>
                    <div className="border-2 border-red-300 rounded-xl p-4 bg-red-50 text-center">
                      <p className="text-sm font-medium text-red-800 mb-2">⚡ Redis 7.x</p>
                      <p className="text-xs text-gray-600">缓存 · 会话 · 分布式锁</p>
                    </div>
                    <div className="border-2 border-indigo-300 rounded-xl p-4 bg-indigo-50 text-center">
                      <p className="text-sm font-medium text-indigo-800 mb-2">🧠 向量数据库</p>
                      <p className="text-xs text-gray-600">Milvus · AI知识检索</p>
                    </div>
                  </div>

                  <div className="text-center text-gray-400">↕</div>

                  {/* External */}
                  <div className="border-2 border-gray-300 rounded-xl p-4 bg-gray-50 text-center">
                    <p className="text-sm font-medium text-gray-800 mb-2">🌍 外部服务</p>
                    <div className="flex justify-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-white rounded-lg text-xs border border-gray-200">DeepSeek API</span>
                      <span className="px-3 py-1 bg-white rounded-lg text-xs border border-gray-200">短信网关</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deployment Config */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">部署配置</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-2"># nginx.conf</p>
                    <pre className="text-xs text-green-400 overflow-x-auto">
{`server {
    listen 443 ssl;
    server_name qms.company.com;

    ssl_certificate /etc/ssl/cert.pem;
    ssl_certificate_key /etc/ssl/key.pem;

    # 前端静态资源
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # 后端API代理
    location /api/ {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`}
                    </pre>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-2"># application-prod.yml</p>
                    <pre className="text-xs text-green-400 overflow-x-auto">
{`server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://mysql:3306/qms_db
    username: \${DB_USER}
    password: \${DB_PWD}
  data:
    redis:
      host: redis
      port: 6379
      password: \${REDIS_PWD}

# DeepSeek API
ai:
  deepseek:
    api-key: \${DEEPSEEK_KEY}
    model: deepseek-chat
    base-url: https://api.deepseek.com

# JWT配置
jwt:
  secret: \${JWT_SECRET}
  expiration: 86400000`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code Tab */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {Object.entries(codeSnippets).map(([key, snippet]) => (
                  <button
                    key={key}
                    onClick={() => setExpandedCode(key)}
                    className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                      expandedCode === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {snippet.title}
                  </button>
                ))}
              </div>

              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <span className="text-xs text-gray-400 font-mono">{codeSnippets[expandedCode as keyof typeof codeSnippets].title}</span>
                  <span className="text-xs text-gray-500">{codeSnippets[expandedCode as keyof typeof codeSnippets].lang}</span>
                </div>
                <pre className="p-4 text-xs text-green-400 overflow-x-auto leading-relaxed max-h-[500px] overflow-y-auto">
                  <code>{codeSnippets[expandedCode as keyof typeof codeSnippets].code}</code>
                </pre>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-2">💡 代码说明</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  {expandedCode === 'controller' && (
                    <>
                      <li>• 使用@RestController注解暴露RESTful接口</li>
                      <li>• @PreAuthorize实现方法级权限控制</li>
                      <li>• @Valid触发参数校验（JSR-303）</li>
                      <li>• 统一返回Result包装类，包含code/message/data</li>
                    </>
                  )}
                  {expandedCode === 'service' && (
                    <>
                      <li>• @Transactional保证事务一致性</li>
                      <li>• 自动判定逻辑支持上限/下限/区间三种规则</li>
                      <li>• 不合格时自动触发不良记录生成</li>
                      <li>• 使用Redis清除相关缓存保证数据一致性</li>
                    </>
                  )}
                  {expandedCode === 'security' && (
                    <>
                      <li>• 无状态会话（STATELESS）配合JWT</li>
                      <li>• 公开接口（登录、短信）放行认证</li>
                      <li>• 基于角色的URL级权限控制</li>
                      <li>• JWT过滤器在UsernamePasswordAuthenticationFilter之前执行</li>
                    </>
                  )}
                  {expandedCode === 'rag' && (
                    <>
                      <li>• 问题先向量化，再从向量库检索相似知识（Top-K）</li>
                      <li>• 将检索到的知识拼接为Prompt模板</li>
                      <li>• 调用DeepSeek大模型API生成回答</li>
                      <li>• 提取引用来源，保证答案可溯源</li>
                    </>
                  )}
                  {expandedCode === 'spc' && (
                    <>
                      <li>• Cpk = min((USL-μ)/3σ, (μ-LSL)/3σ)</li>
                      <li>• 至少需要20个样本才能计算</li>
                      <li>• 根据Cpk值判定工序能力等级</li>
                      <li>• 支持Xbar-R控制图数据生成</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
