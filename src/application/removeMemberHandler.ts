import { GuildMember, PartialGuildMember, TextChannel } from "discord.js";
import { PASSPORT_CHANNEL } from "../settings.js";
import { t, interp } from "../i18n/index.js";

export async function removeMember(member: GuildMember | PartialGuildMember) {
    const message = interp(t(member.guild.preferredLocale).events.memberLeave, {
        name: member.user?.globalName ?? member.user?.username ?? 'Unknown',
        id: member.user?.id ?? '',
    });
    const channel = member.client.channels.cache.get(PASSPORT_CHANNEL) as TextChannel;
    await channel?.send({ content: message })
}
