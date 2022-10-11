import { bot } from "../index.js";
export function checkIsOwner(chatId) {
    const { OWNER } = process.env;
    if (OWNER !== chatId.toString()) {
        bot.sendMessage(chatId, "ga blh msk! 😜");
    }
    return;
}
//# sourceMappingURL=isBotOwner.js.map