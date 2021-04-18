import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastController: ToastController
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async requiredFields() {
    const toast = await this.toastController.create({
      message: 'Verifique os campos obrigatórios',
      position: 'bottom',
      color: 'warning',
      duration: 2000
    });
    toast.present();
  }

  onSubmit({value, valid}: { value: any; valid: boolean; }) {
    if (!valid) {
      return this.requiredFields();
    }
    this.loginService.login(value.email, value.password).then(() => {
      this.loginForm.reset();
      this.router.navigate(['home']);
    }).catch(async (error) => {
      if (error.code === 'auth/user-not-found') {
        const emailNotFound = await this.toastController.create({
          message: 'E-mail não cadastrado',
          color: 'danger',
          duration: 3000
        });
        return emailNotFound.present();
      }
      if (error.code === 'auth/wrong-password') {
        const emailNotFound = await this.toastController.create({
          message: 'Usuário e/ou senha inválidos',
          color: 'danger',
          duration: 3000
        });
        return emailNotFound.present();
      }

      const toast = await this.toastController.create({
        message: error,
        position: 'bottom',
        color: 'danger',
        duration: 3000
      });
      toast.present();
    });
  }

}
