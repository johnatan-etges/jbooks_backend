import { Either, left, right } from "../../../shared/either";
import { InvalidCpfError } from "./errors";

export class Cpf {
  public readonly _cpf: number;

  constructor(cpf: number) {
    this._cpf = cpf;
  }

  public static create(cpf: number): Either<InvalidCpfError, Cpf> {
    if (!Cpf.validate(cpf)) {
      return left(new InvalidCpfError(cpf));
    }

    return right(new Cpf(cpf));
  }

  public static validate(cpf: number): boolean {
    if (cpf.toString().length !== 11) {
      return false;
    }

    return true;
  }
}