import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchAuthorComponent } from './components/search-author/search-author.component';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bookmarks', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'bookmark/:bookmarkId',
    component: BookmarkComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bookmarks',
    component: BookmarksListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchAuthorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
