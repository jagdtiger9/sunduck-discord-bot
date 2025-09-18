import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, TextChannel } from "discord.js";
import { CharacterAggregatedStat, Command, DirectionFilter, PeriodFilter, RequestResult, TypeFilter } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { associateStatistics } from "../gateway/HttpApi.js";

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
        ).addStringOption(option =>
            option.setName('type')
                .addChoices(
                    { name: 'Craft', value: 'craft' },
                    { name: 'PvP', value: 'pvp' },
                    { name: 'PvE', value: 'pve' },
                    { name: 'Gathering', value: 'gathering' },
                )
                .setDescription('Craft / PvP / PvE / Gathering')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const filter = interaction.options.getString('filter') || 'current'
        const type: TypeFilter = interaction.options.getString('type') as TypeFilter || 'craft'
        let directionFilter: DirectionFilter
        let periodFilter: PeriodFilter
        let typeFilter: TypeFilter
        let msgTitle = ''
        let msgDescription = ''
        const msgTitles = {
            'craft': 'crafters',
            'pvp': 'killers',
            'pve': 'PvE beast',
            'gathering': 'harvester'
        }
        if (filter === 'top') {
            directionFilter = 'desc'
            periodFilter = 'prev'
            typeFilter = type
            msgTitle = `Top 10 ${msgTitles[typeFilter]}!`
            msgDescription = `Characters with the highest ${typeFilter} rate for the last week`
        } else if (filter === 'low') {
            directionFilter = 'asc'
            periodFilter = '3w'
            typeFilter = 'craft'
            msgTitle = `Modest 10 crafters`
            msgDescription = `Characters with the lowest craft rate for lst 3 weeks`
        } else {
            directionFilter = 'desc'
            periodFilter = 'this'
            typeFilter = type
            msgTitle = `Top 10 ${msgTitles[typeFilter]}!`
            msgDescription = `Characters with the highest ${typeFilter} rate for the current week`
        }
        const result: RequestResult<CharacterAggregatedStat[]> = await associateStatistics(
            directionFilter,
            periodFilter,
            typeFilter
        )
        if (!result.status) {
            await interaction.reply({ content: `${result.message}`, flags: MessageFlags.Ephemeral });
            return
        }

        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
        if (result.data.length) {
            embed.setTitle(msgTitle)
            embed.setDescription(msgDescription)
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
            //embed.addFields({ name: '\u200B', value: '\u200B' })
            //embed.setFooter({ text: 'Associates permissions can be revoked' })
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
