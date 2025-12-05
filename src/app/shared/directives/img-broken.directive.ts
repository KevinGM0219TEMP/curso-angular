import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() appImgBroken: string = '../../../assets/images/img_broken.jpg';
  constructor(private elementRef:ElementRef) { }
  @HostListener("error")handleError(){


    const nativeElement: HTMLImageElement=this.elementRef.nativeElement;
    nativeElement.src=this.appImgBroken;

  }

}
