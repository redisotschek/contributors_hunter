import { TestBed } from '@angular/core/testing';
import { contributorMock } from '../test/mocks/mocks';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit current cart after adding new contributor', () => {
    const cartSpy = jest.fn();
    service.cart$.subscribe(cartSpy);
    service.addToCart(contributorMock);
    expect(cartSpy).toBeCalledTimes(1);
    expect(cartSpy).toBeCalledWith([contributorMock]);
  });

  it('should not emit current cart after adding duplicate contributor', () => {
    const cartSpy = jest.fn();
    service.cart$.subscribe(cartSpy);
    service.addToCart(contributorMock);
    expect(cartSpy).toBeCalledTimes(1);
    expect(cartSpy).toBeCalledWith([contributorMock]);

    service.addToCart(contributorMock);
    expect(cartSpy).toBeCalledTimes(1);
  });
});
