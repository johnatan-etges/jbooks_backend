import { InvalidParamError } from "../../../shared/errors/invalid-param-error";
import { Author } from "../author.valueobject";
import { Subject } from "../subject.valueobject";
import { InvalidNumberOfCopiesError } from "./errors/invalid-number-of-copies-error";

export class Title {
  private _isbn: number;
  private _author: Author;
  private _subject: Subject;
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
    this._author = new Author(author);
    this._subject = new Subject(subject);
    this._copiesInStock = copiesInStock;
  }

  get isbn(): number {
    return this._isbn;
  }

  get author(): string {
    return this._author.value;
  }

  get subject(): string {
    return this._subject.value;
  }

  get copiesInStock(): number {
    return this._copiesInStock;
  }

  public canBePurchased(): boolean {
    return this._copiesInStock > 0;
  }
}