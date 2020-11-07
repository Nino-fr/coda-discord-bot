const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { green_light } = require('../colours.json');

class Vert extends Command {
  constructor(client) {
    super({
      name: 'Vert',
      description: "Envoie l'avatar du membre en vert",
      usage: 'vert [membre]',
      aliases: ['green', 'groen'],
      category: 'Images',
      enabled: true,
    });
  }

  async run(message, args) {
    try {
      let member;

      member =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[0])) ||
        (await message.guild.members.fetch({
          query: args.join(' '),
          limit: 1,
        })) ||
        message.member;

      let body = `https://some-random-api.ml/canvas/green?avatar=${member.user.displayAvatarURL(
        { format: 'png' }
      )}`;

      let selfEmbed = new MessageEmbed().setColor(green_light).setImage(body);
      message.channel.send(selfEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Vert;
