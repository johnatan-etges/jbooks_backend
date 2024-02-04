import { Author } from "../../../src/enterprise/entities/title/author.valueobject";
import { InvalidParamError } from "../../../src/shared/errors";

describe("Author", () => {
  it("Should return InvalidParamError if name is lesser than 3 caracters long", () => {
    const sut = () => new Author("Ab");

    expect(sut).toThrow(new InvalidParamError("Author name"));
  });

  it("Should return InvalidParamError if name is greater than 50 caracters long", () => {
    const sut = () => new Author("AbcdefghijklmnopqrstuvxyzAbcdefghijklmnopqrstuvxyzAbcdefghijklmnopqrstuvxyz");

    expect(sut).toThrow(new InvalidParamError("Author name"));
  });
  
  it("Should return InvalidParamError if name contains numbers", () => {
    const sut = () => new Author("A2b");

    expect(sut).toThrow(new InvalidParamError("Author name"));
  });

  it("Should return InvalidParamError if name contains symbols", () => {
    const sut = () => new Author("A@b");

    expect(sut).toThrow(new InvalidParamError("Author name"));
  });

  it("Should create a Author if name contains whitespaces", () => {
    const sut = new Author("Name with whitespace");

    expect(sut.value).toBe("Name with whitespace");
  });
});