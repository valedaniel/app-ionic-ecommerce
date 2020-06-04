import { HttpHeaders } from '@angular/common/http';

export default class API {

    public static readonly BASE_URL = 'http://example-ecommerce.herokuapp.com';

    public static getHeaders(): HttpHeaders {
        return new HttpHeaders({
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            "Access-Control-Allow-Headers": "origin, x-requested-with",
        });
    }

}

