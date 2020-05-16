import API from './api';
import StorageRepository from '../app/repositories/storage';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/domain/model/product';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class ProductService {

    constructor(private repository: StorageRepository, private httpClient: HttpClient) { }

    public async add(product: Product): Promise<any> {
        let token: any;
        this.repository.get('token', (value: any) => { token = value })

        return this.httpClient.post(`${API.BASE_URL}/product/add`, {
            token,
            amount: product.amount,
            factory: { name: product.factory.name },
            name: product.name,
            price: product.price
        });
    }

    public async list(callback: Function): Promise<any> {
        return this.httpClient.get(`${API.BASE_URL}/product/list`).subscribe(data => callback(data));
    }

    public async delete(idProduct: number): Promise<any> {
        this.httpClient.delete(`${API.BASE_URL}/product/${idProduct}/remove`);
    }

}