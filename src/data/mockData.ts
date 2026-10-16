// 智能马桶检测管理系统 - 模拟数据

export interface User {
  id: number;
  username: string;
  realName: string;
  role: 'admin' | 'supervisor' | 'inspector' | 'production';
  roleName: string;
  department: string;
  phone: string;
  email: string;
  status: 'active' | 'disabled';
  createTime: string;
}

export interface ProductModel {
  id: number;
  modelCode: string;
  modelName: string;
  category: string;
  supplier: string;
  description: string;
  status: 'active' | 'discontinued';
}

export interface DetectionItem {
  id: number;
  itemCode: string;
  itemName: string;
  category: string;
  unit: string;
  standardValue: number;
  upperLimit: number;
  lowerLimit: number;
  judgmentRule: string;
  standardRef: string;
}

export interface DetectionTask {
  id: number;
  taskCode: string;
  productName: string;
  modelCode: string;
  batchNo: string;
  quantity: number;
  taskType: '出厂检验' | '过程检验' | '型式试验';
  status: '待派工' | '待检测' | '检测中' | '待审核' | '已完成' | '已终止';
  assignee: string;
  createTime: string;
  deadline: string;
  passRate: number | null;
}

export interface DetectionRecord {
  id: number;
  taskId: number;
  taskCode: string;
  productName: string;
  batchNo: string;
  serialNo: string;
  itemName: string;
  standardValue: number;
  measuredValue: number;
  upperLimit: number;
  lowerLimit: number;
  result: '合格' | '不合格' | '待判定';
  inspector: string;
  inspectTime: string;
}

export interface NonConformingRecord {
  id: number;
  recordCode: string;
  productName: string;
  batchNo: string;
  serialNo: string;
  defectItem: string;
  defectLevel: '轻微' | '一般' | '严重' | '致命';
  defectDescription: string;
  causeAnalysis: string;
  responsibleDept: string;
  disposalMethod: '返工' | '返修' | '让步接收' | '报废';
  status: '待处理' | '处理中' | '待审核' | '已完成' | '已关闭';
  createTime: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  type: '质量公告' | '标准变更' | '整改要求' | '系统通知';
  isTop: boolean;
  publisher: string;
  publishTime: string;
  status: 'published' | 'draft';
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  type: 'task' | 'defect' | 'equipment' | 'system';
  isRead: boolean;
  createTime: string;
}

// 用户数据
export const users: User[] = [
  { id: 1, username: 'admin', realName: '系统管理员', role: 'admin', roleName: '系统管理员', department: '信息技术部', phone: '13800138001', email: 'admin@company.com', status: 'active', createTime: '2026-01-01' },
  { id: 2, username: 'zhangwei', realName: '张伟', role: 'supervisor', roleName: '质检主管', department: '质量管理部', phone: '13800138002', email: 'zhangwei@company.com', status: 'active', createTime: '2026-01-05' },
  { id: 3, username: 'liming', realName: '李明', role: 'inspector', roleName: '检测员', department: '质量管理部', phone: '13800138003', email: 'liming@company.com', status: 'active', createTime: '2026-01-10' },
  { id: 4, username: 'wangfang', realName: '王芳', role: 'inspector', roleName: '检测员', department: '质量管理部', phone: '13800138004', email: 'wangfang@company.com', status: 'active', createTime: '2026-01-12' },
  { id: 5, username: 'liuqiang', realName: '刘强', role: 'production', roleName: '生产人员', department: '生产一部', phone: '13800138005', email: 'liuqiang@company.com', status: 'active', createTime: '2026-01-15' },
  { id: 6, username: 'chenxi', realName: '陈曦', role: 'inspector', roleName: '检测员', department: '质量管理部', phone: '13800138006', email: 'chenxi@company.com', status: 'disabled', createTime: '2026-02-01' },
];

