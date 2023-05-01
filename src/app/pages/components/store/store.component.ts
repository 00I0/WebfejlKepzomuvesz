import {Component} from "@angular/core";
import {ItemService} from "../../../shared/services/item.service";
import {Observable, Subscription} from "rxjs";
import {Item} from "../../../shared/models/item";
import {User} from "../../../shared/models/user";
import {Cart} from "../../../shared/models/cart";
import {AuthService} from "../../../shared/services/auth.service";
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'store-component',
  templateUrl: './store.component.html',
})
export class StoreComponent {
  items: Observable<Item[]>;
  currentUser?: User
  cart?: Cart

  private cartSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(private itemService: ItemService, private authService: AuthService, private cartService: CartService,
              private router: Router) {
    this.items = itemService.getAll();
  }

  private updateFields() {
    this.authService.getCurrentUser().then(user => {
      this.currentUser = user;

      if (user) {
        this.cartSubscription = this.cartService.getById(user.id).subscribe(cart => {
          if (!cart) this.cart = undefined;
          cart = cart as Cart
          this.cart = cart;
        });
      }
    })
  }

  ngOnChanges(): void {
    this.updateFields();
  }

  ngOnInit(): void {
    this.updateFields();
    this.routerSubscription = this.router.events.subscribe(_ => this.updateFields());
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe()
    this.routerSubscription?.unsubscribe()
  }

  addItemToCart(item: Item) {
    if(!this.cart) {
      alert('A kosárbatételhez be kell jelentkeznie')
      this.router.navigateByUrl('/login')
      return
    }

    this.cart.items.push(item.id);
    this.cartService.update(this.cart);
    alert(item.name + ' betéve a kosárba')
  }
}


