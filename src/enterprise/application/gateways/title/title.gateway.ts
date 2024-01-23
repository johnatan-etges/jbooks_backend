import { Title } from "../../../entities/title/title";

export interface TitleGateway {
  create(title: Title): Promise<void>;
  findAll(): Promise<Title[]>;
  findBySubject(subjectToSearch: string): Promise<Title[]>;
}