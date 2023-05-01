import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Cart} from "../models/cart";

@Injectable({
  providedIn: "root"
})
export class CartService {
  collectionName: string = 'Carts'

  constructor(private fireStore: AngularFirestore) {
  }

  insert(cart: Cart): Promise<void> {
    return this.fireStore.collection<Cart>(this.collectionName).doc(cart.userId).set(Object.assign({}, cart))
  }

  delete(id: string): Promise<void> {
    return this.fireStore.collection<User>(this.collectionName).doc(id).delete();
  }

  getById(id: string): Observable<Cart | undefined> {
    return this.fireStore.collection<Cart>(this.collectionName).doc(id).valueChanges();
  }

  update(cart: Cart) {
    return this.fireStore.collection<Cart>(this.collectionName).doc(cart.userId).set(cart);
  }
}
