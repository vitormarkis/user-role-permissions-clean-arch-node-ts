import User from "~/domain/entities/User"
import ActiveStatus from "~/domain/entities/user/status/ActiveStatus"
import ID from "~/domain/shared/ID"
import AdminRole from "~/domain/shared/role/AdminRole"
import SuperAdminRole from "~/domain/shared/role/SuperAdminRole"
import BanUserUseCase from "~/domain/use-cases/BanUserUseCase"
import UsersRepositoryInMemory from "~/infra/repositories/UsersRepositoryInMemory"

test("should BAN super admin", async () => {
  const usersRepositoryInMemory = new UsersRepositoryInMemory()

  usersRepositoryInMemory.createUser(
    new User({
      id: new ID(),
      username: "vitormarkis",
      role: new AdminRole(),
      status: new ActiveStatus(),
    }),
  )

  usersRepositoryInMemory.createUser(
    new User({
      id: new ID(),
      username: "matheus",
      role: new SuperAdminRole(),
      status: new ActiveStatus(),
    }),
  )

  const banUserUseCase = new BanUserUseCase(usersRepositoryInMemory)

  banUserUseCase.execute({
    mandantUserUsername: "matheus",
    banningUserUsername: "vitormarkis",
  })

  expect(usersRepositoryInMemory.findByUsername("vitormarkis").status.name).toBe("BANNED")
})
