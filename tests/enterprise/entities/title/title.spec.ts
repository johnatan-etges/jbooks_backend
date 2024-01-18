import { InvalidNumberOfCopiesError } from "../../../../src/enterprise/entities/title/errors/invalid-number-of-copies-error";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { InvalidParamError } from "../../../../src/enterprise/shared/errors/invalid-param-error";

// Helpers
const validISBN = 1234567891011;
const validAuthor = "Valid Author";
const anyAuthor = "Any Author";
const validSubject = "Valid Subject";
const anySubject = "Any Subject";
const invalidNumberOfCopies = -1;
const validNumberOfCopies = 1;
const anyNumberOfCopies = 0;

describe("Title", () => {
  describe("ISBN", () => {
    it("Should return an InvalidParamError if ISBN is lesser than 13 digits long", () => {
      const sut = () => new Title(123, "Any Author", "Any Subject", anyNumberOfCopies);

      expect(sut).toThrow(new InvalidParamError("ISBN"));
    });

    it("Should return InvalidParamError if ISBN is greater than 13 digits long", () => {
      const sut = () => new Title(123456789101112, "Any Author", "Any Subject", anyNumberOfCopies);

      expect(sut).toThrow(new InvalidParamError("ISBN"));
    });

    it("Should create a client with valid ISBN", () => {
      const sut = new Title(validISBN, "Any Author", "Any Subject", anyNumberOfCopies);

      expect(sut.isbn).toBe(validISBN);
    });
  });

  describe("Author", () => {
    it("Should create a client with valid author", () => {
      const sut = new Title(validISBN, validAuthor, "Any Subject", anyNumberOfCopies);

      expect(sut.author).toBe(validAuthor);
    });
  });

  describe("Subject", () => {
    it("Should create a client with valid subject", () => {
      const sut = new Title(validISBN, anyAuthor, validSubject, anyNumberOfCopies);

      expect(sut.subject).toBe(validSubject);
    });
  });

  describe("Number of copies", () => {
    it("Should return InvalidNumberOfCopiesError if number of copies in stock is lesser than zero", () => {
      const sut = () => new Title(validISBN, anyAuthor, anySubject, invalidNumberOfCopies);

      expect(sut).toThrow(new InvalidNumberOfCopiesError(invalidNumberOfCopies));
    });

    it("Should create a client with valid number of copies", () => {
      const sut = new Title(validISBN, anyAuthor, validSubject, validNumberOfCopies);

      expect(sut.copiesInStock).toBe(validNumberOfCopies);
    });
  });
});