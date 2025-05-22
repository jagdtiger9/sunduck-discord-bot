import { ButtonInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ButtonParams, CharacterPermissions, Command, PermissionsMap, RequestResult, StationsMap } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { associatesStations } from "../gateway/HttpApi.js";
import { getButtonParams } from "../application/service/buttonParams.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('associated')
        .setDescription('Get associated stations for your linked characters'),
    async execute(interaction: ButtonInteraction) {
        const button: ButtonParams = getButtonParams(interaction.customId)
        const requestResult: RequestResult<CharacterPermissions> = await associatesStations(interaction.user, button.param)
        if (!requestResult.status) {
            await interaction.reply({ content: `${requestResult.message}`, flags: MessageFlags.Ephemeral });
            return
        }

        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
        if (requestResult.data.permissionsMap.length) {
            embed.setTitle(`${requestResult.data.character}`)
            embed.setDescription(`Character associated stations`)
            requestResult.data.permissionsMap.map((permissionsMap: PermissionsMap) => {
                let plots = ''
                Object.values(permissionsMap.stations).map((station: StationsMap) => {
                    plots += `${station.stationName} - ${station.allianceAccess ? 'A' : ''}` +
                        `${station.guildAccess ? 'G' : ''}${station.playerAccess ? 'P' : ''}\n`
                })
                embed.addFields(
                    {
                        name: permissionsMap.cityName,
                        value: plots,
                        inline: true,
                    },
                );
            })
            embed.addFields({ name: '\u200B', value: '\u200B' });
            embed.setFooter(
                { text: 'A - alliance, G - guild, P - private' }
            );
        } else {
            embed.setDescription(`No discount stations for you character`)
        }
        embed.setTimestamp();

        await interaction.reply({
            content: ``,
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        });
    },
} as Command
