import { TitleGateway } from "../../../../src/enterprise/application/gateways/title/title.gateway";
import { CreateTitleUseCase } from "../../../../src/enterprise/application/usecases/title/create-title.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { ServerError } from "../../../../src/enterprise/shared/errors/server-error";
import { TitleInMemoryGateway } from "../../../../src/enterprise/infra/gateways/title/title-in-memory.gateway";

const baseTitle = new Title(1234567891011, 'Valid author', 'Valid subject', 0);

const makeTitleGatewaySpy = () => {
  const titleInMemoryGateway = new TitleInMemoryGateway();

  return titleInMemoryGateway;
}

const makeTitleGatewaySpyWithError = () => {
  class TitleInMemoryGateway implements TitleGateway {
    async create(title: Title): Promise<void> {
      throw new Error();    
    }
  }

  const titleInMemoryGateway = new TitleInMemoryGateway();

  return titleInMemoryGateway;
}

describe("CreatetitleUseCase", () => {
  it("Should throw if dependency throws", async () => {
    const sut = new CreateTitleUseCase(makeTitleGatewaySpyWithError());
    const promise = sut.execute(baseTitle);

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it("should create the title", async () => {
    const sut = new CreateTitleUseCase(makeTitleGatewaySpy());
    const expectedTitle = baseTitle;
    const actualTitle = await sut.execute(baseTitle);

    expect(actualTitle).toEqual(expectedTitle);
  });
});