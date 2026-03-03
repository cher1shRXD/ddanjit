import { BaseResponse } from "../../global";
import { Activity } from "../types";

export type ActivityRes = BaseResponse<Activity>;

export type ActivityListRes = BaseResponse<Activity[]>;