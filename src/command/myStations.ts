import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CharacterPermissions, Command, PermissionsMap, StationsMap } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { associatesStations } from "../gateway/HttpApi.js";

export default {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName('my_stations')
        .setDescription('Print associates stations for your linked characters'),
    async execute(interaction: ChatInputCommandInteraction) {
        const permissions: CharacterPermissions[] = await associatesStations(interaction.user)
        const embed = new EmbedBuilder()
            .setColor(0x0000CC)
            .setTitle(`Associate stations`)
            .setDescription(`Stations with a discount for you`)
        permissions.map((characterPermissions: CharacterPermissions) => {
            embed.addFields(
                {
                    name: characterPermissions.character,
                    value: '',
                    inline: false,
                },
            );
            characterPermissions.permissionsMap.map((permissionsMap: PermissionsMap) => {
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
        })
        embed.setFooter(
            { text: 'A - alliance, G - guild, P - private' }
        );
        // .addFields(
        //     { name: 'Пользователь', value: `<@${interaction.user.id}>` || '', inline: true },
        //     { name: 'Персонаж', value: `${characterName}`, inline: true },
        //     // { name: '\u200B', value: '\u200B' },
        // )
        embed.setTimestamp();
        await interaction.reply({
            content: `List of stations with discounts for you`,
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        });
    },
} as Command
