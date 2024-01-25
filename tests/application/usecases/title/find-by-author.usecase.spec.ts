import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { FindByAuthorUseCase } from "../../../../src/application/usecases/title/find-by-author.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { InvalidParamError } from "../../../../src/enterprise/shared/errors/invalid-param-error";
import { ServerError } from "../../../../src/enterprise/shared/errors/server-error";
import { anyAuthorSearchExpression, invalidAuthorSearchExpression, shortAuthorSearchExpression, validAuthorSearchExpressions, validTitle } from "../../../doubles/assets/title/index.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title";

describe("FindByAuthorUseCase", () =>  {
  it("Should  throw if dependecy throws", async () => {
    const sut = new FindByAuthorUseCase(makeTitleGatewaySpyWithError());
    const promise =  sut.execute(anyAuthorSearchExpression);

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it("Should return InvalidParamError if search expression is lesser than 3 characters long", async () => {
    const sut = new FindByAuthorUseCase(makeTitleGatewaySpy());
    const promise = sut.execute(shortAuthorSearchExpression);

    await expect(promise).rejects.toThrow(new InvalidParamError("Search expression"));
  })

  it("Should return a list the found titles based  on a list of valid search expressions", async () => {
    const titleInMemoryGateway =  makeTitleGatewaySpy();
    const sut = new FindByAuthorUseCase(titleInMemoryGateway);
    const createTitleUseCase = new CreateTitleUseCase(titleInMemoryGateway);
    
    await createTitleUseCase.execute(validTitle);
    const expectedTitles = [validTitle];

    validAuthorSearchExpressions.forEach(async (validAuthorSearchExpression) => {
      const actualTitles = await sut.execute(validAuthorSearchExpression);

      expect(actualTitles).toEqual(expectedTitles);
    });
  });

  it("Should return a empty list if a invalid search expression is provided", async () => {
    const titleInMemoryGateway = makeTitleGatewaySpy();
    const sut = new FindByAuthorUseCase(titleInMemoryGateway);
    const createTitleUseCase = new CreateTitleUseCase(titleInMemoryGateway);
    await createTitleUseCase.execute(validTitle);

    const expectedTitles: Title[]  = [];
    const actualTitles = await sut.execute(invalidAuthorSearchExpression);

    expect(actualTitles).toEqual(expectedTitles);
  });
});