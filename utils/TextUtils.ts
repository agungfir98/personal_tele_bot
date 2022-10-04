import { Ide } from "../types/type.js";

export const TextCatetan = (res: Ide[]): string => {
  const daftar = res.map((v, i) => {
    return `${i + 1}. ${v.name}\n`;
  });
  return `Daftar catetanmu:\n\n${daftar.join("")}`;
};
