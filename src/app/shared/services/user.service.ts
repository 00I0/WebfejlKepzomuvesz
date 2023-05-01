import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {CartService} from "./cart.service";
import {Cart} from "../models/cart";

@Injectable({
  providedIn: "root"
})
export class UserService {
  collectionName: string = 'Users'

  constructor(private fireStore: AngularFirestore, private cartService: CartService) {
  }

  getAll(): Observable<User[]> {
    return this.fireStore.collection<User>(this.collectionName).valueChanges();
  }

  insert(user: User): Promise<void> {
    return this.fireStore.collection<User>(this.collectionName).doc(user.id).set(Object.assign({}, user))
      .then(_ => this.cartService.insert(new Cart(user.id, [])))
  }

  delete(id: string): Promise<void> {
    return this.fireStore.collection<User>(this.collectionName).doc(id).delete()
      .then(_ => this.cartService.delete(id));
  }

  getById(id: string): Observable<User | undefined> {
    return this.fireStore.collection<User>(this.collectionName).doc(id).valueChanges();
  }
}
