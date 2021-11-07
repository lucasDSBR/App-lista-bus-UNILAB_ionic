import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'lists',
    loadChildren: () => import('./lists/lists.module').then( m => m.ListsPageModule)
  },
  {
    path: 'lists',
    redirectTo: 'lists',
    pathMatch: 'full'
  },
  {
    path: 'lists-datails',
    loadChildren: () => import('./lists-datails/lists-datails.module').then( m => m.ListsDatailsPageModule)
  },
  {
    path: 'lists-datails',
    redirectTo: 'lists-datails',
    pathMatch: 'full'
  },
  
  {
    path: 'create-lists',
    loadChildren: () => import('./create-lists/create-lists.module').then( m => m.CreateListsPageModule)
  },
  {
    path: 'register-users',
    loadChildren: () => import('./register-users/register-users.module').then( m => m.RegisterUsersPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'users-details',
    loadChildren: () => import('./users-details/users-details.module').then( m => m.UsersDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'gerar-email',
    loadChildren: () => import('./gerar-email/gerar-email.module').then( m => m.GerarEmailPageModule)
  },
  {
    path: 'gerar-email',
    redirectTo: 'gerar-email',
    pathMatch: 'full'
  },  {
    path: 'register-user-anonimo',
    loadChildren: () => import('./register-user-anonimo/register-user-anonimo.module').then( m => m.RegisterUserAnonimoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
