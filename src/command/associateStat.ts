import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, TextChannel } from "discord.js";
import { CharacterAggregatedStat, Command, DirectionFilter, PeriodFilter, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { associateStatistics } from "../gateway/HttpApi.js";
import { FEED_UP_CHANNEL } from "../settings.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('associate_stat')
        .setDescription('Get associates statistics')
        .addStringOption(option =>
            option.setName('filter')
                .addChoices(
                    { name: 'Top', value: 'top' },
                    { name: 'Low', value: 'low' },
                    { name: 'TopCurrent', value: 'current' },
                )
                .setDescription('Top rated / Low rated / Top rated, this week')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const filter = interaction.options.getString('filter') || 'current'
        let directionFilter: DirectionFilter
        let periodFilter: PeriodFilter
        if (filter === 'top') {
            directionFilter = 'desc'
            periodFilter = 'prev'
        } else if (filter === 'low') {
            directionFilter = 'asc'
            periodFilter = '3w'
        } else {
            directionFilter = 'desc'
            periodFilter = 'this'
        }
        const result: RequestResult<CharacterAggregatedStat[]> = await associateStatistics(directionFilter, periodFilter)
        if (!result.status) {
            await interaction.reply({ content: `${result.message}`, flags: MessageFlags.Ephemeral });
            return
        }

        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
        if (result.data.length) {
            if (filter === 'low') {
                embed.setTitle(`Modest 10 crafters`)
                embed.setDescription(`Characters with the lowest craft rate for lst 3 weeks`)
            } else {
                embed.setTitle(`Top 10 crafters!`)
                if (filter === 'top') {
                    embed.setDescription(`Characters with the highest craft rate for the last week`)
                } else if (filter === 'current') {
                    embed.setDescription(`Characters with the highest craft rate for the current week`)
                }
            }
            let data = ''
            result.data.map((stat: CharacterAggregatedStat, index: number) => {
                data += `**${index + 1}**. ` + '`' + stat.name + '`' + ` - ${stat.total.toLocaleString('ru-RU')}\n`
            })
            embed.addFields(
                {
                    name: ``,
                    value: data,
                },
            )
            if (directionFilter === 'asc') {
                //embed.addFields({ name: '\u200B', value: '\u200B' })
                embed.setFooter({ text: 'Associates permissions can be revoked' })
            }
        } else {
            embed.setDescription(`No rated characters`)
        }
        embed.setTimestamp();

        //const channel = interaction.client.channels.cache.get(FEED_UP_CHANNEL) as TextChannel;
        const channel = interaction.channel as TextChannel;
        await channel?.send({
            content: ``,
            embeds: [embed],
        });

        await interaction.reply({
            content: ``,
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        });
        //await interaction.deleteReply();
    },
} as Command
