import { Title } from "../../../enterprise/entities/title/title";
import { Either, left, right } from "../../../shared/either";
import { InvalidParamError, ResourceNotFoundError, StorageServiceError } from "../../../shared/errors";
import { TitleGateway } from "../../gateways/title/title.gateway";

export class FindBySubjectUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(subjectToSearch: string): Promise<Either<ResourceNotFoundError | InvalidParamError | StorageServiceError , Title[]>> {
    if (subjectToSearch.length < 3) {
      return left(new InvalidParamError("Search expression"));
    }
    const titlesOrError = await this._titleGateway.findBySubject(subjectToSearch);

    if (titlesOrError.isLeft()) {
      return left(titlesOrError.value);
    }

    const foundTitles: Title[] = titlesOrError.value;

    return right(foundTitles);
  }
}