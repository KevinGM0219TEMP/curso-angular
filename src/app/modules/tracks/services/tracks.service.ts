import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of } from 'rxjs';
import { TrackModel } from '@core/models/track.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TracksService {

  private readonly URL=enviroment.api
  constructor(private httpClient:HttpClient){

  }
  private skipById(tracks:TrackModel[],idToSkip:number):Promise<TrackModel[]>{
    return new Promise((resolve)=>{
      const filterdTracks=tracks.filter(tracks=>tracks._id!==idToSkip);
      resolve(filterdTracks)
    });
  }
  getTrack(): TrackModel[]{
    return new Array<TrackModel>();
  }
  getAllTracks$(): Observable<TrackModel[]>{
    return this.httpClient.get<any>(`${this.URL}/tracks`).pipe(
      map((response)=>{
        return response.data
      })
    );
  }

  getAllElectronic$(): Observable<TrackModel[]>{
    return this.httpClient.get<any>(`${this.URL}/tracks`).pipe(
      map((response)=>{
        return response.data
      })
    );
  }


}


