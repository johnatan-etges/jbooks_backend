import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { FindBySubjectUseCase } from "../../../../src/application/usecases/title/find-by-subject.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { InvalidParamError } from "../../../../src/shared/errors";
import { StorageServiceError } from "../../../../src/shared/errors";
import { validTitle, validSubjectSearchExpressions, invalidSubjectSearchExpression, anySubjectSearchExpression, shortSubjectSearchExpression } from "../../../doubles/assets/title/index.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title/index";

describe("FindBySubjectUseCase", () => {
  it("Should throw if dependency throws", async () => {
    const sut = new FindBySubjectUseCase(makeTitleGatewaySpyWithError());
    const promise = sut.execute(anySubjectSearchExpression);

    await expect(promise).rejects.toThrow(new StorageServiceError());
  });

  it("Should return InvalidParamError if search expression is lesser than 3 characters long", async () => {
    const sut = new FindBySubjectUseCase(makeTitleGatewaySpy());
    const promise = sut.execute(shortSubjectSearchExpression);

    await expect(promise).rejects.toThrow(new InvalidParamError("Search expression"));
  });

  it("Should return the found Titles based on a list of valid search strings", async () => {
    const sut = new FindBySubjectUseCase(makeTitleGatewaySpy());
    const createTitleUseCase = new CreateTitleUseCase(makeTitleGatewaySpy());
    await createTitleUseCase.execute(validTitle);
    const expectedTitles = [validTitle];

    validSubjectSearchExpressions.forEach(async (validSubjectSearchExpression) => {
      const actualTitles = await sut.execute(validSubjectSearchExpression);
      expect(actualTitles).toEqual(expectedTitles);
    });
  });

  it("Should return a empty list if a invalid search string is provided", async () => {
    const sut = new FindBySubjectUseCase(makeTitleGatewaySpy());
    const createTitleUseCase = new CreateTitleUseCase(makeTitleGatewaySpy());
    await createTitleUseCase.execute(validTitle);
    const expectedTitles: Title[] = [];
    const actualTitles = await sut.execute(invalidSubjectSearchExpression);

    expect(actualTitles).toEqual(expectedTitles);
  });
});