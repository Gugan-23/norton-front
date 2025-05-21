import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-productsfetch',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './productsfetch.component.html',
  styleUrl: './productsfetch.component.css'
})
export class ProductsfetchComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:5000/products')
      .subscribe({
        next: (res) => this.products = res,
        error: (err) => console.error('Error fetching products:', err)
      });
  }

}
