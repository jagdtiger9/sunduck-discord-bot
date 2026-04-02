import { Translation } from '../types.js';

const en: Translation = {
    common: {
        cooldown: 'Please wait, `{command}` is on cooldown. You can use it again {time}.',
        error: 'Something went wrong.',
    },
    commands: {
        ping: {
            description: 'Replies with Pong!',
            reply: 'Pong!',
        },
        services: {
            description: 'Useful services panel',
            title: 'Sunduck bot services',
            intro: 'The most useful services to get all the opportunities.\n\u200B',
            linkCharName: '🔗 Link character 🦆',
            linkCharValue: 'Link your in-game character to manage it — `/link_character`\n\u200B_moderator confirmation required_',
            stationsName: 'ℹ️ Associated stations 🦆',
            stationsValue: 'Get an associated stations list for your linked characters — `/my_stations`\n\u200B',
            webName: '🌐 Web interface 🦆',
            webValue: 'Access all services via the web site — https://albion.neogudilap.ru',
            btnLinkChar: '🔗 Link character 🦆',
            btnStations: 'ℹ️ My stations 🦆',
            btnWeb: '🌐 Web site 🦆',
        },
        feedingStat: {
            description: 'Stations feeding statistics',
            optWeekDesc: 'Select stat week',
            choiceCurrent: 'Current week',
            choiceLast: 'Last week',
            sending: 'Sending statistics...',
            statCurrent: '...current statistics...',
        },
        linkCharacter: {
            description: 'Link an in-game character to your account',
            optNameDesc: 'Your in-game character name',
            awaitingApproval: 'Awaiting moderator approval',
            checkExistence: '[Check character existence](https://albion.neogudilap.ru/en/finder)',
            notifyTitle: 'Character link request',
            notifyDesc: '[Approve](https://albion.neogudilap.ru/ru/admin/users)',
            notifyFieldUser: 'User',
            notifyFieldCharacter: 'Character',
        },
        modLinkCharacter: {
            description: 'Link an in-game character to an account',
            optNameDesc: 'Discord name',
            optCharacterDesc: 'Character name'
        },
        myStations: {
            description: 'Get associated stations for your in-game characters',
            title: 'Select a character to view their associated stations',
            noCharacters: 'No characters found. Use `/link_character` first.',
        },
        associateStat: {
            description: 'Get associates statistics',
            optFilterDesc: 'Top rated / Low rated / Top rated this week',
            optTypeDesc: 'Craft / PvP / PvE / Gathering',
            choiceTop: 'Top',
            choiceLow: 'Low',
            choiceTopCurrent: 'Top current',
            titleTop: 'Top 10 {type}!',
            titleLow: 'Modest 10 crafters',
            descTop: 'Characters with the highest {type} rate for the last week',
            descLow: 'Characters with the lowest craft rate for the last 3 weeks',
            descCurrent: 'Characters with the highest {type} rate for the current week',
            noData: 'No rated characters',
            typeCrafters: 'crafters',
            typeKillers: 'killers',
            typePve: 'PvE beasts',
            typeGathering: 'harvesters',
        },
        client: {
            description: 'Register client',
            optCommandDesc: 'Command',
            optNameDesc: 'Client Discord ID',
        },
    },
    buttons: {
        associated: {
            description: 'Character associated stations' +
                '\n\u200B[Craft tools](https://albion.neogudilap.ru)',
            noStations: 'No associated stations for your character',
            footer: '[N] — plot number\nA — for alliance, G — for guild',
        },
    },
    modals: {
        linkCharacter: {
            title: 'Link in-game character',
            label: 'Character name',
            placeholder: 'Enter your exact in-game character name',
        },
    },
    events: {
        memberJoin: '**{name}** — <@{id}> — has joined the server',
        memberLeave: '**{name}** — <@{id}> — has left the server',
    },
};

export default en;
