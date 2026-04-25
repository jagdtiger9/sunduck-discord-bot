import { ActionRowBuilder, ButtonInteraction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ButtonParams, Command } from "../types.js";
import { getButtonParams } from "../application/service/buttonParams.js";
import { ticketManagerButtonCommand } from "../settings.js";
import {
    TICKET_MANAGER_MODAL_PRIVATE_ID,
    TICKET_MANAGER_MODAL_GUILD_ID,
    IGN_FIELD_ID,
    GUILD_FIELD_ID,
    STATIONS_FIELD_ID,
    HEARD_ABOUT_FIELD_ID,
} from "../modals/ticketManagerModal.js";

function buildModal(modalId: string, title: string, showGuild: boolean): ModalBuilder {
    const modal = new ModalBuilder()
        .setCustomId(modalId)
        .setTitle(title)
        .addComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder()
                    .setCustomId(IGN_FIELD_ID)
                    .setLabel('IGN (In Game Name)')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            ),
        );

    if (showGuild) {
        modal.addComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder()
                    .setCustomId(GUILD_FIELD_ID)
                    .setLabel('Guild')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false)
            ),
        );
    }

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
                .setCustomId(STATIONS_FIELD_ID)
                .setLabel('Stations you need')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
        ),
        new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
                .setCustomId(HEARD_ABOUT_FIELD_ID)
                .setLabel('How did you hear about us?')
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
        ),
    );

    return modal;
}

export default {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName(ticketManagerButtonCommand)
        .setDescription('Ticket manager button handler'),
    async execute(interaction: ButtonInteraction) {
        const button: ButtonParams = getButtonParams(interaction.customId);

        if (button.param === 'private') {
            await interaction.showModal(buildModal(TICKET_MANAGER_MODAL_PRIVATE_ID, 'Apply for personal discount', false));
            return;
        }

        if (button.param === 'guild') {
            await interaction.showModal(buildModal(TICKET_MANAGER_MODAL_GUILD_ID, 'Apply for guild discount', true));
            return;
        }
    },
} as Command
