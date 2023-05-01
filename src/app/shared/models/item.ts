export class Item{
  id: string
  name: string
  picture: string
  description: string
  price: number


  constructor(id: string, name: string, picture: string, description: string, price: number) {
    this.id = id
    this.name = name
    this.picture = picture
    this.description = description
    this.price = price
  }
}
