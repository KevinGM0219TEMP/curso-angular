import { Component } from '@angular/core';

interface Order{
  id: string;
  customer: string;
  total: number;
}

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})

export class OrdersPageComponent {
  search: string = '';
  orders: Order[] = generateManyOrders(5000);
  filteredOrders: Order[] = this.orders;

  pagedOrders: Order[] = [];

  currentPage = 1;
  pageSize = 50;
  totalPages= 0;

  constructor(){
    this.updatePagedOrders()
  }

  getFilteredOrders():Order[]{
    return this.orders.filter(o=>
      o.customer.toLowerCase().includes(this.search.toLowerCase())
    );

  }
  applyFilter(value: string){
    const term = value.toLowerCase();
    this.filteredOrders = this.orders.filter( o=>
      o.customer.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagedOrders();
  }

   updatePagedOrders() {
    this.totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedOrders = this.filteredOrders.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOrders();
    }
  }
 
  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
 
  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

}

function generateManyOrders(count: number): Order[] {
    const orders: Order[] = [];
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown'];
  
    for (let i = 0; i < count; i++) {
      orders.push({
        id: `ORD-${String(i + 1).padStart(6, '0')}`,
        customer: names[i % names.length],
        total: Math.round((Math.random() * 1000 + 50) * 100) / 100
      });
    }
  
    return orders;
}