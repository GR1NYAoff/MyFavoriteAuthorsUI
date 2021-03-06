import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_API_URL } from '../app-injection-tokens';
import { Observable, Subject, tap } from 'rxjs';
import { BookmarkRequest } from '../models/bookmarkRequest';
import { Bookmark } from '../models/bookmark';
import { Book } from '../models/book';

export const CURRENT_BOOKMARK = 'current_bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private baseApiUrl = `${this.apiUrl}api/Bookmark`;

  constructor(
    private httpClient: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl: string
  ) {}

  private _refreshBookmarksList$ = new Subject<void>();

  get refreshBookmarksList$(): any {
    return this._refreshBookmarksList$;
  }

  getAvailableBookmarks(): Observable<Bookmark[]> {
    return this.httpClient.get<Bookmark[]>(this.baseApiUrl);
  }

  getBookmarkById(bookmarkId: number): any {
    return this.httpClient
      .get<Bookmark>(`${this.baseApiUrl}/${bookmarkId}`)
      .pipe(
        tap((bookmark) =>
          localStorage.setItem(CURRENT_BOOKMARK, JSON.stringify(bookmark))
        )
      ).toPromise();
  }

  getBookmarkBooks(bookmarkId: number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(
      `${this.baseApiUrl}/${bookmarkId}/books`
    );
  }

  addAuthorInBookmarks(data: BookmarkRequest): any {
    return this.httpClient.post(this.baseApiUrl, data).pipe(
      tap(() => {
        this._refreshBookmarksList$.next();
      })
    );
  }

  changeBookmarkComment(bookmarkId: number, comment: string): any {
    return this.httpClient.put(
      `${this.baseApiUrl}/${bookmarkId}`,
      JSON.stringify(comment)
    );
  }

  removeBookmark(bookmarkId: number): any {
    return this.httpClient.delete(`${this.baseApiUrl}/${bookmarkId}`);
  }
}
