import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { Command, RequestResult } from "../types.js";
import { getLocalizations, t } from "../i18n/index.js";
import { registerClient } from "../gateway/HttpApi.js";
import { MessageFlags } from "discord-api-types/v10";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('mod_client')
        .setDescription(t('en').commands.client.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.client.description))
        .addUserOption(option =>
            option.setName('name')
                .setDescription(t('en').commands.client.optNameDesc)
                .setDescriptionLocalizations(getLocalizations(tr => tr.commands.client.optNameDesc))
                .setRequired(true)
        ).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction: ChatInputCommandInteraction) {
        const user: User = interaction.options.getUser('name', true);
        const member = interaction.options.getMember('name') as GuildMember | null;

        console.log({
            channelId: interaction.channelId,
            id: user.id,
            tag: user.tag,
            username: user.username,
            displayName: member?.displayName ?? user.displayName,
            roles: member?.roles.cache.map(r => r.name) ?? [],
            joinedAt: member?.joinedAt,
            createdAt: user.createdAt,
        })
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
    },
} as Command
