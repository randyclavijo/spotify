import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // con img indicamos que solo funcione en etiquetas img
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  
@HostListener('error') handleError(): void {
  const elNative = this.elHost.nativeElement
  elNative.src ='../../../assets/images/default.png'

}


  constructor(private elHost: ElementRef) { 

  }

}
