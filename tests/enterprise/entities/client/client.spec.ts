import { Client } from "../../../../src/enterprise/entities/client/client";
import { Cnpj } from "../../../../src/enterprise/entities/client/cnpj.valueobject";
import { Cpf } from "../../../../src/enterprise/entities/client/cpf.valueobject";
import { LegalPerson } from "../../../../src/enterprise/entities/client/legal-person";
import { Phone } from "../../../../src/enterprise/entities/client/phone-number.valueobject";
import { PhysicalPerson } from "../../../../src/enterprise/entities/client/physical-person";
import { InvalidParamError } from "../../../../src/shared/errors";
import { longDocument, longPhone, mediumInvalidDocument, shortDocument, shortPhone, validCnpjDocument, validCpfDocument, validPhone } from "../../../doubles/assets/client";

describe("Client", () => {
  it("should not create PhysicalPerson if an invalid CPF is provided", () => {
    const invalidCpf = new Cpf(shortDocument);
    const anyPhone = new Phone(validPhone);
    const sut = new PhysicalPerson(invalidCpf, anyPhone);
    const error = (sut.create({document: invalidCpf._cpf, phone: anyPhone._phone})).value as Error;

    expect(error.name).toBe("InvalidCpfError");
    expect(error.message).toBe(`Invalid CPF: ${invalidCpf._cpf}`);
  });

  it("should not create PhysicalPerson if an invalid phone is provided", () => {
    const anyCpf = new Cpf(validCpfDocument);
    const invalidPhone = new Phone(shortPhone);
    const sut = new PhysicalPerson(anyCpf, invalidPhone);
    const error = (sut.create({document: anyCpf._cpf, phone: invalidPhone._phone})).value as Error;

    expect(error.name).toBe("InvalidPhoneError");
    expect(error.message).toBe(`Invalid phone number: ${invalidPhone._phone}`);
  });

  it("Should create a PhysicalPerson if valid data is provided", () => {
    const validCpf = new Cpf(validCpfDocument);
    const validPhoneNumber = new Phone(validPhone);
    const sut = new PhysicalPerson(validCpf,  validPhoneNumber);

    const physicalPerson: PhysicalPerson = (sut.create({document: validCpf._cpf, phone: validPhoneNumber._phone})).value as PhysicalPerson;

    expect(physicalPerson._cpf).toEqual(validCpf);
    expect(physicalPerson._phoneNumber).toEqual(validPhoneNumber);
  });

  it("should not create LegalPerson if an invalid CNPJ is provided", () => {
    const invalidCnpj = new Cnpj(shortDocument);
    const anyPhone = new Phone(validPhone);
    const sut = new LegalPerson(invalidCnpj, anyPhone);
    const error = (sut.create({document: invalidCnpj._cnpj, phone: anyPhone._phone})).value as Error;

    expect(error.name).toBe("InvalidCnpjError");
    expect(error.message).toBe(`Invalid CNPJ: ${invalidCnpj._cnpj}`);
  });

  it("should not create LegalPerson if an invalid phone is provided", () => {
    const anyCnpj = new Cnpj(validCnpjDocument);
    const invalidPhone = new Phone(shortPhone);
    const sut = new LegalPerson(anyCnpj, invalidPhone);
    const error = (sut.create({document: anyCnpj._cnpj, phone: invalidPhone._phone})).value as Error;

    expect(error.name).toBe("InvalidPhoneError");
    expect(error.message).toBe(`Invalid phone number: ${invalidPhone._phone}`);
  });

  it("Should create a LegalPerson if valid data is provided", () => {
    const validCnpj = new Cnpj(validCnpjDocument);
    const validPhoneNumber = new Phone(validPhone);
    const sut = new LegalPerson(validCnpj, validPhoneNumber);

    const legalPerson: LegalPerson = (sut.create({document: validCnpj._cnpj, phone: validPhoneNumber._phone})).value as LegalPerson;

    expect(legalPerson._cnpj).toEqual(validCnpj);
    expect(legalPerson._phoneNumber).toEqual(validPhoneNumber);
  });
});