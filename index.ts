import _ = require('lodash');
import dotenv = require('dotenv');
import Discord = require('discord.js');

dotenv.config();

const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;
const SCRIMBOT_CHANNEL_ID = '12345';

client.login(token);

client.once('ready', () => {
  console.log('ready!');
});

const maps = ['Bind', 'Ascent', 'Haven', 'Split', 'Icebox'];
const players = [];

const playerNamesToCSV = (arr: string[]): string => {
  if (!arr) return null;
  return arr.join(', ').toString();
};

const sendPlayerCount = (msg: Discord.Message) => {
  if (players.length === 0)
    msg.channel.send(`Nobody here :( type !scrim and wait for more players!`);
  else if (players.length >= 10) return;
  else {
    msg.channel.send(
      `Currently ${players.length} waiting to play. Looking for ${
        10 - players.length
      } more!`
    );
    msg.channel.send(`Player list: ${playerNamesToCSV(players)}`);
  }
};

// shuffle teams randomly
client.on('message', message => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  // (message.channel.id === SCRIMBOT_CHANNEL_ID);  restrict bot to specified channel id

  switch (message.content.toLowerCase()) {
    case '!scrim':
      console.log('players', playerNamesToCSV(players));
      console.log('author', message.author);
      if (players.length === 10) {
        message.channel.send(`Sorry bro, game is full!`);
        break;
      }
      if (players.indexOf(message.author.username) >= 0) {
        message.channel.send(
          `${message.author.username}: You're already in, dumbass.`
        );
        break;
      }
      players.push(message.author.username);
      message.channel.send(`Added ${message.author.username}!`);
      sendPlayerCount(message);
      break;
    case '!reset':
      if (message.author.username === players[0]) {
        players.length = 0;
        message.channel.send(`List was reset by ${message.author.username}`);
        break;
      } else {
        message.channel.send(
          `Only first player ${players[0]} is allowed to reset`
        );
      }
      break;
    case '!count':
      sendPlayerCount(message);
      break;
    case '!map':
      message.channel.send(_.sample(maps));
      break;
    case '!drop':
      if (players.indexOf(message.author.username) >= 0) {
        _.pull(players, message.author.username);
        message.channel.send(`${message.author.username} dropped out.`);
        sendPlayerCount(message);
      } else
        message.channel.send(`${message.author.username} not found in list.`);
      break;
    // case '!shuffle':
    //   const shuffled = _.shuffle(players);
    //   message.channel.send(shuffled.join(', ').toString());
    case '!flip':
      message.channel.send(_.sample(['heads', 'tails']));
      break;
    case '!yo':
      const tag = `<@${message.author.id}>`;
      message.channel.send(`sup, ${tag}?`);
      break;
    case '!chunky':
      message.channel.send('', {
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
    message.channel.send(
      `We got ourselves a match! Generating random teams...`
    );
    const shuffled = _.shuffle(players);
    const split = _.chunk(shuffled, 5);
    message.channel.send(`Team 1: ${playerNamesToCSV(split[0])}`);
    message.channel.send(`Team 2: ${playerNamesToCSV(split[1])}`);

    // reset bot
    players.length = 0;
    message.channel.send(`Good luck teams! Scrimbot has been reset.`);
  }
});

// matchmaker
// accept names and rankings
// return balanced teams
// client.on('message', message => {
//   const prefix = '!match ';
//   if (message.content.startsWith(prefix)) {
//     const args = message.content.slice(prefix.length).trim().split(' ');
//     console.log(args);
//     message.channel.send(args[0]);
//   }
// });

// move players into voice channels

// map selection
