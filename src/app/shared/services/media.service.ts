import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  trackinfo$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public timeElapsed$ : BehaviorSubject<string> = new BehaviorSubject<string>('00:00');
  public timeRemaining$ : BehaviorSubject<string> = new BehaviorSubject<string>('-00:00');
  public playStatus$ :BehaviorSubject<string> = new BehaviorSubject<string>('pause');
  public playerPercentage$ :BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  public audio!: HTMLAudioElement;
  /*
  observable$: Observable<any> = new Observable<any>();
  subject$: Subject<any> = new Subject<any>();
  */

  constructor() {
    this.audio = new Audio();
    this.trackinfo$.subscribe(track =>
    {
      if(track){
        this.setAudio(track);
        console.log('Playing track:',track);
      };
    }
    );
    this.listenAllEvents()
    /*
    this.observable$ = new Observable<any>(
      (subscriber)=>{
        subscriber.next('MediaService Observable initialized');
        subscriber.next('Playing some media....');
        subscriber.next('Media Playback in progress...');
        subscriber.error('This is a simulated error from MediaService Obsevable');
        subscriber.complete();
      });*/
  
   }

  private listenAllEvents(): void{
    
    this.audio.addEventListener('timeupdate',this.calculateTime,false);

    this.audio.addEventListener('ended',this.setPlayerStatus,false);
    this.audio.addEventListener('play',this.setPlayerStatus,false);
    this.audio.addEventListener('playing',this.setPlayerStatus,false);
    this.audio.addEventListener('pause',this.setPlayerStatus,false);
  }

  private setPercentage = (currentTime: number,duration: number): void =>{
    const percentage =  (currentTime/duration) * 100;
    this.playerPercentage$.next(percentage)
  }

  private setPlayerStatus = (state:any) =>{
    console.log('Audio Event: ', state)
    switch(state.type){
      case 'play':
        this.playStatus$.next('play');
        break;
      case 'playing':
        this.playStatus$.next('playing');
        break;
      case 'ended':
        this.playStatus$.next('ended');
        break;
      default:
        this.playStatus$.next('pause');
        break;
    }
  }
  private calculateTime = ()=>{
    
      const {currentTime,duration} = this.audio;
      //console.log('Current Time: ',currentTime, ' .Duration:',duration)
      this.setTimeElapsed(currentTime);
      this.setTTimeRemaining(currentTime,duration);
      this.setPercentage(currentTime,duration);
    
  }
  private setTimeElapsed(currentTime: number):void{

    this.timeElapsed$.next(this.formatTime(currentTime));
    //console.log('Time Elapsed:',this.formatTime(currentTime));
  }
  private setTTimeRemaining(currentTime: number, duration:number):void{
    const timeLeft = duration - currentTime;

    this.timeRemaining$.next('-'+this.formatTime(timeLeft));
    //console.log('Time Remaining:',this.formatTime(timeLeft));
  }

  private formatTime(currentTime: number): string{
    const minutes = Math.floor(currentTime / 60 % 60);
    const seconds = Math.floor(currentTime  % 60);

    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    const displayMinutes = minutes <10 ? '0' + minutes : minutes;

    return displayMinutes+':'+displaySeconds;
  }

   private setAudio(track :TrackModel):void{
    this.audio.src = track.url;
    this.audio.play();
   }
  public tooglePlayer(): void{
    if(this.audio.paused){
      this.audio.play();
    }else{
      this.audio.pause();
    }
  }

  public seekAudio(percentage: number):void{
    const {duration} = this.audio;
    const seekTime= (percentage /100) * duration;

    this.audio.currentTime = seekTime

    console.log('Seeking to '+seekTime+'secods' +'('+percentage+'%)');
  }
}
