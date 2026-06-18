import { Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ShopPageComponent } from '../features/shop/shop-page.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: ShopPageComponent,
    providers: [provideHttpClient()],
  },
];
