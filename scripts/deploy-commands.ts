// Deploys slash commands

import { commands } from "../src/commands";
import { REST, Routes } from "discord.js";

const commandsData = commands.map((x) => x.data.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

try {
  console.log(
    `Started refreshing ${commandsData.length} application (/) commands.`
  );

  const data = await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    { body: commandsData }
  );

  console.log(
    `Successfully reloaded ${(data as any)["length"]} application (/) commands.`
  );
} catch (error) {
  console.error(error);
}
