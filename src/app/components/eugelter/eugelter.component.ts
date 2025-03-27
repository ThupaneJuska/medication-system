import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient for HTTP requests

@Component({
  selector: 'app-eugelter',
  templateUrl: './eugelter.component.html',
  styleUrls: ['./eugelter.component.scss']
})
export class EugelterComponent {

  items: string[] = ['joel', 'potoko', 'yess','potokonyana'];  // Array to store items
  names: any[] = [
    {name: 'Mdau GS', router: '/mdau'}, 
    {name: 'Chauke ML ', router: '/chauke'}, 
    {name: 'Mahlangu KM ', router: '/mahlanku'}, 
    {name: 'Ramokgotsoa MR', router: '/ramokgotsoa'}
  ];  // Array for navigation links

  constructor(private http: HttpClient) {}

  // Method to add a new item
  addItem(item: string) {
    // if (item) {
    //   // Call the backend to add the item
    //   this.http.post<{message: string, item: any}>('http://localhost:3000/add-item', { name: item })
    //     .subscribe(response => {
    //       // On success, push the new item to the array to update the table
    //       this.items.push(response.item.name);
    //       console.log('Item added:', response.item);
    //     }, error => {
    //       console.error('Error adding item:', error);
    //     });
    // }
    this.items.push(item);
          console.log('Item added:',this.items);
  }

  // Method to delete an item
  deleteItem(item: string) {
    this.items = this.items.filter(i => i !== item);
  }
}
