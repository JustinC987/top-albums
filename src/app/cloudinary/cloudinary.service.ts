import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cloudinaryConfig } from './config';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CloudinaryService {
	constructor(private http: HttpClient) {}

	upload(file) {
		const body = new FormData();
		body.append('file', file);
		body.append('tags', 'browser_upload');
		body.append('upload_preset', 'wfmqddpv');

		console.log('BODY ', body);
		// TODO: Tap, log, and handle
		return this.http
			.post(`https://api.cloudinary.com/v1_1/ddq6uu3nz/upload`, body)
			.pipe(
				tap((result) => {
					console.log('result ', result);
				})
			);
	}
}
