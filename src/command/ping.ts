import { type RepliableInteraction, SlashCommandBuilder } from "discord.js";
import { MessageFlags } from "discord-api-types/v10";
import { Command } from "../types.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    async execute(interaction: RepliableInteraction) {
        await interaction.reply({ content: 'pong', flags: MessageFlags.Ephemeral });
    },
} as Command
