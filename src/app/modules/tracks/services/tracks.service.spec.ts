import { TestBed } from '@angular/core/testing';

import { TracksService } from './tracks.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/environments/environment';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TrackModel } from '@core/models/track.model';

describe('TracksService', () => {
  let service: TracksService;
  let httpMock: HttpTestingController;
  const mockResponse = {
    data: [
      {
        "_id": 1,
        "name": "Getting Over",
        "album": "One Love",
        "cover": "cover1",
        "artist": { "name": "David Guetta" },
        "duration": { "start": 0, "end": 333 },
        "url": "track.mp3"
      },
      {
        "_id": 2,
        "name": "Snow Tha Product",
        "album": "BZRP",
        "cover": "cover2",
        "artist": { "name": "Snow" },
        "duration": { "start": 0, "end": 333 },
        "url": "track-1.mp3"
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TracksService]
    });
    service = TestBed.inject(TracksService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all tracks from API using getAllTracks$', () => {
    service.getAllTracks$().subscribe((tracks: TrackModel[]) => {
      expect(tracks.length).toBe(2);
      expect(tracks[0]._id).toBe(1);
      expect(tracks[1].name).toBe('Snow Tha Product');
    });

    const req = httpMock.expectOne(`${enviroment.api}/tracks`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
  it('should return all tracks from API using getAllElectronic$', () => {
    service.getAllElectronic$().subscribe((tracks: TrackModel[]) => {
      expect(tracks.length).toBe(2);
      expect(tracks[0].album).toBe('One Love');
      expect(tracks[1].album).toBe('BZRP');
    });

    const req = httpMock.expectOne(`${enviroment.api}/tracks`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
