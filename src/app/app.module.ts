import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatTableModule,
	MatCheckboxModule,
	MatDialogModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatPaginatorModule,
	MatSortModule,
	MatMenuModule,
	MatProgressSpinnerModule,
	MatProgressBarModule
} from '@angular/material';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';

import { AppComponent } from './app.component';
import { HomeComponent } from './album/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlbumArchiveComponent } from './album/album-archive/album-archive.component';
import { AddAlbumModalComponent } from './album/add-album-modal/add-album-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { AlbumModalComponent } from './album-modal/album-modal.component';
import { EditAlbumModalComponent } from '../app/album/edit-album-modal/edit-album-modal.component';
import { DeleteAlbumModalComponent } from '../app/album/delete-album-modal/delete-album-modal.component';
import { BandArchiveComponent } from '../app/band/band-archive/band-archive.component';
import { BandModalComponent } from '../app/band/band-modal/band-modal.component';
import { BandHomeComponent } from '../app/band/band-home/band-home.component';
import { DeleteBandComponent } from '../app/band/delete-band/delete-band.component';
import { EditBandModalComponent } from '../app/band/edit-band-modal/edit-band-modal.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		FooterComponent,
		AlbumArchiveComponent,
		AddAlbumModalComponent,
		ErrorModalComponent,
		AlbumModalComponent,
		EditAlbumModalComponent,
		DeleteAlbumModalComponent,
		BandArchiveComponent,
		BandModalComponent,
		BandHomeComponent,
		DeleteBandComponent,
		EditBandModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatTableModule,
		MatCheckboxModule,
		MatPaginatorModule,
		MatSortModule,
		MatSliderModule,
		MatSlideToggleModule,

		CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'ddq6uu3nz' }),
		CloudinaryModule
	],
	providers: [],
	bootstrap: [ AppComponent ],
	exports: [ MatDialogModule ],
	entryComponents: [
		ErrorModalComponent,
		AddAlbumModalComponent,
		DeleteAlbumModalComponent,
		EditAlbumModalComponent
	]
})
export class AppModule {}
