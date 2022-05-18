import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { Contributor } from '../model/octokit-responses';
import { contributorMock } from '../test/mocks/mocks'
import { Subject } from 'rxjs';
import { CartService } from '../services/cart.service';

import { CartComponent } from './cart.component';

import { AppModule } from '../app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const cart$: Subject<Contributor[]> = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ AppModule, NoopAnimationsModule ],
      providers: [
        MockProvider(CartService, {
          cart$,
        }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show cart when it\'s empty', () => {
    expect(fixture.debugElement.query(By.css('.cart-button'))).toBeNull();
  });

  it('should show cart when it\'s not empty', () => {
    cart$.next([contributorMock]);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.cart-button'))).toBeTruthy();
  });

  it('should show correct badge number', () => {
    cart$.next([contributorMock]);
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.ant-badge-count'));
    expect(badge).toBeTruthy();
    expect(badge.attributes['title']).toEqual('1');

    cart$.next([contributorMock, contributorMock]);
    fixture.detectChanges();
    
    expect(badge.attributes['title']).toEqual('2');
  });
});
