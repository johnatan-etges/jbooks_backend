import { Title } from "../../../enterprise/entities/title/title";
import { InvalidParamError } from "../../../shared/errors";
import { ServerError } from "../../../shared/errors";
import { TitleGateway } from "../../gateways/title/title.gateway";

export class FindByAuthorUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(authorToSearch: string): Promise<Title[]> {
    if (authorToSearch.length < 3) {
      throw new  InvalidParamError("Search expression");
    }
    try {
      const foundTitles = await this._titleGateway.findByAuthor(authorToSearch);

      return foundTitles;
    } catch(err) {
      throw new ServerError();
    }
  }
}