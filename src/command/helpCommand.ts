import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { API_BASE_URI, buttonCommandParamSplitter, servicesButtonCommand } from "../settings.js";
import { t, getLocalizations } from "../i18n/index.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('sunduck')
        .setDescription(t('en').commands.services.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.services.description)),
    async execute(interaction: ChatInputCommandInteraction) {
        const tr = t(interaction.locale).commands.services;

        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
            .setTitle(tr.title)
            .setDescription(tr.intro)
            .addFields(
                { name: tr.linkCharName, value: `${tr.linkCharValue}\n\u200B` },
                { name: tr.stationsName, value: `${tr.stationsValue}\n\u200B` },
                { name: tr.webName, value: tr.webValue },
            )
            .setTimestamp();

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(`${servicesButtonCommand}${buttonCommandParamSplitter}link_character`)
                .setLabel(tr.btnLinkChar)
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`${servicesButtonCommand}${buttonCommandParamSplitter}my_stations`)
                .setLabel(tr.btnStations)
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setLabel(tr.btnWeb)
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
