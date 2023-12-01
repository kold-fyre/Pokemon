import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {

  private ps: PokemonService = inject(PokemonService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  pokemon: any[] = [];
  pageNum: number = 1;
  isFetching: boolean = false;
  btnMessage: string = 'Claim reward';

  ngOnInit() {
    // page number
    this.pageNum = this.route.snapshot.queryParams['p'] ?? 1; 
    this.getPokemon();
  }
  
  // view pokemon details
  view(id: number) {
    this.router.navigate([`/pokemon/`, id])
  }

  prev() {
    if (this.pageNum <= 1) return;
    this.pageNum--;
    this.getPokemon();
  }

  next() {
    this.pageNum++;
    this.getPokemon();
  }

  first() {
    this.pageNum = 1;
    this.getPokemon();
  }
  
  last() {
    this.pageNum = 130;
    this.getPokemon();
  }

  surprise() {
    this.pageNum = 1;
    
    if (this.btnMessage.includes('reward')) this.btnMessage = "Oops.. i lied 😅"
    else this.getPokemon();
  }

  getPokemon() {
    this.isFetching = true;

    (this.pageNum >= 1) && this.router.navigate([], { relativeTo: this.route, queryParams: { ['p']: this.pageNum } }); 
    this.pokemon = [];
    this.ps.getAllPokemon$(this.pageNum).then(
      (res: any) => this.pokemon = res.data.pokemon_v2_pokemon
    ).finally(() => this.isFetching = false);
  }


  getPokeTypeBG(type: string): string {
    switch (type.toLowerCase()) {
      case 'fire':
        return 'bg-danger-subtle';
      case 'water':
        return 'bg-light';
      case 'grass':
        return 'bg-success-subtle';
      case 'bug':
        return 'bg-warning-subtle';
      default:
        return 'bg-secondary-subtle';
    }
  }

  getTypeIcon(type: string): string {
    return `assets/pokemon/types/${type}.png`;
  }

  toJSON(s: string): any {
    return JSON.parse(s);
  }

}
