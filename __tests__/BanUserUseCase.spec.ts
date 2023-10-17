import AdminRole from "~/domain/shared/role/AdminRole"
import SuperAdminRole from "~/domain/shared/role/SuperAdminRole"
import BanUserUseCase from "~/domain/use-cases/BanUserUseCase"
import { makeUser } from "~/factories/makeUser"
import UsersRepositoryInMemory from "~/infra/repositories/UsersRepositoryInMemory"

let usersRepositoryInMemory: UsersRepositoryInMemory
let banUserUseCase: BanUserUseCase

beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory()
  banUserUseCase = new BanUserUseCase(usersRepositoryInMemory)
})

test("should NOT BAN user if mandant don't have permission", async () => {
  usersRepositoryInMemory.createUser(makeUser("vitormarkis"))
  usersRepositoryInMemory.createUser(makeUser("matheus"))

  expect(() => {
    banUserUseCase.execute({
      mandantUserUsername: "vitormarkis",
      banningUserUsername: "matheus",
    })
  }).toThrowError("This user don't have permission to ban anyone.")

  expect(usersRepositoryInMemory.findByUsername("matheus").status.name).toBe("ACTIVE")
})

test("should BAN user if mandant have permission", async () => {
  usersRepositoryInMemory.createUser(
    makeUser("vitormarkis", {
      role: new AdminRole(),
    }),
  )
  usersRepositoryInMemory.createUser(makeUser("matheus"))
  expect(usersRepositoryInMemory.findByUsername("matheus").role.name).toBe("USER")

  banUserUseCase.execute({
    mandantUserUsername: "vitormarkis",
    banningUserUsername: "matheus",
  })

  const bannedUser = usersRepositoryInMemory.findByUsername("matheus")
  expect(bannedUser.status.name).toBe("BANNED")
})

test("ADMIN should NOT be able to ban the Super Admin", async () => {
  usersRepositoryInMemory.createUser(
    makeUser("vitormarkis", {
      role: new AdminRole(),
    }),
  )
  usersRepositoryInMemory.createUser(
    makeUser("matheus", {
      role: new SuperAdminRole(),
    }),
  )

  expect(() => {
    banUserUseCase.execute({
      mandantUserUsername: "vitormarkis",
      banningUserUsername: "matheus",
    })
  }).toThrow()
})
