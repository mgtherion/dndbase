import { Component, Input } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Globals } from '../../globals';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})

export class ItemDetailsComponent {
  @Input()
  item: Item;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private itemService: ItemService, public globals: Globals) {}

  public options: any = {
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'fontSize',
                      'color', '|', 'specialCharacters', 'clearFormatting', '|', 'undo', 'redo'],
    quickInsertButtons: [],
    quickInsertTags: [],
    placeholderText: ''
  }

  ngOnInit() {
    //this.globals.editMode.subscribe(mode => console.log(mode));
  }

  createItem(item: Item) {
    this.itemService.createItem(item).then((newItem: Item) => {
      this.createHandler(newItem);
    });
  }

  updateItem(item: Item): void {
    this.itemService.updateItem(item).then((updatedItem: Item) => {
      this.updateHandler(updatedItem);
    });
  }

  deleteItem(itemId: String): void {
    this.itemService.deleteItem(itemId).then((deletedItemId) => {
      this.deleteHandler(deletedItemId);
    });
  }
}
