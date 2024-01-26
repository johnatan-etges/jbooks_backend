import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { FindAllTitlesUseCase } from "../../../../src/application/usecases/title/find-all-titles.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { TitleInMemoryGateway } from "../../../../src/enterprise/infra/gateways/title/title-in-memory.gateway";
import { ServerError } from "../../../../src/shared/errors/server-error";
import { TitleInMemoryGatewaySpyWithError } from "../../../doubles/fakes/title/title-gateway-spy-with-error.fake";
import { validTitle } from "../../../doubles/assets/title/index.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title/index";

describe("FindAllTitlesUseCase", () => {
  it("Should throw if dependency throws", async () => {
    const sut = new FindAllTitlesUseCase(makeTitleGatewaySpyWithError());
    const promise = sut.execute();

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it("Should return a list of clients", async () => {
    const sut = new FindAllTitlesUseCase(makeTitleGatewaySpy());

    const createTitleUseCase = new CreateTitleUseCase(makeTitleGatewaySpy());
    const createdTitle = createTitleUseCase.execute(validTitle);

    const expectedTitles = [validTitle];
    const actualTitles = await sut.execute();

    expect(actualTitles).toEqual(expectedTitles);
  });
});