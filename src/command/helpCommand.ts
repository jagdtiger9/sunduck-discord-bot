import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { API_BASE_URI, buttonCommandParamSplitter, helpButtonCommand } from "../settings.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('services')
        .setDescription('Useful services panel'),
    async execute(interaction: ChatInputCommandInteraction) {
        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
            .setTitle('Sunduck bot services')
            .setDescription('Sunduck craft helper bot welcomes you. It can helps you to check/request/validate associates permissions etc...')
            .addFields(
                {
                    name: '🔗 Link your character',
                    value: 'Link your in-game character with the `/link_character` command',
                },
                {
                    name: 'ℹ️ Check your access',
                    value: 'Wait for moderator approval and check your associates access with the command `/my_stations`',
                },
                {
                    name: '🌐 Web site',
                    value: 'Visit web site to get all the info — https://albion.neogudilap.ru',
                },
            )
            .setTimestamp();

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(`${helpButtonCommand}${buttonCommandParamSplitter}link_character`)
                .setLabel('🔗 Link character')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`${helpButtonCommand}${buttonCommandParamSplitter}my_stations`)
                .setLabel('ℹ️ My stations')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setLabel('🌐 Web site')
                .setStyle(ButtonStyle.Link)
                .setURL(API_BASE_URI),
        );

        await interaction.reply({
            embeds: [embed],
            components: [row],
            flags: MessageFlags.Ephemeral,
        });
    },
} as Command
