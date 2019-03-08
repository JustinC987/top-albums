import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { HandlerService } from '../handler.service';
import { AuthService } from '../auth.service';
import { Album } from './add-album-modal/album';

@Injectable({
	providedIn: 'root'
})
export class AlbumsService {
	private url = 'http://localhost:3000/album';
	constructor(
		private http: HttpClient,
		public handler: HandlerService,
		public authService: AuthService
	) {}

	//crud operations

	public post(album: Album): Observable<Object> {
		this.handler.showLoader();

		return this.http.post(this.url, album).pipe(
			tap((result) => {
				this.handler.log('UserService', `POST user`, {
					body: album,
					result: result
				});
				this.handler.hideLoader();
			}),
			catchError(this.handler.error<Album>('UserService::post'))
		);
	}

	public getUser(params: any): Observable<Album[]> {
		this.handler.showBackgroundLoader();

		return this.http
			.get<Album[]>(this.url, {
				headers: this.authService.getHeaders(),
				params: new HttpParams({ fromObject: params })
			})
			.pipe(
				map((results) => {
					this.handler.log('UserService', 'GET user', {
						params: params,
						results: results
					});

					// Array-ify
					if (!(results instanceof Array)) {
						results = [ results ];
					}
					this.handler.hideBackgroundLoader();

					return results;
				}),
				catchError(this.handler.error<Album[]>('UserService::getOne'))
			);
	}

	/**
	 * Update a user
	 *
	 * @param userId User ID to update by
	 * @param data User data to update
	 */
	public update(albumId: number, data: Album): Observable<any> {
		this.handler.showLoader();

		return this.http
			.put(`${this.url}/${albumId}`, data, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log('UserService', `PUT user (#${albumId})`, {
						albumId: albumId,
						data: data,
						results: results
					});
					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<Album>(
						'UserService::update',
						`PUT user (#${albumId}) failed.`
					)
				)
			);
	}

	/**
	 * Delete a user
	 *
	 * @param userId User ID to delete by
	 */
	public delete(albumId: number): Observable<any> {
		this.handler.showLoader();

		return this.http
			.delete(`${this.url}/${albumId}`, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log(
						'UserService',
						`DELETE user (#${albumId})`,
						{
							albumId: albumId,
							results: results
						}
					);
					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<number>(
						'UserService::delete',
						`DELETE user (#${albumId}) failed.`
					)
				)
			);
	}
}
