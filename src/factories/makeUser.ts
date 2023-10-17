import User, { UserProps } from "~/domain/entities/User"
import ActiveStatus from "~/domain/entities/user/status/ActiveStatus"
import ID from "~/domain/shared/ID"
import UserRole from "~/domain/shared/role/UserRole"

export function makeUser(username: string, additionalUserProps: Partial<UserProps> = {}): User {
  return new User({
    id: new ID(),
    role: new UserRole(),
    status: new ActiveStatus(),
    username,
    ...additionalUserProps,
  })
}
