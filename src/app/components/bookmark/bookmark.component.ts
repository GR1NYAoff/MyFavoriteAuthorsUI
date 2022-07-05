import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENT_BOOKMARK } from 'src/app/services/bookmarks.service';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { Bookmark } from 'src/app/models/bookmark';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {
  currentBookmark: Bookmark;
  books: Book[];
  comment: string;

  constructor(private bs: BookmarksService, private router: Router) {}

  backToList(): void {
    localStorage.removeItem(CURRENT_BOOKMARK);
    this.router.navigate(['/home']);
  }

  getCurrentBookmark(): Bookmark {
    var json = localStorage.getItem(CURRENT_BOOKMARK);

    if (json === null) {
      this.router.navigate(['/home']);
    }

    return JSON.parse(json!) as Bookmark;
  }

  updateComment(): any {
    this.bs
      .changeBookmarkComment(this.currentBookmark.bookmarkId, this.comment)
      .subscribe(
        (res: any) => {
          this.bs
            .getBookmarkById(this.currentBookmark.bookmarkId)
            .then((data: Bookmark) => (this.currentBookmark = data));
          alert('Successfully updated');
        },
        (error: any) => {
          alert('Error');
        }
      );
  }

  getBooks(): any {
    this.bs
      .getBookmarkBooks(this.currentBookmark.bookmarkId)
      .subscribe((res) => {
        return (this.books = res as Book[]);
      });
  }

  ngOnInit(): void {
    this.currentBookmark = this.getCurrentBookmark();
    this.books = this.getBooks();
  }
}
