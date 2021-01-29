const Discord = require("discord.js");
const fs = require("fs");
const json = require("../../data/reklama.json");

exports.run = async (client, message, args) => {
    if (!client.config.weryfikatorzy.includes(message.author.id)) {
        const brak_permisji_embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Ustaw reklamę!")
            .setDescription(":x: Nie jesteś weryfikatorem.")
            .setColor("RANDOM")
            .setTimestamp();
        return message.channel.send(brak_permisji_embed)
    }

    const serwer = args[0];
    const guild = client.guilds.cache.get(serwer)

    if (!serwer && guild || !json[serwer] || !guild) {
        const error_embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Ustaw reklamę!")
            .setDescription("Nie podałeś id serwera bądź serwer o takim id nie istnieje w naszej bazie.")
            .setColor("RANDOM")
            .setTimestamp();
        return message.channel.send(error_embed)
    }

    json[serwer] = {
        reklama: json[serwer].reklama,
        zaproszenie: json[serwer].zaproszenie,
        weryfikacja: "nie",
        kanal: json[serwer].kanal
    };

    fs.writeFileSync('./data/reklama.json', JSON.stringify(json, null, 4))

    const succes_embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Ustaw reklamę!")
        .setDescription(`Pomyślnie odrzucono reklamę serwera \`${serwer}\`(\`${guild.name}\`).`)
        .setColor("RANDOM")
        .setTimestamp();
    message.channel.send(succes_embed)

    const wlasciciel_serwera_embed = new Discord.MessageEmbed()
        .setTitle("Weryfikacja!")
        .setDescription(`Odrzucono reklamę Twojego serwera, czyli \`${guild.name}\`!`)
        .setTimestamp()
        .setColor("RANDOM")
    guild.owner.send(wlasciciel_serwera_embed)
};

exports.info = {
    name: "odrzuc",
    aliases: ["odrzucenie", "niewer", "odrzuć", "niezwer", "decline", "nieakceptuj"]
};
