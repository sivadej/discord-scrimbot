import Discord = require('discord.js');

export interface Player {
  name: string;
  rating: number;
  id: number | string;
  voiceState?: Discord.VoiceState;
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
