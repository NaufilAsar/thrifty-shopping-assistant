import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// charts
import { NgChartsModule } from 'ng2-charts';

// pagination
import { NgxPaginationModule } from 'ngx-pagination';

//icon
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// flowbite
import 'flowbite';

//forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//api
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { AngularFireModule } from '@angular/fire/compat/';

// animations
import { LottieModule } from 'ngx-lottie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
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
import { ProductComponent } from './product/product.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';

import player from 'lottie-web';
import { SharingService } from './services/sharing.service';
import { LoadingComponent } from './loading/loading.component';
import { PriceAlertsPageComponent } from './price-alerts-page/price-alerts-page.component';
export function playerFactory() {
  return player;
}

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
    ProductComponent,
    PrivacyPolicyPageComponent,
    ResultsPageComponent,
    LoadingComponent,
    PriceAlertsPageComponent,
  ],
  imports: [
    FontAwesomeModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [SharingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
