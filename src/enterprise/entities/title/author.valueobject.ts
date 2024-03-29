import { InvalidParamError } from "../../../shared/errors";

export class Author {
  private _value: string;

  constructor(value: string) {
    /*
      Name shouldn't contain numbers and symbols, excpet by whitespaces and apostrophes
      ^: Start of string.
      [a-zA-Z]: Any lowercase or uppercase letter
      \s: Any whitespace character (such as space, tab, etc.).
      ']+: One or more apostrophes.

    */
    const regexPattern = /^[a-zA-Z\s\']+$/;

    if (value.length < 3 || value.length > 50 || !regexPattern.test(value)) {
      throw new InvalidParamError("Author name");
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}