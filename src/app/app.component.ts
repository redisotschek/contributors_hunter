import { Component } from '@angular/core';
import { OrganizationSearchService } from './services/organization-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public searchString: string = '';

  public get isButtonDisabled(): boolean {
    return !this.searchString;
  }

  constructor(
    private organizationSearchService: OrganizationSearchService,
  ) {}

  public search(): void {
    if (this.searchString.length) {
      this.organizationSearchService.searchOrganization(this.searchString);
    } 
  }
}
