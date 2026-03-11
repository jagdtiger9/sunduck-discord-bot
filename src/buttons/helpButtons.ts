import { ButtonInteraction, SlashCommandBuilder } from "discord.js";
import { ButtonParams, Command } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { getButtonParams } from "../application/service/buttonParams.js";

const tips: Record<string, string> = {
    link_character: 'Type `/link_character` in the chat and provide your in-game character name.',
    my_stations: 'Type `/my_stations` in the chat to see all stations associated with your characters.',
}

export default {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help button handler'),
    async execute(interaction: ButtonInteraction) {
        const button: ButtonParams = getButtonParams(interaction.customId)
        const tip = tips[button.param]
        await interaction.reply({
            content: tip ?? 'Unknown action.',
            flags: MessageFlags.Ephemeral,
        });
    },
} as Command
