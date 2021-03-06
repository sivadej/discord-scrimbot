import _ = require('lodash');
import dotenv = require('dotenv');
import Discord = require('discord.js');

import { Player, Maps, BotCommands } from './types';

dotenv.config();

const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;
const ALLOWED_CHANNELS = ['784661513050914846', '784692851208486972'];
const VOICE_CHANNEL1_ID = '708581498969653329';
const VOICE_CHANNEL2_ID = '708581533669261342';

client.login(token);

client.once('ready', () => {
  console.log('ready!');
});

const maps: Maps = ['bind', 'ascent', 'haven', 'split', 'icebox'];
let playableMaps: Maps = [...maps];
let bannedMaps: Maps = [];
const players: Player[] = [];

const updatePlayableMaps = (): void => {
  playableMaps = _.pull([...maps], ...bannedMaps);
};

const strArrayToCSV = (arr: string[]): string => {
  if (!arr) return null;
  return arr.join('  -  ').toString();
};

const sendPlayerCount = (msg: Discord.Message) => {
  if (players.length === 0)
    msg.channel.send(`Nobody here :( type !scrim and wait for more players!`);
  else if (players.length >= 10) return;
  else {
    msg.channel.send(
      `**Currently ${players.length} players in scrim queue. Looking for ${
        10 - players.length
      } more!**`
    );
    const playerNames: string[] = players.map(p => p.name);
    msg.channel.send(`${strArrayToCSV(playerNames)}`);
  }
};

const getPlayerTag = (player: Player): string => {
  return `<@${player.id}>`;
};

const revealTeam = (players: Player[], teamName: string): string => {
  let revealStr = `**${teamName}**`;
  players.forEach(p => {
    revealStr += `\n - ${p.name} ${getPlayerTag(p)}`;
  });
  return revealStr;
};

const revealMaps = (res): void => {
  res.channel.send(
    `**Banned:**  ${
      bannedMaps.length === 0
        ? '_None_'
        : strArrayToCSV(bannedMaps).toUpperCase()
    }`
  );
  res.channel.send(
    `**Playable:**  ${
      playableMaps.length === 0
        ? '_None_'
        : strArrayToCSV(playableMaps).toUpperCase()
    }`
  );
};

