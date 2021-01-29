exports.run = async (client, message) => {
  const Discord = require("discord.js");

  if (message.author.bot) return;
  if (!message.guild) return;
  const prefix = "c!";

  const bp = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(bp)) {
    return
  }

  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (!cmd) return;

  if (cmd.info.perm) {
    if (!message.member.hasPermission(cmd.info.perm)) {
      const brak_permisji_embed = new Discord.MessageEmbed()
        .setTitle("Brak permisji!")
        .setColor("RANDOM")
        .setDescription(":x: Aby użyć `" + cmd.info.name + "` muszisz posiadać uprawnienie `" + cmd.info.perm + "`!")
        .setTimestamp();
      return message.channel.send(brak_permisji_embed)
    }
  }

  try {
    cmd.run(client, message, args);
  } catch (err) {
    const emb = new Discord.MessageEmbed()
      .setTitle(":x: ┋ Error!")
      .setDescription(`Komenda \`${cmd.info.name}\` posiada error: \`${err}\``)
      .setColor("#FF0000");
    message.channel.send(emb);
    //client.channels.get("ID").send(emb);
  }
};
