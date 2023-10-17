import SeeAllPostsUseCase from "~/domain/use-cases/SeeAllPostsUseCase"
import User from "~/domain/entities/User"
import ActiveStatus from "~/domain/entities/user/status/ActiveStatus"
import ID from "~/domain/shared/ID"
import AdminRole from "~/domain/shared/role/AdminRole"
import UserRole from "~/domain/shared/role/UserRole"
import MakeUserAdminUseCase from "~/domain/use-cases/MakeUserAdminUseCase"
import PostsRepositoryInMemory from "~/infra/repositories/PostsRepositoryInMemory"
import UsersRepositoryInMemory from "~/infra/repositories/UsersRepositoryInMemory"
import { makeUser } from "~/factories/makeUser"
import SuperAdminRole from "~/domain/shared/role/SuperAdminRole"
import { UsersRepository } from "~/domain/repositories/UsersRepository"

let matheus: User
let vitor: User
let makeUserAdminUseCase: MakeUserAdminUseCase
const postsRepository = new PostsRepositoryInMemory()
let usersRepository: UsersRepository
const seeAllPostsUseCase = new SeeAllPostsUseCase(postsRepository)

beforeEach(() => {
  usersRepository = new UsersRepositoryInMemory()
  makeUserAdminUseCase = new MakeUserAdminUseCase(usersRepository)

  matheus = new User({
    id: new ID(),
    role: new UserRole(),
    status: new ActiveStatus(),
    username: "matheus",
  })

  vitor = new User({
    id: new ID(),
    role: new AdminRole(),
    status: new ActiveStatus(),
    username: "matheus",
  })
})

test("should THROW since role doesn't has permission.", async () => {
  const output = seeAllPostsUseCase.execute(matheus.role)
  expect(output).toStrictEqual({ posts: [] })
})

test("should ACCESS the resource if user has permission.", async () => {
  expect(() => seeAllPostsUseCase.execute(vitor.role)).not.toThrow()
})

test("should ACCESS the resource ONLY when receive the proper role", async () => {
  const vitor = makeUser("vitor")
  const matheus = makeUser("matheus")
  usersRepository.createUser(vitor)
  usersRepository.createUser(matheus)

  expect(usersRepository.findByUsername("matheus").role.name).toBe("USER")

  expect(() =>
    makeUserAdminUseCase.execute({ mandantUserUsername: "vitor", newAdminUserUsername: "matheus" }),
  ).toThrow("User don't have permission to make other admins.")

  vitor.setRole(new SuperAdminRole())

  makeUserAdminUseCase.execute({ mandantUserUsername: "vitor", newAdminUserUsername: "matheus" })

  expect(usersRepository.findByUsername("matheus").role.name).toBe("ADMIN")
})

test("admin matheus should not be able to give admin to other people", async () => {
  const vitor = makeUser("vitor")
  const matheus = makeUser("matheus", { role: new AdminRole() })
  usersRepository.createUser(vitor)
  usersRepository.createUser(matheus)

  expect(usersRepository.findByUsername("vitor").role.name).toBe("USER")

  expect(() =>
    makeUserAdminUseCase.execute({ mandantUserUsername: "matheus", newAdminUserUsername: "vitor" }),
  ).toThrow("User don't have permission to make other admins.")

  expect(usersRepository.findByUsername("vitor").role.name).toBe("USER")
})
