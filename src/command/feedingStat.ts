import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { Command, UserStat } from "../types.js";
import { getFeedingStat } from "../gateway/HttpApi.js";
import { FEED_UP_CHANNEL } from "../settings.js";
import { MessageFlags } from "discord-api-types/v10";
import { t, getLocalizations } from "../i18n/index.js";

export default {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName('feeding_stat')
        .setDescription(t('en').commands.feedingStat.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.feedingStat.description))
        .addStringOption(option =>
            option.setName('week')
                .setDescription(t('en').commands.feedingStat.optWeekDesc)
                .setDescriptionLocalizations(getLocalizations(tr => tr.commands.feedingStat.optWeekDesc))
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Current week',
                        name_localizations: getLocalizations(tr => tr.commands.feedingStat.choiceCurrent),
                        value: 'current',
                    },
                    {
                        name: 'Last week',
                        name_localizations: getLocalizations(tr => tr.commands.feedingStat.choiceLast),
                        value: 'last',
                    },
                )
        ).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction: ChatInputCommandInteraction) {
        const tr = t(interaction.locale).commands.feedingStat;
        const week = (interaction.options.getString('week') || '') === 'current' ? '' : 'last'
        const feedingStat = await getFeedingStat(week)

        let message = ''
        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
            .setTitle(feedingStat.title)
            .setDescription(feedingStat.message)
        feedingStat.stat.map((user: UserStat) => {
            message += `<@${user.userId}> `
            embed.addFields({
                name: user.name,
                value: `${user.count.toString()}\n${user.percentage.toString()}%`,
                inline: true,
            });
        })
        embed.setTimestamp();

        const channel = interaction.client.channels.cache.get(FEED_UP_CHANNEL) as TextChannel;
        await channel?.send({
            content: week === '' ? tr.statCurrent : message,
            embeds: [embed],
        });
        await interaction.reply({ content: tr.sending, flags: MessageFlags.Ephemeral });
        await interaction.deleteReply();
    },
} as Command
