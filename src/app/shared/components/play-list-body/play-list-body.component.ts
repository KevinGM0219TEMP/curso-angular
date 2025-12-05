import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { TracksService } from '@modules/tracks/services/tracks.service';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent {

  @Input() tracks: Array<TrackModel>=[];
  constructor(private trackService: TracksService){};
  //tracks: Array<TrackModel>=[];
  opcionFilter: number=0;
  ascFilter: boolean=true;
  ngOnInit():void{
    /*
    const tracks$=this.trackService.getAllTracks$().subscribe(tracks=>{
      this.tracks=tracks;
    });*/
  }
  funOrdenar(opcion:number){
    if(opcion==this.opcionFilter){
      this.ascFilter=!this.ascFilter;
    }else{
      this.ascFilter=true;
    }
    this.opcionFilter=opcion
  }
}
