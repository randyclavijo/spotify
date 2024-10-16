import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  // TODO: se utiliza observable para poder implementar la pipe de async para peticciones en 3g
  listResults$: Observable<any> = of([])
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }
  
  // TODO: AQUI RECIBE LOS DATOS DEL HIJO 
  receiveData(event: string): void {
    //TODO: agarras el termino y sabes que solo se ejecuta cunado tiene 3 caracters
    console.log('🎁 Estoy en el padre jua jua...', event);
     this.listResults$ = this.searchService.searchTracks$(event)
     .pipe(
      map((dataRaw: any) => dataRaw.data)
     )

  }
}