import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import { config } from '../../config'

export const data = new SlashCommandBuilder()
  .setName('lobbylink')
  .setDescription('Send a link to the current lobby')
  .addStringOption((option) =>
    option
      .setName('game')
      .setDescription('The game to get the lobby link for')
      .setRequired(true)
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const game = interaction.options.getString('game')
  if (!game?.startsWith('steam://joinlobby/'))
    return interaction.reply({
      content: 'Invalid lobby link',
      ephemeral: true,
    })
  const link = game.replace(
    'steam://joinlobby/',
    `http://${config.host}:${config.port}/join/`
  )
  interaction.channel?.send({
    embeds: [
      {
        title: `Join ${interaction.user.username}'s Lobby`,
        description: `Lobby Link: [Steam Lobby](${link})`,
        color: 0x00ff00,
        url: link,
      },
    ],
  })
  interaction.reply({ content: 'Lobby link sent', ephemeral: true })
  interaction.deleteReply()
}
