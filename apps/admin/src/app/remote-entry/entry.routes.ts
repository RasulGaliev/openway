import { Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AdminLayoutComponent } from '../layout/admin-layout.component';
import { RequestsPageComponent } from '../features/requests/requests-page.component';
import { GrantPageComponent } from '../features/grant/grant-page.component';
import { OrdersPageComponent } from '../features/orders/orders-page.component';
import { UsersPageComponent } from '../features/users/users-page.component';
import { ProductsPageComponent } from '../features/products/products-page.component';
import { AdminFacade } from '../data/admin.facade';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: AdminLayoutComponent,
    providers: [provideHttpClient(), AdminFacade],
    children: [
      { path: '', redirectTo: 'requests', pathMatch: 'full' },
      { path: 'requests', component: RequestsPageComponent },
      { path: 'grant', component: GrantPageComponent },
      { path: 'orders', component: OrdersPageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'products', component: ProductsPageComponent },
    ],
  },
];
