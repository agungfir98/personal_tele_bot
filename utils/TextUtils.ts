import { balanceHistory, Ide } from "../types/type.js";

export const TextCatetan = (res: Ide[]): string => {
  const daftar = res.map((v, i) => {
    return `${i + 1}. ${v.name}\n`;
  });
  return `Daftar catetanmu:\n\n${daftar.join("")}`;
};

export const historyString = (res: balanceHistory[]): string => {
  const list = res.map((v, i) => {
    return `${i + 1}. [${v.type}] ${v.title} Rp.${
      v.value
    } Tanggal: ${v.date.toString()}.\n\n`;
  });

  return `Ingfo:\n\n${list.join("")}`;
};
