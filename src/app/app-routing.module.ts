
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent} from './app.component';
import {DiscussionComponent} from './discussion_componenets/discussion/discussion.component';
import {ProfileComponent} from './profile_componenets/profile/profile.component';
import {HomeMainComponent} from './home_components/home-main/home-main.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeMainComponent },
  { path: 'discussion', component: DiscussionComponent },
  { path: 'profile', component: ProfileComponent }
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

