import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { OrganizationSearchService } from './services/organization-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public searchString: string = '';
  public privateToken: string = '';
  public authToken: string = '';

  constructor(
    private organizationSearchService: OrganizationSearchService,
    private apiService: ApiService,
  ) {}

  public search(): void {
    this.organizationSearchService.searchOrganizationRepositories(this.searchString);
  }

  public authenticate(): void {
    const res: any = this.apiService.authenticate(this.privateToken);
    console.log(res);
  }
}
