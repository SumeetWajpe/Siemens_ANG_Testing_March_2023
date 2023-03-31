import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class PostsService {
  constructor(public httpClientObj: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.httpClientObj.get('https://jsonplaceholder.typicode.com/posts');
  }
}
