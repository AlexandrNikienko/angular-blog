import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PostsService } from 'src/app/shared/services/posts.service';
import { Post } from './../shared/interfaces';
import { Subscription, Observable } from 'rxjs';

@Component({
	selector: 'app-post-page',
	templateUrl: './post-page.component.html',
	styleUrls: ['./post-page.component.scss']
})

export class PostPageComponent implements OnInit {
	public post$: Observable<Post>;
	private postSubscription: Subscription;

	constructor(
		private postsService: PostsService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.post$ = this.route.params.pipe(
			switchMap((params: Params) => {
				return this.postsService.getById(params['id']);
			})
		);
	}
}
