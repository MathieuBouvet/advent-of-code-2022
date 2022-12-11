import { readFileSync } from "fs";
import CratesStacks, { Move } from "../puzzle-five/CratesStacks";

function parseMove(str: string): Move | null {
  const matches = str.match(
    /^move (?<quantity>\d+) from (?<from>\d+) to (?<to>\d+)$/
  );
  const capturedRaw = matches?.slice(1) ?? [];
  const captured = capturedRaw.map(raw => Number(raw));
  if (captured.some(nb => isNaN(nb)) || captured.length !== 3) {
    return null;
  }
  const [quantity, from, to] = captured;
  return {
    quantity,
    from,
    to,
  };
}

function getPreparedStackStr(input: string): string {
  return input.replaceAll("    ", "[_]").replaceAll("][", "] [");
}

const input = readFileSync("puzzle-five/input.txt", {
  encoding: "utf-8",
});

const [stacksStr, procedureStr] = input.split("\n\n");
const procedure = procedureStr
  .split("\n")
  .map(str => parseMove(str))
  .filter((move): move is Move => move != null);

const preparedStacks = getPreparedStackStr(stacksStr)
  .split("\n")
  .slice(0, -1)
  .reverse();
const stacks = preparedStacks.reduce((acc: string[][], stackLineStr) => {
  const stackLine = stackLineStr.split(" ");
  stackLine.forEach((crate, i) => {
    if (crate !== "[_]") {
      if (acc[i] == null) {
        acc[i] = [];
      }
      acc[i].push(crate[1]);
    }
  });
  return acc;
}, []);

const crates = new CratesStacks(stacks);

procedure.forEach(move => {
  crates.moveForPart2(move);
});

console.log(crates.getTopCrates().join(""));