// shuffle teams randomly
client.on('message', res => {
  if (
    !ALLOWED_CHANNELS.includes(res.channel.id) ||
    !res.content.startsWith('!') ||
    res.author.bot
  )
    return;

  console.log(
    `${new Date()} scrimbot command detected - username: ${
      res.author.username
    } - messge: ${res.content}`
  );

  console.log(res);

  const currentPlayer: Player = {
    name: res.author.username,
    rating: 0,
    id: res.author.id,
    voiceState: res.member.voice,
  };

  if (res.content.toLowerCase().startsWith('!test')) {
    console.log('test');
    players.forEach(p => {
      console.log('do something for player', p.name);
      p.voiceState.setChannel('708581498969653329');
    });
  }

  // ban map
  const args = res.content.slice(1).trim().split(' ');
  const mapArg = args[1] && args[1].toLowerCase();
  if (res.content.toLowerCase().startsWith(BotCommands.MAPBAN)) {
    console.log('!banmap called with arg:', mapArg);
    if (maps.includes(mapArg) && !bannedMaps.includes(mapArg)) {
      console.log('valid ban');
      bannedMaps.push(mapArg);
      updatePlayableMaps();
      console.log('banned:', bannedMaps);
      res.channel.send(
        `${currentPlayer.name} banned map ${mapArg.toUpperCase()}`
      );
      revealMaps(res);
    } else {
      if (bannedMaps.includes(mapArg)) console.log('map already banned');
      else console.log('invalid ban');
    }
  }

  const randomImages = [
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
  const isDuplicate = Boolean(_.findKey(players, ['id', currentPlayer.id]));
  
  // var for reset timer
  let timeout;
  let timeout5;
  let timeout1;

  // exact commands only. handle commands with args separately
  switch (res.content.toLowerCase()) {
    case BotCommands.SCRIM:
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
        res.channel.send(`Sorry bro, game is full!`);
        break;
      }
      if (isDuplicate) {
        console.log('skipping duplicate id add');
        res.channel.send(`${currentPlayer.name}: you're already in, dumbass`);
      } else {
        clearTimeout(timeout);
        console.log('adding this player to list...');
        players.push(currentPlayer);
        console.log('updated players list', players);
        res.channel.send(`you've been added, ${getPlayerTag(currentPlayer)}`);
        if (players.length === 1) {  
          res.channel.send(`scrimbot will automatically reset after 10 minutes of inactivity.`);
          timeout = setTimeout(()=>{
            players.length = 0;
            res.channel.send(`resetting...`);
          }, 600000)
        }
      }
      sendPlayerCount(res);
      break;
    case BotCommands.RESETPLAYERS:
      players.length = 0;
      res.channel.send(`List was reset by ${res.author.username}`);
      break;
    case BotCommands.COUNT:
      sendPlayerCount(res);
      break;
    case BotCommands.MAPRANDOM:
      const selectedMap: string = _.sample(playableMaps);
      res.channel.send('Randomly picking from playable maps...', {
        files: [`./map_imgs/${selectedMap.toLowerCase()}.png`],
      });
      break;
    case BotCommands.DROP:
      const dropIdx = _.findIndex(players, currentPlayer);
      if (dropIdx === -1)
        res.channel.send(`${res.author.username} not found in list.`);
      else {
        players.splice(dropIdx, 1);
        console.log('players after !drop', players);
        res.channel.send(`${res.author.username} dropped out.`);
        sendPlayerCount(res);
      }
      break;
    case BotCommands.FLIP:
      res.channel.send(_.sample(['HEADS', 'TAILS']));
      break;
    case BotCommands.MAPS:
      revealMaps(res);
      break;
    case BotCommands.HELP:
      break;
    case BotCommands.MAPBANRESET:
      res.channel.send(`Map bans reset by ${currentPlayer.name}.`);
      bannedMaps.length = 0;
      updatePlayableMaps();
      revealMaps(res);
      break;
    case BotCommands.YO:
      const tag = `<@${res.author.id}>`;
      res.channel.send(`sup, ${tag}?`);
      break;
    case BotCommands.CHUNKY:
      res.channel.send('', {
        files: [_.sample(randomImages)],
      });
      break;
    case BotCommands.SUPPORT:
      res.channel.send(`https://www.buymeacoffee.com/ebomby`);
      break;
    default:
      break;
  }

  // finish tasks at 10 players: shuffle, assign teams, reset bot
  if (players.length === 10) {
    res.channel.send(
      `> **We got ourselves a match! Generating random teams...**`
    );
    const shuffled = _.shuffle(players);
    const split = _.chunk(shuffled, 5);
    res.channel.send(revealTeam(split[0], 'Attackers'));
    res.channel.send(revealTeam(split[1], 'Defenders'));
    res.channel.send(
      `> _Randomly picking a map from playable map pool... (!maprandom to redraw)_`
    );
    revealMaps(res);
    const selectedMap: string = _.sample(playableMaps);
    res.channel
      .send('', {
        files: [`./map_imgs/${selectedMap.toLowerCase()}.png`],
      })
      .then(() => {
        res.channel.send(
          `Good luck teams! Now moving you to your team voice channels...`
        );
        console.log('moving players to voice channels...');
        const voiceMoveTimeout = setTimeout(() => {
          split[0].forEach(p => {
            p.voiceState && p.voiceState.setChannel(VOICE_CHANNEL1_ID);
          });
          split[1].forEach(p => {
            p.voiceState && p.voiceState.setChannel(VOICE_CHANNEL2_ID);
          });
          console.log('moved players to voice channels.');
        }, 5000);
        return clearTimeout(voiceMoveTimeout);
      });
    players.length = 0;
    bannedMaps.length = 0;
    updatePlayableMaps();
  }
});
