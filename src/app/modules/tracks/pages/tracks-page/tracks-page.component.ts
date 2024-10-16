import { Component, OnDestroy, OnInit } from '@angular/core';
// import * as dataRaw from '../../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import {Subscription, UnsubscriptionError} from 'rxjs'

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})

export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel>= []
  tracksRandom: Array<TrackModel>= []
 
  listObservers$: Array<Subscription> =[];

  constructor(private _trackService: TrackService){}

  ngOnInit(): void {
    // dataRaw es la data cruda como tal con la destructuracion y el punto default obtenemos un array con varios objeto
  //  const { data }: any = (dataRaw as any).default
  //  this.mockTrackList = data

  //  const observer1$ = this._trackService.dataTracksTrending$
  //  .subscribe( response => {
  //   this.tracksTrending = response
  //   this.tracksRandom = response
  //    console.log ('canciones', response);
  //  })
   
  //  const observer2$ = this._trackService.dataTracksRandom$
  //  .subscribe( response => {
  //   this.tracksRandom = [...this.tracksRandom, ...response]
  //    console.log ('cancion random entrado......', response);
  //  })
  //  this.listObservers$ = [observer1$,observer2$]

 this.loadDataAll()
 this.loadDataRandom()

 
}

async loadDataAll():Promise<any>{
  this.tracksTrending = await this._trackService.getAllTracks$().toPromise()
  // this.tracksRandom = await this._trackService.getAllRandom$().toPromise()

}


loadDataRandom():void{
  this._trackService.getAllRandom$()
  .subscribe((response: TrackModel[]) =>{
   this.tracksRandom = response
 }, err => {
   console.log('error de conexion');
 })
  
}





  ngOnDestroy(): void {
    // this.listObservers$.forEach( u => u.unsubscribe())
  }













}
