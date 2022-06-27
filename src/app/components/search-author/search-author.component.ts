import { Component, OnInit } from '@angular/core';
import { BookmarkRequest } from 'src/app/models/bookmarkRequest';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-author',
  templateUrl: './search-author.component.html',
  styleUrls: ['./search-author.component.scss'],
})
export class SearchAuthorComponent implements OnInit {
  constructor(private ss: SearchService) {}

  searchText: string;
  authors: BookmarkRequest[];

  search(): void {
    this.ss.searchAuthor(this.searchText).subscribe((res) => {
      this.authors = res as BookmarkRequest[];
    });
  }

  ngOnInit(): void {}
}
