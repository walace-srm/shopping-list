import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemCreatePageRoutingModule } from './item-create-routing.module';

import { ItemCreatePage } from './item-create.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ItemCreatePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ItemCreatePage]
})
export class ItemCreatePageModule {}
