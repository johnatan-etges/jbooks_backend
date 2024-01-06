import { InvalidParamError } from "../shred/errors/invalid-param-error";

export class Subject {
  private _value: string;

  constructor(value: string) {
    if (value.length < 3) {
      throw new InvalidParamError("Subject");
    }

    if (value.length > 50) {
      throw new InvalidParamError("Subject");
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}