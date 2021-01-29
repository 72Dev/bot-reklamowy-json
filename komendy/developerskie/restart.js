const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (!client.config.developerzy.includes(message.author.id)) {
        const brak_permisji_embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Restart!")
            .setDescription(":x: Nie jesteś developerem.")
            .setColor("RANDOM")
            .setTimestamp();
        return message.channel.send(brak_permisji_embed)
    }
    const restart_embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Restart!")
        .setColor("RANDOM")
        .setDescription("Restart...")
        .setTimestamp();
    return message.channel.send(restart_embed).then(() => process.exit(1))
};

exports.info = {
    name: "restart",
    aliases: ["reboot"]
};
