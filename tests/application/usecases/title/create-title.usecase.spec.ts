import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { StorageServiceError } from "../../../../src/shared/errors";
import { validTitle } from "../../../doubles/assets/title/index.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title/index";

describe("CreatetitleUseCase", () => {
  it("Should throw if dependency throws", async () => {
    const sut = new CreateTitleUseCase(makeTitleGatewaySpyWithError());
    const promise = sut.execute(validTitle);

    await expect(promise).rejects.toThrow(new StorageServiceError());
  });

  it("should create the title", async () => {
    const sut = new CreateTitleUseCase(makeTitleGatewaySpy());
    const expectedTitle = validTitle;
    const actualTitle = await sut.execute(validTitle);

    expect(actualTitle).toEqual(expectedTitle);
  });
});