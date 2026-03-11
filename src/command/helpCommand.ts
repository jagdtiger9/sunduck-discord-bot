import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { API_BASE_URI, buttonCommandParamSplitter, servicesButtonCommand } from "../settings.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('services')
        .setDescription('Useful services panel'),
    async execute(interaction: ChatInputCommandInteraction) {
        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
            .setTitle('Sunduck bot services')
            .setDescription('Here are the most useful services you need to get the most of your opportunities.\n\u200B')
            .addFields(
                {
                    name: '🔗 Link character',
                    value: 'Link your in-game character to manage it - `/link_character`\n\u200B' +
                        '_moderator confirmation required_',
                },
                {
                    name: 'ℹ️ Associated stations ',
                    value: 'Get an associated stations list for your linked characters - `/my_stations`\n\u200B',
                },
                {
                    name: '🌐 Web interface',
                    value: 'Access all the services with a web site — https://albion.neogudilap.ru',
                },
            )
            .setTimestamp();

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(`${servicesButtonCommand}${buttonCommandParamSplitter}link_character`)
                .setLabel('🔗 Link character')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`${servicesButtonCommand}${buttonCommandParamSplitter}my_stations`)
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
