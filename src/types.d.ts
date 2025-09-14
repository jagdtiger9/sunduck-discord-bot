import * as Discord from "discord.js";
import { Collection } from "discord.js";

export declare class CustomClient extends Discord.Client {
    /** Application command collection */
    public commands: Discord.Collection<string, Command>;
    /** Buttons command collection */
    public buttons: Discord.Collection<string, Command>;
    /** Commands collection */
    public cooldowns: Discord.Collection<string, Collection<string, number>>;
    // public guildInfoCache: Discord.Collection<Discord.Snowflake, GuildInfo>;
    //
    // public userInfoCache: Discord.Collection<Discord.Snowflake, UserInfo>;
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

    // /** Aliases for this command */
    // aliases?: string[];
    //
    // /** The category of this command, default is 'No category' */
    // category: string;
    //
    // /** Whether the cooldown on this command will be globally or for a server only */
    // globalCooldown?: boolean;
    //
    // /** Whether or not this command can be disabled in a server */
    // canNotDisable?: boolean;
    //
    // /** Whether or not users can set a custom command cooldown for this command */
    // canNotSetCooldown?: boolean;
    //
    // /** Whether or not users can add custom aliases for this command */
    // canNotAddAlias?: boolean;
    //
    // /** Whether or not this command will be displayed in the help command */
    // hideCommand?: boolean;
    //
    // /** Whether or not this command will still run in ignored channels */
    // ignoreDisabledChannels?: boolean;
    //
    // /** Permissions that the user needs in order to use this command */
    // perms?: Discord.PermissionResolvable[];
    //
    // /** Permissions that the client needs to run this command */
    // clientPerms?: Discord.PermissionResolvable[];
    //
    // /** Whether or not this command can only be used by a developer */
    // devOnly?: boolean;
    //
    // /** Whether or not this command can only be used in specific servers */
    // someServersOnly?: boolean;
    //
    // /** Whether or not this command can only be used by the server owner */
    // serverOwnerOnly?: boolean;
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
    permissionsMap: PermissionsMap[],
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

export type DirectionFilter = 'asc' | 'desc'
export type PeriodFilter = '3w' | '1w' | 'w' | 'prev' | 'this'
