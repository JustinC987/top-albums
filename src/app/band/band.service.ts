import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { HandlerService } from '../handler.service';
import { AuthService } from '../auth.service';
import { Band } from './band';

@Injectable({
	providedIn: 'root'
})
export class BandService {
	private url = 'http://localhost:3000/band';
	constructor(
		private http: HttpClient,
		public handler: HandlerService,
		public authService: AuthService
	) {}

	//crud operations

	public post(band: Band): Observable<Object> {
		this.handler.showLoader();

		return this.http.post(this.url, band).pipe(
			tap((result) => {
				this.handler.log('UserService', `POST user`, {
					body: band,
					result: result
				});
				this.handler.hideLoader();
			}),
			catchError(this.handler.error<Band>('UserService::post'))
		);
	}

	public getUser(params: any): Observable<Band[]> {
		this.handler.showBackgroundLoader();

		return this.http
			.get<Band[]>(this.url, {
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
				catchError(this.handler.error<Band[]>('UserService::getOne'))
			);
	}

	/**
	 * Update a user
	 *
	 * @param userId User ID to update by
	 * @param data User data to update
	 */
	public update(bandId: number, data: Band): Observable<any> {
		this.handler.showLoader();

		return this.http
			.put(`${this.url}/${bandId}`, data, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log('UserService', `PUT user (#${bandId})`, {
						bandId: bandId,
						data: data,
						results: results
					});
					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<Band>(
						'UserService::update',
						`PUT user (#${bandId}) failed.`
					)
				)
			);
	}

	/**
	 * Delete a user
	 *
	 * @param userId User ID to delete by
	 */
	public delete(bandId: number): Observable<any> {
		this.handler.showLoader();

		return this.http
			.delete(`${this.url}/${bandId}`, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log(
						'UserService',
						`DELETE user (#${bandId})`,
						{
							bandId: bandId,
							results: results
						}
					);
					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<number>(
						'UserService::delete',
						`DELETE user (#${bandId}) failed.`
					)
				)
			);
	}
}
