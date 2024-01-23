import { CreateTitleUseCase } from "../../../../src/enterprise/application/usecases/title/create-title.usecase";
import { FindBySubjectUseCase } from "../../../../src/enterprise/application/usecases/title/find-by-subject.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { TitleInMemoryGateway } from "../../../../src/enterprise/infra/gateways/title/title-in-memory.gateway";
import { InvalidParamError } from "../../../../src/enterprise/shared/errors/invalid-param-error";
import { ServerError } from "../../../../src/enterprise/shared/errors/server-error";
import { validTitle, validSubjectSearchExpressions, invalidSubjectSearchExpression, anySubjectSearchExpression, shortSubjectSearchExpression } from "../../../doubles/assets/title/index.assets";
import { TitleInMemoryGatewaySpyWithError } from "../../../doubles/fakes/title/title-gateway-spy-with-error.fake";

const makeTitleGatewaySpy = () => {
  const titleGateway = new TitleInMemoryGateway();

  return titleGateway;
}

const makeTitleGatewaySpyWithError = () => {
  const titleGateway = new TitleInMemoryGatewaySpyWithError();

  return titleGateway;
}

describe("FindBySubjectUseCase", () => {
  it("Should throw if dependency throws", async () => {
    const sut = new FindBySubjectUseCase(makeTitleGatewaySpyWithError());
    const promise = sut.execute(anySubjectSearchExpression);

    await expect(promise).rejects.toThrow(new ServerError());
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