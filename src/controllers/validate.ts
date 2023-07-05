import { ChatInputCommandInteraction } from 'discord.js'

export const Validate = {
  isChannel: (interaction: ChatInputCommandInteraction, channel: string) => {
    if (interaction.channel?.id === channel) return true
    interaction.reply({
      content: `This command can only be used in <#${channel}>`,
      ephemeral: true,
    })
    return false
  },
}
