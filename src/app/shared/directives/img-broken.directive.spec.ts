import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `<img class="imagebroke" appImgBroken [appImgBroken]="appImgBroken">`
}
)

class TestComponent {
  appImgBroken: string = 'assets/images/img_broken.jpg'
}

describe('ImgBrokenDirective', () => {
  
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(()=>
  {
    TestBed.configureTestingModule(
      {
        declarations:[ImgBrokenDirective,TestComponent]
      });
      fixture = TestBed.createComponent(TestComponent);
      component= fixture.componentInstance;
      fixture.detectChanges();
  }
  )

  it('should create an instance', () => {
    const mockElemementRef = new ElementRef(document.createElement('img'));
    const directive = new ImgBrokenDirective(mockElemementRef);
    expect(directive).toBeTruthy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

it('should set fallback image on error', () => {
    const imgElement : HTMLImageElement = fixture.nativeElement.querySelector('img.imagebroke')
    const customFallback = 'assets/images/custom-fallback.png';
    component.appImgBroken = customFallback;
    fixture.detectChanges();
    const directive = fixture.debugElement.query(element =>element.nativeElement == imgElement)?.injector.get(ImgBrokenDirective)
    directive?.handleError();

    expect(imgElement.src).toContain(customFallback);

  });

});
