import { ActionRowBuilder, ChatInputCommandInteraction, ModalBuilder, PermissionFlagsBits, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Command } from "../types.js";
import { t, getLocalizations } from "../i18n/index.js";
import { PING_ALIVE_MODAL_ID, PING_ALIVE_MESSAGE_FIELD_ID } from "../modals/pingAliveModal.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('mod_ping_alive')
        .setDescription(t('en').commands.pingAlive.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.pingAlive.description))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction: ChatInputCommandInteraction) {
        const tr = t(interaction.locale).commands.pingAlive;

        const modal = new ModalBuilder()
            .setCustomId(PING_ALIVE_MODAL_ID)
            .setTitle(tr.modalTitle);

        const messageInput = new TextInputBuilder()
            .setCustomId(PING_ALIVE_MESSAGE_FIELD_ID)
            .setLabel(tr.modalLabel)
            .setPlaceholder(tr.modalPlaceholder)
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(messageInput));

        await interaction.showModal(modal);
    },
} as Command
