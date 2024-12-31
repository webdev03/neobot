import { all, create } from "mathjs";

import { SlashCommandBuilder } from "discord.js";
import type { CommandData } from "../types";

export default {
  data: new SlashCommandBuilder()
    .setName("math-eval")
    .setDescription("Evaluates a mathematical expression!")
    .addStringOption((option) =>
      option
        .setName("expression")
        .setDescription("The expression to evaluate")
        .setRequired(true)
    ),
  async execute(interaction) {
    const expression = interaction.options.getString("expression", true);
    const math = create(all, {
      precision: 64,
      number: "bigint"
    });
    await interaction.reply(
      "`" + expression + "` = `" + math.evaluate(expression) + "`"
    );
  }
} as CommandData;
