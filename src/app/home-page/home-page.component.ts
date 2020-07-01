import { PostsService } from 'src/app/shared/services/posts.service';
import { Post } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	public posts$: Observable<Post[]>;

	constructor(private postsService: PostsService) { }

	ngOnInit() {
		this.posts$ = this.postsService.getAll()
	}
}
