import { Either } from "../../../shared/either";
import { ClientData } from "./client-data";
import { InvalidCpfError, InvalidCnpjError, InvalidPhoneError } from "./errors";
import { Phone } from "./phone-number.valueobject";

export abstract class Client {
  public readonly _phoneNumber: Phone;

  constructor(phone: Phone) {
    this._phoneNumber = phone;
  }

  abstract create(clientData: ClientData): Either<InvalidCpfError | InvalidCnpjError | InvalidPhoneError, Client>;
}