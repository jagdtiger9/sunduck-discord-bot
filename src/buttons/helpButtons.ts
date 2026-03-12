import { ActionRowBuilder, ButtonInteraction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ButtonParams, Command } from "../types.js";
import { getButtonParams } from "../application/service/buttonParams.js";
import { LINK_CHARACTER_MODAL_ID, CHARACTER_NAME_FIELD_ID } from "../modals/linkCharacterModal.js";
import myStations from "../command/myStations.js";
import { t } from "../i18n/index.js";

export default {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('services')
        .setDescription('Services button handler'),
    async execute(interaction: ButtonInteraction) {
        const button: ButtonParams = getButtonParams(interaction.customId)

        if (button.param === 'link_character') {
            const tr = t(interaction.locale).modals.linkCharacter;
            const modal = new ModalBuilder()
                .setCustomId(LINK_CHARACTER_MODAL_ID)
                .setTitle(tr.title)
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId(CHARACTER_NAME_FIELD_ID)
                            .setLabel(tr.label)
                            .setPlaceholder(tr.placeholder)
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(2)
                            .setMaxLength(64)
                            .setRequired(true)
                    )
                );
            await interaction.showModal(modal);
            return;
        }

        if (button.param === 'my_stations') {
            await myStations.execute(interaction);
            return;
        }
    },
} as Command
