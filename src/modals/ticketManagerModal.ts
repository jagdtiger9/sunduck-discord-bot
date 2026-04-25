import { ChannelType, EmbedBuilder, GuildMember, ModalSubmitInteraction, PermissionFlagsBits, TextChannel } from "discord.js";
import { ModalHandler } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { TICKET_CATEGORY_ID, TICKET_ROLE_ID } from "../settings.js";
import { clientStat, createTicketClient } from "../gateway/HttpApi.js";

export const TICKET_MANAGER_MODAL_PRIVATE_ID = 'ticket_manager_modal_private';
export const TICKET_MANAGER_MODAL_GUILD_ID = 'ticket_manager_modal_guild';
export const IGN_FIELD_ID = 'ign';
export const GUILD_FIELD_ID = 'guild';
export const STATIONS_FIELD_ID = 'stations';
export const HEARD_ABOUT_FIELD_ID = 'heard_about';

function safeChannelName(username: string): string {
    return `ticket-${username.replace(/\./g, '-')}`;
}

function buildEmbed(interaction: ModalSubmitInteraction, isGuild: boolean): EmbedBuilder {
    const ign = interaction.fields.getTextInputValue(IGN_FIELD_ID);
    const stations = interaction.fields.getTextInputValue(STATIONS_FIELD_ID);
    const heardAbout = interaction.fields.getTextInputValue(HEARD_ABOUT_FIELD_ID);

    const embed = new EmbedBuilder()
        .setColor(0x0000CC)
        .addFields(
            { name: 'Access type', value: isGuild ? 'Guild' : 'Personal', inline: false },
            { name: 'IGN', value: `\`\`\`${ign}\`\`\``, inline: false },
        );

    if (isGuild) {
        const guildName = interaction.fields.getTextInputValue(GUILD_FIELD_ID);
        if (guildName) embed.addFields({ name: 'Guild', value: `\`\`\`${guildName}\`\`\``, inline: false });
    }

    embed.addFields(
        { name: 'Stations needed', value: `\`\`\`${stations}\`\`\`` },
        { name: 'How did you hear about us?', value: heardAbout ? `\`\`\`${heardAbout}\`\`\`` : '—' },
    ).setTimestamp();

    return embed;
}

async function execute(interaction: ModalSubmitInteraction) {
    if (!interaction.guild) return;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const isGuild = interaction.customId === TICKET_MANAGER_MODAL_GUILD_ID;
    const embed = buildEmbed(interaction, isGuild);

    const stat = await clientStat(interaction.user);

    if (stat.status && stat.data?.channelId) {
        const existing = interaction.guild.channels.cache.get(stat.data.channelId) as TextChannel | undefined;
        await existing?.send({ content: `Welcome <@${interaction.user.id}>\n_ _\n`, embeds: [embed] });
        await interaction.editReply({ content: `Your ticket has been updated: <#${stat.data.channelId}>` });
        return;
    }

    const channel = await interaction.guild.channels.create({
        name: safeChannelName(interaction.user.username),
        type: ChannelType.GuildText,
        parent: TICKET_CATEGORY_ID,
        permissionOverwrites: [
            { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
            { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] },
        ],
    });

    try {
        const member = await interaction.guild.members.fetch(interaction.user.id) as GuildMember;
        await member.roles.add(TICKET_ROLE_ID);
    } catch (error) {
        console.error(`Failed to assign ticket role to ${interaction.user.username}: ${error}`);
    }

    await createTicketClient(interaction.user, channel.id);

    await channel.send({ content: `<@${interaction.user.id}>`, embeds: [embed] });
    await interaction.editReply({ content: `Your ticket has been created: ${channel}` });
}

export const ticketManagerModalPrivate: ModalHandler = { name: TICKET_MANAGER_MODAL_PRIVATE_ID, execute };
export const ticketManagerModalGuild: ModalHandler = { name: TICKET_MANAGER_MODAL_GUILD_ID, execute };
