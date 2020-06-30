import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Post, FbCreateResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
	constructor(private http: HttpClient) {}

	create(post: Post): Observable<Post> {
		return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
			.pipe(
				map((response: FbCreateResponse) => {
					return {
						...post,
						id: response.name
					}
				})
			);
	}

	getAll(): Observable<Post[]> {
		return this.http.get(`${environment.fbDbUrl}/posts.json`)
			.pipe(
				map((response: {[key: string]: any}) => {
					return Object.keys(response).map(key => ({
						...response[key],
						id: key
					}))
				})
			)
	}

	getById(id: string): Observable<Post> {
		return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
			.pipe(
				map((post: Post) => {
					return {
						...post,
						id
					}
				})
			);
	}

	remove(id: string): Observable<void> {
		return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
	}

	update(post: Post): Observable<Post> {
		return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
	}
}
