import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPlayerComponent } from './card-player.component';

describe('CardPlayerComponent', () => {
  let component: CardPlayerComponent;
  let fixture: ComponentFixture<CardPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPlayerComponent]
    });
    fixture = TestBed.createComponent(CardPlayerComponent);
    component = fixture.componentInstance;

    component.track = {
      name: 'Test Track',
      album: 'Test Album',
      cover: 'http://testurl.com/cover.jp',
      url: 'http://testurl.com/track.mp3',
      _id: 0,
      artist: {
        name: 'Test Artist' , nickname: '',
        nationality : ''
      }
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
