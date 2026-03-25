import { Translation } from '../types.js';

const de: Translation = {
    common: {
        cooldown: 'Bitte warte, `{command}` ist im Cooldown. Wieder nutzbar {time}.',
        error: 'Etwas ist schiefgelaufen.',
    },
    commands: {
        ping: {
            description: 'Antwortet mit Pong!',
            reply: 'Pong!',
        },
        services: {
            description: 'Nützliches Dienste-Panel',
            title: 'Sunduck Bot-Dienste',
            intro: 'Die nützlichsten Dienste für maximale Möglichkeiten.\n\u200B',
            linkCharName: '🔗 Charakter verknüpfen 🦆',
            linkCharValue: 'Verknüpfe deinen Spielcharakter — `/link_character`\n\u200B_Moderatorbestätigung erforderlich_',
            stationsName: 'ℹ️ Zugeordnete Stationen 🦆',
            stationsValue: 'Stationsliste für deine Charaktere — `/my_stations`\n\u200B',
            webName: '🌐 Web-Interface 🦆',
            webValue: 'Alle Dienste auf der Website — https://albion.neogudilap.ru',
            btnLinkChar: '🔗 Charakter verknüpfen 🦆',
            btnStations: 'ℹ️ Meine Stationen 🦆',
            btnWeb: '🌐 Website 🦆',
        },
        feedingStat: {
            description: 'Stationen-Versorgungsstatistik',
            optWeekDesc: 'Woche auswählen',
            choiceCurrent: 'Aktuelle Woche',
            choiceLast: 'Letzte Woche',
            sending: 'Statistik wird gesendet...',
            statCurrent: '...aktuelle Statistik...',
        },
        linkCharacter: {
            description: 'Spielcharakter mit deinem Konto verknüpfen',
            optNameDesc: 'Name deines Spielcharakters',
            awaitingApproval: 'Wartet auf Moderatorbestätigung',
            checkExistence: '[Charakter prüfen](https://albion.neogudilap.ru/en/finder)',
            notifyTitle: 'Charakterverknüpfungsantrag',
            notifyDesc: '[Bestätigen](https://albion.neogudilap.ru/ru/admin/users)',
            notifyFieldUser: 'Benutzer',
            notifyFieldCharacter: 'Charakter',
        },
        modLinkCharacter: {
            description: 'Link an in-game character to an account',
            optNameDesc: 'Discord name',
            optCharacterDesc: 'Character name'
        },
        myStations: {
            description: 'Zugeordnete Stationen für deine Charaktere',
            title: 'Charakter auswählen um zugeordnete Stationen zu sehen',
            noCharacters: 'Keine Charaktere gefunden. Bitte zuerst `/link_character` nutzen.',
        },
        associateStat: {
            description: 'Assoziiertenstatistik abrufen',
            optFilterDesc: 'Top / Niedrig / Top aktuelle Woche',
            optTypeDesc: 'Handwerk / PvP / PvE / Sammeln',
            choiceTop: 'Top',
            choiceLow: 'Niedrig',
            choiceTopCurrent: 'Top aktuell',
            titleTop: 'Top 10 {type}!',
            titleLow: 'Bescheidene 10 Handwerker',
            descTop: 'Charaktere mit der höchsten {type}-Rate der letzten Woche',
            descLow: 'Charaktere mit der niedrigsten Handwerksrate der letzten 3 Wochen',
            descCurrent: 'Charaktere mit der höchsten {type}-Rate der aktuellen Woche',
            noData: 'Keine bewerteten Charaktere',
            typeCrafters: 'Handwerker',
            typeKillers: 'Kämpfer',
            typePve: 'PvE-Kämpfer',
            typeGathering: 'Sammler',
        },
        client: {
            description: 'Register client',
            optNameDesc: 'Client Discord ID',
        },
    },
    buttons: {
        associated: {
            description: 'Zugeordnete Stationen des Charakters' +
                '\n\u200B[Handwerkswerkzeuge](https://albion.neogudilap.ru)',
            noStations: 'Keine zugeordneten Stationen für deinen Charakter',
            footer: '[N] — Grundstücksnummer\nA — für Allianz, G — für Gilde'
        },
    },
    modals: {
        linkCharacter: {
            title: 'Spielcharakter verknüpfen',
            label: 'Charaktername',
            placeholder: 'Exakten Charakternamen im Spiel eingeben',
        },
    },
    events: {
        memberJoin: '**{name}** — <@{id}> — ist dem Server beigetreten',
        memberLeave: '**{name}** — <@{id}> — hat den Server verlassen',
    },
};

export default de;
