import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { OrganizationSearchService } from '../services/organization-search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public isInSearch: boolean = false;
  public repositories: any[] | null = null;

  private subscription: Subscription = new Subscription();

  constructor(
    private organizationSearchService: OrganizationSearchService,
    private apiService: ApiService,
  ) { 
    this.subscription.add(
      this.organizationSearchService.organization$.pipe(
        tap(searchiString => this.isInSearch = !!searchiString),
        switchMap(searchiString => this.apiService.getOrganization(searchiString)),
        tap(organization => console.log('organization: ', organization)),
        switchMap(organization => organization ? this.apiService.getRepositories(organization) : of(null)),
      ).subscribe(repositories => {
        this.repositories = repositories;
      }),
    );
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
