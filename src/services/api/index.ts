import { HttpHeaders } from '@angular/common/http';

export default class API {

    public static readonly BASE_URL = 'http://example-ecommerce.herokuapp.com';

    public static getHeaders() {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return headers;
    }

}

