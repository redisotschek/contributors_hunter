import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationSearchService {
  private organization: Subject<string> = new Subject();
  public organization$: Observable<string> = this.organization.asObservable();

  constructor() { }

  public searchOrganizationRepositories(searchString: string): void {
    this.organization.next(searchString);
  }
}
