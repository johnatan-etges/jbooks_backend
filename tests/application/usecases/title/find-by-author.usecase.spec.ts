import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { FindByAuthorUseCase } from "../../../../src/application/usecases/title/find-by-author.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { InvalidParamError, ResourceNotFoundError, StorageServiceError } from "../../../../src/shared/errors";
import { anyAuthorSearchExpression, invalidAuthorSearchExpression, shortAuthorSearchExpression, validAuthorSearchExpressions, validTitle } from "../../../doubles/assets/title/index.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title";

const titleGatewaySpy = makeTitleGatewaySpy();

describe("FindByAuthorUseCase", () =>  {
  it("Should return StorageServiceError if dependecy throws", async () => {
    const sut = new FindByAuthorUseCase(makeTitleGatewaySpyWithError());
    const promise =  (await sut.execute(anyAuthorSearchExpression)).value as Error;

    expect(promise).toEqual(new StorageServiceError());
  });

  it("Should return InvalidParamError if search expression is lesser than 3 characters long", async () => {
    const sut = new FindByAuthorUseCase(titleGatewaySpy);
    const promise = (await sut.execute(shortAuthorSearchExpression)).value as Error;

    expect(promise).toEqual(new InvalidParamError("Search expression"));
  })

  it("Should return ResourceNotFoundError if a invalid search expression is provided", async () => {
    const sut = new FindByAuthorUseCase(titleGatewaySpy);
    const expectedTitles: Title[]  = [];
    const promise = (await sut.execute(invalidAuthorSearchExpression)).value as Error;

    expect(promise).toEqual(new ResourceNotFoundError("Title"));
  });

  it("Should return a list the found titles based  on a list of valid search expressions", async () => {
    const sut = new FindByAuthorUseCase(titleGatewaySpy);
    const createTitleUseCase = new CreateTitleUseCase(titleGatewaySpy);
    
    await createTitleUseCase.execute(validTitle);
    const expectedTitles = [validTitle];

    validAuthorSearchExpressions.forEach(async (validAuthorSearchExpression) => {
      const actualTitles: Title[] = (await sut.execute(validAuthorSearchExpression)).value as Title[] ;

      expect(actualTitles).toEqual(expectedTitles);
    });
  });
});