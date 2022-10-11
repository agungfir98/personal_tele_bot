import { Message } from "node-telegram-bot-api";
import { bot } from "../../index.js";
import Balance from "../../model/balance.model.js";
import { HistoryBalance } from "../../model/balanceHistory.model.js";
import { checkIsOwner } from "../../utils/isBotOwner.js";
import { historyString } from "../../utils/TextUtils.js";

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
  checkIsOwner(chatId);
  Balance.find()
    .then((res) => {
      if (!res.length)
        return bot.sendMessage(
          chatId,
          'belum ada catetan, gunakan command "set balance (nama bank) (saldo)"'
        );
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
  checkIsOwner(chatId);

  Balance.findOne({ bank: setring })
    .populate({ path: "history", model: "History" })
    .then((res) => {
      const isEmpty = res.history.length;

      !isEmpty && bot.sendMessage(chatId, "No records");

      bot.sendMessage(chatId, historyString(res.history));
    })
    .catch((err) => {
      bot.sendMessage(chatId, `${err}`);
    });
};

export const handleNarik = (msg: Message, match: RegExpMatchArray) => {
  const chatId = msg.chat.id;
  const fullText = match[0];
  const body = match[1];

  if (body.split(" ").length > 1) {
    return bot.sendMessage(chatId, "format salah");
  }
  bot.sendMessage(chatId, JSON.stringify(match));

  const value = parseInt(body);
  Balance.findOne({ bank: "BNI" })
    .then((res) => {
      return new HistoryBalance({
        title: "narik bank",
        type: "tarik_tunai",
        value: value,
        balance: res.balance,
        balance_left: res.balance - value,
        in_wallet: res.in_wallet,
        in_wallet_left: res.in_wallet + value,
        bank: res._id,
      }).save();
    })
    .then(async (res) => {
      await Balance.findOneAndUpdate(
        { bank: "BNI" },
        {
          $inc: { in_wallet: +value, balance: -value },
          $push: { history: res._id },
        },
        { new: true }
      );
      bot.sendMessage(
        chatId,
        `Berhasil menyimpan.\n\nitem: ${res.title}\ntype: ${res.type}\nvalue: Rp.${res.value}\nsisa balance: Rp.${res.balance_left}\ntanggal: ${res.date}`
      );
    })
    .catch((err) => {
      console.log(err);
      bot.sendMessage(chatId, "validasi error ngab, coba cek rekening deh.");
    });
};
