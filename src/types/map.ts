export interface Region {
  id: string;
  name: string;
  description: string;
  connectedRegions: string[];
  explored: boolean;
  dangerLevel: number;  // 0-5
  resources: string[];
}

export interface GameMap {
  parentRegion: Region;
  subRegions: Region[];
  currentLocation: string;
}

export interface GameTime {
  day: number;
  hour: number;
  minute: number;
  period: '清晨' | '上午' | '下午' | '傍晚' | '深夜';
}
