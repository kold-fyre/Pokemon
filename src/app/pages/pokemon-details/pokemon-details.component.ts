import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { Observable } from 'rxjs/internal/Observable';
// import { from } from 'rxjs/internal/observable/from';
import { Subscription } from 'rxjs/internal/Subscription';
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
  private location: Location = inject(Location);
  private help: HelperService = inject(HelperService);
  private hs: HistoryService = inject(HistoryService);

  pokemon: any | undefined;
  subs: Subscription[] = [];
  
  history: any[] = [];

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (!id) this.location.back();
    
    this.subs.push(
      this.router.events.subscribe({
        next: (event) => (event instanceof NavigationEnd) && 
          this.getPokemonById(this.route.snapshot.params['id'])
            .then(() => this.pushToHistory({
              url: `/pokemon/${this.pokemon.id}`,
              img: this.toJSON(this.pokemon.pokemon_v2_pokemonsprites[0].sprites).other['official-artwork'].front_default, 
            }))
      })
    );
    
    this.getPokemonById(id).then(() => {
      this.pushToHistory({
        url: `/pokemon/${this.pokemon.id}`,
        img: this.toJSON(this.pokemon.pokemon_v2_pokemonsprites[0].sprites).other['official-artwork'].front_default,
      })
    });

    // this.subs.push(
    //   this.router.events.subscribe({
    //     next: (event) => (event instanceof NavigationEnd) && this.getPokemonById(this.route.snapshot.params['id']),
    //     // complete: () => this.pushToHistory(this.pokemon.filter((f: any) => f.id === id))
    //     complete: () => this.hs.addToHistory(this.pokemon.filter((f: any) => f.id === id))
    //   })
    // );
  }

  async getBio() {
    return await this.ps.getPokemonBioById$(this.pokemon.id)
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
    // this.location.back();
  }

  pushToHistory(poke: any) {
    this.hs.addToHistory(poke);
  }

  async getPokemonById(id: number): Promise<any> {
    this.pokemon = [];
    return await this.ps.getPokemonById$(id)
      .then((res: any) => this.pokemon = res.data.pokemon_v2_pokemon_by_pk)
      .finally(() => this.getBio())    
  }


  toJSON(s: string): any {
    return JSON.parse(s);
  }


  extractImages(data: any) {
    const imageUrls: any[] = [];

    function traverse(obj: any) {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].startsWith('https://')) {
          imageUrls.push(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key]);
        }
      }
    }

    traverse(data);
    return imageUrls;
  }

  getTypesBG(type: string): string {
    return this.help.getPokeTypeBG(type);
  }

  getTypeIcon(type: string): string {
    return this.help.getTypeIcon(type);
  }

  ngOnDestroy() {
    this.subs.forEach(subs => subs.unsubscribe())
  }


}
