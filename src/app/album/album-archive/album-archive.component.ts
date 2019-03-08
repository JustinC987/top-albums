import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, merge, of } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import {
	MatTableDataSource,
	MatPaginator,
	MatSort,
	MatTable
} from '@angular/material';
import { MatDialog } from '@angular/material';

import { AlbumsService } from '../albums.service';
import { Album } from '../add-album-modal/album';
import { AddAlbumModalComponent } from '../add-album-modal/add-album-modal.component';
import { DeleteAlbumModalComponent } from '../delete-album-modal/delete-album-modal.component';
import { tap, startWith, switchMap, catchError } from 'rxjs/operators';
import { EditAlbumModalComponent } from '../edit-album-modal/edit-album-modal.component';
@Component({
	selector: 'app-album-archive',
	templateUrl: './album-archive.component.html',
	styleUrls: [ './album-archive.component.css' ]
})
export class AlbumArchiveComponent implements OnInit {
	public albums?: Album[] = [];
	public nResults = 0;
	public dataSource: MatTableDataSource<Album>;
	public initialSelection = [];
	public allowMultiSelect = true;
	public selection: SelectionModel<Album>;
	public selectedRowIndex: number = -1;

	public columns: string[] = [ 'select', 'id', 'name', 'artist', 'rating' ];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	constructor(
		private albumsService: AlbumsService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.paginator.pageSize = 10;
		this.paginator.pageIndex = 0;
		this.sort.direction = 'desc';
		this.sort.active = 'id';

		this.selection = new SelectionModel<Album>(true);
		this.updateArchive();
	}

	updateArchive() {
		merge(
			this.sort.sortChange,
			this.paginator.page,
			this.albumsService
				.getUser({
					__count: true
				})
				.pipe(
					tap((results) => {
						if (results.length && 'count' in results[0]) {
							this.nResults = +results[0]['count'];
						}

						return results;
					}),
					catchError((error) => {
						return of(0);
					})
				)
		)
			.pipe(
				startWith({}),
				switchMap(() => {
					return this.albumsService.getUser({});
				}),
				tap((albums) => {
					this.selection.clear();

					return albums;
				}),
				catchError((error, caught) => {
					return of([]);
				})
			)
			.subscribe((albums) => (this.albums = albums));
	}

	resetPageIndex() {
		this.paginator.pageIndex = 0;
	}

	deleteAlbum(album: Album) {
		this.dialog
			.open(DeleteAlbumModalComponent, {
				data: album
			})
			.afterClosed()
			.subscribe(() => {
				this.updateArchive();
			});
	}

	masterToggle() {
		this.selection.selected.length
			? this.selection.clear()
			: this.albums.forEach((row) => this.selection.select(row));
	}

	deleteSelection() {
		const nSelected = this.selection.selected.length;

		if (nSelected) {
			if (
				confirm(
					'Are you sure you would like to delete ' +
						nSelected +
						' albums?'
				)
			) {
				const promises = [];

				this.selection.selected.forEach((album) => {
					promises.push(
						this.albumsService.delete(album.id).toPromise()
					);
				});

				Promise.all(promises).then(() => this.updateArchive());
			}
		}
		else {
			alert('Please select users to delete.');
		}
	}

	addAlbum() {
		this.dialog.open(AddAlbumModalComponent).afterClosed().subscribe(() => {
			this.updateArchive();
		});
	}

	editAlbum(album: Album) {
		this.dialog
			.open(EditAlbumModalComponent, {
				data: album
			})
			.afterClosed()
			.subscribe(() => {
				this.updateArchive();
			});
	}

	editSelection() {
		if (this.selection.selected.length > 1) {
			alert('Please select only one album to edit.');
			return;
		}
		else if (this.selection.selected.length) {
			this.selection.selected.forEach((album) => {
				this.dialog.open(EditAlbumModalComponent, {
					data: album
				});
			});

			this.dialog.afterAllClosed.subscribe(() => {
				this.updateArchive();
			});
		}
		else {
			alert('Please select albums to edit.');
		}
	}
}
