import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, merge, of } from 'rxjs';
import { MatDialog } from '@angular/material';

import { AlbumsService } from '../albums.service';
import { Album } from '../add-album-modal/album';
import { tap, startWith, switchMap, catchError } from 'rxjs/operators';
import { AddAlbumModalComponent } from '../add-album-modal/add-album-modal.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	public albums?: Album[] = [];

	constructor(
		private albumsService: AlbumsService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.getAlbums();
	}
	getAlbums() {
		this.albumsService.getUser({}).subscribe((album) => {
			this.albums = album;
			console.log('ALBUM: ', album);
		});
	}

	openAlbumModal() {
		this.dialog
			.open(AddAlbumModalComponent)
			.afterClosed()
			.subscribe(() => {});
	}
}
