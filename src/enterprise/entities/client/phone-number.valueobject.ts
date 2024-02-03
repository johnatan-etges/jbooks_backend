import { Either, left, right } from "../../../shared/either";
import { InvalidPhoneError } from "./errors";

export class Phone {
  public readonly _phone: number;

  constructor(phone: number) {
    this._phone = phone;
  }

  public static create(phone: number): Either<InvalidPhoneError, Phone> {
    if (!Phone.validate(phone)) {
      return left(new InvalidPhoneError(phone));
    }

    return right(new Phone(phone));
  }

  public static validate(phone: number): boolean {
    if (phone.toString().length !== 11) {
      return false;
    }

    return true;
  }
}