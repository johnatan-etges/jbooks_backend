export class InvalidNumberOfCopiesError extends Error {
  constructor(numberOfCopies: number) {
    super(`Invalid number of copies for title. ${numberOfCopies} units detected.`);
    this.name = "InvalidNumberOfCopiesError";
  }
}