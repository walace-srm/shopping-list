import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemCreatePage } from './item-create.page';

const routes: Routes = [
  {
    path: '',
    component: ItemCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemCreatePageRoutingModule {}
