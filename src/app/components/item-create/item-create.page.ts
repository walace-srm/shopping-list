import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ToastController} from '@ionic/angular';
import {ItemDataService} from '../../services/item-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.page.html',
  styleUrls: ['./item-create.page.scss'],
})
export class ItemCreatePage implements OnInit, OnDestroy {
  public itemForm: FormGroup;
  public key = '';
  // @ts-ignore
  public counter = this.itemForm?.value.quantity || 1;
  public event;

  public readonly subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private itemDataService: ItemDataService
  ) {
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [1, Validators.required]
    });
    this.pathItem();
    this.counter = this.itemForm.value.quantity;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe && subscription.unsubscribe()
    );
  }

  pathItem() {
    const currentItemSub = this.itemDataService.currentItem.subscribe(data => {
      this.key = data?.key;
      if (data.item) {
        this.itemForm.patchValue({
          name: data.item.name,
          quantity: data.item.quantity
        });
      }
    });
    this.subscriptions.push(currentItemSub);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  increment() {
    this.counter += 1;
    if (this.event) {
      this.counter = this.event += 1;
    }
    this.itemForm.value.quantity = this.counter;
  }

  decrement() {
    if (this.counter <= 1) return;

    this.counter -= 1;

    if (this.event) {
      this.counter = this.event -= 1;
    }
    this.itemForm.value.quantity = this.counter;
  }

  inputEvent(e) {
    this.event = e;
  }

  async onSubmit({value, valid}: { value: any; valid: boolean; }) {
    if (!valid) {
      const toast = await this.toastCtrl.create({
        message: 'Verifique os campos obrigatórios!',
        duration: 3000,
        position: 'bottom',
        color: 'warning'
      });

      toast.present();
      return;
    }
    if (this.key) {
      this.itemService.update(value, this.key);
    } else {
      this.itemService.insert(value);
    }
    this.router.navigate(['home']);
  }
}
