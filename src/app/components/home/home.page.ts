import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, ModalController, ToastController} from '@ionic/angular';
import {ItemService} from '../../services/item.service';
import {Router} from '@angular/router';
import {Item} from '../../models/item.model';
import {ItemDataService} from '../../services/item-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public items: any = [];

  constructor(
    private alertCtrl: AlertController,
    private itemService: ItemService,
    private toastCtrl: ToastController,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private itemDataService: ItemDataService,
  ) {
  }

  ngOnInit() {
    this.fetchItem();
  }

  fetchItem() {
    this.itemService.getAll().subscribe(data => {
      this.items = data;
    });
  }

  checked(item, key) {
    this.itemService.update(item, key);
  }

  delete(key) {
    this.itemService.delete(key);
  }

  async presentActionSheet(key) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ações',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Editar',
          icon: 'pencil-outline',
          handler: () => {
            this.edit(this.items, key);
          }
        },
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.delete(key);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        },
      ]
    });
    await actionSheet.present();
  }

  openCreatePage() {
    this.router.navigate(['/item-create']);
  }

  edit(item: Item, key: string) {
    this.itemDataService.changeItem(item, key);
    this.router.navigate(['item-create']);
  }
}
