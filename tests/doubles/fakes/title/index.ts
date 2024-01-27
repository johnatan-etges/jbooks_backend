import { TitleInMemoryGateway } from "../../../../src/infra/gateways/title/title-in-memory.gateway";
import { TitleInMemoryGatewaySpyWithError } from "./title-gateway-spy-with-error.fake";

export const makeTitleGatewaySpy = () => {
  const titleGateway = new TitleInMemoryGateway();

  return titleGateway;
}

export const makeTitleGatewaySpyWithError = () => {
  const titleGateway = new TitleInMemoryGatewaySpyWithError();

  return titleGateway;
}