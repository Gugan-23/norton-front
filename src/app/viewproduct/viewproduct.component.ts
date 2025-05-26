import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [CommonModule,HttpClientModule], // Remove HttpClientModule from here
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  @ViewChild('carouselContainer') carousel!: ElementRef;
  productId: string = '';
  product: any = null;
  loading: boolean = true;
  error: string = '';
  selectedImage: string = '';

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

  scrollCarousel(direction: 'left' | 'right') {
    const container = this.carousel.nativeElement;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }

  selectImage(imgUrl: string) {
    this.selectedImage = imgUrl;
  }

  fetchProductDetails(id: string): void {
    this.http.get<any>(`http://localhost:5000/products/${id}`).subscribe({
      next: (data) => {
        this.product = data;
        this.selectedImage = data.images?.[0] || '';
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