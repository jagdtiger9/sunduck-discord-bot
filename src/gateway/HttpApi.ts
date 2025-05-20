import { FeedingStat, LinkResult } from "../types.js";
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

export function linkCharacter(user: User, characterName: string): Promise<any> {
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
    })
        // the JSON body is taken from the response
        .then(async (result) => {
            const body = await result.json()
            return {
                status: result.ok,
                statusText: result.statusText,
                message: body.message,
            } as LinkResult
        })
}

export function associatesStations(user: User): Promise<any> {
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
            discordName: user.username,
        }),
    })
        // the JSON body is taken from the response
        .then(async (result) => result.json())
        .then(result => {
            return result
        })
}