// 产品型号数据
export const productModels: ProductModel[] = [
  { id: 1, modelCode: 'ST-1001A', modelName: '智能马桶 基础款A', category: '基础型', supplier: '恒洁卫浴', description: '座圈加热+温水清洗+暖风烘干', status: 'active' },
  { id: 2, modelCode: 'ST-2002B', modelName: '智能马桶 标准款B', category: '标准型', supplier: '恒洁卫浴', description: '基础款+自动翻盖+除臭杀菌', status: 'active' },
  { id: 3, modelCode: 'ST-3003C', modelName: '智能马桶 豪华款C', category: '豪华型', supplier: '九牧厨卫', description: '标准款+健康检测+语音交互', status: 'active' },
  { id: 4, modelCode: 'ST-4004D', modelName: '智能马桶 旗舰款D', category: '旗舰型', supplier: '九牧厨卫', description: '全功能+APP控制+OTA升级', status: 'active' },
  { id: 5, modelCode: 'ST-0501E', modelName: '智能马桶 经济款E', category: '经济型', supplier: '箭牌卫浴', description: '座圈加热+温水清洗', status: 'discontinued' },
];

// 检测项目数据
export const detectionItems: DetectionItem[] = [
  { id: 1, itemCode: 'DI-001', itemName: '冲洗性能', category: '性能指标', unit: 'L', standardValue: 6.0, upperLimit: 6.5, lowerLimit: 5.0, judgmentRule: '区间判定', standardRef: 'GB/T 34549—2024 第6.2.1条' },
  { id: 2, itemCode: 'DI-002', itemName: '洗净率', category: '性能指标', unit: '%', standardValue: 95, upperLimit: 100, lowerLimit: 90, judgmentRule: '下限判定', standardRef: 'GB/T 34549—2024 第6.2.2条' },
  { id: 3, itemCode: 'DI-003', itemName: '水封深度', category: '性能指标', unit: 'mm', standardValue: 50, upperLimit: 60, lowerLimit: 40, judgmentRule: '区间判定', standardRef: 'GB/T 34549—2024 第6.2.3条' },
  { id: 4, itemCode: 'DI-004', itemName: '泄漏电流', category: '电气安全', unit: 'mA', standardValue: 0, upperLimit: 0.5, lowerLimit: 0, judgmentRule: '上限判定', standardRef: 'GB/T 34549—2024 第6.3.1条' },
  { id: 5, itemCode: 'DI-005', itemName: '电气强度', category: '电气安全', unit: 'kV', standardValue: 1.5, upperLimit: 3.0, lowerLimit: 1.2, judgmentRule: '下限判定', standardRef: 'GB/T 34549—2024 第6.3.2条' },
  { id: 6, itemCode: 'DI-006', itemName: '接地电阻', category: '电气安全', unit: 'Ω', standardValue: 0.1, upperLimit: 0.15, lowerLimit: 0, judgmentRule: '上限判定', standardRef: 'GB/T 34549—2024 第6.3.3条' },
  { id: 7, itemCode: 'DI-007', itemName: '座圈温度', category: '温控指标', unit: '℃', standardValue: 36, upperLimit: 40, lowerLimit: 30, judgmentRule: '区间判定', standardRef: 'GB/T 34549—2024 第6.4.1条' },
  { id: 8, itemCode: 'DI-008', itemName: '暖风温度', category: '温控指标', unit: '℃', standardValue: 45, upperLimit: 55, lowerLimit: 35, judgmentRule: '区间判定', standardRef: 'GB/T 34549—2024 第6.4.2条' },
  { id: 9, itemCode: 'DI-009', itemName: '整机噪音', category: '性能指标', unit: 'dB', standardValue: 45, upperLimit: 55, lowerLimit: 0, judgmentRule: '上限判定', standardRef: 'GB/T 34549—2024 第6.5.1条' },
  { id: 10, itemCode: 'DI-010', itemName: '待机功耗', category: '能效指标', unit: 'W', standardValue: 1.0, upperLimit: 2.0, lowerLimit: 0, judgmentRule: '上限判定', standardRef: 'GB/T 34549—2024 第6.6.1条' },
  { id: 11, itemCode: 'DI-011', itemName: '防水等级', category: '安全指标', unit: 'IP', standardValue: 44, upperLimit: 68, lowerLimit: 44, judgmentRule: '下限判定', standardRef: 'GB/T 34549—2024 第6.3.4条' },
  { id: 12, itemCode: 'DI-012', itemName: '翻盖耐久寿命', category: '耐久指标', unit: '次', standardValue: 30000, upperLimit: 50000, lowerLimit: 25000, judgmentRule: '下限判定', standardRef: 'GB/T 34549—2024 第6.7.1条' },
];

