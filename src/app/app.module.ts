import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { SearchAuthorComponent } from './components/search-author/search-author.component';
import { AUTH_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY } from './services/auth.service';

import { JwtModule } from '@auth0/angular-jwt'
import { Ng2SearchPipeModule } from 'ng2-search-filter';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookmarksListComponent,
    BookmarkComponent,
    SearchAuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        disallowedRoutes: environment.tokenDisallowedRoutes,
        allowedDomains: environment.tokenAllowedDomains
      }
    })
  ],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environment.authApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
