import { RequestType } from "@ddanjit/bridge-interface";
import { Handler } from "./handler";

export type BridgeHandlerMap = Map<RequestType, Handler>;
