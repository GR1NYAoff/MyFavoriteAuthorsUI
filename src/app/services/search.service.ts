import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_API_URL } from '../app-injection-tokens';
import { Observable } from 'rxjs';
import { BookmarkRequest } from '../models/bookmarkRequest';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseApiUrl = `${this.apiUrl}api/Author`;
  constructor(
    private httpClient: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl: string
  ) {}

  searchAuthor(authorName: string): Observable<BookmarkRequest[]> {
    return this.httpClient.get<BookmarkRequest[]>(
      `${this.baseApiUrl}/${authorName}`
    );
  }
}
