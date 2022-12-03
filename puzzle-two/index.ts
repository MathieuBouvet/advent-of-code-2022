import { readFile } from "fs/promises";

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "draw" | "lose";

const scoreByChoice: Record<Choice, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const scoreByResults: Record<Result, number> = {
  lose: 0,
  draw: 3,
  win: 6,
};

const resultMatrix: Record<Choice, Record<Choice, Result>> = {
  rock: {
    rock: "draw",
    paper: "lose",
    scissors: "win",
  },
  paper: {
    rock: "win",
    paper: "draw",
    scissors: "lose",
  },
  scissors: {
    rock: "lose",
    paper: "win",
    scissors: "draw",
  },
};

const matchOutcomeMatrix: Record<Choice, Record<Result, Choice>> = {
  rock: {
    lose: "scissors",
    draw: "rock",
    win: "paper",
  },
  paper: {
    lose: "rock",
    draw: "paper",
    win: "scissors",
  },
  scissors: {
    lose: "paper",
    draw: "scissors",
    win: "rock",
  },
};

function opponentChoiceToChoice(choice: string): Choice {
  switch (choice) {
    case "A":
      return "rock";
    case "B":
      return "paper";
    case "C":
      return "scissors";
    default:
      throw new Error(`Bad input ${choice}`);
  }
}

function playerChoiceToChoice(choice: string): Choice {
  switch (choice) {
    case "X":
      return "rock";
    case "Y":
      return "paper";
    case "Z":
      return "scissors";
    default:
      throw new Error(`Bad input ${choice}`);
  }
}

function decodedOutcome(coded: string): Result {
  switch (coded) {
    case "X":
      return "lose";
    case "Y":
      return "draw";
    case "Z":
      return "win";
    default:
      throw new Error(`bad input ${coded}`);
  }
}

const input = await readFile("puzzle-two/input.txt", { encoding: "utf-8" });
const lines = input.split("\n");

const gamePlanForAssumption = lines.map(line => {
  return {
    opponentChoice: opponentChoiceToChoice(line[0]),
    playerChoice: playerChoiceToChoice(line[2]),
  };
});

const scoreForAssumption = gamePlanForAssumption.reduce(
  (score, { playerChoice, opponentChoice }) => {
    const result = resultMatrix[playerChoice][opponentChoice];
    return score + scoreByChoice[playerChoice] + scoreByResults[result];
  },
  0
);

const gamePlan = lines.map(line => {
  return {
    opponentChoice: opponentChoiceToChoice(line[0]),
    desiredOutcome: decodedOutcome(line[2]),
  };
});

const scoreForRealStrategy = gamePlan.reduce(
  (score, { opponentChoice, desiredOutcome }) => {
    const playerChoice = matchOutcomeMatrix[opponentChoice][desiredOutcome];

    return score + scoreByChoice[playerChoice] + scoreByResults[desiredOutcome];
  },
  0
);

console.log(scoreForRealStrategy);
