import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./components/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./components/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'item-create',
    loadChildren: () => import('./components/item-create/item-create.module').then( m => m.ItemCreatePageModule)
  },
  {
    path: 'release-notes',
    loadChildren: () => import('./components/release-notes/release-notes.module').then( m => m.ReleaseNotesPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./components/about/about.module').then( m => m.AboutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
