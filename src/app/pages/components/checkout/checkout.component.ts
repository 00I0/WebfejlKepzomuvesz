import {Component, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {Cart} from "../../../shared/models/cart";
import {Subscription} from "rxjs";
import {AuthService} from "../../../shared/services/auth.service";
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  templateUrl: 'checkout.component.html',
  selector: 'checkout-component'
})
export class CheckoutComponent implements OnChanges, OnInit, OnDestroy{
  cart?: Cart
  private cartSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(private location: Location, private authService: AuthService, private cartService: CartService,
              private router: Router) {

  }

private updateFields() {
    this.authService.getCurrentUser().then(user => {
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

  goBack(): void {
    this.location.back();
  }

  finishShopping(): void {
    if(this.cart){
      this.cart.items = [];
      this.cartService.update(this.cart)
    }
    alert("Köszönjük a vásárlást")
    this.router.navigateByUrl('/shop')
  }
}
