import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlbumsService } from '../albums.service';
import { Album } from './album';
import { HandlerService } from '../../handler.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Component({
	selector: 'app-add-album-modal',
	templateUrl: './add-album-modal.component.html',
	styleUrls: [ './add-album-modal.component.css' ]
})
export class AddAlbumModalComponent implements OnInit {
	public form: FormGroup;
	public album: Album;
	constructor(
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<AddAlbumModalComponent>,
		private albumsService: AlbumsService,
		private handler: HandlerService,
		private cloudinaryService: CloudinaryService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}
	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.form = this.formBuilder.group({
			name: [ '', [ Validators.required ] ],
			artist: [ '', [ Validators.required ] ],
			thumbnail: [ '', [ Validators.required ] ],
			rating: [ '', [ Validators.required ] ],
			song1: [ '', [ Validators.required ] ],
			song2: [ '', [ Validators.required ] ],
			song3: [ '', [ Validators.required ] ]
		});
	}

	onSubmit() {
		this.album = this.form.getRawValue();

		this.albumsService.post(this.album).subscribe();

		this.dialogRef.close();
	}

	uploadImg(ev, target) {
		const files = ev.target.files;
		this.album = this.form.getRawValue();
		this.cloudinaryService.upload(files[0]).subscribe((result) => {
			this.form.controls['thumbnail'].setValue(result['public_id']);
			console.log('album ', this.album.thumbnail);
		});
	}
}
