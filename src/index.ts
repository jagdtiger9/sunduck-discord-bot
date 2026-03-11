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
import { BaseInteraction, Client, Collection, Events, GuildMember, PartialGuildMember, REST, Routes } from 'discord.js'
import { GatewayIntentBits, MessageFlags } from 'discord-api-types/v10'
import { ButtonParams, Command, CustomClient, ModalHandler } from "./types.js";

import pingCommand from './command/ping.js'
import feedingStat from './command/feedingStat.js'
import linkCharacter from "./command/linkCharacter.js";
import myStations from "./command/myStations.js";
import associated from "./buttons/associated.js"
import helpButtons from "./buttons/helpButtons.js";
import associateStat from "./command/associateStat.js"
import helpCommand from "./command/helpCommand.js"
import { APP_ID, SERVER_ID, TOKEN } from "./settings.js";
import { getButtonParams } from "./application/service/buttonParams.js";
import { addMember } from "./application/addMemberHandler.js";
import { removeMember } from "./application/removeMemberHandler.js";
import linkCharacterModal from "./modals/linkCharacterModal.js";

const commands: Array<Command> = [
    pingCommand,
    helpCommand,
    feedingStat,
    linkCharacter,
    myStations,
    associateStat,
];
const buttons: Array<Command> = [
    associated,
    helpButtons,
]

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences]
}) as CustomClient;
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.cooldowns = new Collection();

const modals: Array<ModalHandler> = [linkCharacterModal];
modals.forEach((modal: ModalHandler) => client.modals.set(modal.name, modal));
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
    console.log('Started refreshing application (/) commands.')
    client.commands.map((command: Command) => console.log(`Command: ${command.data.name}`))
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
    if (error instanceof Error) {
        console.error(`Register command error: ${error.name} | ${error.message}`);
    }
    console.error(`register commands: ${error}`);
}

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
    let command: Command | undefined = undefined
    if (interaction.isChatInputCommand()) {
        command = client.commands.get(interaction.commandName);
        console.log(`Interaction command: ${command}`)
        //console.log(command)
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    } else if (interaction.isButton()) {
        const button: ButtonParams = getButtonParams(interaction.customId)
        console.log(`Interaction button: ${interaction.customId}, ${button}`)
        command = client.buttons.get(button.name);
        if (!command) {
            console.error(`No command matching ${button} was found.`);
            return;
        }
    } else if (interaction.isModalSubmit()) {
        const modal: ModalHandler | undefined = client.modals.get(interaction.customId);
        if (!modal) {
            console.error(`No modal handler matching ${interaction.customId} was found.`);
            return;
        }
        try {
            await modal.execute(interaction);
        } catch (error) {
            console.error(`Modal execute exception: ${error}`);
        }
        return;
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
                    content: `Please wait, you are on a cooldown for \`${command.data.name}\`. ` +
                        `You can use it again in <t:${expiredTimestamp}:R>.`,
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
        if (error instanceof Error) {
            console.error(`Register command error: ${error.name} | ${error.message} | ${error.cause}`);
        }
    }
});

client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    try {
        await addMember(member);
    } catch (error) {
        console.error(`exception: ${error}`);
    }
})
client.on(Events.GuildMemberRemove, async (member: GuildMember | PartialGuildMember) => {
    try {
        await removeMember(member);
    } catch (error) {
        console.error(`exception: ${error}`);
    }
})

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient: Client) => {
    console.log(`Ready!\nLogged in as ${readyClient?.user?.tag}`);
});
client.login(TOKEN)
