import Status from "~/domain/entities/user/status/Status"
import ID from "~/domain/shared/ID"
import Role from "~/domain/shared/role/Role"

export type UserProps = {
  id: ID
  role: Role
  status: Status
  username: string
}

export default class User {
  readonly #id: ID
  public username: string
  #role: Role
  #status: Status

  constructor(userProps: UserProps) {
    this.#id = userProps.id
    this.#role = userProps.role
    this.#status = userProps.status
    this.username = userProps.username
  }

  setRole(newRole: Role) {
    this.#role = newRole
  }

  setStatus(newStatus: Status) {
    this.#status = newStatus
  }

  get role() {
    return this.#role
  }

  get id() {
    return this.#id
  }

  get status() {
    return this.#status
  }
}
