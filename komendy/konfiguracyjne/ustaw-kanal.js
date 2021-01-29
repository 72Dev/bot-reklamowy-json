const Discord = require("discord.js");
const fs = require("fs");
const json = require("../../data/reklama.json");

exports.run = async (client, message, args) => {
  const kanal =
    message.guild.channels.cache.get(args[0]) ||
    message.guild.channels.cache.find(x => x.name === args.join(" ")) ||
    message.mentions.channels.first();

  if (!kanal) {
    const error_embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Ustaw kanał!")
      .setDescription("Nie podałeś kanału bądź podany kanał nie jest tekstowy.")
      .setColor("RANDOM")
      .setTimestamp();
    return message.channel.send(error_embed)
  }

  kanal.createInvite({
    maxAge: 0
  }).then(invite => {

    if (!json[message.guild.id]) {
      json[message.guild.id] = {}
    }

    json[message.guild.id] = {
      reklama: json[message.guild.id].reklama || "BRAK",
      zaproszenie: `discord.gg/${invite.code}` || "BRAK",
      weryfikacja: json[message.guild.id].weryfikacja || "nie",
      kanal: kanal.id
    };

    fs.writeFileSync('./data/reklama.json', JSON.stringify(json, null, 4))
  })
  const succes_embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Ustaw kanał!")
    .setDescription("Pomyślnie ustawiono kanał.")
    .setColor("RANDOM")
    .setTimestamp();
  return message.channel.send(succes_embed)
};

exports.info = {
  name: "ustaw-kanał",
  aliases: ["ustaw-kanal", "kanal", "kanał"],
  perm: "MANAGE_GUILD"
};
