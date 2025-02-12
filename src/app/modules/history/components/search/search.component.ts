import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // Comunicacion entre componente hijo a padre
  // callbackData es un variable de tipo EventEmiter del angular core
  @Output() callbackData: EventEmitter<any> = new EventEmitter()

  src: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  callSearch(term: string): void {
    if (term.length >= 3) {
      this.callbackData.emit(term)
      console.log('🔴 Llamamos a nuestra API HTTP GET---> ', term);
    }
  }

}