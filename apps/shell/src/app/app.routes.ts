import { Route } from '@angular/router';
import { authGuard, roleGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'activity',
        loadChildren: () => import('mf_activity/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'shop',
        loadChildren: () => import('shop/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'profile',
        loadChildren: () => import('profile/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'admin',
        canActivate: [roleGuard('admin')],
        loadChildren: () => import('admin/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: '',
        redirectTo: 'activity',
        pathMatch: 'full',
      },
    ],
  },
];
