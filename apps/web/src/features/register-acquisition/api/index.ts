import type { SaveAcquisitionSourceReq } from "@ddanjit/domain";
import apiClient from "../../../shared/libs/axios/api-client"

export const RegisterAcquisitionApi = {
  async registerAcquisition(payload: SaveAcquisitionSourceReq) {
    return await apiClient.post("/users/acquisition-source", payload);
  }
}