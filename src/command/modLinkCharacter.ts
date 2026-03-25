import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, TextChannel, User } from "discord.js";
import { Command, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { modLinkCharacter } from "../gateway/HttpApi.js";
import { getLocalizations, t } from "../i18n/index.js";
import { MODERATOR_USER_ID, PASSPORT_CHANNEL } from "../settings.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('mod_link_character')
        .setDescription(t('en').commands.modLinkCharacter.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.modLinkCharacter.description))
        .addUserOption(option =>
            option.setName('name')
                .setDescription(t('en').commands.modLinkCharacter.optNameDesc)
                .setDescriptionLocalizations(getLocalizations(tr => tr.commands.modLinkCharacter.optNameDesc))
                .setRequired(true)
        ).addStringOption(option =>
            option.setName('character')
                .setDescription(t('en').commands.modLinkCharacter.optCharacterDesc)
                .setDescriptionLocalizations(getLocalizations(tr => tr.commands.modLinkCharacter.optCharacterDesc))
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const user: User = interaction.options.getUser('name', true);
        const characterName = interaction.options.getString('character') || ''
        const result: RequestResult<string> = await modLinkCharacter(user, characterName)

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(result.status ? 0x00CC00 : 0xCC0000)
                    .setTitle(result.message)
                    .setDescription(result.status ?
                        'Ожидает подтверждения' :
                        '[Проверить существование персонажа](https://albion.neogudilap.ru/ru/finder)'
                    )
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
                        .setTitle('Заявка на привязку персонажа')
                        .setDescription('[Подтвердить](https://albion.neogudilap.ru/ru/admin/users)')
                        .addFields(
                            { name: 'Пользователь', value: `<@${interaction.user.id}>`, inline: true },
                            { name: 'Персонаж', value: characterName, inline: true },
                        )
                        .setTimestamp()
                ],
            });
        }
    },
} as Command
