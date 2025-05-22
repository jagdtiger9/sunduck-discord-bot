import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Character, Command, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { linkedCharacters } from "../gateway/HttpApi.js";
import { associatedButtonCommand, buttonCommandParamSplitter } from "../settings.js";

export default {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName('my_stations')
        .setDescription('Get associated stations for your linked characters'),
    async execute(interaction: ChatInputCommandInteraction) {
        const requestResult: RequestResult<Character[]> = await linkedCharacters(interaction.user)
        if (!requestResult.status) {
            await interaction.reply({ content: `${requestResult.message}`, flags: MessageFlags.Ephemeral });
            return
        }

        const buttons: ButtonBuilder[] = []
        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
            .setTitle(`Associated characters`)
        if (requestResult.data.length) {
            embed.setDescription(`Select character to get associated stations`)
            requestResult.data.map((character: Character) => {
                buttons.push(new ButtonBuilder()
                    .setCustomId(`${associatedButtonCommand}${buttonCommandParamSplitter}${character.character}`)
                    .setLabel(`${character.character} ${character.tag ? `[${character.tag}]` : ''}${character.guild}`)
                    .setStyle(ButtonStyle.Secondary)
                );
            });
        } else {
            embed.setDescription(`No linked characters, use /link_character command first please`)
        }
        embed.setTimestamp();

        // Max buttons attached
        const shift = 5
        const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(buttons.splice(0, shift))
        await interaction.reply({
            content: ``,
            embeds: [embed],
            components: [row],
            flags: MessageFlags.Ephemeral
        });

        while (buttons.length) {
            const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(buttons.splice(0, shift))
            await interaction.followUp({
                content: ``,
                components: [row],
                flags: MessageFlags.Ephemeral
            });
        }
    },
} as Command
