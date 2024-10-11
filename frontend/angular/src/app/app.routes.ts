import { Routes } from '@angular/router';
import { ListComponent } from './presentation/list/list.component';
import { DetailsComponent } from './presentation/details/details.component';
import { CreateComponent } from './presentation/create/create.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
];
