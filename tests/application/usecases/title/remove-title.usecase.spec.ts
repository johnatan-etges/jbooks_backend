import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { RemoveTitleUseCase } from "../../../../src/application/usecases/title/remove-title.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { StorageServiceError } from "../../../../src/shared/errors";
import { validTitle } from "../../../doubles/assets/title/title.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title";

describe("RemoveTitleUseCase", () => {
  const titleGateway = makeTitleGatewaySpy();
  
  it("Should return StorageServiceError if dependency throws", async () => {
    const sut = new RemoveTitleUseCase(makeTitleGatewaySpyWithError());
    const promise = (await sut.execute(validTitle)).value as Error;

    expect(promise).toEqual(new StorageServiceError());
  });

  it("Should remove the Title", async () => {
    const sut = new RemoveTitleUseCase(titleGateway);
    const createTitleUseCase = new CreateTitleUseCase(titleGateway);
    await createTitleUseCase.execute(validTitle);

    const promise: Title = (await sut.execute(validTitle)).value as Title;

    expect(promise).toEqual(validTitle);
  });
});