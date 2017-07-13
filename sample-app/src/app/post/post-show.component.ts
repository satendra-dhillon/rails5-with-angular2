import {Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from './post';
import { PostService } from './post.service';
import { Http } from '@angular/http'

@Component({
	selector: 'post-show',
	templateUrl: 'post-show.component.html',
	styleUrls: ['post.component.css']
})
export class PostShowComponent implements OnInit {
	id: number;
	routerId: any;

	constructor(
		private http: Http, 
		private route: ActivatedRoute, 
		private postService: PostService
	) {}

	@Input() post: Post;

	ngOnInit(){
		this.routerId = this.route.params.subscribe(
		params => {
			this.id = +params['id'];
		})
		let postRequest = this.route.params
			.flatMap((params: Params) => 
				this.postService.getPost(+params['id']));
		postRequest.subscribe(response => this.post = response.json());
	}
}