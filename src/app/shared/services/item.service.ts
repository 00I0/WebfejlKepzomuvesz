import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Item} from "../models/item";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  collectionName: string = 'Items'

  constructor(private fireStore: AngularFirestore, private fireStorage: AngularFireStorage) {
  }

  getAll(): Observable<Item[]> {
    return this.fireStore.collection<Item>(this.collectionName, ref => ref.orderBy('id')).valueChanges();
  }

  getAllById(ids: string[]): Observable<Item[]> {
    if (ids.length == 0) {
      return new Observable()
    }


    return this.fireStore
      .collection<Item>(this.collectionName, ref => ref.where('id', 'in', ids))
      .valueChanges()
  }

  loadImage(imageUrl: string) {
    return this.fireStorage.ref(imageUrl).getDownloadURL();
  }
}
