import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'إرث الجزيرة | الرئيسية'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'إرth الجزيرة | من نحن ورؤيتنا'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'إرث الجزيرة | خدماتنا وتجاربنا'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'إرث الجزيرة | تواصل معنا'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
