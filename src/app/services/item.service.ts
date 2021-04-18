import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {Item} from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private uid: string;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.fetchUid();
  }

  fetchUid() {
    const a = JSON.parse(localStorage.getItem('user'));
    this.uid = a?.uid || null;
  }

  insert(item: Item) {
    this.db.list('item').push({
      ...item,
      uid: this.uid
    })
      .then(() => {
      });
  }

  update(item: Item, key: string) {
    this.db.list('item').update(key, item)
      .catch((error: any) => {
        console.log(error);
      });
  }

  getAll() {
    return this.db.list('item', ref => ref.orderByChild('uid').equalTo(this.uid))
      .snapshotChanges()
      .pipe(map(changes => {
        // @ts-ignore
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }));
  }

  delete(key: string) {
    this.db.object(`item/${key}`).remove();
  }
}
