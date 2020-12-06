export interface Player {
  name: string;
  rating: number;
  id: number | string;
}

export type Maps = string[];

export enum BotCommands {
  SCRIM = '!scrim',
  DROP = '!drop',
  COUNT = '!count',
  RESET = '!reset',
  MAP = '!map',
  FLIP = '!flip',
  CHUNKY = '!chunky',
  YO = '!yo',
}
