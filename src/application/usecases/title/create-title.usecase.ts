import { InvalidNumberOfCopiesError } from '../../../enterprise/entities/title/errors/invalid-number-of-copies-error';
import { Title } from '../../../enterprise/entities/title/title'
import { Either, left, right } from '../../../shared/either';
import { ResourceNotFoundError, StorageServiceError } from '../../../shared/errors';
import { TitleGateway } from "../../gateways/title/title.gateway";

export class CreateTitleUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(title: Title): Promise<Either<ResourceNotFoundError | StorageServiceError, Title>> {
      const titleOrError = await this._titleGateway.create(title);

      if (titleOrError.isLeft()) {
        return left(titleOrError.value);
      }

      const createdTitle: Title = titleOrError.value;

      return right(createdTitle);
  }
}