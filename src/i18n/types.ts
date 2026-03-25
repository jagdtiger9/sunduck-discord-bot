export interface Translation {
    common: {
        cooldown: string
        error: string
    }
    commands: {
        ping: {
            description: string
            reply: string
        }
        services: {
            description: string
            title: string
            intro: string
            linkCharName: string
            linkCharValue: string
            stationsName: string
            stationsValue: string
            webName: string
            webValue: string
            btnLinkChar: string
            btnStations: string
            btnWeb: string
        }
        feedingStat: {
            description: string
            optWeekDesc: string
            choiceCurrent: string
            choiceLast: string
            sending: string
            statCurrent: string
        }
        linkCharacter: {
            description: string
            optNameDesc: string
            awaitingApproval: string
            checkExistence: string
            notifyTitle: string
            notifyDesc: string
            notifyFieldUser: string
            notifyFieldCharacter: string
        }
        modLinkCharacter: {
            description: string
            optNameDesc: string
            optCharacterDesc: string
        }
        myStations: {
            description: string
            title: string
            noCharacters: string
        }
        associateStat: {
            description: string
            optFilterDesc: string
            optTypeDesc: string
            choiceTop: string
            choiceLow: string
            choiceTopCurrent: string
            titleTop: string
            titleLow: string
            descTop: string
            descLow: string
            descCurrent: string
            noData: string
            typeCrafters: string
            typeKillers: string
            typePve: string
            typeGathering: string
        },
        client: {
            description: string,
            optNameDesc: string
        }
    }
    buttons: {
        associated: {
            description: string
            noStations: string
            footer: string
        }
    }
    modals: {
        linkCharacter: {
            title: string
            label: string
            placeholder: string
        }
    }
    events: {
        memberJoin: string
        memberLeave: string
    }
}
