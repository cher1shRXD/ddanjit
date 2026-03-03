import type { ActivityListRes, ActivityRes, Duration } from "@ddanjit/domain";
import apiClient from "../../../shared/libs/axios/api-client";

export const FindActivityApi = {
  async findActivity(duration: Duration, bundleId?: number) {
    const time = new Date().getHours();
    return await apiClient.get<ActivityRes>(
      `/activities/recommend?duration=${duration}&time=${time}${bundleId ? `&bundleId=${bundleId}` : ""}`,
    );
  },

  async getActivityList(duration: Duration, bundleId?: number) {
    const time = new Date().getHours();
    return await apiClient.get<ActivityListRes>(
      `/activities/candidates?duration=${duration}&time=${time}${bundleId ? `&bundleId=${bundleId}` : ""}`,
    );
  },

  async findShortActivity() {
    return await apiClient.get<ActivityRes>(`/activities/short`);
  },
};
