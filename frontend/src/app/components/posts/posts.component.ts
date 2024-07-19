// import { Component, Input } from '@angular/core';
// import { PostService } from '../../services/post.service';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-posts',
//   templateUrl: './posts.component.html',
//   styleUrls: ['./posts.component.css']
// })
// export class PostsComponent {
//   @Input() post: any;
//   showOptions = false;
//   showComments = false;
//   newComment = '';

//   constructor(private postService: PostService, private authService: AuthService) {}

//   isCurrentUser(userId: string): boolean {
//     return this.authService.getUserId() === userId;
//   }

//   toggleOptions() {
//     this.showOptions = !this.showOptions;
//   }

//   toggleComments() {
//     this.showComments = !this.showComments;
//   }

//   onEditPost() {
//     // Implement edit functionality
//   }

//   onDeletePost() {
//     this.postService.deletePost(this.post._id).subscribe(() => {
//       // Handle post deletion
//     });
//   }

//   onAddComment() {
//     this.postService.addComment(this.post._id, this.newComment).subscribe(comment => {
//       this.post.comments.push(comment);
//       this.newComment = '';
//     });
//   }
// }
import { Component, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  @Input() post: any;
  showOptions = false;
  showComments = false;
  newComment = '';

  constructor(private postService: PostService, private authService: AuthService) {}

  isCurrentUser(userId: string): boolean {
    return this.authService.getUserId() === userId;
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  onEditPost() {
    // Implement edit functionality
  }

  onDeletePost() {
    this.postService.deletePost(this.post._id).subscribe(() => {
      // Handle post deletion
    });
  }

  onAddComment() {
    this.postService.addComment(this.post._id, this.newComment).subscribe(comment => {
      this.post.comments.push(comment);
      this.newComment = '';
    });
  }
}
