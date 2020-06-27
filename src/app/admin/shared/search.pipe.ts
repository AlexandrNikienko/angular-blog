import { Post } from './../../shared/interfaces';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {
	transform(posts: Post[], search: ''): Post[] {
		if (!search.trim()) {
			return posts;
		}
		return posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
	}
}
