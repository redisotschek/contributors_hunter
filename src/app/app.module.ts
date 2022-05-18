import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CartComponent } from './cart/cart.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    NzModalModule,
    NzTableModule,
    NzSpinModule,
    NzIconModule,
    NzAvatarModule,
    NzEmptyModule,
    NzBadgeModule,
    NzPopoverModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
