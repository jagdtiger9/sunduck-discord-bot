import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CharacterAggregatedStat, Command, DirectionFilter, PeriodFilter, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { associateStatistics } from "../gateway/HttpApi.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('associate_stat')
        .setDescription('Get associates statistics')
        .addStringOption(option =>
            option.setName('direction')
                .addChoices(
                    { name: 'Top', value: 'desc' },
                    { name: 'Low', value: 'asc' },
                )
                .setDescription('Top rated / Low rated')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const directionFilter: DirectionFilter = (interaction.options.getString('direction') || 'desc') as DirectionFilter
        const periodFilter: PeriodFilter = directionFilter === 'desc' ? 'w' : '3w'
        const result: RequestResult<CharacterAggregatedStat[]> = await associateStatistics(directionFilter, periodFilter)
        if (!result.status) {
            await interaction.reply({ content: `${result.message}`, flags: MessageFlags.Ephemeral });
            return
        }

        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
        if (result.data.length) {
            if (directionFilter === 'desc') {
                embed.setTitle(`Top rated!`)
                embed.setDescription(`Top craft rated characters for this week`)
            }
            if (directionFilter === 'asc') {
                embed.setTitle(`Low rated`)
                embed.setDescription(`Lowest craft rated characters for last 3 weeks`)
            }
            let data = ''
            result.data.map((stat: CharacterAggregatedStat, index: number) => {
                data += `**${index + 1}**. ` + '`' + stat.name + '`' + ` - ${stat.thisWeek.toLocaleString('ru-RU')}\n`
            })
            embed.addFields(
                {
                    name: ``,
                    value: data,
                },
            )
            if (directionFilter === 'asc') {
                embed.addFields({ name: '\u200B', value: '\u200B' })
                embed.setFooter({ text: 'Associates permissions can be revoked' })
            }
        } else {
            embed.setDescription(`No rated characters`)
        }
        embed.setTimestamp();

        await interaction.reply({
            content: ``,
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        });
    },
} as Command
