var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bot } from "../index.js";
import { byeText, haloText } from "../keyword.js";
import Balance from "../model/balance.model.js";
import { HistoryBalance } from "../model/balanceHistory.model.js";
import { checkIsOwner } from "../utils/isBotOwner.js";
export const MessageHandler = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const text = msg.text;
    checkIsOwner(chatId);
    switch (true) {
        case byeText.includes(text):
            bot.sendMessage(chatId, "Terima kasih, silahkan hubungi aku lagi dikala perlu! 💗");
            break;
        case haloText.includes(text):
            bot.sendMessage(chatId, `Haloo ${msg.chat.first_name}`);
            break;
        // ** handle Beli ============
        case /beli (.+)/.test(text):
            const beliArray = text.split(" ");
            const type = beliArray[1];
            const name = beliArray[2];
            const value = parseInt(beliArray[3]);
            if (beliArray.length < 4 || beliArray.length > 5) {
                bot.sendMessage(chatId, `format nggak valid. \nformat yangbener "beli (tipe e.g: fnb, fuel, parking, goods) (nama barang) (duit) (harga)"`);
            }
            Balance.findOne({ bank: "BNI" })
                .then((res) => {
                return new HistoryBalance({
                    title: name,
                    type,
                    value,
                    balance: res.balance,
                    balance_left: res.balance,
                    in_wallet: res.in_wallet,
                    in_wallet_left: res.in_wallet - value,
                    bank: res._id,
                }).save();
            })
                .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                yield Balance.findOneAndUpdate({ bank: "BNI" }, { $inc: { in_wallet: -value }, $push: { history: res._id } }, { new: true });
                bot.sendMessage(chatId, `Berhasil menyimpan.\n\nitem: ${res.title}\ntype: ${res.type}\nvalue: Rp.${res.value}\nsisa didompet: Rp.${res.in_wallet_left}\ntanggal: ${res.date}`);
            }))
                .catch((err) => {
                console.log(err);
                bot.sendMessage(chatId, "validasi error ngab, coba cek dompet deh.");
            });
            break;
        default:
            break;
    }
});
//# sourceMappingURL=index.js.map