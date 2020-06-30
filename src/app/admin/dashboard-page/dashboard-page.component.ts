import { PostsService } from 'src/app/shared/services/posts.service';
import { Post } from './../../shared/interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
	public posts: Post[] = [];
	public searchStr: string = '';
	private postsSubscription: Subscription;
	private deleteSubscription: Subscription;

	constructor(
		private postsServise: PostsService
	) { }

	ngOnInit(): void {
		this.postsSubscription = this.postsServise.getAll()
			.subscribe((response) => {
				this.posts = response;
			})
	}

	remove(id: string): void {
		this.deleteSubscription = this.postsServise.remove(id).subscribe(() => {
			this.posts = this.posts.filter(post => post.id !== id);
		});
	}

	ngOnDestroy(): void {
		if (this.postsSubscription) {
			this.postsSubscription.unsubscribe();
		}

		if (this.deleteSubscription) {
			this.deleteSubscription.unsubscribe();
		}
	}
}
