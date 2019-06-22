import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent implements OnInit {
  public showTable = false;
  showForm = true;
  public rooms;
  public items = [];
  public itemInput = '';
  public roomInput = '';
  constructor(
    private roomsService: RoomsService,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.roomsService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  onRoom(roomInput) {
    this.roomInput = roomInput;
    this.itemsService.getItems().subscribe(res => {
      this.items = res.items.filter(item => {
        return item.room.toLowerCase() == this.roomInput.toLowerCase();
      });
    });
  }
  onItem(itemInput) {
    this.itemInput = itemInput;
  }
  onSelect(action, room, itemName) {
    this.items = this.items.filter(item => {
      return item.name.toLowerCase() == itemName.toLowerCase();
    });
    this.showTable = true;
  }
  onPostSelect(room) {
    this.items = [{ room: room }];
    this.showTable = true;
  }
  onBack() {
    this.showTable = false;
  }

  // Create Item
  onPostSave(name, subcat, room, price) {
    this.itemsService.createItemAdmin(name, subcat, room, price).subscribe();
    this.showTable = false;
  }

  // Edit Item
  onEdit(name, subcat, price, id) {
    let answer = confirm(`Are you sure you want to edit "${name}" item?`);
    if (answer) {
      this.itemsService.editItemAdmin(name, subcat, price, id).subscribe();
      this.showTable = false;
    }
  }
  onDelete(name, room, id) {
    let answer = confirm(
      `Are you sure you want to delete "${name}" item from ${room}?`
    );
    if (answer) {
      this.itemsService.deleteItemAdmin(id).subscribe();
      this.showTable = false;    
    }
  }
}
