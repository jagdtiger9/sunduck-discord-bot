import { AttachmentBuilder, ButtonInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ButtonParams, CharacterPermissions, Command, PermissionsMap, RequestResult, StationsMap } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { associatesStations } from "../gateway/HttpApi.js";
import { getButtonParams } from "../application/service/buttonParams.js";
import { t } from "../i18n/index.js";
import { associatedButtonCommand } from "../settings.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName(associatedButtonCommand)
        .setDescription('Get associated stations for your linked characters'),
    async execute(interaction: ButtonInteraction) {
        const tr = t(interaction.locale).buttons.associated;
        const button: ButtonParams = getButtonParams(interaction.customId)
        const requestResult: RequestResult<CharacterPermissions> = await associatesStations(interaction.user, button.param)
        console.log(requestResult)
        if (!requestResult.status) {
            await interaction.reply({ content: requestResult.message, flags: MessageFlags.Ephemeral });
            return
        }

        const embed = new EmbedBuilder().setColor(0x0000CC)
        if (requestResult.data.permissionsMap.length) {
            embed.setTitle(requestResult.data.character)
            embed.setDescription(tr.description)
            requestResult.data.permissionsMap.map((permissionsMap: PermissionsMap) => {
                let plots = ''
                Object.values(permissionsMap.stations).map((station: StationsMap) => {
                    plots += `${station.stationName} - [${station.plotNum}]` +
                        ` ${station.allianceAccess ? 'A' : ''}${station.guildAccess ? 'G' : ''}\n`
                })
                embed.addFields({ name: permissionsMap.cityName, value: plots, inline: true });
            })
        } else {
            embed.setDescription(tr.noStations)
        }
        embed.addFields({ name: '\u200B', value: '\u200B' });
        embed.setFooter({ text: tr.footer });
        embed.setTimestamp()

        const imageBuffer = Buffer.from(requestResult.data.image, 'base64');
        console.log(imageBuffer)
        const attachment = new AttachmentBuilder(imageBuffer, { name: 'map.png' });
        embed.setImage('attachment://map.png');

        await interaction.reply({ embeds: [embed], files: [attachment], flags: MessageFlags.Ephemeral });
    },
} as Command
