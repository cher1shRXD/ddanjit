import {
  GlobalError,
  SaveUserInfoReq,
  UserError,
  userTable,
} from "@ddanjit/domain";
import { db } from "../../global/db/mysql";
import { eq } from "drizzle-orm";

export const userRepository = {
  async findById(id: number) {
    const result = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .then((res) => res[0] || null);

    if (!result) throw new Error(UserError.NOTFOUND);
    return result;
  },

  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .then((res) => res[0] || null);

    if (!result) throw new Error(UserError.NOTFOUND);
    return result;
  },

  async save(email: string, user: SaveUserInfoReq) {
    await this.findByEmail(email);

    await db.update(userTable).set(user).where(eq(userTable.email, email));

    return this.findByEmail(email);
  },

  async delete(email: string) {
    await this.findByEmail(email);
    await db
      .delete(userTable)
      .where(eq(userTable.email, email))
      .catch(() => {
        throw new Error(GlobalError.INTERNAL_ERROR);
      });
  },
};
