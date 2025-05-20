import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command, LinkResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { associatesStations } from "../gateway/HttpApi.js";

export default {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName('my_stations')
        .setDescription('Print associates stations for your linked characters'),
    async execute(interaction: ChatInputCommandInteraction) {
        const result: LinkResult = await associatesStations(interaction.user)
        if (result.status) {
            const embed = new EmbedBuilder()
                .setColor(0x0000CC)
                .setTitle(`Привязка персонажа`)
                .setDescription(`[Подтверждение](https://albion.gudilap.ru/ru/admin/users)`)
                // .addFields(
                //     { name: 'Пользователь', value: `<@${interaction.user.id}>` || '', inline: true },
                //     { name: 'Персонаж', value: `${characterName}`, inline: true },
                //     // { name: '\u200B', value: '\u200B' },
                // )
            embed.setTimestamp();
            await interaction.reply({
                content: `${result.status ? '' : 'Error:'} ${result.message}`,
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });
        }
    },
} as Command
