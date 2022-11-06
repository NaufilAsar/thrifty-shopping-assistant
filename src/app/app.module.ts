import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire/compat/';
import { environment } from '../environments/environment';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PriceInfoPageComponent } from './price-info-page/price-info-page.component';

@NgModule({
  declarations: [AppComponent, AboutPageComponent, ContactPageComponent, LoginPageComponent, LogoutPageComponent, SignupPageComponent, NavBarComponent, NotFoundPageComponent, FooterComponent, HomePageComponent, PriceInfoPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
