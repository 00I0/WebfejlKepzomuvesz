import {Component, Input, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../../../shared/models/user";
import {Cart} from "../../../shared/models/cart";
import {CartService} from "../../../shared/services/cart.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnChanges, OnInit, OnDestroy {
  @Input() sidenav!: MatSidenav
  currentUser?: User
  cart?: Cart

  private cartSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {

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
}
