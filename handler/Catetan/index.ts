import { bot } from "../../index.js";
import Ide from "../../model/Ide.model.js";
import { TextCatetan } from "../../utils/TextUtils.js";

export const HandlerCatetan = (chatId: number) => {
  // * GET ALL Catetan
  bot.onText(/\/catetan/, async () => {
    Ide.find()
      .then((res) => {
        bot.sendMessage(chatId, TextCatetan(res));
      })
      .catch((err) => {
        bot.sendMessage(chatId, "ada yang salah di DB");
      });
  });

  // * Nulis Catetan
  bot.onText(/catet (.+)/i, async (_, match) => {
    const catetanBaru = new Ide({ name: match[1] });
    catetanBaru
      .save()
      .then((res) => {
        console.log(res);
        bot.sendMessage(chatId, match[1]);
      })
      .catch((err) => {
        console.log({ error: "eror", msg: err });
        bot.sendMessage(chatId, err);
      });
  });
};
