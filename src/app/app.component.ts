import { Component } from '@angular/core';
import { OrganizationSearchService } from './services/organization-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public searchString: string = 'octokit';

  constructor(
    private organizationSearchService: OrganizationSearchService,
  ) {}

  public search(): void {
    console.log("search clicked");
    this.organizationSearchService.searchOrganizationRepositories(this.searchString);
  }
}
