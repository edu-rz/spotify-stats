import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'login/callback',
    loadComponent: () => import('./features/auth/login-callback/login-callback.component').then((m) => m.LoginCallbackComponent),
  },
  {
    path: 'stats',
    loadComponent: () => import('./features/stats/stats.component').then((m) => m.StatsComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./shared/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
