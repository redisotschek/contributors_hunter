import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NzModalService } from "ng-zorro-antd/modal";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let nzModalService: NzModalService;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ AppComponent ],
        imports: [AppModule, NoopAnimationsModule ],
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  
      nzModalService = TestBed.inject(NzModalService);
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should show find disabled search button when searchString empty', () => {
      component.searchString = '';
      fixture.detectChanges();
      
      const searchButton = fixture.debugElement.query(By.css('.search-button'));
      expect(searchButton.attributes['disabled']).toBeTruthy();
    });
  });