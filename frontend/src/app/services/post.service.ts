// // src/app/services/post.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {
//   private baseUrl = 'http://localhost:3000/api/posts';

//   constructor(private http: HttpClient) {}

//   uploadImage(image: File, caption: string): Observable<any> {
//     const formData = new FormData();
//     formData.append('image', image);
//     formData.append('caption', caption);

//     return this.http.post(`${this.baseUrl}/upload`, formData);
//   }

//   getAllImages(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/images`);
//   }

//   likePost(postId: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/like/${postId}`, {});
//   }

//   unlikePost(postId: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/like/${postId}`);
//   }

//   commentPost(postId: string, comment: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/comment/${postId}`, { comment });
//   }
// }


// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class PostService {
// //   private baseUrl = 'http://localhost:3000/api'; // Replace with your backend URL

// //   constructor(private http: HttpClient) { }

// //   uploadImage(formData: FormData): Observable<any> {
// //     return this.http.post(`${this.baseUrl}/upload`, formData);
// //   }

// //   getAllImages(): Observable<any> {
// //     return this.http.get(`${this.baseUrl}/images`);
// //   }

// //   likePost(postId: string): Observable<any> {
// //     return this.http.post(`${this.baseUrl}/like/${postId}`, {});
// //   }

// //   unlikePost(postId: string): Observable<any> {
// //     return this.http.delete(`${this.baseUrl}/like/${postId}`);
// //   }

// //   commentPost(postId: string, comment: string): Observable<any> {
// //     return this.http.post(`${this.baseUrl}/comment/${postId}`, { comment });
// //   }
// // }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  addPost(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, data);
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/images`);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${postId}`);
  }

  updatePost(postId: string, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${postId}`, data);
  }

  addComment(postId: string, comment: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comment/${postId}`, { comment });
  }
}
