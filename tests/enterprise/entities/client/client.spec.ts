import { Client } from "../../../../src/enterprise/entities/client/client";
import { InvalidDocumentTypeError } from "../../../../src/enterprise/entities/client/errors/invalid-document-type-error";
import { InvalidParamError } from "../../../../src/shared/errors";
import { longDocument, longPhone, mediumInvalidDocument, shortPhone, validCnpjDocument, validCpfDocument, validPhone } from "../../../doubles/assets/client";

describe("Client", () => {
  it("Should return InvalidParamError if document is lesser than 11 characters long", () => {
    const sut = () => new Client(12345, 1, validPhone);
    
    expect(sut).toThrow(new InvalidParamError("Document"));
  });

  it("Should return a InvalidParamError if document is greater than 14 characters long", () => {
    const sut = () => new Client(longDocument, 1, validPhone);

    expect(sut).toThrow(new InvalidParamError("Document"));
  });

  it("Should return a InvalidParamError if document is greater than 11 and lesser then 14 characters long", () => {
    const sut = () => new Client(mediumInvalidDocument, 1, validPhone);

    expect(sut).toThrow(new InvalidParamError("Document"));
  });
  
  it("Should return a InvalidParamError if an invalid document type is provided", () => {
    const sut = () => new Client(validCpfDocument, 3, validPhone);

    expect(sut).toThrow(new InvalidParamError("Document type"));
  });

  it("Should return InvalidDocumentTypeError if a CPF document is provided to a CNPJ document type", () => {
    const sut = () => new Client(validCpfDocument, 2, validPhone);

    expect(sut).toThrow(new InvalidDocumentTypeError("CNPJ"));
  });

  it("Should return InvalidDocumentTypeError if a CNPJ document is provided to a CPF document type", () => {
    const sut = () => new Client(validCnpjDocument, 1, validPhone);

    expect(sut).toThrow(new InvalidDocumentTypeError("CPF"));
  });

  it("Should return InvalidParamError if phone number is lesser than 11 characters long", () => {
    const sut = () => new Client(validCpfDocument, 1, shortPhone);

    expect(sut).toThrow(new InvalidParamError("Phone number"));
  });

  it("Should return InvalidParamError if phone number is greater than 11 characters long", () => {
    const sut = () => new Client(validCpfDocument, 1, longPhone);

    expect(sut).toThrow(new InvalidParamError("Phone number"));
  });

  it("Should create a client with valid CPF", () => {
    const sut = new Client(validCpfDocument, 1, validPhone);

    expect(sut.document).toBe(12345678910);
    expect(sut.clientType).toBe(1);
  });

  it("Should create a client with valid phone number", () => {
    const sut = new Client(validCpfDocument, 1, validPhone);

    expect(sut.phoneNumber).toBe(validPhone);
  });

});