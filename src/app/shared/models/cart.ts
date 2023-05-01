export class Cart{
  userId: string
  items: string[]

  constructor(userId: string, items: string[]) {
    this.userId = userId;
    this.items = items;
  }

}
