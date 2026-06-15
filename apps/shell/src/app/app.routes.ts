import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'admin',
    loadChildren: () => import('admin/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'profile',
    loadChildren: () => import('profile/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'shop',
    loadChildren: () => import('shop/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'mf_activity',
    loadChildren: () =>
      import('mf_activity/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
