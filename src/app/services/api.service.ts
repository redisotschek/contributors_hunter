import { Injectable } from '@angular/core';
import { Observable, of, from, throwError, map, take } from 'rxjs';
import { Octokit } from '@octokit/core';
import { Organization, Repository, Contributor } from '../model/octokit-responses';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private octokit: Octokit = new Octokit();

  constructor() { }

  public getOrganization(searchString: string): Observable<Organization> {
    return from(this.octokit.request(`GET /orgs/${searchString}`, {
      org: 'ORG'
    })).pipe(
      take(1),
      map(response => response.data)
    );
  }

  public getRepositories(organization: string): Observable<Repository[]> {
    return from(this.octokit.request(`GET /orgs/${organization}/repos`, {
      org: 'ORG'
    })).pipe(
      take(1),
      map(response => response.data)
    );
  }

  public getContributors(repository: Repository): Observable<Contributor[]> {
    return from(this.octokit.request(`GET ${ repository.contributors_url }`, {
      org: 'ORG'
    })).pipe(
      take(1),
      map(response => response.data)
    );
  }
}
