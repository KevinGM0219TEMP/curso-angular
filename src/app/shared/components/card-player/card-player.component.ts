import { Component, Input } from '@angular/core';
import { TrackModel } from 'src/app/core/models/track.model';
import { MediaService } from '@shared/services/media.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent {
  @Input() mode:'small'|'big'='big';
  @Input() track!:TrackModel;
  constructor(private mediaService: MediaService){}
  ngOnInit(){
    //console.log(this.track)
  }
  sendTrack(track:TrackModel){
    this.mediaService.trackinfo$.next(track)
    console.log("Track send:" , this.track)
  }
}
