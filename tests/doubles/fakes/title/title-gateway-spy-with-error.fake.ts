import { Title } from "../../../../src/enterprise/entities/title/title";
import { TitleGateway } from "../../../../src/enterprise/application/gateways/title/title.gateway";

export class TitleInMemoryGatewaySpyWithError implements TitleGateway {
  async create(title: Title): Promise<void> {
    throw new Error();    
  }

  async findAll(): Promise<Title[]> {
    throw new Error();
  }
}