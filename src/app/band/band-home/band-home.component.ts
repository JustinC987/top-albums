import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, merge, of } from 'rxjs';
import { MatDialog } from '@angular/material';

import { BandService } from '../band.service';
import { Band } from '../band';
import { tap, startWith, switchMap, catchError } from 'rxjs/operators';
import { BandModalComponent } from '../band-modal/band-modal.component';

@Component({
	selector: 'app-band-home',
	templateUrl: './band-home.component.html',
	styleUrls: [ './band-home.component.css' ]
})
export class BandHomeComponent implements OnInit {
	public bands?: Band[] = [];

	constructor(private bandService: BandService, private dialog: MatDialog) {}

	ngOnInit() {
		this.getAlbums();
	}
	getAlbums() {
		this.bandService.getUser({}).subscribe((band) => {
			this.bands = band;
			console.log('BAND: ', band);
		});
	}
}
