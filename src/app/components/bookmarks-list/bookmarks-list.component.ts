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
  bookmark: Bookmark;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.bs.getAvailableBookmarks().subscribe((res) => {
      this.bookmarks = res as Bookmark[];
    });
  }

  getBookmark(id: number) {
    this.bs.getBookmarkById(id).subscribe((res) => {
      this.bookmark = res as Bookmark;
    });
  }

  selectBookmark(bookmarkId: number) {
    this.getBookmark(bookmarkId);
    this.router.navigate([`/bookmark/${bookmarkId}`]);
  }

  deleteBookmark(bookmarkId: number) {
    this.bs.removeBookmark(bookmarkId).subscribe(
      (res: any) => {
        this.refreshList();
        alert('Successfully deleted');
      },
      (error: any) => {
        console.log(this.bookmark);
        alert('Error');
      }
    );
  }
}
