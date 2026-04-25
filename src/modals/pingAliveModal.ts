import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalSubmitInteraction, TextChannel } from "discord.js";
import { ModalHandler } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { t } from "../i18n/index.js";
import { pingAliveRespondButtonCommand } from "../settings.js";

export const PING_ALIVE_MODAL_ID = 'ping_alive_modal';
export const PING_ALIVE_MESSAGE_FIELD_ID = 'ping_alive_message';

export default {
    name: PING_ALIVE_MODAL_ID,
    async execute(interaction: ModalSubmitInteraction) {
        const text = interaction.fields.getTextInputValue(PING_ALIVE_MESSAGE_FIELD_ID).trim();

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(pingAliveRespondButtonCommand)
                .setLabel(t('en').commands.pingAlive.buttonLabel)
                .setStyle(ButtonStyle.Primary)
        );

        const channel = interaction.channel as TextChannel;
        await channel.send({ content: `${text}\n`, components: [row] });

        await interaction.deleteReply();
    },
} as ModalHandler
