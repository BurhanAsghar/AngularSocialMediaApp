import { Component, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @Output() close = new EventEmitter<void>();
  selectedFile: File | null = null;

  constructor(private postService: PostService) {}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onAddPost() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.postService.addPost(formData).subscribe(() => {
        this.close.emit();
      }, error => {
        console.error('Error adding post:', error);
        // Handle error here, e.g., show an error message to the user
      });
    }
  }
}
