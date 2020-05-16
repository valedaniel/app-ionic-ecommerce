import { Component } from '@angular/core';
import { User } from 'src/domain/model/user';
import UserService from 'src/services/userService';
import { AlertController } from '@ionic/angular';
import StorageRepository from '../repositories/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private user = new User();

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private storageRepository: StorageRepository,
    private router: Router) {

    this.checkToken();
  }

  private login(): void {
    try {
      if (this.validateUser())
        this.userService.authenticate(this.user, (data: any) => {
          if (data.status === 401) {
            this.presentAlert('Email ou senha estão incorretos')
          } else {
            this.storageRepository.set('token', data, () => {
              this.redirectToListProducts();
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  private validateUser(): boolean {
    if (!this.user.email || !this.user.password) {
      this.presentAlert('Preencha todos os campos');
      return false;
    }
    return true;
  }

  private async checkToken(): Promise<void> {
    this.storageRepository.get('token', (token) => {
      if (token) { this.redirectToListProducts(); }
    });
  }

  private redirectToRegister(): void {
    this.router.navigate(['register']);
  }

  private redirectToListProducts(): void {
    this.router.navigate(['list-products']);
  }

  async presentAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Não foi possível realizar o login',
      message,
    });

    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 2000)
  }

}
