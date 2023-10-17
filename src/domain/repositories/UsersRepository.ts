import User from "~/domain/entities/User"

export interface UsersRepository {
  createUser(user: User): void
  findByUsername(username: string): User
  findById(id: string): User
  update(user: User): void
}
