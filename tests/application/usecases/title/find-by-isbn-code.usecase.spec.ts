import { CreateTitleUseCase } from "../../../../src/application/usecases/title/create-title.usecase";
import { FindByIsbnCodeUseCase } from "../../../../src/application/usecases/title/find-by-isbn-code.usecase";
import { Title } from "../../../../src/enterprise/entities/title/title";
import { invalidIsbn, validIsbn } from "../../../doubles/assets/title/isbn.asset";
import { validTitle } from "../../../doubles/assets/title/title.assets";
import { makeTitleGatewaySpy, makeTitleGatewaySpyWithError } from "../../../doubles/fakes/title";

const titleGatewaySpy =  makeTitleGatewaySpy();
const createTitleUseCase = new CreateTitleUseCase(titleGatewaySpy);

describe("FindByIsbnCodeUseCase", () => {
  it("should throw if dependency throws", async () => {
    const sut = new FindByIsbnCodeUseCase(makeTitleGatewaySpyWithError());

    const promise = (await sut.execute(validIsbn)).value as Error;

    expect(promise.name).toEqual("ServerError");
  });

  it("Should return ResourceNotFoundError if an invalid ISBN code is provided", async () => {
    const sut = new FindByIsbnCodeUseCase(titleGatewaySpy);
    const createdTitle = await createTitleUseCase.execute(validTitle);

    const promise = (await sut.execute(invalidIsbn)).value as Error;

    expect(promise.name).toEqual("ResourceNotFoundError");
  });

  it("Should return the found Title if a valid ISBN is provided", async () => {
    const sut = new FindByIsbnCodeUseCase(titleGatewaySpy);
    const createdTitle = await createTitleUseCase.execute(validTitle);

    const actualTitle: Title = (await sut.execute(validIsbn)).value as Title;

    expect(actualTitle).toEqual(createdTitle);
  });
});