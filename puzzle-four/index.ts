import { readFile } from "fs/promises";

type Range = {
  start: number;
  end: number;
};

function parseRange(str: string): Range {
  const parts = str.split("-");
  if (parts.length !== 2) {
    throw new Error(
      "bad range input : splitting by '-' should return two parts"
    );
  }
  const parsed = parts.map(part => Number(part));
  if (parsed.some(part => isNaN(part))) {
    throw new Error(
      "bad range input : some parts cannot be parsed into number"
    );
  }
  return {
    start: parsed[0],
    end: parsed[1],
  };
}

function isFullyOverlapping([first, second]: [Range, Range]): boolean {
  const secondIsInFirst =
    isInRange(first, second.start) && isInRange(first, second.end);
  const firstIsInSecond =
    isInRange(second, first.start) && isInRange(second, first.end);
  return secondIsInFirst || firstIsInSecond;
}

function isOverlapping([first, second]:[Range, Range]):boolean {
  const secondIsInFirst =
    isInRange(first, second.start) || isInRange(first, second.end);
  const firstIsInSecond =
    isInRange(second, first.start) || isInRange(second, first.end);
  return secondIsInFirst || firstIsInSecond;
}

function isInRange(range: Range, num: number): boolean {
  return num >= range.start && num <= range.end;
}

const input = await readFile("puzzle-four/input.txt", {
  encoding: "utf-8",
});

const lines = input.split("\n");

const elfPairs = lines.map(line => {
  const rangePair = line.split(",").map(item => parseRange(item)) as [
    Range,
    Range
  ];
  return rangePair;
});

const fullyOverlappingPairs = elfPairs.filter(pair => isFullyOverlapping(pair));
const overlappingPairs = elfPairs.filter(pair => isOverlapping(pair))


console.log(overlappingPairs.length);
