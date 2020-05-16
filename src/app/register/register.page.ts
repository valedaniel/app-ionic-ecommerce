import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserService from 'src/services/userService';
import { User } from 'src/domain/model/user';
import { AlertController } from '@ionic/angular';
import StorageRepository from '../repositories/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private user = new User();
  private confirmPassword: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private storageRepository: StorageRepository) { }

  ngOnInit() {
  }

  private register(): void {
    if (this.validateUser()) {
      this.userService.register(this.user, (data) => {
        if (data.status === 400) {
          this.presentAlert('O email digitado já existe')
        } else {
          this.storageRepository.set('token', data, () => {
            this.redirectToListProducts();
          });
        }
      })
    }
  }

  private validateUser(): boolean {
    if (!this.user.age ||
      !this.user.address ||
      !this.user.email ||
      !this.user.name ||
      !this.user.password ||
      !this.confirmPassword) {
      this.presentAlert('Preencha todos os campos');
      return false;
    }

    if (this.user.age < 18) {
      this.presentAlert('O usuário deve ser maior de idade');
      return false;
    }

    if (this.user.password !== this.confirmPassword) {
      this.presentAlert('As senhas não coincidem');
      return false;
    }

    return true;
  }

  async presentAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Não foi possível cadastrar',
      message,
    });

    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 2000)
  }

  private redirectToLogin(): void {
    this.router.navigate(['home']);
  }

  private redirectToListProducts(): void {
    this.router.navigate(['list-products']);
  }
}
