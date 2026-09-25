import round from "@/assets/diamonds/round.jpg";
import oval from "@/assets/diamonds/oval.jpg";
import cushion from "@/assets/diamonds/cushion.jpg";
import emerald from "@/assets/diamonds/emerald.jpg";
import radiant from "@/assets/diamonds/radiant.jpg";
import pear from "@/assets/diamonds/pear.jpg";
import princess from "@/assets/diamonds/princess.jpg";
import marquise from "@/assets/diamonds/marquise.jpg";
import asscher from "@/assets/diamonds/asscher.jpg";
import heart from "@/assets/diamonds/heart.jpg";

export const DIAMOND_IMAGES: Record<string, string> = {
  Round: round,
  Oval: oval,
  Cushion: cushion,
  Emerald: emerald,
  Radiant: radiant,
  Pear: pear,
  Princess: princess,
  Marquise: marquise,
  Asscher: asscher,
  Heart: heart,
};

export function diamondImage(shape: string) {
  return DIAMOND_IMAGES[shape] ?? round;
}
