import { Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ProfilePageComponent } from '../features/profile/profile-page.component';
import { ProfileFacade } from '../data/profile.facade';
import { ProfileStore } from '../data/profile.store';
import { ProfileAdapter } from '../data/profile.adapter';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: ProfilePageComponent,
    providers: [
      provideHttpClient(),
      ProfileFacade,
      ProfileStore,
      ProfileAdapter,
    ],
  },
];
