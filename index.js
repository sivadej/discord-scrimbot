"use strict";
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
var ALLOWED_CHANNELS = ['784661513050914846', '***784692851208486972***'];
client.login(token);
client.once('ready', function () {
    console.log('ready!');
});
var maps = ['bind', 'ascent', 'haven', 'split', 'icebox'];
var playableMaps = __spreadArrays(maps);
var bannedMaps = [];
var players = [
    { name: 'asdf', rating: 0, id: '70590ffsa8671934234624' },
    { name: 'hgjk', rating: 0, id: '7sdff05908671934234624' },
    { name: 'xcvb', rating: 0, id: '705908671934234sdf624' },
    { name: 'ysjsj', rating: 0, id: '70590j8671934hsh234624' },
    { name: 'emwq', rating: 0, id: '7059j086719j34j234624' },
    { name: 'piuh', rating: 0, id: '70590jj867j1934j234624' },
    { name: 'anhm', rating: 0, id: '70gf590s86719j34j234624' },
    { name: 'kjfj', rating: 0, id: '705908671sxg934234624' },
    { name: 'k235jfj', rating: 0, id: '7059082571sxg934234624' },
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
var getPlayerObject = function (msg) {
    return { name: '', rating: 0, id: 0 };
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
    if (bannedMaps.length > 0)
        res.channel.send("**Banned:**  " + strArrayToCSV(bannedMaps).toUpperCase());
    res.channel.send("**Playable:**  " + strArrayToCSV(playableMaps).toUpperCase());
};
// shuffle teams randomly
client.on('message', function (res) {
    if (!ALLOWED_CHANNELS.includes(res.channel.id) ||
        !res.content.startsWith('!') ||
        res.author.bot)
        return;
    console.log(new Date() + " scrimbot command detected - username: " + res.author.username + " - messge: " + res.content);
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
        }
        else {
            if (bannedMaps.includes(mapArg))
                console.log('map already banned');
            else
                console.log('invalid ban');
        }
    }
    var currentPlayer = {
        name: res.author.username,
        rating: 0,
        id: res.author.id,
    };
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
            res.channel.send('', {
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
        var split = _.chunk(shuffled, 5);
        res.channel.send(revealTeam(split[0], 'Attackers'));
        res.channel.send(revealTeam(split[1], 'Defenders'));
        res.channel.send("> _Randomly picking a map from playable map pool... (!pickmap to redraw)_");
        revealMaps(res);
        var selectedMap = _.sample(playableMaps);
        res.channel
            .send('', {
            files: ["./map_imgs/" + selectedMap.toLowerCase() + ".png"],
        })
            .then(function () {
            res.channel.send("Good luck teams! Scrimbot has been reset.");
        });
        players.length = 0;
    }
});
// matchmaker
// accept names and rankings
// return balanced teams
// client.on('res', res => {
//   const prefix = '!match ';
//   if (res.content.startsWith(prefix)) {
//     const args = res.content.slice(prefix.length).trim().split(' ');
//     console.log(args);
//     res.channel.send(args[0]);
//   }
// });
// move players into voice channels
// map selection
//# sourceMappingURL=index.js.map