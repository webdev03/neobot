import { commands } from "./commands";
import type { CommandData } from "./types";
import {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  MessageFlags
} from "discord.js";

const commandsCollection = new Collection<string, CommandData>();
for (const cmd of commands) commandsCollection.set(cmd.data.name, cmd);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Slash command handler
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = commandsCollection.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
