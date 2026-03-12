import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, TextChannel } from "discord.js";
import { Command, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { linkCharacter } from "../gateway/HttpApi.js";
import { MODERATOR_USER_ID, PASSPORT_CHANNEL } from "../settings.js";
import { t, getLocalizations } from "../i18n/index.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('link_character')
        .setDescription(t('en').commands.linkCharacter.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.linkCharacter.description))
        .addStringOption(option =>
            option.setName('name')
                .setDescription(t('en').commands.linkCharacter.optNameDesc)
                .setDescriptionLocalizations(getLocalizations(tr => tr.commands.linkCharacter.optNameDesc))
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const tr = t(interaction.locale).commands.linkCharacter;
        const characterName = interaction.options.getString('name') || ''
        const result: RequestResult<string> = await linkCharacter(interaction.user, characterName)

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(result.status ? 0x00CC00 : 0xCC0000)
                    .setTitle(result.message)
                    .setDescription(result.status ? tr.awaitingApproval : tr.checkExistence)
            ],
            flags: MessageFlags.Ephemeral
        });

        if (result.status) {
            const channel = interaction.client.channels.cache.get(PASSPORT_CHANNEL) as TextChannel;
            await channel?.send({
                content: `<@${MODERATOR_USER_ID}>`,
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x0000CC)
                        .setTitle(tr.notifyTitle)
                        .setDescription(tr.notifyDesc)
                        .addFields(
                            { name: tr.notifyFieldUser, value: `<@${interaction.user.id}>`, inline: true },
                            { name: tr.notifyFieldCharacter, value: characterName, inline: true },
                        )
                        .setTimestamp()
                ],
            });
        }
    },
} as Command
