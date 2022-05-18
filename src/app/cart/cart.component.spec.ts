import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { Subject } from 'rxjs';
import { Contributor } from '../model/octokit-responses';
import { CartService } from '../services/cart.service';

import { CartComponent } from './cart.component';

const contributorMock: Contributor = {
  login: "login",
  avatar_url: "",
  html_url: "",
};
describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const cart$: Subject<Contributor[]> = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
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
    console.log(fixture.debugElement.query(By.css('nz-badge-sup')))
    expect(fixture.debugElement.query(By.css('nz-badge-sup'))).toBeTruthy();
  });
});
