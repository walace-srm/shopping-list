import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReleaseNotesPage } from './release-notes.page';

const routes: Routes = [
  {
    path: '',
    component: ReleaseNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleaseNotesPageRoutingModule {}
