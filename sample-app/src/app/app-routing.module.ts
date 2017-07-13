import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Routes } from '@angular/router';
import { PostListComponent } from './post/post-list.component';
import { PostShowComponent } from './post/post-show.component';
import {HomepageComponent} from './homepage/homepage.component';


const routes: Routes = [
	//{path: '', redirectTo: '/home'}
		{path: 'home', component: HomepageComponent},
		{path: 'posts', component: PostListComponent},
		{path: 'posts/:id', component: PostShowComponent}


]

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
	
}