import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  providers: [ ItemService ]
})
export class ItemListComponent implements OnInit {

  items: Item[]
  selectedItem: Item
  private sub: Subscription;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.itemService
        .getItems()
        .then((items: Item[]) => {

          this.items = items.map((item) => {
            if (!item.tooltip) {
              item.tooltip = 'Author is too lazy to write a tooltip';
            }
            if (!item.description) {
              item.description = 'Author is too lazy to write a description';
            }
            return item;
          });

          //get selected item from url query parameter
          this.sub = this.route.queryParams.subscribe(params => {
            if (params.id && !(this.selectedItem)) {
              this.selectedItem = this.items.filter(item => item._id == params.id)[0];
            }
          });
        });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private getIndexOfItem = (itemId: String) => {
    return this.items.findIndex((item) => {
      return item._id === itemId;
    });
  }

  selectItem(item: Item) {
    this.selectedItem = item;
    this.router.navigate([], {queryParams:{id:item._id}});
  }

  createNewItem() {
    var item: Item = {
      name: '',
      tooltip: '',
      description: ''
    }

    this.selectItem(item);
  }

  deleteItem = (itemId: String) => {
    var idx = this.getIndexOfItem(itemId);
    if (idx !== -1) {
      this.items.splice(idx, 1);
      this.selectItem(null);
    }
    return this.items;
  }

  addItem = (item: Item) => {
    this.items.push(item);
    this.selectItem(item);
    return this.items;
  }

  updateItem = (item: Item) => {
    var idx = this.getIndexOfItem(item._id);
    if (idx !== -1) {
      this.items[idx] = item;
      this.selectItem(item);
    }
    return this.items;
  }

}
