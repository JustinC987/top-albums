import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './album/home/home.component';
import { BandHomeComponent } from './band/band-home/band-home.component';
import { AlbumArchiveComponent } from './album/album-archive/album-archive.component';
import { BandArchiveComponent } from './band/band-archive/band-archive.component';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},

	{
		path: 'band-home',
		component: BandHomeComponent
	},

	{
		path: 'band-archive',
		component: BandArchiveComponent
	},

	{
		path: 'album-archive',
		component: AlbumArchiveComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
