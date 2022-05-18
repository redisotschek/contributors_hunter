import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalService } from 'ng-zorro-antd/modal';
import { of, throwError } from 'rxjs';
import { AppModule } from '../app.module';
import { Contributor } from '../model/octokit-responses';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
import { OrganizationSearchService } from '../services/organization-search.service';
import { contributorMock, organizationMock, repositoryMock } from '../test/mocks/mocks';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let cartService: CartService;
  let apiService: ApiService;
  let organizationSearchService: OrganizationSearchService;
  let nzModalService: NzModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ AppModule, NoopAnimationsModule ],
      providers: [
        OrganizationSearchService,
        ApiService,
        CartService,
        NzModalService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cartService = TestBed.inject(CartService);
    apiService = TestBed.inject(ApiService);
    organizationSearchService = TestBed.inject(OrganizationSearchService);
    nzModalService = TestBed.inject(NzModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal and no-search template when organization is not found', () => {
    jest.spyOn(apiService, 'getOrganization').mockImplementation(() => throwError(() => new Error()));
    const modalErrorSpy = jest.spyOn(nzModalService, 'error');
    
    organizationSearchService.searchOrganization('test');
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('nz-empty'))).toBeTruthy();
    expect(modalErrorSpy).toBeCalled();
  });

  it('should show no repositories message', () => {
    jest.spyOn(apiService, 'getOrganization').mockImplementation(() => of(organizationMock));
    jest.spyOn(apiService, 'getRepositories').mockImplementation(() => of([]));
    
    organizationSearchService.searchOrganization('test');
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('.no-repos-message'))).toBeTruthy();
  });

  it('should show found repositories', () => {
    jest.spyOn(apiService, 'getOrganization').mockImplementation(() => of(organizationMock));
    jest.spyOn(apiService, 'getRepositories').mockImplementation(() => of([repositoryMock, repositoryMock]));
    
    organizationSearchService.searchOrganization('test');
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('.repositories-table'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('.repository-row'))).toHaveLength(2);
  });

  it('should open contributors list in table', () => {
    jest.spyOn(apiService, 'getContributors').mockImplementation(() => of([contributorMock, contributorMock, contributorMock]));
    component.searchContributors(repositoryMock);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.contributors-table'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('.contributor-row'))).toHaveLength(3);

  })

  it('should add contributor to card', () => {
    const cartSpy = jest.fn();
    cartService.cart$.subscribe(cartSpy);
    component.addToCart(contributorMock);
    expect(cartSpy).toBeCalledWith([contributorMock]);
  })
});
