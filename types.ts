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
  RESETPLAYERS = '!resetplayers',
  MAPRANDOM = '!maprandom',
  MAPS = '!maps',
  FLIP = '!flip',
  CHUNKY = '!chunky',
  YO = '!yo',
  MAPBAN = '!mapban',
  MAPBANRESET = '!mapbanreset',
  HELP = '!help',
}
