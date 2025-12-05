import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/track.model';

@Pipe({
  name: 'pipeOrdenarTracks'
})
export class PipeOrdenarTracksPipe implements PipeTransform {

  transform(tracks: TrackModel[], opcion: number,ascendente:boolean): TrackModel[]  {
    switch (opcion){
    case 1:
      if(ascendente){
        return tracks.filter(track=>
          track.name.toLowerCase()).sort((a,b)=>a.name.localeCompare(b.name));
      }else{
        return tracks.filter(track=>
          track.name.toLowerCase()).sort((a,b)=>b.name.localeCompare(a.name));
      }
    case 2:
      if(ascendente){
        return tracks.filter(track=>
          track.album.toLowerCase()).sort((a,b)=>a.album.localeCompare(b.album));
      }else{
        return tracks.filter(track=>
          track.album.toLowerCase()).sort((a,b)=>b.album.localeCompare(a.album));
      }

    default:
      return tracks;
    }

    
  }

}
