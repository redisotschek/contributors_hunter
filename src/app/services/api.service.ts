import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Octokit } from '@octokit/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private octokit: Octokit | null = null;

  constructor() { }

  public authenticate(privateToken: string): void {
    this.octokit = new Octokit({
      auth: privateToken,
    })
  }

  public getOrganization(searchString: string): Observable<any> {
    if (!this.octokit) return of(null);
    return from(this.octokit.request(`GET /orgs/${searchString}`, {
      org: 'ORG'
    }))
  }
  public getRepositories(organization: string): Observable<any> {
    if (!this.octokit) return of([null]);
    return from(this.octokit.request(`GET /orgs/${organization}/repos`, {
      org: 'ORG'
    }))
  }
}
