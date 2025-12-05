import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit,OnDestroy{

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef(null);

  state: string='pause';

  observerList$: Array<Subscription>=[];
  constructor(public mediaService:MediaService){}
  ngOnInit(){
    const observer$ = this.mediaService.playStatus$.subscribe(status =>{
      this.state = status;
      console.log('MediaPlayerComponent - Play status updated: ',status)
    })
    this.observerList$.push(observer$);
  }
  ngOnDestroy(){
    console.log('MediaPlayerComponent destroyed,unsusbcribing from observables.');
    this.observerList$.forEach(sub=> sub.unsubscribe())
  }

  handlePosition(event:any):void{
    const {clientX} =event;
    //console.log('Clicked position X',clientX);

    const elNative = this.progressBar.nativeElement as HTMLElement;

    const {x, width} = elNative.getBoundingClientRect();

    //console.log('Progress bar position and width: ',x, width);

    const clickPosition = clientX - x;
    const percentage = clickPosition * 100 /width;
    //console.log('Click percentage',percentage);
    this.mediaService.seekAudio(percentage);
  }
}
