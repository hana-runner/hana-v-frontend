import { ReactNode } from "react";

interface Prop {
  length: number;
  character: string | ReactNode;
}

const BlindedInput = ({ length, character }: Prop) => {
  return Array(length)
    .fill(null)
    .map((item) => {
      return character;
    });
};

export default BlindedInput;
