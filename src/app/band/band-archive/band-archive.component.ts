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

import { BandService } from '../band.service';
import { Band } from '../band';
import { BandModalComponent } from '../band-modal/band-modal.component';
import { DeleteBandComponent } from '../delete-band/delete-band.component';
import { tap, startWith, switchMap, catchError } from 'rxjs/operators';
import { EditBandModalComponent } from '../edit-band-modal/edit-band-modal.component';
@Component({
	selector: 'app-band-archive',
	templateUrl: './band-archive.component.html',
	styleUrls: [ './band-archive.component.css' ]
})
export class BandArchiveComponent implements OnInit {
	public bands?: Band[] = [];
	public nResults = 0;
	public dataSource: MatTableDataSource<Band>;
	public initialSelection = [];
	public allowMultiSelect = true;
	public selection: SelectionModel<Band>;
	public selectedRowIndex: number = -1;

	public columns: string[] = [ 'select', 'id', 'bandName', 'favAlbum' ];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	constructor(private bandService: BandService, private dialog: MatDialog) {}

	ngOnInit() {
		this.paginator.pageSize = 10;
		this.paginator.pageIndex = 0;
		this.sort.direction = 'desc';
		this.sort.active = 'id';

		this.selection = new SelectionModel<Band>(true);
		this.updateArchive();
	}

	updateArchive() {
		merge(
			this.sort.sortChange,
			this.paginator.page,
			this.bandService
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
					return this.bandService.getUser({});
				}),
				tap((bands) => {
					this.selection.clear();

					return bands;
				}),
				catchError((error, caught) => {
					return of([]);
				})
			)
			.subscribe((bands) => (this.bands = bands));
	}

	resetPageIndex() {
		this.paginator.pageIndex = 0;
	}

	deleteAlbum(band: Band) {
		this.dialog
			.open(DeleteBandComponent, {
				data: band
			})
			.afterClosed()
			.subscribe(() => {
				this.updateArchive();
			});
	}

	masterToggle() {
		this.selection.selected.length
			? this.selection.clear()
			: this.bands.forEach((row) => this.selection.select(row));
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

				this.selection.selected.forEach((band) => {
					promises.push(this.bandService.delete(band.id).toPromise());
				});

				Promise.all(promises).then(() => this.updateArchive());
			}
		}
		else {
			alert('Please select users to delete.');
		}
	}

	addAlbum() {
		this.dialog.open(BandModalComponent).afterClosed().subscribe(() => {
			this.updateArchive();
		});
	}

	editAlbum(band: Band) {
		this.dialog
			.open(EditBandModalComponent, {
				data: band
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
			this.selection.selected.forEach((band) => {
				this.dialog.open(EditBandModalComponent, {
					data: band
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
