import { Title } from "../../../enterprise/entities/title/title";
import { Either, left, right } from "../../../shared/either";
import { ResourceNotFoundError, StorageServiceError } from "../../../shared/errors";
import { TitleGateway } from "../../gateways/title/title.gateway";

export class FindByIsbnCodeUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(isbnToSearch: number): Promise<Either<ResourceNotFoundError | StorageServiceError, Title>> {
      const titleOrError = await this._titleGateway.findByIsbnCode(isbnToSearch);

      if ((titleOrError).isLeft()) {
        return left(titleOrError.value);
      }

      const foundTitle: Title = titleOrError.value;

      return right(foundTitle);
  }
}