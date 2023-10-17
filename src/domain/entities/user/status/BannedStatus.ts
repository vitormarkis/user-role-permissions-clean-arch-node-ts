import Status from "~/domain/entities/user/status/Status"

export default class BannedStatus extends Status {
  constructor() {
    super("BANNED")
  }
}
