import { Component, OnInit } from '@angular/core';
import StorageRepository from '../repositories/storage';
import { Router } from '@angular/router';
import { Product } from 'src/domain/model/product';
import ProductService from 'src/services/productService';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {

  private products: Product[];

  constructor(
    private storageRepository: StorageRepository,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.checkToken();
    this.productService.list((value) => {
      this.products = value;
    })
  }

  private async checkToken(): Promise<void> {
    this.storageRepository.get('token', (token) => {
      if (!token) { this.redirectToLogin(); }
    });
  }

  private logout(): void {
    this.storageRepository.remove('token', () => {
      this.router.navigate(['home']);
    });
  }

  private redirectToLogin(): void {
    this.router.navigate(['home']);
  }

}
