import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { SearchAuthorComponent } from './components/search-author/search-author.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
