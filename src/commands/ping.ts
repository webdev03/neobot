import { SlashCommandBuilder } from "discord.js";
import type { CommandData } from "../types";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply("Pong! :D");
  }
} as CommandData;
