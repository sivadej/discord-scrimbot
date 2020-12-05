import { Player } from './types';

// WIP
// move matchmaking to class for future handling of multiple simultaneous scrim sessions

export class Matchmaker {
  rankValues: Enumerator;
  players: Player[];
  constructor(players, rankValues = null) {
    this.players = players;
    this.rankValues = rankValues;
  }
}
