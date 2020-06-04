import API from './api';
import { User } from 'src/domain/model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class UserService {

    constructor(private httpClient: HttpClient) { }

    public authenticate(user: User, callback: Function): any {
        this.httpClient.post(`${API.BASE_URL}/user/login`,
            { login: user.email, password: user.password },
            { headers: API.getHeaders(), responseType: 'text' }
        ).subscribe(data => callback(data), error => callback(error));
    }

    public register(user: User, callback: Function): any {
        this.httpClient.post(`${API.BASE_URL}/user/customer/add`, {
            address: user.address,
            age: user.age,
            email: user.email,
            name: user.name,
            userPassword: user.password
        },
            { headers: API.getHeaders(), responseType: 'text' }
        ).subscribe(data => callback(data), error => callback(error));
    }

}
