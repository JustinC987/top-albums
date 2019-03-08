import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Album } from '../add-album-modal/album';
import { AlbumsService } from '../albums.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
@Component({
	selector: 'app-edit-album-modal',
	templateUrl: './edit-album-modal.component.html',
	styleUrls: [ './edit-album-modal.component.css' ]
})
export class EditAlbumModalComponent implements OnInit {
	public form: FormGroup;
	public errorString?: string;
	public hasSubmit = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<EditAlbumModalComponent>,
		public albumsService: AlbumsService,
		public cloudinaryService: CloudinaryService
	) {}

	ngOnInit() {
		this.createForm();
		this.form.controls['name'].setValue(this.data.name);
		this.form.controls['artist'].setValue(this.data.artist);
		this.form.controls['thumbnail'].setValue(this.data.thumbnail);
		this.form.controls['rating'].setValue(this.data.rating);
		this.form.controls['song1'].setValue(this.data.song1);
		this.form.controls['song2'].setValue(this.data.song2);
		this.form.controls['song3'].setValue(this.data.song3);
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
		this.hasSubmit = true;

		const id = this.data.id;
		this.data = this.form.getRawValue();
		this.albumsService.update(id, this.data).subscribe((result) => {
			this.dialogRef.close();
		});
	}

	uploadImg(ev, target) {
		const files = ev.target.files;
		this.cloudinaryService.upload(files[0]).subscribe((result) => {
			this.form.controls['thumbnail'].setValue(result['public_id']);
		});
	}
}
