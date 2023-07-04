import { SlashCommandBuilder } from 'discord.js'

import { addOptionalMentions } from '../../utils'

export const data = addOptionalMentions(
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  20
)

export const execute = async (interaction: any) => {
  await interaction.reply('Pong!')
}
