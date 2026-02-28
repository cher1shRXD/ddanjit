import { userRepository } from "./repository";
import {
  BaseResponseBuilder,
  ErrorResponseBuilder,
  SaveUserInfoReq,
  UserError,
} from "@ddanjit/domain";

export const userService = {
  async getMe(email: string) {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new Error(UserError.NOTFOUND);
      }
      return BaseResponseBuilder(200, undefined, user);
    } catch (e) {
      throw ErrorResponseBuilder(e);
    }
  },

  async checkUserInfo(email: string) {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new Error(UserError.NOTFOUND);
      }
      if (!user.name || !user.birthYear) {
        return BaseResponseBuilder(200, "유저 정보를 등록하지 않았습니다.", {
          registered: false,
        });
      } else {
        return BaseResponseBuilder(200, "유저 정보가 등록되어 있습니다.", {
          registered: true,
        });
      }
    } catch (e) {
      throw ErrorResponseBuilder(e);
    }
  },

  async saveUserInfo(email: string, userInfo: SaveUserInfoReq) {
    try {
      const isExist = await userRepository.findByEmail(email);
      if (!isExist) {
        throw new Error(UserError.NOTFOUND);
      }
      const updatedUser = await userRepository.save(email, userInfo);
      return BaseResponseBuilder(201, "정보가 저장되었어요.", updatedUser);
    } catch (e) {
      throw ErrorResponseBuilder(e);
    }
  },

  async deleteUser(email: string) {
    try {
      const isExist = await userRepository.findByEmail(email);
      if (!isExist) {
        throw new Error(UserError.NOTFOUND);
      }
      await userRepository.delete(email);
      return BaseResponseBuilder(200, "그동안 즐거웠어요. 또 만나요!");
    } catch (e) {
      throw ErrorResponseBuilder(e);
    }
  },
};
