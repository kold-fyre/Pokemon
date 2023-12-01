import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokeCardComponent } from './poke-card/poke-card.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PokeCardComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PokeCardComponent,
    SpinnerComponent,
  ],
})
export class UiComponentsModule { }
