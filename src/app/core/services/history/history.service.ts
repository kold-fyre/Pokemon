import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private _history: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  private _historyObs: Observable<any> = this._history.asObservable();


  // update routes history
  pushToHistory( data: { url: string; img: string } ) {
    firstValueFrom(
      this._historyObs
    ).then((res) => {
      if (res[res.length - 1]?.url === data.url) return; // prevents same history twice in succession
      (res.length >= 3) && (res.shift());
      this._history.next([...res, data]);
    });
  }

  // get routes history
  getHistory$(): Observable<any> {
    return this._historyObs;
  }

}
