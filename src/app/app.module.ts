import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from "./pages/components/login/login.component";
import {HeaderComponent} from "./pages/components/header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {StoreComponent} from "./pages/components/store/store.component";
import {StoreThumbnailComponent} from "./pages/components/store/store-thumbnail.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {routes} from "../routes";
import {SignupComponent} from "./pages/components/signup/signup.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CartComponent} from "./pages/components/cart/cart.component";
import {HufPipe} from "./shared/pipes/HufPipe";
import {CheckoutComponent} from "./pages/components/checkout/checkout.component";
import {ProfileComponent} from "./pages/components/profile/profile.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StoreComponent,
    StoreThumbnailComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    HufPipe,
    CheckoutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatBadgeModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"}),
    FlexLayoutModule,
    MatTooltipModule,
    MatProgressBarModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
