import { Title } from "../../../enterprise/entities/title/title";
import { Either, left, right } from "../../../shared/either";
import { ResourceNotFoundError, StorageServiceError } from "../../../shared/errors";
import { TitleGateway } from "../../gateways/title/title.gateway";

export class FindAllTitlesUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(): Promise<Either<ResourceNotFoundError | StorageServiceError, Title[]>> {
    const titlesOrError = await this._titleGateway.findAll();

    if (titlesOrError.isLeft()) {
      return left(titlesOrError.value);
    }

    const foundTitles = titlesOrError.value;
  
    return right(foundTitles);
    
  }
}