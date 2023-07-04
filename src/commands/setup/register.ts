import {
  ChatInputCommandInteraction,
  Interaction,
  SlashCommandBuilder,
} from 'discord.js'
import { Player } from '../../database'
import { config } from '../../config'

export const data = new SlashCommandBuilder()
  .setName('register')
  .setDescription('Complete registration to gain access to the server.')

export const execute = async (interaction: ChatInputCommandInteraction) => {
  Player.findOne({
    discord: interaction.user.id,
  }).then(async (player) => {
    if (player) {
      return await interaction.reply(
        `You are already registered as ${player.displayname}.`
      )
    }
    await interaction.reply({
      content: `The CPL Bot needs authorization in order to search your Discord profile for your linked Steam account. It uses Steam accounts to verify unique users.\n\n[Click here to authorize](${config.oauth}${interaction.user.id})`,
      ephemeral: true,
    })
  })
}
