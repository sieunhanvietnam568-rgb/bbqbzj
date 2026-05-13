import type { Character, GameMap, ChatSession, GameSettings } from '../types';

export const initialCharacters: Character[] = [
  {
    id: 'char-1',
    name: '林雪',
    gender: '女',
    age: 24,
    clothing: {
      top: '白色紧身战术背心',
      bottom: '深灰工装长裤',
      underwear: '黑色运动内衣',
      socks: '中筒战术袜',
      shoes: '黑色军靴',
      accessories: '银色狗牌项链、战术手套',
    },
    stats: { affection: 72, hunger: 65, thirst: 58, lust: 23, disgust: 15, sanity: 78 },
    bodyParts: {
      mouth: '正常',
      hands: '轻微擦伤',
      feet: '正常',
      vagina: '正常',
      anus: '正常',
      breasts: '正常',
    },
    psychologyState: '警觉但保持冷静。时刻关注周围动静，对队友表现出保护欲。偶尔会盯着远方出神，似乎在回忆疫情爆发前的日子。',
    avatar: 'LS',
    avatarGradient: 'linear-gradient(135deg, #7EC8E3, #4ECDC4)',
    description: '前急诊科护士，在疫情爆发时正在值夜班。凭借医疗知识和冷静的判断力在末日中存活至今。',
  },
  {
    id: 'char-2',
    name: '赵刚',
    gender: '男',
    age: 32,
    clothing: {
      top: '迷彩军装外套',
      bottom: '多口袋战术裤',
      underwear: '灰色平角内裤',
      socks: '长筒军用袜',
      shoes: '沙漠战术靴',
      accessories: '战术手表、墨镜、半指手套',
    },
    stats: { affection: 55, hunger: 42, thirst: 35, lust: 18, disgust: 8, sanity: 85 },
    bodyParts: {
      mouth: '正常',
      hands: '有老茧',
      feet: '正常',
      vagina: '—',
      anus: '正常',
      breasts: '—',
    },
    psychologyState: '坚毅沉着。作为退伍军人，他保持着严格的纪律。在危险面前从不退缩，但偶尔在深夜站岗时会流露出深深的疲惫。',
    avatar: 'ZG',
    avatarGradient: 'linear-gradient(135deg, #556270, #4ECDC4)',
    description: '前特种部队成员，退役后开了家安保公司。灾难来临时保护了一群幸存者，现在是团队的防御核心。',
  },
  {
    id: 'char-3',
    name: '苏小小',
    gender: '女',
    age: 19,
    clothing: {
      top: '浅粉卫衣',
      bottom: '牛仔短裤',
      underwear: '白色棉质内裤',
      socks: '白色短袜',
      shoes: '粉色运动鞋',
      accessories: '蝴蝶发卡、卡通手链',
    },
    stats: { affection: 88, hunger: 78, thirst: 82, lust: 35, disgust: 42, sanity: 52 },
    bodyParts: {
      mouth: '正常',
      hands: '正常',
      feet: '有水泡',
      vagina: '正常',
      anus: '正常',
      breasts: '正常',
    },
    psychologyState: '表面乐观开朗，实则内心充满恐惧。用天真的笑容掩饰对失去家人的悲痛。对林雪有强烈的依赖感，将其视为姐姐般的存在。',
    avatar: 'SXX',
    avatarGradient: 'linear-gradient(135deg, #FF6B6B, #FFE66D)',
    description: '大学一年级新生，灾难发生时正在宿舍。在赵刚的救助下幸存，虽然年轻但学习能力极强，擅长搜寻物资。',
  },
];

