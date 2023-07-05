import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('secretvote')
  .setDescription('initiate a secret vote')
  .addStringOption((option) =>
    option
      .setName('type')
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
  const type = interaction.options.getString('type')

  interaction.reply({ content: 'Lobby link sent', ephemeral: true })
  interaction.deleteReply()
}
