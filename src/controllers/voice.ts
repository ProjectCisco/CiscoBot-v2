import { CommandInteraction, GuildMember, GuildChannel } from 'discord.js'

export const Voice = {
  messageUsersInVoiceChannel: async (interaction: CommandInteraction) => {
    const member = interaction.member as GuildMember
    const channel = member.voice.channel as GuildChannel
    console.log({ channel })
    if (!channel) {
      await interaction.reply('You need to join a voice channel first!')
      return
    }
    channel.members.forEach((member) => {
      member.send('Hello!')
    })
    interaction.reply('Message sent!')
  },
}
