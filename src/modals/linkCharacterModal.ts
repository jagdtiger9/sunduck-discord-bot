import { EmbedBuilder, ModalSubmitInteraction, TextChannel } from "discord.js";
import { ModalHandler, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { linkCharacter } from "../gateway/HttpApi.js";
import { MODERATOR_USER_ID, PASSPORT_CHANNEL } from "../settings.js";
import { t } from "../i18n/index.js";

export const LINK_CHARACTER_MODAL_ID = 'link_character_modal';
export const CHARACTER_NAME_FIELD_ID = 'character_name';

export default {
    name: LINK_CHARACTER_MODAL_ID,
    async execute(interaction: ModalSubmitInteraction) {
        const tr = t(interaction.locale).commands.linkCharacter;
        const characterName = interaction.fields.getTextInputValue(CHARACTER_NAME_FIELD_ID).trim();
        const result: RequestResult<string> = await linkCharacter(interaction.user, characterName);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(result.status ? 0x00CC00 : 0xCC0000)
                    .setTitle(result.message)
                    .setDescription(result.status ? tr.awaitingApproval : tr.checkExistence),
            ],
            flags: MessageFlags.Ephemeral,
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
                        .setTimestamp(),
                ],
            });
        }
    },
} as ModalHandler
