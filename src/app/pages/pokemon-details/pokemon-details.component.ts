import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { HistoryService } from 'src/app/core/services/history/history.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
 
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {

  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute); 
  private ps: PokemonService = inject(PokemonService);
  private help: HelperService = inject(HelperService);
  private hs: HistoryService = inject(HistoryService);

  pokemon: any | undefined;
  subs: Subscription[] = [];
  
  history: any[] = [];

  ngOnInit() {
    // get page number from queryparams
    const id = this.route.snapshot.params['id'];

    this.getPokemonById(id).then(() => { // fetch pokemon data on route load
      this.pushToHistory()
    });
    
    this.subs.push(
      this.router.events.subscribe({ // listen for route changes to update pokemon
        next: (event) => (event instanceof NavigationEnd) && 
          this.getPokemonById(this.route.snapshot.params['id'])
            .then(() => this.pushToHistory())
      })
    );
  
  }

  async getBio() {
    return await firstValueFrom(this.ps.getPokemonBioById$(this.pokemon.id))
      .then(
        (res: any) => 
          this.pokemon.bio = res.data
            .pokemon_v2_pokemonspecies_by_pk
            .pokemon_v2_pokemonspeciesflavortexts[0]
            .flavor_text
      )
  }

  back() {
    this.router.navigate(['/pokemon'])
  }

  // add pokemon data to history service for navbar history
  pushToHistory() {
    this.hs.pushToHistory({
      url: `/pokemon/${this.pokemon.id}`,
      img: this.toJSON(this.pokemon.pokemon_v2_pokemonsprites[0].sprites).other['official-artwork'].front_default,
    });
  }

  async getPokemonById(id: number): Promise<any> {
    this.pokemon = [];
    return await firstValueFrom(this.ps.getPokemonById$(id))
      .then((res: any) => this.pokemon = res.data.pokemon_v2_pokemon_by_pk)
      .finally(() => this.getBio())    
  }


  toJSON(s: string): any {
    return JSON.parse(s);
  }



  extractImages(data: any): string[] {
    return this.help.extractImages(data)
  }

  getTypesBG(type: string): string {
    return this.help.getPokeTypeBG(type);
  }

  getTypeIcon(type: string): string {
    return this.help.getTypeIcon(type);
  }

  // garbage collection
  ngOnDestroy() {
    this.subs.forEach(subs => subs.unsubscribe())
  }


}
