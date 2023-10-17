import User from "~/domain/entities/User"
import ActiveStatus from "~/domain/entities/user/status/ActiveStatus"
import ID from "~/domain/shared/ID"
import AdminRole from "~/domain/shared/role/AdminRole"
import UserRole from "~/domain/shared/role/UserRole"

test("should CREATE a user with User role as default", async () => {
  const user = new User({
    id: new ID(),
    role: new UserRole(),
    status: new ActiveStatus(),
  })
  expect(user.role.name).toBe("USER")
})

test("should PROMOTE user to admin", async () => {
  const user = new User({
    id: new ID(),
    role: new UserRole(),
    status: new ActiveStatus(),
  })
  expect(user.role.name).toBe("USER")
  user.setRole(new AdminRole())
  expect(user.role.name).toBe("ADMIN")
})
