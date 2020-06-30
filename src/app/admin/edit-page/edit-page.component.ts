import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from './../../shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-edit-page',
	templateUrl: './edit-page.component.html',
	styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
	public form: FormGroup;
	public post: Post;
	public submitted = false;
	private updateSubscription: Subscription;

	constructor(
		private route: ActivatedRoute,
		private postsService: PostsService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.postsService.getById(params.id);
		})

		this.route.params.pipe(
			switchMap((params: Params) => {
				return this.postsService.getById(params['id']);
			})
		).subscribe((post: Post) => {
			this.post = post;
			this.form = new FormGroup({
				title: new FormControl(post.title, Validators.required),
				content: new FormControl(post.content, Validators.required)
			})
		})
	}

	ngOnDestroy(): void {
		if(this.updateSubscription) {
			this.updateSubscription.unsubscribe();
		}
	}

	submit() {
		if (this.form.invalid) return;

		this.submitted = true;

		const post: Post = {
			title: this.form.value.title,
			content: this.form.value.content,
			author: this.form.value.author,
			date: new Date()
		}

		this.updateSubscription =  this.postsService.update({
			...this.post,
			title: this.form.value.title,
			content: this.form.value.content
		}).subscribe(() => {
			this.submitted = false;
		});
	}
}
