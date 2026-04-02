import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { ClientCommandType, ClientStat, Command, RequestResult } from "../types.js";
import { getLocalizations, t } from "../i18n/index.js";
import { clientStat, registerClient } from "../gateway/HttpApi.js";
import { MessageFlags } from "discord-api-types/v10";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('mod_client')
        .setDescription(t('en').commands.client.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.client.description))
        .addStringOption(option =>
            option.setName('command')
                .setDescription(t('en').commands.client.optCommandDesc)
                .setDescriptionLocalizations(getLocalizations(tr => tr.commands.client.optCommandDesc))
                .addChoices(
                    {
                        name: 'Stat',
                        value: 'stat',
                    },
                    {
                        name: 'Set',
                        value: 'set',
                    },
                )
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('name')
                .setDescription(t('en').commands.client.optNameDesc)
                .setDescriptionLocalizations(getLocalizations(tr => tr.commands.client.optNameDesc))
                .setRequired(true)
        ).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction: ChatInputCommandInteraction) {
        const user: User = interaction.options.getUser('name', true);
        const command: ClientCommandType = interaction.options.getString('command') as ClientCommandType || 'stat'
        //const member = interaction.options.getMember('name') as GuildMember | null;
        // console.log({
        //     channelId: interaction.channelId,
        //     id: user.id,
        //     tag: user.tag,
        //     username: user.username,
        //     roles: member?.roles.cache.map(r => r.name) ?? [],
        //     joinedAt: member?.joinedAt,
        //     createdAt: user.createdAt,
        //     command,
        // })
        if (command === 'set') {
            const result: RequestResult<string> = await registerClient(user, interaction.channelId)
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(result.status ? 0x00CC00 : 0xCC0000)
                        .setTitle(result.message)
                        .setDescription(
                            `Client: <@${user.id}>\nChannel: <#${interaction.channelId}>`
                        )
                ],
                flags: MessageFlags.Ephemeral
            });
        } else if (command === 'stat') {
            const result: RequestResult<ClientStat> = await clientStat(user)
            const stat = result.data
            const embed = new EmbedBuilder()
                .setColor(result.status ? 0x00CC00 : 0xCC0000)
                .setTitle(result.message)
            if (result.status && stat) {
                const descLines = [
                    `Client: <@${user.id}>`,
                    `Channel: <#${stat.channelId}>`,
                ]
                if (stat.link) {
                    descLines.push(
                        `[Link](https://albion.neogudilap.ru/admin/users/${encodeURIComponent(stat.name)})`
                    )
                }
                embed.setDescription(descLines.join('\n'))
                if (stat.characters.length) {
                    embed.addFields(
                        { name: 'Characters', value: '', inline: true },
                        { name: 'Guild', value: '', inline: true },
                        { name: 'Resp-Eval', value: '', inline: true },
                    )
                    stat.characters.forEach(c =>
                        embed.addFields(
                            { name: '', value: `[${c.name}](https://albion.neogudilap.ru/player/${c.name})`, inline: true },
                            { name: '', value: `${c.guild}`, inline: true },
                            { name: '', value: `${c.isResponsible ? '✅' : '❌'} · ${c.isEvaluated ? '✅' : '❌'}`, inline: true },
                        )
                    )
                }
            }
            await interaction.reply({
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });
        } else {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xCC0000)
                        .setTitle('No stat')
                ],
                flags: MessageFlags.Ephemeral
            });
        }
    },
} as Command
