import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient ,HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  productId: string = '';
  product: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.fetchProductDetails(this.productId);
    } else {
      this.error = 'No product ID provided.';
      this.loading = false;
    }
  }

  fetchProductDetails(id: string): void {
    this.http.get<any>(`http://localhost:5000/products/${id}`).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product details.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
