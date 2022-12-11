import { readFileSync } from "fs";

const input = readFileSync("./puzzle-one/input.txt", { encoding: "utf-8" });

const inputByElf = input.split("\n\n");

const parsedByElf = inputByElf
  .map(rawInputs => rawInputs.split("\n").map(rawInput => Number(rawInput)));

const elfCalories = parsedByElf.map(elfCalories => elfCalories.reduce((total, colory) => {
  return total + colory
}, 0))


const sortedCalories = [...elfCalories].sort((a, b) => b - a);

const topThree = [sortedCalories[0], sortedCalories[1], sortedCalories[2]];

console.log(sortedCalories[0] + sortedCalories[1] + sortedCalories[2])
