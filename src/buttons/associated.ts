import { AttachmentBuilder, ButtonInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ButtonParams, CharacterPermissions, Command, RequestResult } from "../types.js";
import { MessageFlags } from "discord-api-types/v10";
import { associatesStations } from "../gateway/HttpApi.js";
import { getButtonParams } from "../application/service/buttonParams.js";
import { t } from "../i18n/index.js";
import { associatedButtonCommand } from "../settings.js";

export default {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName(associatedButtonCommand)
        .setDescription('Get associated stations for your linked characters'),
    async execute(interaction: ButtonInteraction) {
        const tr = t(interaction.locale).buttons.associated;
        const button: ButtonParams = getButtonParams(interaction.customId)
        const requestResult: RequestResult<CharacterPermissions> = await associatesStations(interaction.user, button.param)
        if (!requestResult.status) {
            await interaction.reply({ content: requestResult.message, flags: MessageFlags.Ephemeral });
            return
        }

        const embed = new EmbedBuilder().setColor(0x0000CC)
        if (requestResult.data.hasPermissions) {
            embed.setTitle(requestResult.data.character)
            embed.setDescription(tr.description)
            embed.setFooter({ text: tr.footer })
        } else {
            embed.setDescription(tr.noStations)
        }
        embed.setTimestamp()

        let files: AttachmentBuilder[] = []
        if (requestResult.data.image) {
            const imageBuffer = Buffer.from(requestResult.data.image, 'base64');
            files = [new AttachmentBuilder(imageBuffer, { name: 'map.png' })]
            embed.setImage('attachment://map.png');
        }
        await interaction.reply({ embeds: [embed], files, flags: MessageFlags.Ephemeral });
    },
} as Command
