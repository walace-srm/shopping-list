import {BehaviorSubject, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Item} from '../models/item.model';


@Injectable({
  providedIn: 'root'
})
export class ItemDataService {
  private itemSource = new BehaviorSubject({ item: null, key: '' });
  public currentItem = this.itemSource.asObservable();

  constructor() { }

  changeItem(item: Item, key: string) {
    this.itemSource.next({ item: item, key: key });
  }
}
