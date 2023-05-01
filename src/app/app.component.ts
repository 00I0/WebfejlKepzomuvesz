import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {User} from "./shared/models/user";
import {Cart} from "./shared/models/cart";
import {Subscription} from "rxjs";
import {CartService} from "./shared/services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit, OnDestroy {
  title = 'Bio';
  loggedIn: boolean = false;
  currentUser?: User
  cart?: Cart

  private cartSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {}

  private updateUser(){
    this.authService.isLoggedIn().then(value => {
      this.loggedIn = value;
    })

    this.authService.getCurrentUser().then(user => {
      this.currentUser = user;

      if (user) {
        this.cartSubscription = this.cartService.getById(user.id).subscribe(cart => {
          if (!cart) this.cart = undefined;
          this.cart = cart as Cart;
        });
      }
    })
  }

  ngOnChanges(): void {
    this.updateUser();
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(_ => this.updateUser());
    this.updateUser();
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe()
    this.routerSubscription?.unsubscribe()
  }
}
