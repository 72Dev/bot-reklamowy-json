const { Client, Collection } = require("discord.js");

const config = require("./config.json");

const client = new Client();
client.config = config;

["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/wydarzenia.js", "./handler/komendy.js"].forEach(x => require(x)(client));

client.login(config.token);