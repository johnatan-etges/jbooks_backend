import { InvalidParamError } from "../../shred/errors/invalid-param-error";
import { InvalidNumberOfCopiesError } from "./errors/invalid-number-of-copies-error";

export class Title {
  private _isbn: number;
  private _author: string;
  private _subject: string;
  private _copiesInStock: number;

  constructor(
    isbn: number,
    author: string,
    subject: string,
    copiesInStock: number
  ) {
    if (isbn.toString().length !== 13) {
      throw new InvalidParamError("ISBN");
    }

    if (copiesInStock < 0) {
      throw new InvalidNumberOfCopiesError(copiesInStock);
    }

    this._isbn = isbn;
    this._author = author;
    this._subject = subject;
    this._copiesInStock = copiesInStock;
  }

  get isbn(): number {
    return this._isbn;
  }

  get author(): string {
    return this._author;
  }

  get subject(): string {
    return this._subject;
  }

  get copiesInStock(): number {
    return this._copiesInStock;
  }
}