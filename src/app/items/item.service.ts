import { Injectable } from '@angular/core';
import { Item } from './item';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemService {
  private itemsUrl = '/api/items';

  constructor(private http: Http) { }

  // get('/api/items')
  getItems(): Promise<void | Item[]> {
    return this.http.get(this.itemsUrl)
                    .toPromise()
                    .then(response => response.json() as Item[])
                    .catch(this.handleError);
  }

  // post('/api/items')
  createItem(newItem: Item): Promise<void | Item> {
    return this.http.post(this.itemsUrl, newItem)
                    .toPromise()
                    .then(response => response.json() as Item)
                    .catch(this.handleError);
  }

  // delete('/api/items/:id')
  deleteItem(delItemId: String): Promise<void | String> {
    return this.http.delete(this.itemsUrl + '/' + delItemId)
                    .toPromise()
                    .then(response => response.json() as String)
                    .catch(this.handleError);
  }

  // put('/api/items/:id')
  updateItem(putItem: Item): Promise<void | Item> {
    var putUrl = this.itemsUrl + '/' + putItem._id;
    return this.http.put(putUrl, putItem)
                    .toPromise()
                    .then(response => response.json() as Item)
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}`: 'Server Error';
    console.log(errMsg);
  }
}
