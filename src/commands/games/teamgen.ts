import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import { config } from '../../config'
import { ChannelController } from '../../controllers'

export const data = new SlashCommandBuilder()
  .setName('teamgen')
  .setDescription('Send a randomly generated team suggestion')

export const execute = async (interaction: ChatInputCommandInteraction) => {
  if (
    !ChannelController.isChannel(
      interaction,
      config.discord.channels.lobbylinks
    )
  )
    return
  const teamgen = interaction.options.getString('teamgen')

  interaction.reply({ content: `Secret vote: ${teamgen}`, ephemeral: true })
}
