import { Either, left, right } from "../../../shared/either";
import { Client } from "./client";
import { ClientData } from "./client-data";
import { Cpf } from "./cpf.valueobject";
import { InvalidCpfError, InvalidPhoneError } from "./errors";
import { Phone } from "./phone-number.valueobject";

export class PhysicalPerson extends Client {
  public readonly _cpf: Cpf;

  constructor(cpf: Cpf, phone: Phone) {
    super(phone);
    this._cpf = cpf;
  }

  public create(clientData: ClientData): Either<InvalidCpfError | InvalidPhoneError, PhysicalPerson> {
    const cpfOrError = Cpf.create(clientData.document);

    if (cpfOrError.isLeft()) {
      return left(cpfOrError.value);
    }

    const phoneOrError = Phone.create(clientData.phone);

    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    const cpf: Cpf = cpfOrError.value as Cpf;
    const phone: Phone = phoneOrError.value as Phone;

    return right(new PhysicalPerson(cpf, phone));
  }
}