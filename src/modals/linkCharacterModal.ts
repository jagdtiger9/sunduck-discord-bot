import { EmbedBuilder, ModalSubmitInteraction, TextChannel } from "discord.js";
import { ModalHandler, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { linkCharacter } from "../gateway/HttpApi.js";
import { PASSPORT_CHANNEL } from "../settings.js";

export const LINK_CHARACTER_MODAL_ID = 'link_character_modal';
export const CHARACTER_NAME_FIELD_ID = 'character_name';

export default {
    name: LINK_CHARACTER_MODAL_ID,
    async execute(interaction: ModalSubmitInteraction) {
        const characterName = interaction.fields.getTextInputValue(CHARACTER_NAME_FIELD_ID).trim();
        const result: RequestResult<string> = await linkCharacter(interaction.user, characterName);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(result.status ? 0x00CC00 : 0xCC0000)
                    .setTitle(result.message)
                    .setDescription(
                        result.status
                            ? 'Awaiting moderator approval'
                            : '[Check character existence](https://albion.neogudilap.ru/en/finder)'
                    ),
            ],
            flags: MessageFlags.Ephemeral,
        });

        if (result.status) {
            const channel = interaction.client.channels.cache.get(PASSPORT_CHANNEL) as TextChannel;
            await channel?.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x0000CC)
                        .setTitle('Привязка персонажа')
                        .setDescription('[Подтверждение](https://albion.neogudilap.ru/ru/admin/users)')
                        .addFields(
                            { name: 'Пользователь', value: `<@${interaction.user.id}>`, inline: true },
                            { name: 'Персонаж', value: characterName, inline: true },
                        )
                        .setTimestamp(),
                ],
            });
        }
    },
} as ModalHandler
