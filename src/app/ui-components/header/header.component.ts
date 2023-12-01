import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
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
  subs: Subscription[] = [];

  // navHistory: RouterEvent[] = [];

  ngOnInit() {
    // this.router.events.subscribe({
    //   next: (e) => {
    //     if (e instanceof NavigationEnd && this.isDetailPage(e.url))
    //       (this.navHistory[this.navHistory.length - 1]?.url !== e.url) && this.pushToHistory(e)
    //   },
    // })
  }

  navHistory() {
    return this.hs.getHistory$();
  }

  // pushToHistory(nav: RouterEvent) {
  //   this.navHistory.push(nav);
  //   (this.navHistory.length > 3) && this.navHistory.shift(); 
  // }

  // isDetailPage(url: string): boolean {
  //   const arr = url.split('/');
  //   return (arr.length > 2) && arr[1] === 'pokemon';
  // }

  view(id: string) {
    this.router.navigate(['/pokemon', id]);
    this.search = '';
  }

  getPokemon(name: string) {
    this.ps.getPokemonByName$(name, this._limit).then((res: any) => this.pokemon = res.data.pokemon_v2_pokemon);
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

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe())
  }

}
