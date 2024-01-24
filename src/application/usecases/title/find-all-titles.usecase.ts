import { Title } from "../../../enterprise/entities/title/title";
import { ServerError } from "../../../enterprise/shared/errors/server-error";
import { TitleGateway } from "../../gateways/title/title.gateway";

export class FindAllTitlesUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(): Promise<Title[]> {
    try {
      const titles = await this._titleGateway.findAll();
  
      return titles;
    } catch(err) {
        throw new ServerError();
    }
  }
}