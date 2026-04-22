import {
    Character, CharacterAggregatedStat, CharacterPermissions, ClientStat,
    DirectionFilter, FeedingStat, PeriodFilter, RequestResult, TypeFilter
} from "../types.js";
import { API_ACCESS_TOKEN, API_BASE_URI } from "../settings.js";
import { User } from "discord.js";

const baseHeaders = new Headers({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "access-token": API_ACCESS_TOKEN,
});

async function post<T>(path: string, payload: object): Promise<{ response: Response, body: T }> {
    const response = await fetch(`${API_BASE_URI}${path}`, {
        method: "POST",
        headers: baseHeaders,
        body: JSON.stringify(payload),
    });
    const body = await response.json() as T;
    return { response, body };
}

interface ApiBody {
    message: string;
}

async function postResult<T>(path: string, payload: object, emptyData: T): Promise<RequestResult<T>> {
    const { response, body } = await post<T & ApiBody>(path, payload);
    return {
        status: response.ok,
        statusText: response.statusText,
        message: response.ok ? 'ok' : body.message,
        data: response.ok ? body : emptyData,
    };
}

export async function getFeedingStat(week: string): Promise<FeedingStat> {
    const { body } = await post<FeedingStat>('/bot/feeding', { week });
    return body;
}

export async function linkCharacter(user: User, characterName: string): Promise<RequestResult<string>> {
    return postResult<string>('/bot/linkCharacter', {
        id: user.id,
        discordName: user.username,
        name: user.globalName || user.username,
        character: characterName,
    }, '');
}

export async function modLinkCharacter(user: User, characterName: string): Promise<RequestResult<string>> {
    return postResult<string>('/bot/modLinkCharacter', {
        id: user.id,
        discordName: user.username,
        name: user.globalName || user.username,
        character: characterName,
    }, '');
}

export function linkedCharacters(user: User): Promise<RequestResult<Character[]>> {
    return postResult<Character[]>('/bot/linkedCharacters', { id: user.id }, []);
}

export function associatesStations(user: User, character: string): Promise<RequestResult<CharacterPermissions>> {
    return postResult<CharacterPermissions>('/bot/associateStations', { id: user.id, character }, {} as CharacterPermissions);
}

export function associateStatistics(
    direction: DirectionFilter,
    period: PeriodFilter,
    type: TypeFilter,
    limit: number,
): Promise<RequestResult<CharacterAggregatedStat[]>> {
    return postResult<CharacterAggregatedStat[]>('/bot/associateStat', { direction, period, type, limit }, []);
}

export async function registerClient(user: User, channelId: string): Promise<RequestResult<string>> {
    return postResult<string>('/bot/registerClient', {
        id: user.id,
        discordName: user.username,
        name: user.globalName || user.username,
        channelId,
    }, '');
}

export async function clientStat(user: User): Promise<RequestResult<ClientStat>> {
    return postResult<ClientStat>('/bot/clientStat', {
        id: user.id,
    }, {} as ClientStat);
}
