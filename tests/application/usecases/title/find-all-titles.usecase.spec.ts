import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { FindAllTitlesUseCase } from "../../../../src/application/usecases/title/find-all-titles.usecase";
import { StorageServiceError } from "../../../../src/shared/errors";
import { validTitle } from "../../../doubles/assets/title/index.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title/index";

describe("FindAllTitlesUseCase", () => {
  it("Should throw if dependency throws", async () => {
    const sut = new FindAllTitlesUseCase(makeTitleGatewaySpyWithError());
    const promise = sut.execute();

    await expect(promise).rejects.toThrow(new StorageServiceError());
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