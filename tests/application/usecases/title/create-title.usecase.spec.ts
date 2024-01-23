import { TitleGateway } from "../../../../src/enterprise/application/gateways/title/title.gateway";
import { CreateTitleUseCase } from "../../../../src/enterprise/application/usecases/title/create-title.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { ServerError } from "../../../../src/enterprise/shared/errors/server-error";
import { TitleInMemoryGateway } from "../../../../src/enterprise/infra/gateways/title/title-in-memory.gateway";
import { TitleInMemoryGatewaySpyWithError } from "../../../doubles/fakes/title/title-gateway-spy-with-error.fake";
import { validTitle } from "../../../doubles/assets/title/index.assets";

const makeTitleGatewaySpy = () => {
  const titleInMemoryGateway = new TitleInMemoryGateway();

  return titleInMemoryGateway;
}

const makeTitleGatewaySpyWithError = () => {
  

  const titleInMemoryGateway = new TitleInMemoryGatewaySpyWithError();

  return titleInMemoryGateway;
}

describe("CreatetitleUseCase", () => {
  it("Should throw if dependency throws", async () => {
    const sut = new CreateTitleUseCase(makeTitleGatewaySpyWithError());
    const promise = sut.execute(validTitle);

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it("should create the title", async () => {
    const sut = new CreateTitleUseCase(makeTitleGatewaySpy());
    const expectedTitle = validTitle;
    const actualTitle = await sut.execute(validTitle);

    expect(actualTitle).toEqual(expectedTitle);
  });
});