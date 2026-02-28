import { SaveUserInfoReq, userTable } from "@ddanjit/domain";
import { db } from "../../global/db/mysql";
import { eq } from "drizzle-orm";

export const userRepository = {
  async findById(id: number) {
    return await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .then((res) => res[0] ?? null);
  },

  async findByEmail(email: string) {
    return await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .then((res) => res[0] ?? null);
  },

  async createOauthUser(email: string) {
    await db.insert(userTable).values({ email });
    return await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .then((res) => res[0] ?? null);
  },

  async save(email: string, user: SaveUserInfoReq) {
    await db.update(userTable).set(user).where(eq(userTable.email, email));
    return await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .then((res) => res[0] ?? null);
  },

  async delete(email: string) {
    return await db.delete(userTable).where(eq(userTable.email, email));
  },
};