// 检测任务数据
export const detectionTasks: DetectionTask[] = [
  { id: 1, taskCode: 'DT-2026-0001', productName: '智能马桶 基础款A', modelCode: 'ST-1001A', batchNo: 'B20260301', quantity: 200, taskType: '出厂检验', status: '已完成', assignee: '李明', createTime: '2026-03-01', deadline: '2026-03-03', passRate: 97.5 },
  { id: 2, taskCode: 'DT-2026-0002', productName: '智能马桶 标准款B', modelCode: 'ST-2002B', batchNo: 'B20260302', quantity: 150, taskType: '出厂检验', status: '检测中', assignee: '李明', createTime: '2026-03-05', deadline: '2026-03-08', passRate: null },
  { id: 3, taskCode: 'DT-2026-0003', productName: '智能马桶 豪华款C', modelCode: 'ST-3003C', batchNo: 'B20260303', quantity: 100, taskType: '过程检验', status: '待检测', assignee: '王芳', createTime: '2026-03-06', deadline: '2026-03-09', passRate: null },
  { id: 4, taskCode: 'DT-2026-0004', productName: '智能马桶 旗舰款D', modelCode: 'ST-4004D', batchNo: 'B20260304', quantity: 50, taskType: '型式试验', status: '待派工', assignee: '', createTime: '2026-03-07', deadline: '2026-03-15', passRate: null },
  { id: 5, taskCode: 'DT-2026-0005', productName: '智能马桶 基础款A', modelCode: 'ST-1001A', batchNo: 'B20260305', quantity: 300, taskType: '出厂检验', status: '待审核', assignee: '王芳', createTime: '2026-03-04', deadline: '2026-03-07', passRate: 98.2 },
  { id: 6, taskCode: 'DT-2026-0006', productName: '智能马桶 标准款B', modelCode: 'ST-2002B', batchNo: 'B20260306', quantity: 180, taskType: '出厂检验', status: '已完成', assignee: '李明', createTime: '2026-02-28', deadline: '2026-03-02', passRate: 96.8 },
  { id: 7, taskCode: 'DT-2026-0007', productName: '智能马桶 豪华款C', modelCode: 'ST-3003C', batchNo: 'B20260307', quantity: 80, taskType: '出厂检验', status: '检测中', assignee: '王芳', createTime: '2026-03-08', deadline: '2026-03-11', passRate: null },
  { id: 8, taskCode: 'DT-2026-0008', productName: '智能马桶 经济款E', modelCode: 'ST-0501E', batchNo: 'B20260308', quantity: 250, taskType: '出厂检验', status: '已终止', assignee: '李明', createTime: '2026-03-01', deadline: '2026-03-04', passRate: null },
];

