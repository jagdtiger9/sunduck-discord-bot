import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Character, Command, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { linkedCharacters } from "../gateway/HttpApi.js";
import { associatedButtonCommand, buttonCommandParamSplitter } from "../settings.js";
import { t, getLocalizations } from "../i18n/index.js";

export default {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName('my_stations')
        .setDescription(t('en').commands.myStations.description)
        .setDescriptionLocalizations(getLocalizations(tr => tr.commands.myStations.description)),
    async execute(interaction: ChatInputCommandInteraction | ButtonInteraction) {
        const tr = t(interaction.locale).commands.myStations;
        const requestResult: RequestResult<Character[]> = await linkedCharacters(interaction.user)
        if (!requestResult.status) {
            await interaction.reply({ content: requestResult.message, flags: MessageFlags.Ephemeral });
            return
        }

        const buttons: ButtonBuilder[] = []
        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
            .setTitle(tr.title)
        if (requestResult.data.length) {
            requestResult.data.map((character: Character) => {
                buttons.push(new ButtonBuilder()
                    .setCustomId(`${associatedButtonCommand}${buttonCommandParamSplitter}${character.character}`)
                    .setLabel(`${character.character} ${character.tag ? `[${character.tag}]` : ''}${character.guild}`)
                    .setStyle(ButtonStyle.Success)
                );
            });
        } else {
            embed.setDescription(tr.noCharacters)
        }

        const shift = 5
        const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(buttons.splice(0, shift))
        await interaction.reply({
            embeds: [embed],
            components: [row],
            flags: MessageFlags.Ephemeral
        });

        while (buttons.length) {
            const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(buttons.splice(0, shift))
            await interaction.followUp({
                components: [row],
                flags: MessageFlags.Ephemeral
            });
        }
    },
} as Command
