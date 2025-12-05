import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListBodyComponent } from './play-list-body.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { PipeOrdenarTracksPipe } from '@shared/pipes/pipe-ordenar-tracks.pipe';
describe('PlayListBodyComponent', () => {
  let component: PlayListBodyComponent;
  let fixture: ComponentFixture<PlayListBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      declarations: [PlayListBodyComponent,PipeOrdenarTracksPipe]
    });
    fixture = TestBed.createComponent(PlayListBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
