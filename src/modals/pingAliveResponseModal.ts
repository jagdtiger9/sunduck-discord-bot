import { ActionRowBuilder, ModalBuilder, ModalSubmitInteraction, TextChannel, TextInputBuilder, TextInputStyle } from "discord.js";
import { ModalHandler } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { t } from "../i18n/index.js";
import { MODERATOR_CHANNEL } from "../settings.js";
import { setPingAliveReaction } from "../gateway/HttpApi.js";

export const PING_ALIVE_RESPONSE_MODAL_ID = 'ping_alive_response_modal';
export const PING_ALIVE_RESPONSE_FIELD_ID = 'ping_alive_response_message';

export function buildModal(title: string, tr: ReturnType<typeof t>['commands']['pingAlive']): ModalBuilder {
    const messageInput = new TextInputBuilder()
        .setCustomId(PING_ALIVE_RESPONSE_FIELD_ID)
        .setLabel(tr.responseModalLabel)
        .setPlaceholder(tr.responseModalPlaceholder)
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(3)
        .setMaxLength(1500)
        .setRequired(true);

    return new ModalBuilder()
        .setCustomId(PING_ALIVE_RESPONSE_MODAL_ID)
        .setTitle(title)
        .addComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(messageInput),
        );
}

export default {
    name: PING_ALIVE_RESPONSE_MODAL_ID,
    async execute(interaction: ModalSubmitInteraction) {
        const tr = t(interaction.locale).commands.pingAlive;
        const text = interaction.fields.getTextInputValue(PING_ALIVE_RESPONSE_FIELD_ID).trim()
        console.log(
            'pingAliveResponseModal data: ' +
            `<@${interaction.user.id}>\n\`\`\`${text}\`\`\``
        )
        try {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });

            const result = await setPingAliveReaction(interaction.user);
            if (result.data.discordChannelId) {
                const channel = interaction.client.channels.cache.get(result.data.discordChannelId) as TextChannel;
                await channel?.send(
                    `<@${interaction.user.id}>\n\`\`\`${text}\`\`\`\n`
                );
            }
            const modChannel = interaction.client.channels.cache.get(MODERATOR_CHANNEL) as TextChannel;
            await modChannel?.send(
                `<@${interaction.user.id}>\n\`\`\`${text}\`\`\`` +
                `\nSave API result: ${result.status ? '✅' : `❌ ${result.message}`}`
            );
            await interaction.editReply(tr.responseAck);
        } catch (error) {
            console.error(`pingAliveResponseModal error: ${error}`);
            await interaction.editReply(t(interaction.locale).common.error);
        }
    },
} as ModalHandler
