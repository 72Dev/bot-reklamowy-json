const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  const succes_embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Menu pomocy!")
    .setDescription("`c!kanał [kanał]` -> Ustawia kanał z reklamami(podczas wybierania kanału automatycznie tworzy się zaproszenie)\n`c!reklama [treść]` -> Ustawia reklamę serwera\n\nLinki:\n[DODAJ BOTA](https://discord.com/api/oauth2/authorize?client_id=706169420455870484&permissions=8&scope=bot)\n[WBIJ NA SERWER POMOCY](https://discord.gg/uDM3eCe)")
    .setTimestamp();
  message.channel.send(succes_embed)
};

exports.info = {
  name: "pomoc",
  aliases: ["p", "h", "help"]
};
