import { ButtonInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { t } from "../i18n/index.js";
import { buildModal } from "../modals/pingAliveResponseModal.js";
import { MODERATOR_USER_ID, pingAliveRespondButtonCommand } from "../settings.js";
import { getPingAliveLastReaction } from "../gateway/HttpApi.js";

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export default {
    data: new SlashCommandBuilder()
        .setName(pingAliveRespondButtonCommand)
        .setDescription('Ping alive respond button'),
    async execute(interaction: ButtonInteraction) {
        const tr = t(interaction.locale).commands.pingAlive;

        try {
            const result = await getPingAliveLastReaction(interaction.user.id);
            if (result.status && result.data.lastReactedAt !== null) {
                const elapsed = Date.now() - new Date(parseInt(result.data.lastReactedAt) * 1000).getTime();
                const customTimeout = interaction.user.id !== MODERATOR_USER_ID ? TWO_WEEKS_MS : 60 * 1000;
                if (elapsed < customTimeout) {
                    await interaction.reply({ content: tr.alreadyReacted, flags: MessageFlags.Ephemeral });
                    return;
                }
            }
        } catch (error) {
            console.error(`pingAliveRespondButton: getPingAliveLastReaction failed: ${error}`);
        }

        await interaction.showModal(buildModal(tr.responseModalTitle, tr));
    },
} as Command
