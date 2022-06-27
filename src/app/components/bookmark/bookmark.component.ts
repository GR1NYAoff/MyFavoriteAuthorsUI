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
  books: Book[];
  comment: string;

  constructor(private bs: BookmarksService, private router: Router) {}

  backToList(): void {
    localStorage.removeItem(CURRENT_BOOKMARK);
    this.router.navigate(['/home']);
  }

  getCurrentBookmark(): Bookmark {
    var json = localStorage.getItem(CURRENT_BOOKMARK);
    return JSON.parse(json!) as Bookmark;
  }

  updateComment(): any {
    this.bs
      .changeBookmarkComment(this.getCurrentBookmark().bookmarkId, this.comment)
      .subscribe(
        (res: any) => {
          alert('Successfully updated');
        },
        (error: any) => {
          alert('Error');
        }
      );
  }

  getBooks(id: number): any {
    this.bs.getBookmarkBooks(id).subscribe((res) => {
      return (this.books = res as Book[]);
    });
  }

  ngOnInit(): void {}
}
