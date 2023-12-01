import { Component, Input, inject } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper/helper.service';

@Component({
  selector: 'poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent {

  // dependencies
  private hs: HelperService = inject(HelperService);


  // pokemon data
  @Input('pokemon-data') poke: any | undefined;


  // convert string to JSON
  toJSON(str: string): any {
    return this.hs.toJSON(str);
  }

  // get pokemon type bg-color
  getTypeBG(type: string): string {
    return this.hs.getPokeTypeBG(type);
  }

  // get pokemon type icon
  getTypeIcon(type: string): string {
    return this.hs.getTypeIcon(type);
  }

}
