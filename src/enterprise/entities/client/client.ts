import { InvalidParamError } from "../../../shared/errors";
import { InvalidDocumentTypeError } from "./errors/invalid-document-type-error";

export class Client {
  private _document: number;
  private _clientType: number;
  private _phoneNumber: number;

  constructor(
    document: number,
    type: number,
    phone: number
  ) {
    if (![11, 14].includes(document.toString().length)) {
      throw new InvalidParamError("Document");
    }

    if (![1, 2].includes(type)) {
      throw new InvalidParamError("Document type");
    }

    if (phone.toString().length !== 11) {
      throw new InvalidParamError("Phone number");
    }

    if (type === 2 && document.toString().length === 11) {
      throw new InvalidDocumentTypeError("CNPJ");
    }

    if (type === 1 && document.toString().length === 14) {
      throw new InvalidDocumentTypeError("CPF");
    }

    this._document = document;
    this._clientType = type;
    this._phoneNumber = phone;
  }

  get document(): number {
    return this._document;
  }

  get clientType(): number {
    return this._clientType;
  }

  get phoneNumber(): number {
    return this._phoneNumber;
  }
}