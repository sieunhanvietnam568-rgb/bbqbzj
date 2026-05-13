export interface GameSettings {
  apiKey: string;
  apiUrl: string;
  model: string;
  difficulty: '简单' | '普通' | '困难' | '噩梦';
  fontSize: '小' | '中' | '大';
  autoSave: boolean;
  soundEnabled: boolean;
}
