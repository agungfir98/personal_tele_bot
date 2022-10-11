var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Ide from "../../model/Ide.model.js";
import { TextCatetan } from "../../utils/TextUtils.js";
import { bot } from "../../index.js";
import { checkIsOwner } from "../../utils/isBotOwner.js";
export const getCatetan = (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
    checkIsOwner(msg.chat.id);
    Ide.find()
        .then((res) => {
        bot.sendMessage(msg.chat.id, TextCatetan(res));
    })
        .catch(() => {
        bot.sendMessage(msg.chat.id, "ada yang salah di DB");
    });
});
export const createCatetan = (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
    checkIsOwner(msg.chat.id);
    const chatId = msg.chat.id;
    const storedData = new Ide({ name: match[1] });
    storedData
        .save()
        .then(() => {
        bot.sendMessage(chatId, "berhasil");
    })
        .catch(() => {
        bot.sendMessage(chatId, "Oops, layanan lagi tidak tersedia.");
    });
});
//# sourceMappingURL=index.js.map