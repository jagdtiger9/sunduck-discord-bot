import { ActionRowBuilder, ButtonInteraction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Command } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { t } from "../i18n/index.js";
import { PING_ALIVE_RESPONSE_MODAL_ID, PING_ALIVE_RESPONSE_FIELD_ID } from "../modals/pingAliveResponseModal.js";
import { MODERATOR_USER_ID, pingAliveRespondButtonCommand } from "../settings.js";
import { getPingAliveLastReaction } from "../gateway/HttpApi.js";

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export default {
    data: new SlashCommandBuilder()
        .setName(pingAliveRespondButtonCommand)
        .setDescription('Ping alive respond button'),
    async execute(interaction: ButtonInteraction) {
        const tr = t(interaction.locale).commands.pingAlive;

        const result = await getPingAliveLastReaction(interaction.user.id);
        if (result.status && result.data.lastReactedAt !== null) {
            const elapsed = Date.now() - new Date(parseInt(result.data.lastReactedAt) * 1000).getTime()
            // Moderator timeout - 1 min, for testing
            const customTimeout = interaction.user.id !== MODERATOR_USER_ID ? TWO_WEEKS_MS : 60 * 1000
            if (elapsed < customTimeout) {
                await interaction.reply({ content: tr.alreadyReacted, flags: MessageFlags.Ephemeral });
                return
            }
        }

        const modal = new ModalBuilder()
            .setCustomId(PING_ALIVE_RESPONSE_MODAL_ID)
            .setTitle(tr.responseModalTitle);

        const tipInput = new TextInputBuilder()
            .setCustomId('ping_alive_tip')
            .setLabel(tr.responseModalTipLabel)
            .setPlaceholder(tr.responseModalTipValue)
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);

        const messageInput = new TextInputBuilder()
            .setCustomId(PING_ALIVE_RESPONSE_FIELD_ID)
            .setLabel(tr.responseModalLabel)
            .setPlaceholder(tr.responseModalPlaceholder)
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(5)
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(tipInput),
            new ActionRowBuilder<TextInputBuilder>().addComponents(messageInput),
        );

        await interaction.showModal(modal);
    },
} as Command
