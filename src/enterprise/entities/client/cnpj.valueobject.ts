import { Either, left, right } from "../../../shared/either";
import { InvalidCnpjError } from "./errors";

export class Cnpj {
  public readonly _cnpj: number;

  constructor(cnpj: number) {
    this._cnpj = cnpj;
  }

  public static create(cnpj: number): Either<InvalidCnpjError, Cnpj> {
    if (!Cnpj.validate(cnpj)) {
      return left(new InvalidCnpjError(cnpj));
    }

    return right(new Cnpj(cnpj));
  }

  public static validate(cnpj: number): boolean {
    if (cnpj.toString().length !== 14) {
      return false;
    }

    return true;
  }
}