export const initialMap: GameMap = {
  parentRegion: {
    id: 'region-city',
    name: '云海市废墟',
    description: '曾经繁华的沿海城市，如今只剩下断壁残垣与游荡的感染者。高楼大厦间偶尔能看到幸存者的信号火光。海风吹过空荡的街道，带着咸腥与腐烂的气息。',
    connectedRegions: ['region-downtown', 'region-dock'],
    explored: true,
    dangerLevel: 4,
    resources: ['废弃车辆', '便利店残余物资', '倒塌建筑物'],
  },
  subRegions: [
    {
      id: 'region-downtown',
      name: '市中心商业区',
      description: '高楼林立的核心区域，街道狭窄阴暗。商场内可能还有未被搜刮的物资，但感染者密度极高。地下停车场系统复杂，可作为临时避难所。',
      connectedRegions: ['region-city', 'region-dock'],
      explored: true,
      dangerLevel: 5,
      resources: ['购物中心', '药店', '武器店'],
    },
    {
      id: 'region-dock',
      name: '滨海码头区',
      description: '港口与仓库区，海风带来的盐雾腐蚀着一切。货柜堆场形成了迷宫般的通道。传说有一艘完好的游艇藏在三号码头，或许能成为逃离这座城市的希望。',
      connectedRegions: ['region-city', 'region-downtown'],
      explored: false,
      dangerLevel: 3,
      resources: ['集装箱货柜', '渔船', '灯塔哨站'],
    },
  ],
  currentLocation: 'region-city',
};

export const initialTime = {
  day: 47,
  hour: 14,
  minute: 35,
  period: '下午' as const,
};

export const initialChatSessions: ChatSession[] = [
  {
    id: 'session-1',
    title: '避难所中的对话',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 3600000,
    messages: [
      {
        id: 'msg-1',
        role: 'system',
        content: '场景：云海市废墟中的一处临时避难所。傍晚的阳光透过破碎的窗户洒进来。空气中弥漫着消毒水的味道。林雪正在整理医疗用品，赵刚在检查武器。',
        timestamp: Date.now() - 86400000,
      },
      {
        id: 'msg-2',
        role: 'user',
        content: '环顾四周，检查避难所的安全状况',
        timestamp: Date.now() - 86400000 + 60000,
      },
      {
        id: 'msg-3',
        role: 'assistant',
        content: '你扫视着这个临时避难所——一间废弃的便利店。货架已经被推到窗边作为屏障，后门用铁链牢牢锁住。赵刚在门口布下了简易的警报装置，用空罐子和鱼线做成的绊索。\n\n林雪抬起头，递给你一瓶消毒液："把暴露的伤口处理一下。这个城市里的感染者数量比我们预期的要多。"\n\n外面的街道上传来零星的低吼声，但听起来还有一段距离。目前这里似乎是安全的。',
        timestamp: Date.now() - 86400000 + 120000,
      },
    ],
  },
];

export const initialSettings: GameSettings = {
  apiKey: '',
  apiUrl: 'https://api.deepseek.com/v1/chat/completions',
  model: 'deepseek-chat',
  difficulty: '普通',
  fontSize: '中',
  autoSave: true,
  soundEnabled: false,
};

export const sampleDialogue: Record<string, string> = {
  scavenge: '你小心翼翼地推开超市的卷帘门，锈蚀的铰链发出刺耳的声响。货架上的大部分商品已经被洗劫一空，但角落里还有几听罐头和两瓶矿泉水。\n\n突然，后面传来玻璃碎裂的声音——一只感染者正从破碎的橱窗爬进来。',
  combat: '感染者向你扑来，腐烂的手臂向前伸展。赵刚及时开枪，子弹击中了它的肩部，但并没有阻止它的前进。\n\n"打头！"赵刚喊道，同时快速换弹。你举起手中的钢管，朝着感染者的头部全力挥去。',
  rest: '你们在相对安全的建筑二层休息。苏小小靠在墙边，用一块破布擦拭她起了水泡的脚。林雪开始清点剩余的医疗用品。\n\n窗外，夕阳将云海市的废墟染成了橙红色。在末日中，这样的宁静时刻显得格外珍贵。',
};
