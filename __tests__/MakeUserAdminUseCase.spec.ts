import SuperAdminRole from "~/domain/shared/role/SuperAdminRole"
import MakeUserAdminUseCase from "~/domain/use-cases/MakeUserAdminUseCase"
import { makeUser } from "~/factories/makeUser"
import UsersRepositoryInMemory from "~/infra/repositories/UsersRepositoryInMemory"

let usersRepositoryInMemory: UsersRepositoryInMemory
let makeUserAdminUseCase: MakeUserAdminUseCase

beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory()
  makeUserAdminUseCase = new MakeUserAdminUseCase(usersRepositoryInMemory)
})

test("should not allow user to make other admin", async () => {
  usersRepositoryInMemory.createUser(makeUser("vitormarkis"))
  usersRepositoryInMemory.createUser(makeUser("matheus"))

  expect(() =>
    makeUserAdminUseCase.execute({
      mandantUserUsername: "vitormarkis",
      newAdminUserUsername: "matheus",
    }),
  ).toThrow()
})

test("should ALLOW user to make other admin", async () => {
  usersRepositoryInMemory.createUser(
    makeUser("vitormarkis", {
      role: new SuperAdminRole(),
    }),
  )
  usersRepositoryInMemory.createUser(makeUser("matheus"))

  makeUserAdminUseCase.execute({
    mandantUserUsername: "vitormarkis",
    newAdminUserUsername: "matheus",
  })

  const user = usersRepositoryInMemory.findByUsername("matheus")
  expect(user.role.name).toBe("ADMIN")
})
