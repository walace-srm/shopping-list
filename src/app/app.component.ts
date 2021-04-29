import {Component, OnDestroy} from '@angular/core';
import {LoginService} from './services/login.service';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy{
  constructor(
    private loginService: LoginService,
    private router: Router,
    private menuController: MenuController
  ) {}

  ngOnDestroy() {
    console.log('Destruiu');
  }

  logout() {
    this.loginService.logout();
    this.menuController.close();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
