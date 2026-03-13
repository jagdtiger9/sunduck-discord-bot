import { Translation } from '../types.js';

const fr: Translation = {
    common: {
        cooldown: 'Veuillez patienter, `{command}` est en recharge. Disponible {time}.',
        error: 'Une erreur est survenue.',
    },
    commands: {
        ping: {
            description: 'Répond avec Pong !',
            reply: 'Pong !',
        },
        services: {
            description: 'Panneau des services utiles',
            title: 'Services du bot Sunduck',
            intro: 'Les services les plus utiles pour profiter de toutes les opportunités.\n\u200B',
            linkCharName: '🔗 Lier un personnage 🦆',
            linkCharValue: 'Liez votre personnage en jeu — `/link_character`\n\u200B_confirmation du modérateur requise_',
            stationsName: 'ℹ️ Stations associées 🦆',
            stationsValue: 'Obtenez la liste des stations associées — `/my_stations`\n\u200B',
            webName: '🌐 Interface web 🦆',
            webValue: 'Accédez à tous les services sur le site — https://albion.neogudilap.ru',
            btnLinkChar: '🔗 Lier un personnage 🦆',
            btnStations: 'ℹ️ Mes stations 🦆',
            btnWeb: '🌐 Site web 🦆',
        },
        feedingStat: {
            description: "Statistiques d'approvisionnement des stations",
            optWeekDesc: 'Sélectionner la semaine',
            choiceCurrent: 'Semaine actuelle',
            choiceLast: 'Semaine dernière',
            sending: 'Envoi des statistiques...',
            statCurrent: '...statistiques actuelles...',
        },
        linkCharacter: {
            description: 'Lier un personnage en jeu à votre compte',
            optNameDesc: 'Nom de votre personnage en jeu',
            awaitingApproval: 'En attente de confirmation du modérateur',
            checkExistence: "[Vérifier l'existence du personnage](https://albion.neogudilap.ru/en/finder)",
            notifyTitle: 'Demande de liaison de personnage',
            notifyDesc: '[Approuver](https://albion.neogudilap.ru/ru/admin/users)',
            notifyFieldUser: 'Utilisateur',
            notifyFieldCharacter: 'Personnage',
        },
        myStations: {
            description: 'Obtenir les stations associées à vos personnages',
            title: 'Sélectionnez un personnage pour voir ses stations associées',
            noCharacters: "Aucun personnage trouvé. Utilisez `/link_character` d'abord.",
        },
        associateStat: {
            description: 'Obtenir les statistiques des associés',
            optFilterDesc: 'Top / Bas / Top semaine actuelle',
            optTypeDesc: 'Artisanat / PvP / PvE / Collecte',
            choiceTop: 'Top',
            choiceLow: 'Bas',
            choiceTopCurrent: 'Top actuel',
            titleTop: 'Top 10 {type} !',
            titleLow: '10 artisans modestes',
            descTop: 'Personnages avec le taux {type} le plus élevé la semaine dernière',
            descLow: "Personnages avec le taux d'artisanat le plus bas sur 3 semaines",
            descCurrent: 'Personnages avec le taux {type} le plus élevé cette semaine',
            noData: 'Aucun personnage classé',
            typeCrafters: 'artisans',
            typeKillers: 'combattants',
            typePve: 'guerriers PvE',
            typeGathering: 'collecteurs',
        },
    },
    buttons: {
        associated: {
            description: 'Stations associées au personnage',
            noStations: 'Aucune station associée pour votre personnage',
            footer: "[N] — numéro de parcelle\nA — pour l'alliance, G — pour la guilde",
        },
    },
    modals: {
        linkCharacter: {
            title: 'Lier un personnage en jeu',
            label: 'Nom du personnage',
            placeholder: 'Entrez le nom exact de votre personnage en jeu',
        },
    },
    events: {
        memberJoin: '**{name}** — <@{id}> — a rejoint le serveur',
        memberLeave: '**{name}** — <@{id}> — a quitté le serveur',
    },
};

export default fr;
