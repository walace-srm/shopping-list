import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.page.html',
  styleUrls: ['./release-notes.page.scss'],
})
export class ReleaseNotesPage implements OnInit {

  constructor(
    private menuController: MenuController
  ) { }

  ngOnInit() {
    this.menuController.close();
  }

}
