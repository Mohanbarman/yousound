import { getManager } from "typeorm";
import { UserEntity } from "../entities/UserEntity";

export const userHelpers = {
  /**
   * Get a single user by id
   * @param id
   */
  getById: (id: number): Promise<UserEntity | null> => {
    const manager = getManager();
    return manager.findOne(UserEntity, id);
  },

  /**
   * Create a user if not exists else updates the user
   * @param user
   */
  save: (user: UserEntity): Promise<UserEntity> => {
    const manager = getManager();
    return manager.save(user);
  },

  /**
   * Get a user by email
   * @param email
   */
  getByEmail: (email: string): Promise<UserEntity | null> => {
    const manager = getManager();
    return manager.findOne(UserEntity, { where: { email } });
  },
};
