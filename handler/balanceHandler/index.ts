import { Message } from "node-telegram-bot-api";
import { bot } from "../../index.js";
import Balance from "../../model/balance.model.js";
import { checkIsOwner } from "../../utils/isBotOwner.js";

export const BalanceHandler = async (msg: Message, match: RegExpExecArray) => {
  const chatId = msg.chat.id;
  const data = match[1].split(" ");
  const balanceObj: { bank: string; balance: number } = {
    bank: data[0].toUpperCase(),
    balance: parseInt(data[1]),
  };

  checkIsOwner(chatId);

  Balance.findOne({ bank: balanceObj.bank })
    .then((res) => {
      if (res) {
        throw new Error("Sudah ada ges");
      } else {
        const newData = new Balance(balanceObj);
        return newData.save();
      }
    })
    .then((res) => {
      bot.sendMessage(
        chatId,
        `Berhaisl menyimpan data:
\n\n${res}`
      );
    })
    .catch((err) => {
      bot.sendMessage(chatId, `${err}`);
    });
};

export const getBalance = async (msg: Message, match: RegExpMatchArray) => {
  const chatId = msg.chat.id;
  Balance.find()
    .then((res) => {
      res.map((v) => {
        v.bank;
      });
      bot.sendMessage(
        chatId,
        `List: \n\n${res.map((v) => {
          return `${v.bank}: Rp.${v.balance} /see_history_${v.bank}`;
        })}`
      );
    })
    .catch((err) => {
      bot.sendMessage(chatId, `${err}`);
    });
};

export const getSpecificBalance = async (
  msg: Message,
  match: RegExpMatchArray
) => {
  const chatId = msg.chat.id;
  const setring = match[1];

  Balance.findOne({ bank: setring })
    .populate({ path: "history", model: "History" })
    .then((res) => {
      const isEmpty = res.history.length;

      !isEmpty && bot.sendMessage(chatId, "No records");

      // bot.sendMessage(
      //   chatId,
      //   `Ingfo:
      // \n\n${res.history.map((v) => {
      //   return `- ${v.title} ${v.value} ${v.date.toLocaleDateString()}\n`;
      // })}`
      // );
    })
    .catch((err) => {
      bot.sendMessage(chatId, `${err}`);
    });
};
