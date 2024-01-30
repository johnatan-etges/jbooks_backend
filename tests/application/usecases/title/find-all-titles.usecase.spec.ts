import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { FindAllTitlesUseCase } from "../../../../src/application/usecases/title/find-all-titles.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { StorageServiceError } from "../../../../src/shared/errors";
import { validTitle } from "../../../doubles/assets/title/index.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title/index";

describe("FindAllTitlesUseCase", () => {
  it("Should return StorageServiceError if dependency throws", async () => {
    const sut = new FindAllTitlesUseCase(makeTitleGatewaySpyWithError());
    const promise = (await sut.execute()).value as Error;

    await expect(promise).toEqual(new StorageServiceError());
  });

  it("Should return a list of clients", async () => {
    const sut = new FindAllTitlesUseCase(makeTitleGatewaySpy());

    const createTitleUseCase = new CreateTitleUseCase(makeTitleGatewaySpy());
    await createTitleUseCase.execute(validTitle);

    const expectedTitles = [validTitle];
    const actualTitles: Title[] = (await sut.execute()).value as Title[];

    expect(actualTitles).toEqual(expectedTitles);
  });
});