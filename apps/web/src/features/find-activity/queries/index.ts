import { useQuery } from "@tanstack/react-query";
import { FindActivityApi } from "../api";
import type { Duration } from "@ddanjit/domain";

export const useFindActivityQuery = (duration: Duration, bundleId?: number) => {
  return useQuery({
    queryKey: ["find-activity"],
    queryFn: () => FindActivityApi.findActivity(duration, bundleId),
  });
};
