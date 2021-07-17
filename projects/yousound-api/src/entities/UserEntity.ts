import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /**
   * Full name of the user same as in google account
   */
  @Column()
  name!: string;

  /**
   * Email of the user retreived from google
   */
  @Column()
  email!: string;

  /**
   * Profile picture of the user in their google account
   */
  @Column()
  profilePicture: string;

  /**
   * OAUTH refresh token to get new access token
   * after it expires
   */
  @Column()
  refreshToken!: string;

  /**
   * OAUTH access token to access the resource of the user
   */
  @Column()
  accessToken!: string;

  /**
   * Expire date of access token
   */
  @Column()
  accessTokenExp!: Date;
}
