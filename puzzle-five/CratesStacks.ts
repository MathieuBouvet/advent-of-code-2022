export type Move = {
  from: number;
  to: number;
  quantity: number;
};

class CratesStacks {
  private crates: string[][];

  constructor(crates: string[][]) {
    this.crates = crates;
  }

  move({ from, to, quantity }: Move) {
    const fromStack = this.crates[from - 1];
    const toStack = this.crates[to - 1];
    if (fromStack != null && toStack != null && quantity <= fromStack.length) {
      for (let i = 0; i < quantity; i++) {
        const crate = fromStack.pop();
        if (crate != null) {
          toStack.push(crate);
        }
      }
    }
  }

  moveForPart2({from, to, quantity}: Move){
    const fromStack = this.crates[from - 1];
    const toStack = this.crates[to - 1];
    if (fromStack != null && toStack != null && quantity <= fromStack.length) {
      const movedCrates = fromStack.splice(-quantity);
      if(movedCrates.length > 0){
        toStack.push(...movedCrates);
      }
    }
  }

  getTopCrates() {
    return this.crates.map(stack => stack.at(-1) ?? "");
  }
}

export default CratesStacks;
