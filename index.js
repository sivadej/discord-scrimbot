"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var dotenv = require("dotenv");
var Discord = require("discord.js");
var types_1 = require("./types");
dotenv.config();
var client = new Discord.Client();
var token = process.env.DISCORD_BOT_TOKEN;
var ALLOWED_CHANNELS = ['784661513050914846', '*784692851208486972'];
var VOICE_CHANNEL1_ID = '708581498969653329';
var VOICE_CHANNEL2_ID = '708581533669261342';
client.login(token);
client.once('ready', function () {
    console.log('ready!');
});
var maps = ['bind', 'ascent', 'haven', 'split', 'icebox'];
var playableMaps = __spreadArrays(maps);
var bannedMaps = [];
var players = [
    {
        name: 'ebomb',
        rating: 0,
        id: '14144fdg7155280773122',
    },
    {
        name: 'ebo3rmb',
        rating: 0,
        id: '1414471552835n0773122',
    },
    {
        name: 'ebo12tmb',
        rating: 0,
        id: '1414357n47155280773122',
    },
    {
        name: 'ebodghmb',
        rating: 0,
        id: '141447155280773357n122',
    },
    {
        name: 'ebdrhomb',
        rating: 0,
        id: '141447155280n73773122',
    },
    {
        name: 'ebt42omb',
        rating: 0,
        id: '1735741447155280773122',
    },
    {
        name: 'ebg rdomb',
        rating: 0,
        id: '14144715527380773122',
    },
    {
        name: 'ebrgeomb',
        rating: 0,
        id: '141447155234580773122',
    },
];
var updatePlayableMaps = function () {
    playableMaps = _.pull.apply(_, __spreadArrays([__spreadArrays(maps)], bannedMaps));
};
var strArrayToCSV = function (arr) {
    if (!arr)
        return null;
    return arr.join('  -  ').toString();
};
var sendPlayerCount = function (msg) {
    if (players.length === 0)
        msg.channel.send("Nobody here :( type !scrim and wait for more players!");
    else if (players.length >= 10)
        return;
    else {
        msg.channel.send("**Currently " + players.length + " players in scrim queue. Looking for " + (10 - players.length) + " more!**");
        var playerNames = players.map(function (p) { return p.name; });
        msg.channel.send("" + strArrayToCSV(playerNames));
    }
};
var getPlayerTag = function (player) {
    return "<@" + player.id + ">";
};
var revealTeam = function (players, teamName) {
    var revealStr = "**" + teamName + "**";
    players.forEach(function (p) {
        revealStr += "\n - " + p.name + " " + getPlayerTag(p);
    });
    return revealStr;
};
var revealMaps = function (res) {
    res.channel.send("**Banned:**  " + (bannedMaps.length === 0
        ? '_None_'
        : strArrayToCSV(bannedMaps).toUpperCase()));
    res.channel.send("**Playable:**  " + (playableMaps.length === 0
        ? '_None_'
        : strArrayToCSV(playableMaps).toUpperCase()));
};
client.on('voiceStateUpdate', function (old, curr) {
    // console.log('----old---');
    // console.log(old.id);
    // console.log(old.channelID);
    // console.log('----new---');
    // console.log(curr.id);
    console.log(curr.channelID);
    // instantiate
    // console.log(old.guild);
    // console.log(curr.guild.member.name);
    //const member = new Discord.GuildMember(client,  , curr.guild);
    //member.voice.kick();
});
client.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
// shuffle teams randomly
client.on('message', function (res) {
    if (!ALLOWED_CHANNELS.includes(res.channel.id) ||
        !res.content.startsWith('!') ||
        res.author.bot)
        return;
    console.log(new Date() + " scrimbot command detected - username: " + res.author.username + " - messge: " + res.content);
    console.log(res);
    var currentPlayer = {
        name: res.author.username,
        rating: 0,
        id: res.author.id,
        voiceState: res.member.voice,
    };
    if (res.content.toLowerCase().startsWith('!test')) {
        console.log('test');
        players.forEach(function (p) {
            console.log('do something for player', p.name);
            p.voiceState.setChannel('708581498969653329');
        });
    }
    // ban map
    var args = res.content.slice(1).trim().split(' ');
    var mapArg = args[1] && args[1].toLowerCase();
    if (res.content.toLowerCase().startsWith(types_1.BotCommands.MAPBAN)) {
        console.log('!banmap called with arg:', mapArg);
        if (maps.includes(mapArg) && !bannedMaps.includes(mapArg)) {
            console.log('valid ban');
            bannedMaps.push(mapArg);
            updatePlayableMaps();
            console.log('banned:', bannedMaps);
            res.channel.send(currentPlayer.name + " banned map " + mapArg.toUpperCase());
            revealMaps(res);
        }
        else {
            if (bannedMaps.includes(mapArg))
                console.log('map already banned');
            else
                console.log('invalid ban');
        }
    }
    // returns undefined if id doesn't exist in playerlist
    var isDuplicate = Boolean(_.findKey(players, ['id', currentPlayer.id]));
    // exact commands only. handle commands with args separately
    switch (res.content.toLowerCase()) {
        case types_1.BotCommands.SCRIM:
            if (players.length === 10) {
                res.channel.send("Sorry bro, game is full!");
                break;
            }
            if (isDuplicate) {
                console.log('skipping duplicate id add');
                res.channel.send(currentPlayer.name + ": you're already in, dumbass");
            }
            else {
                console.log('adding this player to list...');
                players.push(currentPlayer);
                console.log('updated players list', players);
                res.channel.send("you've been added, " + getPlayerTag(currentPlayer));
            }
            sendPlayerCount(res);
            break;
        case types_1.BotCommands.RESETPLAYERS:
            if (res.author.id === players[0].id) {
                players.length = 0;
                res.channel.send("List was reset by " + res.author.username);
                break;
            }
            else {
                res.channel.send("Only first player " + players[0].name + " is allowed to reset");
            }
            break;
        case types_1.BotCommands.COUNT:
            sendPlayerCount(res);
            break;
        case types_1.BotCommands.MAPRANDOM:
            var selectedMap = _.sample(playableMaps);
            res.channel.send('Randomly picking from playable maps...', {
                files: ["./map_imgs/" + selectedMap.toLowerCase() + ".png"],
            });
            break;
        case types_1.BotCommands.DROP:
            var dropIdx = _.findIndex(players, currentPlayer);
            if (dropIdx === -1)
                res.channel.send(res.author.username + " not found in list.");
            else {
                players.splice(dropIdx, 1);
                console.log('players after !drop', players);
                res.channel.send(res.author.username + " dropped out.");
                sendPlayerCount(res);
            }
            break;
        case types_1.BotCommands.FLIP:
            res.channel.send(_.sample(['HEADS', 'TAILS']));
            break;
        case types_1.BotCommands.MAPS:
            revealMaps(res);
            break;
        case types_1.BotCommands.HELP:
            break;
        case types_1.BotCommands.MAPBANRESET:
            res.channel.send("Map bans reset by " + currentPlayer.name + ".");
            bannedMaps.length = 0;
            updatePlayableMaps();
            revealMaps(res);
            break;
        case types_1.BotCommands.YO:
            var tag = "<@" + res.author.id + ">";
            res.channel.send("sup, " + tag + "?");
            break;
        case types_1.BotCommands.CHUNKY:
            res.channel.send('', {
                files: [
                    'https://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/chunky-monkey-detail.png',
                ],
            });
            break;
        default:
            break;
    }
    // finish tasks at 10 players: shuffle, assign teams, reset bot
    if (players.length === 10) {
        res.channel.send("> **We got ourselves a match! Generating random teams...**");
        var shuffled = _.shuffle(players);
        var split_1 = _.chunk(shuffled, 5);
        res.channel.send(revealTeam(split_1[0], 'Attackers'));
        res.channel.send(revealTeam(split_1[1], 'Defenders'));
        res.channel.send("> _Randomly picking a map from playable map pool... (!maprandom to redraw)_");
        revealMaps(res);
        var selectedMap = _.sample(playableMaps);
        res.channel
            .send('', {
            files: ["./map_imgs/" + selectedMap.toLowerCase() + ".png"],
        })
            .then(function () {
            res.channel.send("Good luck teams! Now moving you to your team voice channels...");
            console.log('moving players to voice channels...');
            setTimeout(function () {
                split_1[0].forEach(function (p) {
                    p.voiceState && p.voiceState.setChannel(VOICE_CHANNEL1_ID);
                });
                split_1[1].forEach(function (p) {
                    p.voiceState && p.voiceState.setChannel(VOICE_CHANNEL2_ID);
                });
                console.log('moved players to voice channels.');
            }, 2000);
        });
        players.length = 0;
        bannedMaps.length = 0;
        updatePlayableMaps();
    }
});
//# sourceMappingURL=index.js.map