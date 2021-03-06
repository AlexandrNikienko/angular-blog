import { AlertService } from './../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
	selector: 'app-create-page',
	templateUrl: './create-page.component.html',
	styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private postsService: PostsService,
		private alertService: AlertService
	) { }

	ngOnInit() {
		this.form = new FormGroup({
			title: new FormControl(null, [Validators.required]),
			content: new FormControl(null, [Validators.required]),
			author: new FormControl(null, [Validators.required])
		});
	}

	submit(): void {
		if (this.form.invalid) return;

		const post: Post = {
			title: this.form.value.title,
			content: this.form.value.content,
			author: this.form.value.author,
			date: new Date()
		}

		this.postsService.create(post).subscribe(() => {
			this.form.reset();
			this.alertService.success('Post created');
		});
	}
}
