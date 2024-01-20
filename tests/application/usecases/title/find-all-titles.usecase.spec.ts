import { CreateTitleUseCase } from "../../../../src/enterprise/application/usecases/title/create-title.usecase";
import { FindAllTitlesUseCase } from "../../../../src/enterprise/application/usecases/title/find-all-titles.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { TitleInMemoryGateway } from "../../../../src/enterprise/infra/gateways/title/title-in-memory.gateway";
import { ServerError } from "../../../../src/enterprise/shared/errors/server-error";
import { TitleInMemoryGatewaySpyWithError } from "../../../doubles/fakes/title/title-gateway-spy-with-error.fake";

const baseTitle = new Title(1234567891011, 'Valid author', 'Valid subject', 0);

const makeTitleGatewaySpy = () => {
  const titleGateway = new TitleInMemoryGateway();

  return titleGateway;
}

const makeTitleGatewaySpyWithError = () => {
  const titleGateway = new TitleInMemoryGatewaySpyWithError();

  return titleGateway;
}

describe("FindAllTitlesUseCase", () => {
  it("Should throw if dependency throws", async () => {
    const sut = new FindAllTitlesUseCase(makeTitleGatewaySpyWithError());
    const promise = sut.execute();

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it("Should return a list of clients", async () => {
    const sut = new FindAllTitlesUseCase(makeTitleGatewaySpy());

    const createTitleUseCase = new CreateTitleUseCase(makeTitleGatewaySpy());
    const createdTitle = createTitleUseCase.execute(baseTitle);

    const expectedTitles = [baseTitle];
    const actualTitles = await sut.execute();

    expect(actualTitles).toEqual(actualTitles);
  });
});