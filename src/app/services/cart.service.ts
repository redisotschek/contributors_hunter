import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contributor } from '../model/octokit-responses';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private currentCart: Contributor[] = [];
  private cart: Subject<Contributor[]> = new Subject();
  public cart$: Observable<Contributor[]> = this.cart.asObservable();

  public addToCart(newContributor: Contributor): void {
    if (!this.currentCart.find(contributor => contributor.login === newContributor.login)) {
      this.currentCart.push(newContributor);
      this.cart.next(this.currentCart);
    }
  }
}
