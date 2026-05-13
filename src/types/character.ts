export interface Clothing {
  top: string;
  bottom: string;
  underwear: string;
  socks: string;
  shoes: string;
  accessories: string;
}

export interface CharacterStats {
  affection: number;   // 好感度 0-100
  hunger: number;      // 饥饿值 0-100 (100=饱腹)
  thirst: number;      // 饥渴值 0-100 (100=不渴)
  lust: number;        // 性欲 0-100
  disgust: number;     // 厌恶值 0-100
  sanity: number;      // 理智值 0-100 (100=完全理智)
}

export interface BodyParts {
  mouth: string;
  hands: string;
  feet: string;
  vagina: string;
  anus: string;
  breasts: string;
}

export interface Character {
  id: string;
  name: string;
  gender: '男' | '女' | '其他';
  age: number;
  clothing: Clothing;
  stats: CharacterStats;
  bodyParts: BodyParts;
  psychologyState: string;
  avatar: string;       // 用于图标/头像的颜色标识
  avatarGradient: string;
  description: string;
}

export type GameView = 'start' | 'main' | 'characters' | 'map' | 'settings';
