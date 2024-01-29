import { Title } from '../../../enterprise/entities/title/title'
import { StorageServiceError } from '../../../shared/errors';
import { TitleGateway } from "../../gateways/title/title.gateway";

export class CreateTitleUseCase {
  private readonly _titleGateway: TitleGateway;

  constructor(titleGateway: TitleGateway) {
    this._titleGateway = titleGateway;
  }

  async execute(title: Title): Promise<Title> {
    try {
      await this._titleGateway.create(title);

      return title;
    } catch(err) {
      throw new StorageServiceError();
    }
  }
}