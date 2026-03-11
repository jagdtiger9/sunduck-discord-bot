import { ButtonInteraction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";
import { ButtonParams, Command } from "../types.js";
import { getButtonParams } from "../application/service/buttonParams.js";
import { LINK_CHARACTER_MODAL_ID, CHARACTER_NAME_FIELD_ID } from "../modals/linkCharacterModal.js";
import myStations from "../command/myStations.js";

export default {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('services')
        .setDescription('Services button handler'),
    async execute(interaction: ButtonInteraction) {
        const button: ButtonParams = getButtonParams(interaction.customId)

        if (button.param === 'link_character') {
            const modal = new ModalBuilder()
                .setCustomId(LINK_CHARACTER_MODAL_ID)
                .setTitle('Link in-game character')
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId(CHARACTER_NAME_FIELD_ID)
                            .setLabel('Character name')
                            .setPlaceholder('Enter your exact in-game character name')
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
