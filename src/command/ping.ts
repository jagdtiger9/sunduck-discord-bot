import { PermissionFlagsBits, type RepliableInteraction, SlashCommandBuilder } from "discord.js";
import { MessageFlags } from "discord-api-types/v10";
import { Command } from "../types.js";
import { t, getLocalizations } from "../i18n/index.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(t('en').commands.ping.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.ping.description))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction: RepliableInteraction) {
        await interaction.reply({ content: t(interaction.locale).commands.ping.reply, flags: MessageFlags.Ephemeral });
    },
} as Command
