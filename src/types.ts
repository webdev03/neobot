import type { ChatInputCommandInteraction, CacheType, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from "discord.js"

export interface CommandData {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
}