// 检测记录数据
export const detectionRecords: DetectionRecord[] = [
  { id: 1, taskId: 1, taskCode: 'DT-2026-0001', productName: '智能马桶 基础款A', batchNo: 'B20260301', serialNo: 'SN001', itemName: '冲洗性能', standardValue: 6.0, measuredValue: 5.8, upperLimit: 6.5, lowerLimit: 5.0, result: '合格', inspector: '李明', inspectTime: '2026-03-01 09:30' },
  { id: 2, taskId: 1, taskCode: 'DT-2026-0001', productName: '智能马桶 基础款A', batchNo: 'B20260301', serialNo: 'SN001', itemName: '泄漏电流', standardValue: 0, measuredValue: 0.2, upperLimit: 0.5, lowerLimit: 0, result: '合格', inspector: '李明', inspectTime: '2026-03-01 09:35' },
  { id: 3, taskId: 1, taskCode: 'DT-2026-0001', productName: '智能马桶 基础款A', batchNo: 'B20260301', serialNo: 'SN001', itemName: '座圈温度', standardValue: 36, measuredValue: 37.5, upperLimit: 40, lowerLimit: 30, result: '合格', inspector: '李明', inspectTime: '2026-03-01 09:40' },
  { id: 4, taskId: 1, taskCode: 'DT-2026-0001', productName: '智能马桶 基础款A', batchNo: 'B20260301', serialNo: 'SN002', itemName: '冲洗性能', standardValue: 6.0, measuredValue: 4.8, upperLimit: 6.5, lowerLimit: 5.0, result: '不合格', inspector: '李明', inspectTime: '2026-03-01 10:00' },
  { id: 5, taskId: 1, taskCode: 'DT-2026-0001', productName: '智能马桶 基础款A', batchNo: 'B20260301', serialNo: 'SN002', itemName: '整机噪音', standardValue: 45, measuredValue: 58, upperLimit: 55, lowerLimit: 0, result: '不合格', inspector: '李明', inspectTime: '2026-03-01 10:05' },
  { id: 6, taskId: 1, taskCode: 'DT-2026-0001', productName: '智能马桶 基础款A', batchNo: 'B20260301', serialNo: 'SN003', itemName: '洗净率', standardValue: 95, measuredValue: 96.2, upperLimit: 100, lowerLimit: 90, result: '合格', inspector: '李明', inspectTime: '2026-03-01 10:30' },
  { id: 7, taskId: 5, taskCode: 'DT-2026-0005', productName: '智能马桶 基础款A', batchNo: 'B20260305', serialNo: 'SN101', itemName: '电气强度', standardValue: 1.5, measuredValue: 1.8, upperLimit: 3.0, lowerLimit: 1.2, result: '合格', inspector: '王芳', inspectTime: '2026-03-04 14:00' },
  { id: 8, taskId: 5, taskCode: 'DT-2026-0005', productName: '智能马桶 基础款A', batchNo: 'B20260305', serialNo: 'SN101', itemName: '待机功耗', standardValue: 1.0, measuredValue: 1.2, upperLimit: 2.0, lowerLimit: 0, result: '合格', inspector: '王芳', inspectTime: '2026-03-04 14:10' },
  { id: 9, taskId: 2, taskCode: 'DT-2026-0002', productName: '智能马桶 标准款B', batchNo: 'B20260302', serialNo: 'SN201', itemName: '暖风温度', standardValue: 45, measuredValue: 42, upperLimit: 55, lowerLimit: 35, result: '合格', inspector: '李明', inspectTime: '2026-03-06 09:00' },
  { id: 10, taskId: 2, taskCode: 'DT-2026-0002', productName: '智能马桶 标准款B', batchNo: 'B20260302', serialNo: 'SN201', itemName: '防水等级', standardValue: 44, measuredValue: 44, upperLimit: 68, lowerLimit: 44, result: '合格', inspector: '李明', inspectTime: '2026-03-06 09:15' },
];

// 不合格品记录
export const nonConformingRecords: NonConformingRecord[] = [
  { id: 1, recordCode: 'NC-2026-0001', productName: '智能马桶 基础款A', batchNo: 'B20260301', serialNo: 'SN002', defectItem: '冲洗性能', defectLevel: '严重', defectDescription: '冲洗水量低于标准下限，实测4.8L，标准要求≥5.0L', causeAnalysis: '进水阀开度不足，导致出水量偏低', responsibleDept: '生产一部', disposalMethod: '返工', status: '已完成', createTime: '2026-03-01' },
  { id: 2, recordCode: 'NC-2026-0002', productName: '智能马桶 基础款A', batchNo: 'B20260301', serialNo: 'SN002', defectItem: '整机噪音', defectLevel: '一般', defectDescription: '运行噪音58dB，超出上限55dB', causeAnalysis: '电机轴承装配不良，产生异响', responsibleDept: '生产一部', disposalMethod: '返修', status: '处理中', createTime: '2026-03-01' },
  { id: 3, recordCode: 'NC-2026-0003', productName: '智能马桶 标准款B', batchNo: 'B20260302', serialNo: 'SN205', defectItem: '座圈温度', defectLevel: '轻微', defectDescription: '座圈温度波动±3℃，超出±2℃要求', causeAnalysis: '温控传感器偏移', responsibleDept: '生产二部', disposalMethod: '返工', status: '待处理', createTime: '2026-03-06' },
  { id: 4, recordCode: 'NC-2026-0004', productName: '智能马桶 豪华款C', batchNo: 'B20260303', serialNo: 'SN301', defectItem: '接地电阻', defectLevel: '致命', defectDescription: '接地电阻0.18Ω，超出上限0.15Ω', causeAnalysis: '待分析', responsibleDept: '', disposalMethod: '报废', status: '待审核', createTime: '2026-03-07' },
];

