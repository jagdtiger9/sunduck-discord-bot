import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, TextChannel } from "discord.js";
import { Command, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { linkCharacter } from "../gateway/HttpApi.js";
import { PASSPORT_CHANNEL } from "../settings.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('link_character')
        .setDescription('Link a in-game character to your account')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Your in-game character name')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const characterName = interaction.options.getString('name') || ''
        const result: RequestResult<string> = await linkCharacter(interaction.user, characterName)
        await interaction.reply({
            content: ``,
            embeds: [
                new EmbedBuilder().setColor(result.status ? 0x00CC00 : 0xCC0000)
                    .setTitle(`${result.message}`)
                    .setDescription(
                        result.status ? 'Awaiting moderator approval' : '[Check character existence](https://albion.gudilap.ru/en/finder)'
                    )
            ],
            flags: MessageFlags.Ephemeral
        });

        if (result.status) {
            const channel = interaction.client.channels.cache.get(PASSPORT_CHANNEL) as TextChannel;
            const embed = new EmbedBuilder()
                .setColor(0x0000CC)
                .setTitle(`Привязка персонажа`)
                .setDescription(`[Подтверждение](https://albion.gudilap.ru/ru/admin/users)`)
                .addFields(
                    { name: 'Пользователь', value: `<@${interaction.user.id}>` || '', inline: true },
                    { name: 'Персонаж', value: `${characterName}`, inline: true },
                    // { name: '\u200B', value: '\u200B' },
                )
            embed.setTimestamp();
            await channel?.send({
                content: `<@215036376654020608>`,
                embeds: [embed],
            });
        }
    },
} as Command
