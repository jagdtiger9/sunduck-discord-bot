import { OverwriteResolvable, PermissionFlagsBits } from "discord.js";

export const botTicketAllow = [
    PermissionFlagsBits.ViewChannel,
    PermissionFlagsBits.SendMessages,
    PermissionFlagsBits.ReadMessageHistory,
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageMessages,
    PermissionFlagsBits.MentionEveryone,
];

export const userTicketAllow = [
    PermissionFlagsBits.ViewChannel,
    PermissionFlagsBits.SendMessages,
    PermissionFlagsBits.ReadMessageHistory,
];

export const userTicketDeny = [
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageMessages,
    PermissionFlagsBits.MentionEveryone,
];

export function buildTicketPermissionOverwrites(
    guildId: string,
    botRoleId: string,
    supportRoleId: string,
    userId: string,
): OverwriteResolvable[] {
    return [
        { id: guildId, deny: [PermissionFlagsBits.ViewChannel] },
        { id: botRoleId, allow: botTicketAllow },
        { id: supportRoleId, allow: [PermissionFlagsBits.ViewChannel] },
        { id: userId, allow: userTicketAllow, deny: userTicketDeny },
    ];
}
