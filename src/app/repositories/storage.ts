import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class StorageRepository {

    constructor(private storage: Storage) { }

    public set(key: string, item: string, callback: Function): void {
        this.storage.set(key, item).then((value) => callback(value));
    }

    public get(key: string, callback: Function): void {
        this.storage.get(key).then((value) => callback(value));
    }

    public remove(key: string, callback: Function): void {
        this.storage.remove(key).then((value) => callback(value));
    }

}