import { Either, left, right } from "../../../shared/either";
import { Client } from "./client";
import { ClientData } from "./client-data";
import { Cnpj } from "./cnpj.valueobject";
import { InvalidCnpjError } from "./errors";
import { Phone } from "./phone-number.valueobject";

export class LegalPerson extends Client {
  public readonly _cnpj: Cnpj;

  constructor(cpnj: Cnpj, phone: Phone) {
    super(phone);
    this._cnpj = cpnj;
  }

  public create(clientData: ClientData): Either<InvalidCnpjError, Client> {
    const cnpjOrError = Cnpj.create(clientData.document);

    if (cnpjOrError.isLeft()) {
      return left(cnpjOrError.value);
    }

    const phoneOrError = Phone.create(clientData.phone);
    
    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    const cnpj: Cnpj = cnpjOrError.value as Cnpj;
    const phone: Phone = phoneOrError.value as Phone;

    return right(new LegalPerson(cnpj, phone));
  }

}