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

const firebaseConfig = {
  apiKey: 'AIzaSyBhMqZuaWJOh5ftKD_-9V0Tqr8M8XoB_R4',
  authDomain: 'thrifty-shopping-assistant.firebaseapp.com',
  projectId: 'thrifty-shopping-assistant',
  storageBucket: 'thrifty-shopping-assistant.appspot.com',
  messagingSenderId: '884016081747',
  appId: '1:884016081747:web:ecf4840da822105c854fa6',
};

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    ContactPageComponent,
    LoginPageComponent,
    LogoutPageComponent,
    SignupPageComponent,
    NavBarComponent,
    NotFoundPageComponent,
    FooterComponent,
    HomePageComponent,
    PriceInfoPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
