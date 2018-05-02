import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DomainComponent} from './domain/domain.component';
import {LogComponent} from './log/log.component';
import {MenuComponent} from './menu/menu.component';
import {OrgComponent} from './org/org.component';
import {ServiceComponent} from './service/service.component';
import {SpaceComponent} from './space/space.component';
import {UsageComponent} from './usage/usage.component';
import {UserComponent} from './user/user.component';
import {WebIdeUserComponent} from './web-ide-user/web-ide-user.component';
import {CfAppComponent} from './cf-app/cf-app.component';
import {IndexComponent} from './index/index.component';
import {RoutingModule} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {TopComponent} from './layout/top/top.component';
import {NavComponent} from './layout/nav/nav.component';
import {BottonComponent} from './layout/botton/botton.component';
import {LeftComponent} from './layout/left/left.component';
import {FormsModule} from '@angular/forms';

import {UaaSecurityService} from './auth/uaa-security.service';
import {CallbackComponent} from './callback/callback.component';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {LogoutComponent} from './logout/logout.component';

import {DashboardService} from './dashboard/dashboard.service';
import {JsonpModule} from '@angular/http';
import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';
import {CommonService} from './common/common.service';

import {DashModule} from './dash/dash.module';
import {OrgInnerComponent} from './org/org-inner/org-inner.component';
import {UsermgmtComponent} from './usermgmt/usermgmt.component';
import {UsermgmtService} from './usermgmt/usermgmt.service';
import {OrgService} from './org/org.service';
import {LoginComponent} from './login/login.component';
import {OrgQuotaService} from './org/org-quota.service';
import {SpaceService} from './space/space.service';
import {CatalogModule} from "./catalog/catalog.module";


@NgModule({
  declarations: [
    AppComponent,
    CfAppComponent,
    DashboardComponent,
    DomainComponent,
    LogComponent,
    MenuComponent,
    OrgComponent,
    OrgInnerComponent,
    ServiceComponent,
    SpaceComponent,
    UsageComponent,
    UserComponent,
    WebIdeUserComponent,
    IndexComponent,
    TopComponent,
    NavComponent,
    BottonComponent,
    LeftComponent,
    CallbackComponent,
    LogoutComponent,
    UsermgmtComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    FormsModule,
    CatalogModule,
    RoutingModule,
    HttpClientModule,
    DashModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.doubleBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#408c93',
      secondaryColour: '#408c93',
      tertiaryColour: '#408c93'
    }),
    LoggerModule.forRoot({
      serverLoggingUrl: '/ps/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }), JsonpModule
  ],
  providers: [
    CommonService,
    UaaSecurityService,
    DashboardService,
    UsermgmtService,
    OrgService,
    SpaceService,
    OrgQuotaService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
