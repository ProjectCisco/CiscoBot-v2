import { SlashCommandBuilder, SlashCommandMentionableOption } from 'discord.js'

export const addOptionalMentions = (
  data: SlashCommandBuilder,
  count: number
) => {
  for (let i = 0; i < count; i++) {
    data.addMentionableOption((option: SlashCommandMentionableOption) =>
      option
        .setName(i === 0 ? `user` : `user${Number(i) + 1}`)
        .setDescription('The user to ping')
    )
  }
  return data
}
