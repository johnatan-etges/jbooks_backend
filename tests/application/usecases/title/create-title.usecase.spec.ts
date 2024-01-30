import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { StorageServiceError } from "../../../../src/shared/errors";
import { validTitle } from "../../../doubles/assets/title/index.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title/index";

describe("CreatetitleUseCase", () => {
  it("Should return StorageServiceError if dependency throws", async () => {
    const sut = new CreateTitleUseCase(makeTitleGatewaySpyWithError());
    const promise = (await sut.execute(validTitle)).value  as Error;

    expect(promise).toEqual(new StorageServiceError());
  });

  it("should create the title", async () => {
    const sut = new CreateTitleUseCase(makeTitleGatewaySpy());
    const expectedTitle = validTitle;
    const actualTitle: Title = (await sut.execute(validTitle)).value as Title;

    expect(actualTitle).toEqual(expectedTitle);
  });
});