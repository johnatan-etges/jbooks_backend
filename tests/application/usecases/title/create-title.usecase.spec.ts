import { TitleGateway } from "../../../../src/enterprise/application/gateways/title/title.gateway";
import { CreateTitleUseCase } from "../../../../src/enterprise/application/usecases/title/create-title.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { ServerError } from "../../../../src/enterprise/shared/errors/server-error";

const baseTitle = new Title(1234567891011, 'Valid author', 'Valid subject', 0);

const makeTitleGateway = () => {
  class TitleInMemoryGateway implements TitleGateway {
    private static titles: Title[] = [];

    async create(title: Title): Promise<void> {
      TitleInMemoryGateway.titles.push(
        new Title(title.isbn, title.author, title.subject, title.copiesInStock)
      );

      return Promise.resolve();
    }

  }

  const titleInMemoryGateway = new TitleInMemoryGateway();

  return titleInMemoryGateway;
}

const makeTitleGatewayWithError = () => {
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
    const sut = new CreateTitleUseCase(makeTitleGatewayWithError());
    const promise = sut.execute(baseTitle);

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it("should create the title", async () => {
    const sut = new CreateTitleUseCase(makeTitleGateway());
    const expectedTitle = baseTitle;
    const actualTitle = await sut.execute(baseTitle);

    expect(actualTitle).toEqual(expectedTitle);
  });
});