import { Title } from "../../../enterprise/entities/title/title";
import { InvalidParamError } from "../../../enterprise/shared/errors/invalid-param-error";
import { ServerError } from "../../../enterprise/shared/errors/server-error";
import { TitleGateway } from "../../gateways/title/title.gateway";

export class FindBySubjectUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(subjectToSearch: string): Promise<Title[]> {
    if (subjectToSearch.length < 3) {
      throw new InvalidParamError("Search expression");
    }

    try {
      const foundTitles = await this._titleGateway.findBySubject(subjectToSearch);

      return foundTitles;
    } catch(err) {
      throw new ServerError();
    }
  }
}