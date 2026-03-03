import { useQuery } from "@tanstack/react-query";
import { FindActivityApi } from "../api";
import type { Duration } from "@ddanjit/domain";

export const useFindActivityQuery = (duration: Duration, bundleId?: number) => {
  return useQuery({
    queryKey: ["find-activity"],
    queryFn: () => FindActivityApi.findActivity(duration, bundleId),
  });
};

export const useGetActivityListQuery = (
  duration: Duration,
  bundleId?: number,
) => {
  return useQuery({
    queryKey: ["activity-list", duration, bundleId],
    queryFn: () => FindActivityApi.getActivityList(duration, bundleId),
  });
};

export const useFindShortActivityQuery = () => {
  return useQuery({
    queryKey: ["find-short-activity"],
    queryFn: FindActivityApi.findShortActivity,
  });
}
