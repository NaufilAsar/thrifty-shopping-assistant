import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PriceInfoPageComponent } from './price-info-page/price-info-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    data: { animationState: 'One' },
  },
  {
    path: 'about',
    component: AboutPageComponent,
    data: { animationState: 'Two' },
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    data: { animationState: 'Three' },
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { animationState: 'Four' },
  },
  {
    path: 'logout',
    component: LogoutPageComponent,
    data: { animationState: 'Four' },
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    data: { animationState: 'Five' },
  },
  {
    path: 'price-info',
    component: PriceInfoPageComponent,
    data: { animationState: 'Six' },
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { animationState: 'Seven' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
