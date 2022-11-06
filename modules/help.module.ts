import { Composer } from "grammy";
import { AppContext } from "../domain/index.ts";
import { Command, COMMAND_DESCRIPTION } from "../utils/index.ts";

const composer = new Composer<AppContext>();

const commandsList = Object.entries(Command).map(([_, value]) =>
  `- /${value}: ${COMMAND_DESCRIPTION[value]}\n`
).join("");

composer.command(Command.HELP, (ctx) => {
  ctx.reply(commandsList);
});

export default composer;
