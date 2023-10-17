export default class ID {
  readonly value: string = Math.random().toString(30).substring(0, 9)

  constructor(value?: string) {
    if (value) this.value = value
  }
}
