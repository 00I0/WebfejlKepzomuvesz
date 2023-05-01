import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Cart} from "../../../shared/models/cart";
import {Item} from "../../../shared/models/item";
import {ItemService} from "../../../shared/services/item.service";
import {interval, map, Observable, reduce, takeUntil} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'cart-component',
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnChanges {
  @Input() cart?: Cart
  @Input() withActions?: boolean = true
  cartItems?: Observable<ItemAndCount[]>


  constructor(private itemService: ItemService, private cartService: CartService) {
  }

  private updateCartItems() {
    if (!this.cart) return;


    this.cartItems = this.itemService.getAllById(this.cart.items).pipe(
      takeUntil(interval(1000)),
      reduce((acc: Item[], value) => [...acc, ...value], []),
      map(items => {
        let idToItem = items.reduce((map, item) => {
          map.set(item.id, item)
          return map
        }, new Map<string, Item>)

        let countByIds = this.cart!.items.reduce((map, id) => {
          map.set(id, (map.get(id) || 0) + 1)
          return map;
        }, new Map<string, number>());

        return Array.from(idToItem.values())
          .map(item => new ItemAndCount(item, countByIds.get(item.id) || 0))
      })
    )
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.updateCartItems();
  }


  clearCart() {
    if (!this.cart) return

    this.cart.items = [];
    this.cartService.update(this.cart)
  }

  addToCart(item: Item) {
    if(!this.cart) return;

    this.cart.items.push(item.id);
    this.cartService.update(this.cart);
  }

  removeFromCart(item: Item){
    if (!this.cart) return;

    if (!this.cart.items.includes(item.id)) return;

    this.cart.items.splice(this.cart.items.indexOf(item.id), 1);
    this.cartService.update(this.cart);
  }
}

class ItemAndCount {
  constructor(public item: Item, public count: number) {
  }
}

