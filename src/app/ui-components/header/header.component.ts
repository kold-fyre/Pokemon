import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { HistoryService } from 'src/app/core/services/history/history.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private ps: PokemonService = inject(PokemonService);
  private hs: HistoryService = inject(HistoryService);
  private help: HelperService = inject(HelperService);
  private router: Router = inject(Router);

  private _limit: number = 5;
  search: string = '';
  pokemon: any[] = [];

  ngOnInit() {
  }

  navHistory() {
    return this.hs.getHistory$();
  }

  view(id: string) {
    this.router.navigate(['/pokemon', id]);
    this.search = '';
  }

  getPokemon(name: string) {
    firstValueFrom(this.ps.getPokemonByName$(name, this._limit)).then((res: any) => this.pokemon = res.data.pokemon_v2_pokemon);
  }

  toJSON(str: string): any {
    return this.help.toJSON(str);
  }

  extractImages(data: any): any {
    return this.help.extractImages(data);
  }

  clear() {
    if (!this.search) this.pokemon = [];
  }

}
