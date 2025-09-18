import { Character, CharacterAggregatedStat, CharacterPermissions, DirectionFilter, FeedingStat, PeriodFilter, RequestResult, TypeFilter } from "../types.js";
import { API_ACCESS_TOKEN, API_BASE_URI } from "../settings.js";
import { User } from "discord.js";

export function getFeedingStat(week: string): Promise<FeedingStat> {
    // const params = new URLSearchParams();
    // params.append("username", "example");
    // // GET request sent to https://example.org/login?username=example
    // return fetch(`${API_BASE_URI}/api/dc/feeding?${params}`);
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("access-token", API_ACCESS_TOKEN)
    // For now, consider the data is stored on a static `users.json` file
    return fetch(`${API_BASE_URI}/bot/feeding`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ 'week': week }),
    })
        // the JSON body is taken from the response
        .then(res => res.json())
        .then(res => {
            // The response has an `any` type, so we need to cast
            // it to the `User` type, and return it from the promise
            return res as FeedingStat
        })
}

export function linkCharacter(user: User, characterName: string): Promise<RequestResult<string>> {
    // const params = new URLSearchParams();
    // params.append("username", "example");
    // // GET request sent to https://example.org/login?username=example
    // return fetch(`${API_BASE_URI}/api/dc/feeding?${params}`);
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Accept", "application/json");
    requestHeaders.append("access-token", API_ACCESS_TOKEN)
    // For now, consider the data is stored on a static `users.json` file
    return fetch(`${API_BASE_URI}/bot/linkCharacter`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
            id: user.id,
            discordName: user.username,
            name: user.globalName,
            character: characterName
        }),
    }).then(async (result) => {
        const body = await result.json()
        return {
            status: result.ok,
            statusText: result.statusText,
            message: body.message,
            data: '',
        } as RequestResult<string>
    })
}

export function linkedCharacters(user: User): Promise<RequestResult<Character[]>> {
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Accept", "application/json");
    requestHeaders.append("access-token", API_ACCESS_TOKEN)

    return fetch(`${API_BASE_URI}/bot/linkedCharacters`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
            id: user.id,
        }),
    }).then(async (result) => {
        const body = await result.json()
        return {
            status: result.ok,
            statusText: result.statusText,
            message: result.ok ? 'ok' : body.message,
            data: (result.ok ? body : []) as Character[],
        } as RequestResult<Character[]>
    })
}

export function associatesStations(user: User, character: string): Promise<RequestResult<CharacterPermissions>> {
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Accept", "application/json");
    requestHeaders.append("access-token", API_ACCESS_TOKEN)
    // For now, consider the data is stored on a static `users.json` file
    return fetch(`${API_BASE_URI}/bot/associateStations`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
            id: user.id,
            character,
        }),
    }).then(async (result) => {
        // the JSON body is taken from the response
        const body = await result.json()
        return {
            status: result.ok,
            statusText: result.statusText,
            message: result.ok ? 'ok' : body.message,
            data: (result.ok ? body : {}) as CharacterPermissions,
        } as RequestResult<CharacterPermissions>
    })
}

export function associateStatistics(
    direction: DirectionFilter,
    period: PeriodFilter,
    type: TypeFilter
): Promise<RequestResult<CharacterAggregatedStat[]>> {
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Accept", "application/json");
    requestHeaders.append("access-token", API_ACCESS_TOKEN)
    // For now, consider the data is stored on a static `users.json` file
    console.log(JSON.stringify({
        direction: direction,
        period: period,
        type: type,
    }))
    return fetch(`${API_BASE_URI}/bot/associateStat`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
            direction: direction,
            period: period,
            type: type,
        }),
    }).then(async (result) => {
        // the JSON body is taken from the response
        const body = await result.json()
        return {
            status: result.ok,
            statusText: result.statusText,
            message: result.ok ? 'ok' : body.message,
            data: (result.ok ? body : []) as CharacterAggregatedStat[],
        } as RequestResult<CharacterAggregatedStat[]>
    })
}
