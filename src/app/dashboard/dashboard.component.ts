import { Component, OnDestroy } from '@angular/core';
import { catchError, EMPTY, Subscription, switchMap, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { OrganizationSearchService } from '../services/organization-search.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Contributor, Repository } from '../model/octokit-responses';
import { CartService } from '../services/cart.service';

const enum SearchMode {
  repositories = "repositories",
  contributors = "contributors",
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  public repositories: Repository[] | null = null;
  public contributors: Contributor[] | null = null;;
  public isLoading: boolean = false;
  public currentSearchMode: SearchMode | null = null;
  public currentRepository?: Repository;

  public currentCart: Contributor[] = [];

  public cartVisible: boolean = false;

  public get isRepositoriesMode(): boolean {
    return this.currentSearchMode === SearchMode.repositories;
  }

  private subscription: Subscription = new Subscription();

  constructor(
    private organizationSearchService: OrganizationSearchService,
    private cartService: CartService,
    private apiService: ApiService,
    private modal: NzModalService,
  ) { 
    this.subscription.add(
      this.organizationSearchService.organization$.pipe(
        tap(() => {
          this.isLoading = true;
          this.currentSearchMode = SearchMode.repositories;
          this.repositories = null; 
          this.contributors = null;
        }),
        switchMap(searchString => this.apiService.getOrganization(searchString).pipe(
          catchError(error => {
            this.isLoading = false;
            this.showErrorModal(error.status === 404 ? 'Organization not found' : error); 
            this.currentSearchMode = null;
            return EMPTY;
          }),
        )),
        switchMap(organization => this.apiService.getRepositories(organization.login)),
      ).subscribe(repositories => {
        this.repositories = repositories;
        this.isLoading = false;
      }),
    )
    this.subscription.add(
      this.cartService.cart$.subscribe(cart => {
        this.currentCart = cart;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public searchContributors(repository: Repository): void {
    this.currentRepository = repository;

    this.apiService.getContributors(repository).subscribe(contributors => {
      this.currentSearchMode = SearchMode.contributors;
      this.contributors = contributors;
    });
  }

  public back(): void {
    this.currentSearchMode = SearchMode.repositories;
    this.contributors = null;
  }

  public addToCart(contributor: Contributor): void {
    console.log(contributor)
    this.cartService.addToCart(contributor);
  }

  public cartPopover(): void {
    this.cartVisible = false;
  }

  private showErrorModal(error: string): void {
    this.modal.error({
      nzTitle: error,
      nzCentered: true,
    });
  }

}
