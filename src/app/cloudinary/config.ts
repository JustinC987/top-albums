import { CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { environment } from '../../environments/environment';

export const cloudinaryConfig: CloudinaryConfiguration = {
	cloud_name: environment.cloudinaryKey,
	upload_preset: environment.cloudinaryPreset
};
