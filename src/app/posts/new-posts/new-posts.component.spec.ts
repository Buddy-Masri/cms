import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostsComponent } from './new-posts.component';

describe('NewPostsComponent', () => {
  let component: NewPostsComponent;
  let fixture: ComponentFixture<NewPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPostsComponent]
    });
    fixture = TestBed.createComponent(NewPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
