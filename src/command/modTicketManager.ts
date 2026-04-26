import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Command } from "../types.js";
import { ticketManagerButtonCommand, buttonCommandParamSplitter } from "../settings.js";

export default {
    data: new SlashCommandBuilder()
        .setName('mod_ticket_manager')
        .setDescription('Post the associate request message')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction: ChatInputCommandInteraction) {
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(`${ticketManagerButtonCommand}${buttonCommandParamSplitter}private`)
                .setLabel('Personal')
                .setEmoji('🧑')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`${ticketManagerButtonCommand}${buttonCommandParamSplitter}guild`)
                .setLabel('Guild')
                .setEmoji('🛡️')
                .setStyle(ButtonStyle.Success),
        );

        const embed = new EmbedBuilder()
            .setColor(0x00CC00)
            .setDescription('Click the button to request for discount');

        await interaction.reply({
            embeds: [embed],
            components: [row],
        });
    },
} as Command
