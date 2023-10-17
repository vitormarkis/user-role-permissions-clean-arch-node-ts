import { UsersRepository } from "~/domain/repositories/UsersRepository"
import ID from "~/domain/shared/ID"
import AdminRole from "~/domain/shared/role/AdminRole"
import ModeratorRole from "~/domain/shared/role/ModeratorRole"
import SuperAdminRole from "~/domain/shared/role/SuperAdminRole"
import ChangeUserUsernameUseCase from "~/domain/use-cases/ChangeUserUsernameUseCase"
import { makeUser } from "~/factories/makeUser"
import UsersRepositoryInMemory from "~/infra/repositories/UsersRepositoryInMemory"

let usersRepository: UsersRepository
let changeUserUsernameUseCase: ChangeUserUsernameUseCase

beforeEach(() => {
  usersRepository = new UsersRepositoryInMemory()
  changeUserUsernameUseCase = new ChangeUserUsernameUseCase(usersRepository)
})

describe("ChangeUserUsernameUseCase test suite", () => {
  test("User should be able to change it's username", async () => {
    const id = new ID("998")
    usersRepository.createUser(makeUser("vitor", { id }))

    expect(usersRepository.findById("998").username).toBe("vitor")

    changeUserUsernameUseCase.execute({
      mandantUsername: "vitor",
      changingUserUsername: "vitor",
      newUsername: "vitormarkis",
    })

    expect(usersRepository.findById("998").username).toBe("vitormarkis")
  })

  test("Moderator should be able to change user's username", async () => {
    const id = new ID("998")
    usersRepository.createUser(makeUser("vitor", { role: new ModeratorRole() }))
    usersRepository.createUser(makeUser("matheus", { id }))

    expect(usersRepository.findById("998").username).toBe("matheus")

    changeUserUsernameUseCase.execute({
      mandantUsername: "vitor",
      changingUserUsername: "matheus",
      newUsername: "matheuscosta",
    })

    expect(usersRepository.findById("998").username).toBe("matheuscosta")
  })
  test("User should NOT be able to change moderator's username", async () => {
    const id = new ID("998")
    usersRepository.createUser(makeUser("vitor", { id, role: new ModeratorRole() }))
    usersRepository.createUser(makeUser("matheus"))

    expect(usersRepository.findById("998").username).toBe("vitor")

    expect(() => {
      changeUserUsernameUseCase.execute({
        mandantUsername: "matheus",
        changingUserUsername: "vitor",
        newUsername: "vitormarkis",
      })
    }).toThrow("User's role: USER, can't change username of user's role: MODERATOR")

    expect(usersRepository.findById("998").username).toBe("vitor")
  })
  test("Moderator should NOT be able to change Admin's username", async () => {
    const id = new ID("998")
    usersRepository.createUser(makeUser("mod", { role: new ModeratorRole() }))
    usersRepository.createUser(makeUser("admin", { id, role: new AdminRole() }))

    expect(usersRepository.findById("998").username).toBe("admin")

    expect(() => {
      changeUserUsernameUseCase.execute({
        mandantUsername: "mod",
        changingUserUsername: "admin",
        newUsername: "admin-changed",
      })
    }).toThrow("User's role: MODERATOR, can't change username of user's role: ADMIN")

    expect(usersRepository.findById("998").username).toBe("admin")
  })
  test("Moderator should NOT be able to change Superadmin's username", async () => {
    const id = new ID("998")
    usersRepository.createUser(makeUser("mod", { role: new ModeratorRole() }))
    usersRepository.createUser(makeUser("superadmin", { id, role: new SuperAdminRole() }))

    expect(usersRepository.findById("998").username).toBe("superadmin")

    expect(() => {
      changeUserUsernameUseCase.execute({
        mandantUsername: "mod",
        changingUserUsername: "superadmin",
        newUsername: "superadmin-changed",
      })
    }).toThrow("User's role: MODERATOR, can't change username of user's role: SUPER-ADMIN")

    expect(usersRepository.findById("998").username).toBe("superadmin")
  })
  test("Admin should NOT be able to change Superadmin's username", async () => {
    const id = new ID("998")
    usersRepository.createUser(makeUser("admin", { role: new AdminRole() }))
    usersRepository.createUser(makeUser("superadmin", { id, role: new SuperAdminRole() }))

    expect(usersRepository.findById("998").username).toBe("superadmin")

    expect(() => {
      changeUserUsernameUseCase.execute({
        mandantUsername: "admin",
        changingUserUsername: "superadmin",
        newUsername: "superadmin-changed",
      })
    }).toThrow("User's role: ADMIN, can't change username of user's role: SUPER-ADMIN")

    expect(usersRepository.findById("998").username).toBe("superadmin")
  })
  test("Superadmin should be able to change Admin's username", async () => {
    const id = new ID("998")
    usersRepository.createUser(makeUser("admin", { id, role: new AdminRole() }))
    usersRepository.createUser(makeUser("superadmin", { role: new SuperAdminRole() }))

    expect(usersRepository.findById("998").username).toBe("admin")

    changeUserUsernameUseCase.execute({
      mandantUsername: "superadmin",
      changingUserUsername: "admin",
      newUsername: "admin-changed",
    })

    expect(usersRepository.findById("998").username).toBe("admin-changed")
  })
})
