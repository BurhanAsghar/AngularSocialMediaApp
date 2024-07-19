// import { Component, OnInit } from '@angular/core';
// import { PostService } from 'src/app/services/post.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   posts: any[] = [];
//   showAddPostModal = false;

//   constructor(private postService: PostService) {}

//   ngOnInit() {
//     this.loadPosts();
//   }

//   loadPosts() {
//     this.postService.getPosts().subscribe(posts => this.posts = posts);
//   }

//   openAddPostModal() {
//     this.showAddPostModal = true;
//   }

//   closeAddPostModal() {
//     this.showAddPostModal = false;
//     this.loadPosts();
//   }
// }

import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() posts: any[] = []; // Ensure posts is initialized as an array
  showAddPostModal = false;

  constructor(private postService: PostService, private authService: AuthService) {}
  ngOnInit() {
    this.postService.getPosts().subscribe(
      (response) => {
        console.log('Posts:', response); // Check the structure and contents
        this.posts = response.posts; // Assign posts array from API response
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (posts: any[]) => {
        this.posts = posts; // Assign fetched posts to local array
      },
      error => {
        console.error('Error fetching posts:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }

  openAddPostModal() {
    this.showAddPostModal = true;
  }

  closeAddPostModal() {
    this.showAddPostModal = false;
  }
}

