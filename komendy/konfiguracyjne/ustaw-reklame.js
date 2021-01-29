const Discord = require("discord.js");
const fs = require("fs");
const json = require("../../data/reklama.json");

exports.run = async (client, message, args) => {
  if (!args[0]) {
    const error_embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Ustaw reklamę!")
      .setDescription("Nie podałeś reklamy.")
      .setColor("RANDOM")
      .setTimestamp();
    return message.channel.send(error_embed)
  }

  if (!json[message.guild.id] || !json[message.guild.id].zaproszenie.startsWith("discord.gg/")) {
    const brak_kanalu_embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Ustaw reklamę!")
      .setDescription("Zaleca się pierw ustawić kanał.")
      .setColor("RANDOM")
      .setTimestamp();
    return message.channel.send(brak_kanalu_embed)
  }

  json[message.guild.id] = {
    reklama: args.join(" "),
    zaproszenie: json[message.guild.id].zaproszenie,
    weryfikacja: "nie",
    kanal: json[message.guild.id].kanal
  };

  fs.writeFileSync('./data/reklama.json', JSON.stringify(json, null, 4))

  const succes_embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Ustaw reklamę!")
    .setDescription("Wysano reklamę do akceptacji.")
    .setColor("RANDOM")
    .setTimestamp();
  message.channel.send(succes_embed)

  const acc_embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Reklama do akceptacji!")
    .setDescription("ID: " + message.guild.id + "\nZaproszenie: " + json[message.guild.id].zaproszenie + "\nReklama:\n\n" + args.join(" "))
    .setTimestamp()
    .setColor("RANDOM")
  client.channels.cache.get(client.config.weryfikacja_kanal).send(acc_embed)
};

exports.info = {
  name: "ustaw-reklamę",
  aliases: ["ustaw-reklame", "reklama"],
  perm: "MANAGE_GUILD"
};
