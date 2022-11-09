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
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    data: { animation: 'One' },
  },
  {
    path: 'about',
    component: AboutPageComponent,
    data: { animation: 'Two' },
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    data: { animation: 'Three' },
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { animation: 'Four' },
  },
  {
    path: 'logout',
    component: LogoutPageComponent,
    data: { animation: 'Four' },
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    data: { animation: 'Five' },
  },
  {
    path: 'price-info',
    component: PriceInfoPageComponent,
    data: { animation: 'Six' },
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPageComponent,
    data: { animation: 'Seven' },
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { animation: 'Seven' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
