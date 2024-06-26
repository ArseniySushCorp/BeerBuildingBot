import { Bot, session } from "grammy";
import { DenoKVAdapter } from "grammy/storage";

import { AppContext } from "./domain/index.ts";
import AppModule from "./modules/index.ts";
import { initialStorage } from "./utils/initial-storage.ts";
import { COMMAND_DESCRIPTION } from "./utils/command-description.ts";

if (Deno.env.get("MODE") !== "production") {
  await import("deno:dotenv/load");
}

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

if (!BOT_TOKEN) throw new Error("Missing BOT_TOKEN env");

const bot = new Bot<AppContext>(BOT_TOKEN);
const kv = await Deno.openKv();

bot.use(
  session({
    initial: initialStorage,
    storage: new DenoKVAdapter(kv),
  }),
);

bot.use(AppModule);

bot.api.setMyCommands(COMMAND_DESCRIPTION);

bot.catch((err) => console.error(err.error));

export { bot };
