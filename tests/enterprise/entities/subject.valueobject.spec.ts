import { Subject } from "../../../src/enterprise/entities/subject.valueobject";
import { InvalidParamError } from "../../../src/shared/errors/invalid-param-error";

describe("Book Subject", () => {
  it("Should return InvalidParamError if the subject is lesser than 3 caracters long", () => {
    const sut = () => new Subject("Ab");

    expect(sut).toThrow(new InvalidParamError("Subject"));
  });

  it("Should return InvalidParamError if the subject is greater than 50 caracters long", () => {
    const sut = () => new Subject("AbcdefghijklmnopqrstuvxyzAbcdefghijklmnopqrstuvxyzAbcdefghijklmnopqrstuvxyz");

    expect(sut).toThrow(new InvalidParamError("Subject"));
  });

  it("Should create a valid Subject", () => {
    const sut = new Subject("Valid subject");

    expect(sut.value).toBe("Valid subject");
  });
});