import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationSearchService {
  private organizationSearchString: Subject<string> = new Subject();

  public organizationSearchString$: Observable<string> = this.organizationSearchString.asObservable();

  public searchOrganization(searchString: string): void {
    this.organizationSearchString.next(searchString);
  }
}
