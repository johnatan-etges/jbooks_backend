import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { FindBySubjectUseCase } from "../../../../src/application/usecases/title/find-by-subject.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { InvalidParamError, ResourceNotFoundError, StorageServiceError } from "../../../../src/shared/errors";
import { validTitle, validSubjectSearchExpressions, invalidSubjectSearchExpression, anySubjectSearchExpression, shortSubjectSearchExpression } from "../../../doubles/assets/title/index.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title/index";

describe("FindBySubjectUseCase", () => {
  it("Should return StorageServiceError if dependency throws", async () => {
    const sut = new FindBySubjectUseCase(makeTitleGatewaySpyWithError());
    const promise = (await sut.execute(anySubjectSearchExpression)).value as Error;

    expect(promise).toEqual(new StorageServiceError())
  });

  it("Should return InvalidParamError if search expression is lesser than 3 characters long", async () => {
    const sut = new FindBySubjectUseCase(makeTitleGatewaySpy());
    const promise = (await sut.execute(shortSubjectSearchExpression)).value as Error;

    expect(promise).toEqual(new InvalidParamError("Search expression"));
  });

  it("Should return ResourceNotFoundError if a invalid search string is provided", async () => {
    const sut = new FindBySubjectUseCase(makeTitleGatewaySpy());
    const createTitleUseCase = new CreateTitleUseCase(makeTitleGatewaySpy());
    await createTitleUseCase.execute(validTitle);
    
    const promise = (await sut.execute(invalidSubjectSearchExpression)).value as Error;

    expect(promise).toEqual(new ResourceNotFoundError("Title"));
  });

  it("Should return the found Titles based on a list of valid search strings", async () => {
    const sut = new FindBySubjectUseCase(makeTitleGatewaySpy());
    const expectedTitles = [validTitle];

    validSubjectSearchExpressions.forEach(async (validSubjectSearchExpression) => {
      const actualTitles: Title[] = (await sut.execute(validSubjectSearchExpression)).value as Title[];
      expect(actualTitles).toEqual(expectedTitles);
    });
  });
});