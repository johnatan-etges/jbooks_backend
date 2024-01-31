import { Title } from "../../../enterprise/entities/title/title";
import { Either, left, right } from "../../../shared/either";
import { ResourceNotFoundError, StorageServiceError } from "../../../shared/errors";
import { TitleGateway } from "../../gateways/title/title.gateway";

export class RemoveTitleUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(titleToRemove: Title): Promise<Either<ResourceNotFoundError | StorageServiceError, Title>> {
    const titleOrError = await this._titleGateway.findByIsbnCode(titleToRemove.isbn);

    if (titleOrError.isLeft()) {
      return left(titleOrError.value);
    }

    const foundTitle = titleOrError.value;

    const result = await this._titleGateway.remove(foundTitle);

    if (result.isLeft()) {
      return left(result.value);
    }

    return right(result.value);

  }
}