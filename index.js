"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var dotenv = require("dotenv");
var Discord = require("discord.js");
var types_1 = require("./types");
dotenv.config();
var client = new Discord.Client();
var token = process.env.DISCORD_BOT_TOKEN;
var ALLOWED_CHANNELS = ['784661513050914846', '784692851208486972'];
client.login(token);
client.once('ready', function () {
    console.log('ready!');
});
var maps = ['Bind', 'Ascent', 'Haven', 'Split', 'Icebox'];
var players = [
    { name: 'asdf', rating: 0, id: '70590ffsa8671934234624' },
    { name: 'hgjk', rating: 0, id: '7sdff05908671934234624' },
    { name: 'xcvb', rating: 0, id: '705908671934234sdf624' },
    { name: 'ysjsj', rating: 0, id: '70590j8671934hsh234624' },
    { name: 'emwq', rating: 0, id: '7059j086719j34j234624' },
    { name: 'piuh', rating: 0, id: '70590jj867j1934j234624' },
    { name: 'anhm', rating: 0, id: '70gf590s86719j34j234624' },
    { name: 'kjfj', rating: 0, id: '705908671sxg934234624' },
    { name: 'kjdsffj', rating: 0, id: '705908671sxg345934234624' },
];
var playerNamesToCSV = function (arr) {
    if (!arr)
        return null;
    return arr.join(', ').toString();
};
var sendPlayerCount = function (msg) {
    if (players.length === 0)
        msg.channel.send("Nobody here :( type !scrim and wait for more players!");
    else if (players.length >= 10)
        return;
    else {
        msg.channel.send("**Currently " + players.length + " waiting to play. Looking for " + (10 - players.length) + " more!**");
        var playerNames = players.map(function (p) { return p.name; });
        msg.channel.send("Player list: " + playerNamesToCSV(playerNames));
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
        revealStr += "\n" + p.name + " " + getPlayerTag(p);
    });
    return revealStr;
};
// shuffle teams randomly
client.on('message', function (res) {
    if (!ALLOWED_CHANNELS.includes(res.channel.id) ||
        !res.content.startsWith('!') ||
        res.author.bot)
        return;
    console.log('scrimbot\nmsg detected', res);
    var currentPlayer = {
        name: res.author.username,
        rating: 0,
        id: res.author.id,
    };
    // returns undefined if id doesn't exist in playerlist
    var isDuplicate = Boolean(_.findKey(players, ['id', currentPlayer.id]));
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
        case types_1.BotCommands.RESET:
            if (res.author.username === players[0]) {
                players.length = 0;
                res.channel.send("List was reset by " + res.author.username);
                break;
            }
            else {
                res.channel.send("Only first player " + players[0] + " is allowed to reset");
            }
            break;
        case types_1.BotCommands.COUNT:
            sendPlayerCount(res);
            break;
        case types_1.BotCommands.MAP:
            var selectedMap = _.sample(maps);
            res.channel.send('', {
                files: ["./map_imgs/" + selectedMap.toLowerCase() + ".png"],
            });
            break;
        case types_1.BotCommands.DROP:
            if (players.indexOf(res.author.username) >= 0) {
                _.pull(players, res.author.username);
                res.channel.send(res.author.username + " dropped out.");
                sendPlayerCount(res);
            }
            else
                res.channel.send(res.author.username + " not found in list.");
            break;
        case types_1.BotCommands.FLIP:
            res.channel.send(_.sample(['HEADS', 'TAILS']));
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
        res.channel.send(">>> **We got ourselves a match! Generating random teams...**");
        var shuffled = _.shuffle(players);
        var split = _.chunk(shuffled, 5);
        res.channel.send(revealTeam(split[0], 'Attackers'));
        res.channel.send(revealTeam(split[1], 'Defenders'));
        res.channel.send("_Randomly picking a map... (!map to redraw)_");
        var selectedMap = _.sample(maps);
        res.channel
            .send('', {
            files: ["./map_imgs/" + selectedMap.toLowerCase() + ".png"],
        })
            .then(function () {
            res.channel.send("Good luck teams! Scrimbot has been reset.");
        });
        // reset bot
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