import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { Command, UserStat } from "../types.js";
import { getFeedingStat } from "../gateway/HttpApi.js";
import { FEED_UP_CHANNEL } from "../settings.js";
import { MessageFlags } from "discord-api-types/v10";

export default {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName('feeding_stat')
        .setDescription('Stations feeding statistics')
        .addStringOption(option =>
            option.setName('week')
                .setDescription('Select stat week')
                .setRequired(true)
                .addChoices(
                    { name: 'Current week', value: 'current' },
                    { name: 'Last week', value: 'last' },
                )
        ).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction: ChatInputCommandInteraction) {
        const week = (interaction.options.getString('week') || '') === 'current' ? '' : 'last'
        const feedingStat = await getFeedingStat(week)

        let message = ''
        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
            .setTitle(feedingStat.title)
            .setDescription(feedingStat.message)
        // .addFields(
        //     { name: 'Утенок', value: '', inline: true },
        //     { name: 'К-во', value: '', inline: true },
        //     { name: '%', value: '', inline: true },
        //     // { name: '\u200B', value: '\u200B' },
        // )
        feedingStat.stat.map((user: UserStat) => {
            message += `<@${user.userId}> `
            embed.addFields(
                {
                    name: user.name,
                    value: `${user.count.toString()}\n${user.percentage.toString()}%`,
                    inline: true,
                },
                // { name: 'Утенок', value: user.name, inline: true },
                // { name: 'К-во', value: `${user.count.toString()}\n${user.percentage.toString()}`, inline: true },
                // { name: '%', value: user.percentage.toString(), inline: true },
            );
        })
        embed.setTimestamp();

        const channel = interaction.client.channels.cache.get(FEED_UP_CHANNEL) as TextChannel;
        await channel?.send({
            content: week === '' ? '...текущая статистика...' : message,
            embeds: [embed],
        });
        await interaction.reply({ content: 'feeding stat...', flags: MessageFlags.Ephemeral });
        await interaction.deleteReply();
    },
} as Command
