import {LoginComponent} from "./app/pages/components/login/login.component";
import {StoreComponent} from "./app/pages/components/store/store.component";
import {Routes} from "@angular/router";
import {SignupComponent} from "./app/pages/components/signup/signup.component";
import {AuthGuard} from "./app/shared/services/auth.guard";
import {CheckoutComponent} from "./app/pages/components/checkout/checkout.component";
import {ProfileComponent} from "./app/pages/components/profile/profile.component";

export const routes:Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    component: StoreComponent
  },
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'shop'
  }

]
