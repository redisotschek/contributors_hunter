import { TestBed } from '@angular/core/testing';
import { OrganizationSearchService } from './organization-search.service';

describe('OrganizationSearchService', () => {
  let service: OrganizationSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit search string', () => {
    const searchStringMock = "gamarjoba";
    const searchStringSpy = jest.fn();
    service.organizationSearchString$.subscribe(searchStringSpy);
    service.searchOrganization(searchStringMock);
    
    expect(searchStringSpy).toBeCalledWith(searchStringMock);
  });
});
