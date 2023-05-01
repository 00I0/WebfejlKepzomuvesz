import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {ItemService} from "../../../shared/services/item.service";
import {Observable} from "rxjs";
import {Item} from "../../../shared/models/item";

@Component({
  selector: 'store-thumbnail-component',
  templateUrl: 'store-thumbnail.component.html'
})
export class StoreThumbnailComponent implements OnChanges{
  @Input() item!:Item
  @Output() addToCart = new EventEmitter<Item>()

  loadedImage?: Observable<string>


  constructor(private itemService: ItemService) {

  }

  addToCartClicked() {
    if(!this.item) return;
    this.addToCart.emit(this.item)
  }

  ngOnChanges(): void {
    this.loadedImage = this.itemService.loadImage(this.item.picture)
  }

}
