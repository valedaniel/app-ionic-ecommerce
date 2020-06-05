import { Component } from '@angular/core';
import { User } from 'src/domain/model/user';
import UserService from 'src/services/userService';
import { AlertController, LoadingController } from '@ionic/angular';
import StorageRepository from '../repositories/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private user = new User();
  private loading = this.loadingController.create({
    message: 'Aguarde...',
  });

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private storageRepository: StorageRepository,
    private router: Router,
    public loadingController: LoadingController) {

    this.checkToken();
  }

  private login(): void {
    try {
      if (this.validateUser())
        this.startLoading();
      this.userService.authenticate(this.user, async (data: any) => {
        if (data.status === 401) {
          await this.stopLoading();
          this.presentAlert('Email ou senha estão incorretos');
        } else {
          this.storageRepository.set('token', data, async () => {
            await this.stopLoading();
            this.redirectToListProducts();
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async startLoading() {
    await (await this.loading).present();
  }

  async stopLoading() {
    await (await this.loading).dismiss();
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
