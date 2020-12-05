"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matchmaker = void 0;
// WIP
// move matchmaking to class for future handling of multiple simultaneous scrim sessions
var Matchmaker = /** @class */ (function () {
    function Matchmaker(players, rankValues) {
        if (rankValues === void 0) { rankValues = null; }
        this.players = players;
        this.rankValues = rankValues;
    }
    return Matchmaker;
}());
exports.Matchmaker = Matchmaker;
//# sourceMappingURL=Matchmaker.js.map