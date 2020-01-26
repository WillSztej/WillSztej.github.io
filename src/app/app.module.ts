import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import { SidebarComponent } from './home_components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { FooterComponent } from './home_components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { DiscussionComponent } from './discussion_componenets/discussion/discussion.component';
import { ProfileComponent } from './profile_componenets/profile/profile.component';
import {RouterModule} from '@angular/router';
import { HomeMainComponent } from './home_components/home-main/home-main.component';
import { AboutComponent } from './about_components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    DiscussionComponent,
    ProfileComponent,
    HomeMainComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmapkey
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
