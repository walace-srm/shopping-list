import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
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

    this.loginService.createUser(value.email, value.password)
      .then(async (result) => {
        result.user.sendEmailVerification();
        const registeredSuccessfully = await this.toastController.create({
          message: 'Usuário cadastrado com sucesso!',
          color: 'success',
          duration: 5000
        });
        this.signUpForm.reset();
        return registeredSuccessfully.present();
      }).catch(async (error) => {
      console.log(error);
      if (error.code === 'auth/invalid-email') {
        const emailInvalid = await this.toastController.create({
          message: 'Formato de e-mail inválido',
          color: 'danger',
          duration: 3000
        });
        return emailInvalid.present();
      }

      if (error.code === 'auth/email-already-in-use') {
        const emailInUse = await this.toastController.create({
          message: 'Já existe esse email cadastrado',
          color: 'danger',
          duration: 3000
        });
        return emailInUse.present();
      }

      if (error.code === 'auth/weak-password') {
        const weakPassword = await this.toastController.create({
          message: 'A senha deve ter pelo menos 6 caracteres',
          color: 'danger',
          duration: 3000
        });
        return weakPassword.present();
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
