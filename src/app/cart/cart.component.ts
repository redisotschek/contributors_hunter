import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Contributor } from '../model/octokit-responses';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public readonly cart$: Observable<Contributor[]>;

  constructor(
    private cartService: CartService,
  ) {
    this.cart$ = this.cartService.cart$;
  }
}
