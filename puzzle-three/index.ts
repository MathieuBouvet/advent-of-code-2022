import { readFile } from "fs/promises";

function getPriority(str: string): number {
  const charCode = str.charCodeAt(0);
  if (charCode >= 97) {
    return charCode - 96;
  }
  return charCode - 64 + 26;
}

const input = await readFile("puzzle-three/input.txt", {
  encoding: "utf-8",
});

const lines = input.split("\n");

const parsedRucksacks = lines.map(line => {
  const middleIndex = Math.floor(line.length / 2);
  const firstPart = line.slice(0, middleIndex).split("");
  const secondPart = line.slice(middleIndex).split("");

  if (firstPart.length !== secondPart.length) {
    throw new Error("it's not in the middle!");
  }

  const [firstCompartment, secondCompartment] = [firstPart, secondPart].map(
    part =>
      part.reduce((acc, char) => {
        acc[char] = true;
        return acc;
      }, {} as Record<string, true>)
  );

  return {
    firstCompartment,
    secondCompartment,
  };
});

const duplicates = parsedRucksacks.reduce(
  (acc, { firstCompartment, secondCompartment }) => {
    const duplicates = Object.keys(firstCompartment).filter(
      char => secondCompartment[char]
    );
    acc.push(...duplicates);
    return acc;
  },
  [] as string[]
);

const totalPriority = duplicates.reduce((acc, char) => {
  return acc + getPriority(char);
}, 0);

const groupedRucksacks = lines.reduce((acc, line, index) => {
  if (index % 3 === 0) {
    acc.push([]);
  }
  const endIndex = acc.length - 1;
  acc[endIndex].push(
    line.split("").reduce((acc, char) => {
      acc[char] = true;
      return acc;
    }, {} as Record<string, true>)
  );
  return acc;
}, [] as Record<string, true>[][]);

const badges = groupedRucksacks.reduce((acc, group) => {
  const badge = Object.keys(group[0]).find(
    char => group[1][char] && group[2][char]
  );
  if (badge != null) {
    acc.push(badge);
  }
  return acc;
}, [] as string[]);

const badgesPriority = badges.reduce((acc, badge) => {
  return acc + getPriority(badge);
}, 0);

console.log(badgesPriority);
