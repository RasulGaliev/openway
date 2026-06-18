import { Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ActivitiesPageComponent } from '../features/activities/activities-page.component';
import { AchievementsPageComponent } from '../features/achievements/achievements-page.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: [provideHttpClient()],
    children: [
      { path: '', component: ActivitiesPageComponent },
      { path: 'achievements', component: AchievementsPageComponent },
    ],
  },
];
