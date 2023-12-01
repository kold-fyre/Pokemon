import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { ApiInterceptorService } from './core/interceptor/api.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiComponentsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