// 公告数据
export const announcements: Announcement[] = [
  { id: 1, title: '关于GB/T 34549—2024标准实施的通知', content: '根据国家标准化管理委员会要求，新版GB/T 34549—2024《卫生洁具 智能坐便器》标准将于2026年4月1日起正式实施。请各部门及时更新检测标准配置，确保检测项目与判定规则符合新标准要求。', type: '标准变更', isTop: true, publisher: '张伟', publishTime: '2026-03-05', status: 'published' },
  { id: 2, title: '3月质量目标完成情况通报', content: '截至3月10日，本月一次交验合格率为97.3%，较上月提升0.5个百分点。主要不良项为冲洗性能不合格（占不良总数35%）和整机噪音超标（占28%）。请生产部门重点关注上述问题。', type: '质量公告', isTop: false, publisher: '张伟', publishTime: '2026-03-10', status: 'published' },
  { id: 3, title: 'B20260301批次整改要求', content: 'B20260301批次智能马桶基础款A存在冲洗性能和整机噪音两项不合格，要求生产一部在3个工作日内完成返工返修并提交复检申请。', type: '整改要求', isTop: false, publisher: '张伟', publishTime: '2026-03-02', status: 'published' },
  { id: 4, title: '系统维护通知', content: '系统将于本周六22:00-次日6:00进行例行维护升级，届时系统将暂停服务。请提前做好工作安排。', type: '系统通知', isTop: false, publisher: '系统管理员', publishTime: '2026-03-08', status: 'published' },
];

// 通知数据
export const notifications: Notification[] = [
  { id: 1, title: '任务超期提醒', content: '检测任务DT-2026-0004已超过计划完成时间，请尽快处理。', type: 'task', isRead: false, createTime: '2026-03-16 08:00' },
  { id: 2, title: '不合格品待审核', content: '不合格记录NC-2026-0004等待您的审核，请及时处理。', type: 'defect', isRead: false, createTime: '2026-03-07 14:30' },
  { id: 3, title: '设备检定到期提醒', content: '检测设备DC-003（泄漏电流测试仪）检定有效期将于2026-03-20到期，请及时安排送检。', type: 'equipment', isRead: false, createTime: '2026-03-15 09:00' },
  { id: 4, title: '新任务分配', content: '您有新的检测任务DT-2026-0003已分配，请在3月9日前完成。', type: 'task', isRead: true, createTime: '2026-03-06 10:00' },
  { id: 5, title: '标准变更通知', content: 'GB/T 34549—2024新版标准已发布，请及时更新检测方案配置。', type: 'system', isRead: true, createTime: '2026-03-05 11:00' },
];

// 质量统计数据
export const qualityTrendData = [
  { date: '03-01', passRate: 97.5, targetRate: 98 },
  { date: '03-02', passRate: 96.8, targetRate: 98 },
  { date: '03-03', passRate: 98.1, targetRate: 98 },
  { date: '03-04', passRate: 97.2, targetRate: 98 },
  { date: '03-05', passRate: 98.5, targetRate: 98 },
  { date: '03-06', passRate: 96.5, targetRate: 98 },
  { date: '03-07', passRate: 97.8, targetRate: 98 },
  { date: '03-08', passRate: 98.2, targetRate: 98 },
  { date: '03-09', passRate: 97.0, targetRate: 98 },
  { date: '03-10', passRate: 98.8, targetRate: 98 },
  { date: '03-11', passRate: 97.6, targetRate: 98 },
  { date: '03-12', passRate: 98.0, targetRate: 98 },
  { date: '03-13', passRate: 97.3, targetRate: 98 },
  { date: '03-14', passRate: 98.4, targetRate: 98 },
];

