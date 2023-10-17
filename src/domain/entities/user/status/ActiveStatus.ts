import Status from "~/domain/entities/user/status/Status"

export default class ActiveStatus extends Status {
  constructor() {
    super("ACTIVE")
  }
}
