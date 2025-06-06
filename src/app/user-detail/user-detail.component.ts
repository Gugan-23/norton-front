import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;
  userDetails: any = null;
  errorMessage: string | null = null;
  loading: boolean = true;


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('User ID:', this.userId);

    if (this.userId) {
      this.fetchUserDetails(this.userId);
    } else {
      this.errorMessage = 'No user ID provided in the URL.';
    }
  }

  fetchUserDetails(userId: string): void {
    const apiUrl = `https://backend45-p3hk.onrender.com/api/userRoles?_id=${userId}`;
  
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        console.log('API Response:', response);
  
        const user = response.userRoles.find((u: any) => u._id === userId);
  
        if (user) {
          this.userDetails = user;
          this.errorMessage = null;
          console.log('User Details:', this.userDetails);
        } else {
          this.errorMessage = 'User not found in the provided userRoles.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch user details';
        console.error('Error fetching user details:', error);
      }
    });
  }
  }
