import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css']
})
export class SectionGenericComponent implements OnInit {
  //Se utiliza input para comunicacion de componente PADRE e Hijo
  @Input() title: string = ''
  // mode es variable de entrada de esta manera solo acepta small o big pero por default big
  @Input() mode: 'small' | 'big' = 'big'
  @Input() dataTracks: Array<TrackModel> = [];

  constructor(){ }

  ngOnInit(): void {
    
  }

}
