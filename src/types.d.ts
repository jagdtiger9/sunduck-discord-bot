import * as Discord from "discord.js";
import { Collection } from "discord.js";

export declare class CustomClient extends Discord.Client {
    /** Application command collection */
    public commands: Discord.Collection<string, Command>;
    /** Buttons command collection */
    public buttons: Discord.Collection<string, Command>;
    /** Modal handlers collection */
    public modals: Discord.Collection<string, ModalHandler>;
    /** Commands collection */
    public cooldowns: Discord.Collection<string, Collection<string, number>>;
    // public guildInfoCache: Discord.Collection<Discord.Snowflake, GuildInfo>;
    //
    // public userInfoCache: Discord.Collection<Discord.Snowflake, UserInfo>;
}

export interface ModalHandler {
    name: string;

    execute(interaction: Discord.ModalSubmitInteraction): any;
}

export type ExecuteParameters = {
    client: CustomClient;
    message: Discord.Message;
    args: string[];
    flags: Flags;
}

export type Flags = {
    [id: string]:
        (string | number | Discord.GuildChannel | Discord.Role | Discord.GuildMember | Discord.User)
        | Array<string | number | Discord.GuildChannel | Discord.Role | Discord.GuildMember | Discord.User>
}

export type ButtonParams = {
    name: string,
    param: string,
}

export interface Command {
    /** Command name */
    name: string;

    /** Spam prevent cooldown, per user */
    cooldown?: number;

    data: Discord.SlashCommandBuilder;

    /** Command callback */
    execute(p: Discord.ChatInputCommandInteraction | Discord.ButtonInteraction): any;
}

export interface RequestResult<Type> {
    status: boolean,
    statusText: string,
    message: string,
    data: Type
}

export interface FeedingStat {
    title: string,
    message: '',
    stat: UserStat[],
}

export interface UserStat {
    name: string,
    count: number,
    percentage: number,
    userId: string,
}

export interface Character {
    character: string,
    guild: string,
    alliance: string,
    tag: string,
}

export interface CharacterPermissions {
    character: string,
    hasPermissions: boolean,
    image: string,
}

export interface ClientStat {
    name: string,
    channelId: string,
    link: string,
    characters: CharacterStat[]
}

export interface CharacterStat {
    name: string,
    guild: string,
    isResponsible: 0 | 1,
    isEvaluated: 0 | 1
}

export interface PermissionsMap {
    cityId: string,
    cityName: string,
    stations: { [id: string]: StationsMap }
}

export interface StationsMap {
    station: string,
    stationName: string,
    playerAccess: boolean,
    guildAccess: boolean,
    allianceAccess: boolean,
    plotNum: Array<number>,
}

export type CharacterAggregatedStat = {
    name: string,
    isPersonalRate: boolean,
    week: number,
    twoWeek: number,
    threeWeek: number,
    fourWeek: number,
    thisWeek: number,
    total: number,
    updatedAt: string,
}

export type PingAliveReaction = {
    lastReactedAt: string | null
}

export type PingAliveReactionResult = {
    discordChannelId: string
    message: string
}

export type DirectionFilter = 'asc' | 'desc'
export type PeriodFilter = '3w' | '1w' | 'w' | 'prev' | 'this'
export type TypeFilter = 'craft' | 'pvp' | 'pve' | 'gathering'
export type ClientCommandType = 'stat' | 'set'
