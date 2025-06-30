import { GuildMember, TextChannel } from "discord.js";
import { PASSPORT_CHANNEL } from "../settings.js";

export async function addMember(member: GuildMember) {
    const message = `**${member.user.globalName}** - <@${member.user.id}> - have joined the server`
    console.log(message)
    const channel = member.client.channels.cache.get(PASSPORT_CHANNEL) as TextChannel;
    await channel?.send({
        content: message,
    })
}
