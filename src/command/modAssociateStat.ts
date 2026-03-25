import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { CharacterAggregatedStat, Command, DirectionFilter, PeriodFilter, RequestResult, TypeFilter } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { associateStatistics } from "../gateway/HttpApi.js";
import { t, interp, getLocalizations } from "../i18n/index.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('mod_associate_stat')
        .setDescription(t('en').commands.associateStat.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.associateStat.description))
        .addStringOption(option =>
            option.setName('filter')
                .setDescription(t('en').commands.associateStat.optFilterDesc)
                .setDescriptionLocalizations(getLocalizations(tr => tr.commands.associateStat.optFilterDesc))
                .addChoices(
                    {
                        name: 'Top',
                        name_localizations: getLocalizations(tr => tr.commands.associateStat.choiceTop),
                        value: 'top',
                    },
                    {
                        name: 'Low',
                        name_localizations: getLocalizations(tr => tr.commands.associateStat.choiceLow),
                        value: 'low',
                    },
                    {
                        name: 'TopCurrent',
                        name_localizations: getLocalizations(tr => tr.commands.associateStat.choiceTopCurrent),
                        value: 'current',
                    },
                )
                .setRequired(true)
        ).addStringOption(option =>
            option.setName('type')
                .setDescription(t('en').commands.associateStat.optTypeDesc)
                .setDescriptionLocalizations(getLocalizations(tr => tr.commands.associateStat.optTypeDesc))
                .addChoices(
                    { name: 'Craft', value: 'craft' },
                    { name: 'PvP', value: 'pvp' },
                    { name: 'PvE', value: 'pve' },
                    { name: 'Gathering', value: 'gathering' },
                )
                .setRequired(true)
        ).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction: ChatInputCommandInteraction) {
        const tr = t(interaction.locale).commands.associateStat;
        const filter = interaction.options.getString('filter') || 'current'
        const type: TypeFilter = interaction.options.getString('type') as TypeFilter || 'craft'

        const typeLabels: Record<TypeFilter, string> = {
            craft:     tr.typeCrafters,
            pvp:       tr.typeKillers,
            pve:       tr.typePve,
            gathering: tr.typeGathering,
        }

        let directionFilter: DirectionFilter
        let periodFilter: PeriodFilter
        let typeFilter: TypeFilter
        let msgTitle: string
        let msgDescription: string

        if (filter === 'top') {
            directionFilter = 'desc'
            periodFilter = 'prev'
            typeFilter = type
            msgTitle = interp(tr.titleTop, { type: typeLabels[typeFilter] })
            msgDescription = interp(tr.descTop, { type: typeFilter })
        } else if (filter === 'low') {
            directionFilter = 'asc'
            periodFilter = '3w'
            typeFilter = 'craft'
            msgTitle = tr.titleLow
            msgDescription = tr.descLow
        } else {
            directionFilter = 'desc'
            periodFilter = 'this'
            typeFilter = type
            msgTitle = interp(tr.titleTop, { type: typeLabels[typeFilter] })
            msgDescription = interp(tr.descCurrent, { type: typeFilter })
        }

        const result: RequestResult<CharacterAggregatedStat[]> = await associateStatistics(
            directionFilter,
            periodFilter,
            typeFilter
        )
        if (!result.status) {
            await interaction.reply({ content: result.message, flags: MessageFlags.Ephemeral });
            return
        }

        const embed = new EmbedBuilder().setColor(0x0000CC)
        if (result.data.length) {
            embed.setTitle(msgTitle)
            embed.setDescription(msgDescription)
            let data = ''
            result.data.map((stat: CharacterAggregatedStat, index: number) => {
                data += `**${index + 1}**. ` + '`' + stat.name + '`' + ` - ${stat.total.toLocaleString(interaction.locale)}\n`
            })
            embed.addFields({ name: '', value: data })
        } else {
            embed.setDescription(tr.noData)
        }
        embed.setTimestamp();

        const channel = interaction.channel as TextChannel;
        await channel?.send({ embeds: [embed] });
        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    },
} as Command
