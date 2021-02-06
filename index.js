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
var ALLOWED_CHANNELS = ['784661513050914846', '784692851208486972'];
var VOICE_CHANNEL1_ID = '708581498969653329';
var VOICE_CHANNEL2_ID = '708581533669261342';
client.login(token);
client.once('ready', function () {
    console.log('ready!');
});
var maps = ['bind', 'ascent', 'haven', 'split', 'icebox'];
var playableMaps = __spreadArrays(maps);
var bannedMaps = [];
var players = [];
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
    var randomImages = [
        'https://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/chunky-monkey-detail.png',
        'https://i.redd.it/wc1j9rrxzpn21.jpg',
        'https://d2iiahg0ip5afn.cloudfront.net/media/ben_jerry/images/chunkymonkey.jpg',
        'https://storage.googleapis.com/afs-prod/media/media:dc4d3a47aba34e0ca4ad46167b686181/800.jpeg',
        'https://static.openfoodfacts.org/images/products/871/410/024/0243/front_fr.32.full.jpg',
        'https://i.redd.it/thfagcs2qxv31.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/3d/Chunky_Monkey.jpg',
        'https://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/chunky-monkey-detail.png',
        'https://i.redd.it/wc1j9rrxzpn21.jpg',
        'https://d2iiahg0ip5afn.cloudfront.net/media/ben_jerry/images/chunkymonkey.jpg',
        'https://storage.googleapis.com/afs-prod/media/media:dc4d3a47aba34e0ca4ad46167b686181/800.jpeg',
        'https://static.openfoodfacts.org/images/products/871/410/024/0243/front_fr.32.full.jpg',
        'https://i.redd.it/thfagcs2qxv31.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/3d/Chunky_Monkey.jpg',
        'https://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/chunky-monkey-detail.png',
        'https://i.redd.it/wc1j9rrxzpn21.jpg',
        'https://d2iiahg0ip5afn.cloudfront.net/media/ben_jerry/images/chunkymonkey.jpg',
        'https://storage.googleapis.com/afs-prod/media/media:dc4d3a47aba34e0ca4ad46167b686181/800.jpeg',
        'https://static.openfoodfacts.org/images/products/871/410/024/0243/front_fr.32.full.jpg',
        'https://i.redd.it/thfagcs2qxv31.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/3d/Chunky_Monkey.jpg',
        'https://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/chunky-monkey-detail.png',
        'https://i.redd.it/wc1j9rrxzpn21.jpg',
        'https://d2iiahg0ip5afn.cloudfront.net/media/ben_jerry/images/chunkymonkey.jpg',
        'https://storage.googleapis.com/afs-prod/media/media:dc4d3a47aba34e0ca4ad46167b686181/800.jpeg',
        'https://static.openfoodfacts.org/images/products/871/410/024/0243/front_fr.32.full.jpg',
        'https://i.redd.it/thfagcs2qxv31.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/3d/Chunky_Monkey.jpg',
        'https://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/chunky-monkey-detail.png',
        'https://i.redd.it/wc1j9rrxzpn21.jpg',
        'https://d2iiahg0ip5afn.cloudfront.net/media/ben_jerry/images/chunkymonkey.jpg',
        'https://storage.googleapis.com/afs-prod/media/media:dc4d3a47aba34e0ca4ad46167b686181/800.jpeg',
        'https://static.openfoodfacts.org/images/products/871/410/024/0243/front_fr.32.full.jpg',
        'https://i.redd.it/thfagcs2qxv31.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/3d/Chunky_Monkey.jpg',
        'https://i.etsystatic.com/24745420/d/il/f7f0b9/2852681745/il_340x270.2852681745_dtwc.jpg'
    ];
    // !support https://www.buymeacoffee.com/ebomby
    // returns undefined if id doesn't exist in playerlist
    var isDuplicate = Boolean(_.findKey(players, ['id', currentPlayer.id]));
    // var for reset timer
    var timeout;
    var timeout5;
    var timeout1;
    // exact commands only. handle commands with args separately
    switch (res.content.toLowerCase()) {
        case types_1.BotCommands.SCRIM:
            // inactivity reset
            // const startDelayedReset = () => {
            //   timeout = setTimeout(()=>{
            //     players.length = 0;
            //     res.channel.send(`resetting...`);
            //   }, 5000)
            // }
            // const restartDelayedReset = () => {
            //   clearTimeout(timeout);
            //   startDelayedReset();
            // }
            if (players.length === 10) {
                res.channel.send("Sorry bro, game is full!");
                break;
            }
            if (isDuplicate) {
                console.log('skipping duplicate id add');
                res.channel.send(currentPlayer.name + ": you're already in, dumbass");
            }
            else {
                clearTimeout(timeout);
                console.log('adding this player to list...');
                players.push(currentPlayer);
                console.log('updated players list', players);
                res.channel.send("you've been added, " + getPlayerTag(currentPlayer));
                if (players.length === 1) {
                    res.channel.send("scrimbot will automatically reset after 10 minutes of inactivity.");
                    timeout = setTimeout(function () {
                        players.length = 0;
                        res.channel.send("resetting...");
                    }, 600000);
                }
            }
            sendPlayerCount(res);
            break;
        case types_1.BotCommands.RESETPLAYERS:
            players.length = 0;
            res.channel.send("List was reset by " + res.author.username);
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
                files: [_.sample(randomImages)],
            });
            break;
        case types_1.BotCommands.SUPPORT:
            res.channel.send("https://www.buymeacoffee.com/ebomby");
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
            var timeout = setTimeout(function () {
                split_1[0].forEach(function (p) {
                    p.voiceState && p.voiceState.setChannel(VOICE_CHANNEL1_ID);
                });
                split_1[1].forEach(function (p) {
                    p.voiceState && p.voiceState.setChannel(VOICE_CHANNEL2_ID);
                });
                console.log('moved players to voice channels.');
            }, 5000);
            return clearTimeout(timeout);
        });
        players.length = 0;
        bannedMaps.length = 0;
        updatePlayableMaps();
    }
});
//# sourceMappingURL=index.js.map