import { Component, OnInit } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { Router } from '@angular/router';
import { Bookmark } from 'src/app/models/bookmark';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss'],
})
export class BookmarksListComponent implements OnInit {
  constructor(private bs: BookmarksService, private router: Router) {}

  bookmarks: Bookmark[];

  ngOnInit(): void {
    this.bs.refreshBookmarksList$.subscribe(() => {
      this.refreshList();
    });
    this.refreshList();
  }

  private refreshList() {
    this.bs.getAvailableBookmarks().subscribe((res) => {
      this.bookmarks = res as Bookmark[];
    });
  }

  async getBookmark(id: number) {
    await this.bs.getBookmarkById(id);
  }

  async selectBookmark(bookmarkId: number) {
    await this.getBookmark(bookmarkId);
    this.router.navigate([`/bookmark`]);
  }

  deleteBookmark(bookmarkId: number) {
    this.bs.removeBookmark(bookmarkId).subscribe(
      (res: any) => {
        this.refreshList();
        alert('Successfully deleted');
      },
      (error: any) => {
        alert('Error');
      }
    );
  }
}
