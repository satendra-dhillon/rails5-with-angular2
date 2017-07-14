import {Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
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
	errorMessage: any;
	returnUrl: string;
	editBtnClicked: boolean = false;

	constructor(
		private http: Http, 
		private route: ActivatedRoute, 
		private router: Router,
		private postService: PostService
	) {}

	@Input() post: Post;

	ngOnInit(){
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/posts';
		this.routerId = this.route.params.subscribe(
		params => {
			this.id = +params['id'];
		})
		let postRequest = this.route.params
			.flatMap((params: Params) => 
				this.postService.getPost(+params['id']));
		postRequest.subscribe(response => this.post = response.json());
	}

	update( post: Post){
		this.editBtnClicked = true;
		this.postService.updatePost(post)
			.subscribe(data => {
				return true
			}, error => {
				console.log('Error in editing post');
				return Observable.throw(error);
				
			})

	}

	delete(){
		this.postService.deletePost(this.post.id)
			.subscribe(data => { 
				this.router.navigate([this.returnUrl]);
			 },
				error => this.errorMessage = error );
	}

	onUpdateClicked(){
		this.router.navigate([this.returnUrl]);
		this.editBtnClicked = false;
	}
}