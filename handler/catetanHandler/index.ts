import Ide from "../../model/Ide.model.js";
import { TextCatetan } from "../../utils/TextUtils.js";
import { bot } from "../../index.js";
import { checkIsOwner } from "../../utils/isBotOwner.js";

export const getCatetan = async (msg, match) => {
  checkIsOwner(msg.chat.id);
  Ide.find()
    .then((res) => {
      bot.sendMessage(msg.chat.id, TextCatetan(res));
    })
    .catch(() => {
      bot.sendMessage(msg.chat.id, "ada yang salah di DB");
    });
};

export const createCatetan = async (msg, match) => {
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
};
