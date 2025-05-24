/**
 * Emoji
 * https://discordjs.guide/popular-topics/reactions.html#reacting-to-messages
 * https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/coding-guides/using-emojis.md
 * Для получения кода эмоции - \+картинка эмоции в чат
 * копируем и используем
 *
 * Разметочка
 * https://www.writebots.com/discord-text-formatting/
 *
 * Управление ролями
 * https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/understanding/roles.md
 */

// https://stackoverflow.com/questions/75281628/webstorm-discord-js-element-is-not-exported
//const {Client, Events, GatewayIntentBits} = require('discord.js')
import { BaseInteraction, Client, Collection, Events, REST, Routes, TextChannel } from 'discord.js'
import { GatewayIntentBits, MessageFlags } from 'discord-api-types/v10'
import { ButtonParams, Command, CustomClient } from "./types.js";

import pingCommand from './command/ping.js'
import feedingStat from './command/feedingStat.js'
import linkCharacter from "./command/linkCharacter.js";
import myStations from "./command/myStations.js";
import associated from "./buttons/associated.js";
import { APP_ID, ERROR_CHANNEL, SERVER_ID, TOKEN } from "./settings.js";
import { getButtonParams } from "./application/service/buttonParams.js";

const commands: Array<Command> = [
    pingCommand,
    feedingStat,
    linkCharacter,
    myStations,
];
const buttons: Array<Command> = [
    associated,
]

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
}) as CustomClient;
client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();
commands.map(
    (command: Command) => {
        client.commands.set(command.data.name, command)
    }
)
buttons.map(
    (command: Command) => {
        client.buttons.set(command.data.name, command)
    }
)


const rest = new REST({ version: '10' }).setToken(TOKEN);
try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
        Routes.applicationGuildCommands(APP_ID, SERVER_ID),
        {
            body: client.commands.map(
                (command: Command) => command.data.toJSON()
            )
        }
    );
    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
    let command: Command | undefined = undefined
    if (interaction.isChatInputCommand()) {
        command = client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    } else if (interaction.isButton()) {
        const button: ButtonParams = getButtonParams(interaction.customId)
        console.log(interaction.customId, button)
        command = client.buttons.get(button.name);
        if (!command) {
            console.error(`No command matching ${button} was found.`);
            return;
        }
    } else {
        return;
    }

    if (!client.cooldowns.has(command.data.name)) {
        client.cooldowns.set(command.data.name, new Collection());
    }
    const now = Date.now();
    const timestamps: Collection<string, number> = client.cooldowns.get(command.data.name) as Collection<string, number>;
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
    if (timestamps.has(interaction.user.id)) {
        const expirationTime = (timestamps?.get(interaction.user.id) || 0) + cooldownAmount;
        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1_000);
            return interaction.reply({
                    content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again in <t:${expiredTimestamp}:R>.`,
                    flags: MessageFlags.Ephemeral
                }
            );
        }
    }
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`exception: ${error}`);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Discord connection error. Please try again later!', flags: MessageFlags.Ephemeral });
        } else {
            await interaction.reply({ content: 'Discord connection error. Please try again later!', flags: MessageFlags.Ephemeral });
        }
        const channel = interaction.client.channels.cache.get(ERROR_CHANNEL) as TextChannel;
        await channel?.send({
            content: `<@215036376654020608>\nerror`,
        });
    }
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient: Client) => {
    console.log(`Ready! Logged in as ${readyClient?.user?.tag}`);
    console.log(process.env.BOT_TOKEN)
});
client.login(TOKEN)
