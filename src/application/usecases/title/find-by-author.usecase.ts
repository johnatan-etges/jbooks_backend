import { Title } from "../../../enterprise/entities/title/title";
import { Either, left, right } from "../../../shared/either";
import { InvalidParamError, ResourceNotFoundError } from "../../../shared/errors";
import { StorageServiceError } from "../../../shared/errors";
import { TitleGateway } from "../../gateways/title/title.gateway";

export class FindByAuthorUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(authorToSearch: string): Promise<Either<InvalidParamError | ResourceNotFoundError | StorageServiceError , Title[]>> {
    if (authorToSearch.length < 3) {
      return left(new  InvalidParamError("Search expression"));
    }

    const titlesOrError = await this._titleGateway.findByAuthor(authorToSearch);
    
    if (titlesOrError.isLeft()) {
      return left(titlesOrError.value);
    }

    const foundTitles: Title[] = titlesOrError.value;

    return right (foundTitles);
  }
}