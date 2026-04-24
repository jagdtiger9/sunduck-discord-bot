import { ModalSubmitInteraction, TextChannel } from "discord.js";
import { ModalHandler } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { t } from "../i18n/index.js";
import { MODERATOR_CHANNEL } from "../settings.js";
import { setPingAliveReaction } from "../gateway/HttpApi.js";

export const PING_ALIVE_RESPONSE_MODAL_ID = 'ping_alive_response_modal';
export const PING_ALIVE_RESPONSE_FIELD_ID = 'ping_alive_response_message';

export default {
    name: PING_ALIVE_RESPONSE_MODAL_ID,
    async execute(interaction: ModalSubmitInteraction) {
        const tr = t(interaction.locale).commands.pingAlive;
        const text = interaction.fields.getTextInputValue(PING_ALIVE_RESPONSE_FIELD_ID).trim();

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const result = await setPingAliveReaction(interaction.user);
        if (result.data.discordChannelId) {
            const channel = interaction.client.channels.cache.get(result.data.discordChannelId) as TextChannel;
            await channel?.send(
                `<@${interaction.user.id}>: ${text}\n`
            )
        }
        const channel = interaction.client.channels.cache.get(MODERATOR_CHANNEL) as TextChannel;
        await channel?.send(
            `<@${interaction.user.id}>: ${text}\n` +
            `Save API result: ${result.status ? '✅' : `❌ ${result.message}`}`
        );

        await interaction.editReply(tr.responseAck);
    },
} as ModalHandler
