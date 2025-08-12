import { Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';

export const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'user-list',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'user-list',
  },
];
