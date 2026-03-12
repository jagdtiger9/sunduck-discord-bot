import { GuildMember, TextChannel } from "discord.js";
import { PASSPORT_CHANNEL } from "../settings.js";
import { t, interp } from "../i18n/index.js";

export async function addMember(member: GuildMember) {
    const message = interp(t(member.guild.preferredLocale).events.memberJoin, {
        name: member.user.globalName ?? member.user.username,
        id: member.user.id,
    });
    console.log(message)
    const channel = member.client.channels.cache.get(PASSPORT_CHANNEL) as TextChannel;
    await channel?.send({ content: message })
}
