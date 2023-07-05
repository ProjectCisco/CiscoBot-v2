import {
  CommandInteraction,
  GuildMember,
  SlashCommandBuilder,
  GuildChannel,
} from 'discord.js'

import { Voice } from '../../controllers'
import { addOptionalMentions } from '../../utils'

export const data = addOptionalMentions(
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  20
)

export const execute = async (interaction: CommandInteraction) => {
  Voice.messageUsersInVoiceChannel(interaction)
  // const member = interaction.member as GuildMember
  // const channel = member.voice.channel as GuildChannel
  // // const members = channel.members
  // channel.members.forEach(({ displayName }) => {
  //   console.log({ displayName })
  // })
  // console.log({ members })
  // await interaction.reply('Pong!')
}
