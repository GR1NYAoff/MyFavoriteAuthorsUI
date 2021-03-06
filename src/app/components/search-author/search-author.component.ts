import {
  Component,
  OnInit,
  ÉµclearResolutionOfComponentResourcesQueue,
} from '@angular/core';
import { BookmarkRequest } from 'src/app/models/bookmarkRequest';
import { SearchService } from 'src/app/services/search.service';
import { BookmarksService } from 'src/app/services/bookmarks.service';

@Component({
  selector: 'app-search-author',
  templateUrl: './search-author.component.html',
  styleUrls: ['./search-author.component.scss'],
})
export class SearchAuthorComponent implements OnInit {
  constructor(
    private ss: SearchService,
    private bs: BookmarksService
  ) {}

  searchText: string;
  authors: BookmarkRequest[];

  search(): void {
    this.ss.searchAuthor(this.searchText).subscribe((res) => {
      this.authors = res as BookmarkRequest[];
    });
  }

  addBookmark(author: BookmarkRequest): any {
    this.bs.addAuthorInBookmarks(author).subscribe(
      (res: any) => {
        alert('Successfully added');
      },
      (error: any) => {
        alert('Error');
      }
    );
  }

  ngOnInit(): void {}
}
