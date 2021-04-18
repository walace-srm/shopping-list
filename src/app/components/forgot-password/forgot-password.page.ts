import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public forgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  async onSubmit({value, valid}: { value: any; valid: boolean; }) {
    if (!valid) {
      const emailNotFound = await this.toastController.create({
        message: 'E-mail não informado',
        color: 'warning',
        duration: 3000
      });
      return emailNotFound.present();
    }
    this.loginService.forgotPassword(value.email)
      .then(async () => {
        const sendEmail = await this.toastController.create({
          message: 'Email de redefinição de senha enviado, verifique sua caixa de entrada.',
          color: 'warning',
          duration: 4000
        });
        this.forgotPasswordForm.reset();
        return sendEmail.present();
      }).catch(async (error) => {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        const sendEmail = await this.toastController.create({
          message: 'E-mail não cadastrado',
          color: 'warning',
          duration: 4000
        });
        return sendEmail.present();
      }
    });
  }

}
