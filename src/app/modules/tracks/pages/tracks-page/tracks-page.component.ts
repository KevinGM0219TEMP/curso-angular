import { Component } from '@angular/core';
import { TrackModel } from 'src/app/core/models/track.model';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent {

  tracksBetter:Array<TrackModel>=[];
  tracksElectronic:Array<TrackModel>=[];
  
  
  constructor(private trackService:TracksService){};
  ngOnInit():void{
    const trackBetterO= this.trackService.getAllTracks$().subscribe(tracks=>
    {
      //console.log(tracks);
      this.tracksBetter=tracks;
    }
    );
    const trackElectronicO= this.trackService.getAllElectronic$().subscribe(tracks=>
    {
      //console.log(tracks);
      this.tracksElectronic=tracks;
    }
    );
  }
  ngOnDestroy():void{
  }
}
