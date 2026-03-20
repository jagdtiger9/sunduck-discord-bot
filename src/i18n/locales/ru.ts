import { Translation } from '../types.js';

const ru: Translation = {
    common: {
        cooldown: 'Повторное выполнение команды `{command}` будет доступно через {time}.',
        error: 'Что-то пошло не так.',
    },
    commands: {
        ping: {
            description: 'Ответит Pong!',
            reply: 'Pong!',
        },
        services: {
            description: 'Сервисная панель',
            title: 'Сервисы Sunduck бота',
            intro: 'Полезные информационные сервисы.\n\u200B',
            linkCharName: '🔗 Привязка персонажа 🦆',
            linkCharValue: 'Привяжите игрового персонажа для — `/link_character`\n\u200B_требуется подтверждение модератора_',
            stationsName: 'ℹ️ Скидки на крафт 🦆',
            stationsValue: 'Скидки доступные вашим персонажам — `/my_stations`',
            webName: '🌐 Веб-интерфейс 🦆',
            webValue: 'Все сервисы доступны на сайте — https://albion.neogudilap.ru',
            btnLinkChar: '🔗 Привязать персонажа 🦆',
            btnStations: 'ℹ️ Мои скидки 🦆',
            btnWeb: '🌐 Сайт 🦆',
        },
        feedingStat: {
            description: 'Статистика кормления станций',
            optWeekDesc: 'Выберите неделю',
            choiceCurrent: 'Текущая неделя',
            choiceLast: 'Прошлая неделя',
            sending: 'Отправляю статистику...',
            statCurrent: '...текущая статистика...',
        },
        linkCharacter: {
            description: 'Привязать игрового персонажа к аккаунту',
            optNameDesc: 'Имя вашего игрового персонажа',
            awaitingApproval: 'Ожидает подтверждения модератора',
            checkExistence: '[Проверить существование персонажа](https://albion.neogudilap.ru/ru/finder)',
            notifyTitle: 'Заявка на привязку персонажа',
            notifyDesc: '[Подтвердить](https://albion.neogudilap.ru/ru/admin/users)',
            notifyFieldUser: 'Пользователь',
            notifyFieldCharacter: 'Персонаж',
        },
        myStations: {
            description: 'Получить станции со скидками для ваших персонажей',
            title: 'Выберите персонажа для просмотра станций со скидками',
            noCharacters: 'Персонажи не найдены, используйте `/link_character`.',
        },
        associateStat: {
            description: 'Статистика крафтеров',
            optFilterDesc: 'Топ / Аутсайдеры / Топ текущей недели',
            optTypeDesc: 'Крафт / PvP / PvE / Сбор',
            choiceTop: 'Топ',
            choiceLow: 'Аутсайдеры',
            choiceTopCurrent: 'Топ (неделя)',
            titleTop: 'Топ 10 {type}!',
            titleLow: '10 скромных крафтеров',
            descTop: 'Персонажи с наибольшим рейтингом {type} за прошлую неделю',
            descLow: 'Персонажи с наименьшим рейтингом крафта за последние 3 недели',
            descCurrent: 'Персонажи с наибольшим рейтингом {type} за текущую неделю',
            noData: 'Нет данных',
            typeCrafters: 'крафтеры',
            typeKillers: 'убийцы',
            typePve: 'PvE бойцы',
            typeGathering: 'собиратели',
        },
        client: {
            description: 'Зарегистрировать клиента',
            optNameDesc: 'Дискорд ID клиента',
        },
    },
    buttons: {
        associated: {
            description: 'Скидки персонажа',
            noStations: 'Нет скидок для вашего персонажа',
            footer: '[N] — номер участка\nA — для альянса, G — для гильдии' +
                '\n\u200B[Инструменты для крафтера](https://albion.neogudilap.ru)',
        },
    },
    modals: {
        linkCharacter: {
            title: 'Привязать игрового персонажа',
            label: 'Имя персонажа',
            placeholder: 'Введите точное имя персонажа в игре',
        },
    },
    events: {
        memberJoin: '**{name}** — <@{id}> — присоединился к серверу',
        memberLeave: '**{name}** — <@{id}> — покинул сервер',
    },
};

export default ru;
