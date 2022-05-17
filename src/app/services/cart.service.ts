import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contributor } from '../model/octokit-responses';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private currentCart: Contributor[] = [];
  private cart: Subject<Contributor[]> = new Subject();
  public cart$: Observable<Contributor[]> = this.cart.asObservable();

  constructor() { }

  public addToCart(contributor: Contributor): void {
    this.currentCart.push(contributor);
    this.cart.next([...new Set(this.currentCart)]);
  }
}
