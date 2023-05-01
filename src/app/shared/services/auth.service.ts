import {Injectable, OnDestroy} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "./user.service";
import {User} from "../models/user";
import {Subscription} from "rxjs";
import {getAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  private userSubscription?: Subscription
  private authSubscription?: Subscription

  constructor(private auth: AngularFireAuth, private userService: UserService) {
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  async signOut() {
    await this.auth.signOut();
  }

  async isLoggedIn(): Promise<boolean> {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(user => resolve(!!user))
    })
  }

  deleteCurrentUser(){
    const auth = getAuth();
    const user = auth.currentUser;
    user?.delete();
  }


  getCurrentUser(): Promise<User | undefined> {
    return new Promise(resolve => {
      this.authSubscription = this.auth.user.subscribe(user => {
        if (!user)
          resolve(undefined)

        this.userSubscription = this.userService.getById(user?.uid as string).subscribe(user => {
          if (!user)
            resolve(undefined)

          resolve(user as User)
        });
      });
    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }
}
