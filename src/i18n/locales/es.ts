import { Translation } from '../types.js';

const es: Translation = {
    common: {
        cooldown: 'Por favor espera, `{command}` está en recarga. Podrás usarlo de nuevo {time}.',
        error: 'Algo salió mal.',
    },
    commands: {
        ping: {
            description: '¡Responde con Pong!',
            reply: '¡Pong!',
        },
        services: {
            description: 'Panel de servicios útiles',
            title: 'Servicios del bot Sunduck',
            intro: 'Los servicios más útiles para aprovechar al máximo tus oportunidades.\n\u200B',
            linkCharName: '🔗 Vincular personaje 🦆',
            linkCharValue: 'Vincula tu personaje del juego — `/link_character`\n\u200B_requiere confirmación del moderador_',
            stationsName: 'ℹ️ Estaciones asociadas 🦆',
            stationsValue: 'Obtén la lista de estaciones asociadas a tus personajes — `/my_stations`\n\u200B',
            webName: '🌐 Interfaz web 🦆',
            webValue: 'Accede a todos los servicios en el sitio web — https://albion.neogudilap.ru',
            btnLinkChar: '🔗 Vincular personaje 🦆',
            btnStations: 'ℹ️ Mis estaciones 🦆',
            btnWeb: '🌐 Sitio web 🦆',
        },
        feedingStat: {
            description: 'Estadísticas de abastecimiento de estaciones',
            optWeekDesc: 'Seleccionar semana',
            choiceCurrent: 'Semana actual',
            choiceLast: 'Semana pasada',
            sending: 'Enviando estadísticas...',
            statCurrent: '...estadísticas actuales...',
        },
        linkCharacter: {
            description: 'Vincular un personaje del juego a tu cuenta',
            optNameDesc: 'Nombre de tu personaje en el juego',
            awaitingApproval: 'Esperando aprobación del moderador',
            checkExistence: '[Verificar existencia del personaje](https://albion.neogudilap.ru/en/finder)',
            notifyTitle: 'Solicitud de vinculación de personaje',
            notifyDesc: '[Aprobar](https://albion.neogudilap.ru/ru/admin/users)',
            notifyFieldUser: 'Usuario',
            notifyFieldCharacter: 'Personaje',
        },
        myStations: {
            description: 'Obtener estaciones asociadas a tus personajes',
            title: 'Selecciona un personaje para ver sus estaciones asociadas',
            noCharacters: 'No se encontraron personajes. Usa `/link_character` primero.',
        },
        associateStat: {
            description: 'Obtener estadísticas de asociados',
            optFilterDesc: 'Mejor valorados / Peor valorados / Mejor esta semana',
            optTypeDesc: 'Artesanía / PvP / PvE / Recolección',
            choiceTop: 'Top',
            choiceLow: 'Bajo',
            choiceTopCurrent: 'Top actual',
            titleTop: '¡Top 10 {type}!',
            titleLow: '10 artesanos modestos',
            descTop: 'Personajes con el mayor índice de {type} la semana pasada',
            descLow: 'Personajes con el menor índice de artesanía en las últimas 3 semanas',
            descCurrent: 'Personajes con el mayor índice de {type} esta semana',
            noData: 'No hay personajes clasificados',
            typeCrafters: 'artesanos',
            typeKillers: 'combatientes',
            typePve: 'guerreros PvE',
            typeGathering: 'recolectores',
        },
        client: {
            description: 'Register client',
            optNameDesc: 'Client Discord ID',
        },
    },
    buttons: {
        associated: {
            description: 'Estaciones asociadas al personaje' +
                '\n\u200B[Herramientas para manualidades](https://albion.neogudilap.ru)',
            noStations: 'No hay estaciones asociadas para tu personaje',
            footer: '[N] — número de parcela\nA — para alianza, G — para gremio'
        },
    },
    modals: {
        linkCharacter: {
            title: 'Vincular personaje del juego',
            label: 'Nombre del personaje',
            placeholder: 'Introduce el nombre exacto de tu personaje en el juego',
        },
    },
    events: {
        memberJoin: '**{name}** — <@{id}> — se ha unido al servidor',
        memberLeave: '**{name}** — <@{id}> — ha abandonado el servidor',
    },
};

export default es;
