import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleaseNotesPageRoutingModule } from './release-notes-routing.module';

import { ReleaseNotesPage } from './release-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReleaseNotesPageRoutingModule
  ],
  declarations: [ReleaseNotesPage]
})
export class ReleaseNotesPageModule {}
