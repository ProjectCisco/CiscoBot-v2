import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('secretvote')
  .setDescription('initiate a secret vote')
  .addStringOption((option) =>
    option
      .setName('vote_type')
      .setDescription('Choose type of vote options: cc, scrap, irrel, remap')
      .setRequired(true)
      .addChoices(
        { name: 'CC', value: 'cc' },
        { name: 'Scrap', value: 'scrap' },
        { name: 'Irrel', value: 'irrel' },
        { name: 'Remap', value: 'remap' }
      )
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const votetype = interaction.options.getString('vote_type')

  interaction.reply({ content: `Secret vote: ${votetype}`, ephemeral: true })
}
