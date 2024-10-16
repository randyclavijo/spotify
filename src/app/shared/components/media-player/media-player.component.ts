import { Component, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  //mockCover!: TrackModel;
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  
 constructor(public multimediaService: MultimediaService){}

  ngOnInit(): void {

     const observer1$ = this.multimediaService.playerStatus$
     .subscribe(status => this.state = status )
    // this.multimediaService.trackInfo$.subscribe(res => {
    //   console.log("Debo de repoducir esta cancion....", res)
    // })

  this.listObservers$ = [observer1$]
    
  }

  ngOnDestroy(): void {
   this.listObservers$.forEach(u => u.unsubscribe())
    console.log('BOOM!!')   
    
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //TODO: 1050 - x
    const percentageFromX = (clickX * 100) / width
    console.log(`Click(x): ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX)

  }
}