export const defectParetoData = [
  { name: '冲洗性能', value: 35 },
  { name: '整机噪音', value: 28 },
  { name: '座圈温度', value: 15 },
  { name: '待机功耗', value: 10 },
  { name: '暖风温度', value: 7 },
  { name: '防水等级', value: 3 },
  { name: '其他', value: 2 },
];

export const modelPassRateData = [
  { name: '基础款A', passRate: 97.5 },
  { name: '标准款B', passRate: 96.8 },
  { name: '豪华款C', passRate: 98.2 },
  { name: '旗舰款D', passRate: 99.1 },
];

export const spcData = [
  { sample: 1, value: 5.9, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 2, value: 6.1, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 3, value: 5.8, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 4, value: 6.2, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 5, value: 5.7, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 6, value: 6.0, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 7, value: 5.9, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 8, value: 6.3, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 9, value: 5.6, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 10, value: 6.1, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 11, value: 5.8, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 12, value: 6.0, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 13, value: 5.9, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 14, value: 6.2, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 15, value: 5.7, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 16, value: 6.1, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 17, value: 5.9, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 18, value: 6.0, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 19, value: 5.8, ucl: 6.5, lcl: 5.0, center: 6.0 },
  { sample: 20, value: 6.1, ucl: 6.5, lcl: 5.0, center: 6.0 },
];

// AI问答知识库
export const knowledgeBase = [
  { id: 1, content: '冲洗性能要求：智能坐便器的冲洗功能应能有效冲洗污物，冲洗用水量不应大于6.0L，冲洗后水面应能恢复至水封状态。依据GB/T 34549—2024第6.2.1条。', keywords: ['冲洗', '性能', '用水量', '水封'] },
  { id: 2, content: '洗净率要求：智能坐便器的洗净率应不低于90%，测试方法按标准附录A执行。洗净率是衡量清洗效果的核心指标。依据GB/T 34549—2024第6.2.2条。', keywords: ['洗净率', '清洗', '效果'] },
  { id: 3, content: '泄漏电流要求：在正常工作条件下，智能坐便器的泄漏电流不应超过0.5mA。测试时应在最不利条件下进行。依据GB/T 34549—2024第6.3.1条。', keywords: ['泄漏电流', '电气安全', '电流'] },
  { id: 4, content: '过程能力指数Cpk是衡量工序能力的重要指标。Cpk≥1.33表示工序能力充分；1.0≤Cpk<1.33表示工序能力尚可但需关注；Cpk<1.0表示工序能力不足，需改进。一般要求关键质量特性的Cpk不低于1.33。', keywords: ['Cpk', '过程能力', '工序', '指数'] },
  { id: 5, content: '座圈温度要求：智能坐便器座圈加热功能应能将座圈温度控制在30℃~40℃范围内，温度波动不超过±2℃。依据GB/T 34549—2024第6.4.1条。', keywords: ['座圈', '温度', '加热', '温控'] },
  { id: 6, content: '防水等级要求：智能坐便器的防水等级应不低于IPX4，即能防止各方向飞溅的水侵入。对于安装在潮湿环境中的产品，建议达到IPX4以上等级。依据GB/T 34549—2024第6.3.4条。', keywords: ['防水', 'IPX4', '防水等级', '潮湿'] },
  { id: 7, content: '整机噪音要求：智能坐便器在正常工作状态下的噪音不应超过55dB(A)。测试应在半消声室或等效环境中进行，距离产品1m处测量。依据GB/T 34549—2024第6.5.1条。', keywords: ['噪音', '噪声', '分贝', 'dB'] },
  { id: 8, content: '不合格品处置方式包括：返工（使不合格品符合要求）、返修（使不合格品满足预期用途）、让步接收（经授权人员对不合格品进行书面批准使用或放行）、报废（对不合格品进行销毁处理）。处置后均需进行复检确认。', keywords: ['不合格', '处置', '返工', '返修', '让步', '报废'] },
];
