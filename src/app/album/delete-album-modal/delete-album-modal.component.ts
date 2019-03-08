import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Album } from '../add-album-modal/album';
import { AlbumsService } from '../albums.service';
@Component({
	selector: 'app-delete-album-modal',
	templateUrl: './delete-album-modal.component.html',
	styleUrls: [ './delete-album-modal.component.css' ]
})
export class DeleteAlbumModalComponent implements OnInit {
	public form: FormGroup;
	public album: Album;

	constructor(
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<DeleteAlbumModalComponent>,
		private albumsService: AlbumsService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.form = this.formBuilder.group({
			delete: [ '', [ Validators.required ] ]
		});
	}

	onSubmit() {
		this.albumsService.delete(this.data.id).subscribe((result) => {
			this.dialogRef.close();
		});
	}
}
