import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import  { catchError, map, mergeMap, tap } from 'rxjs/operators'
// import * as dataRaw from '../../../data/tracks.json'
// import { TrackModel } from '@core/models/tracks.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  // dataTracksTrending$:Observable<any> = of ([])
  // dataTracksRandom$:Observable<any> = of ([])

  private readonly URL = environment.api;

  constructor(private http: HttpClient) {
    // const {data}:any = (dataRaw as any).default
    // this.dataTracksTrending$ = of(data)

    // this.dataTracksRandom$ = new Observable((observer) =>{
    //   const trackExample: TrackModel = {
    //     _id:9,
    //     name:'Leve',
    //     album:'Cartel Santa',
    //     url: 'http://',
    //     cover:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcShZkyyfu4lmfAXmUhwFEJ6R44Bih0hb1vR9AOL1esAWbNuL_5O'
    //   }
      
    //   setTimeout(() => {
    //     observer.next([trackExample])
    //   }, 3500);
    // })  

   }

   /**
    * //TODO: {data:[..1,..2,...3]}
    * @returns devolver todas canciones
    */
   getAllTracks$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
    .pipe(
      // para el map llega la data cruda es el objeto {data:[..1,..2,...3]}
      map(({data}: any) => {
        return data
      })
    )
  }

  // Funcion de tipo promeso que me devuelve canciones 

  private SkipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]>{
     return new Promise ((resolve, reject) =>{
      const listTmp = listTracks.filter( a => a._id != id)
      resolve(listTmp)
     })
  }


  // private skyByName():Promise <TrackModel[]>{
  //    return new Promise ((resolve, reject)=>{
  //    resolve([])
  //    })
  // }
     /**
    * 
    * @returns devolver todas canciones RANDOM
    */
     getAllRandom$(): Observable<any> {
      return this.http.get(`${this.URL}/tracks`)
      .pipe(
        mergeMap(({data}: any) => this.SkipById(data,1)),
        // map((dataRevertida) => {
        //   return dataRevertida.filter((track:TrackModel) => track._id != 1)
        // })
        //tap(data => console.log(data))
        catchError((err) => {
          console.log('Algo salio mal revisame', err)
          return  of([])
        })
      )
    }












}
