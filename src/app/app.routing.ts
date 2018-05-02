import {IndexComponent} from './index/index.component';
import {RouterModule, Routes} from '@angular/router';
import {CfAppComponent} from './cf-app/cf-app.component';
import {CatalogComponent} from './catalog/main/catalog.component';
import {DomainComponent} from './domain/domain.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WebIdeUserComponent} from './web-ide-user/web-ide-user.component';
import {UserComponent} from './user/user.component';
import {UsageComponent} from './usage/usage.component';
import {SpaceComponent} from './space/space.component';
import {ServiceComponent} from './service/service.component';
import { OrgMainComponent } from './org/org-main/org-main.component';
import {MenuComponent} from './menu/menu.component';
import {LogComponent} from './log/log.component';
import {ModuleWithProviders} from '@angular/core';
import {CallbackComponent} from './callback/callback.component';
import {LogoutComponent} from './logout/logout.component';
import {DashMainComponent} from './dash/dash-main/dash-main.component';
import {AppMainComponent} from './dash/app-main/app-main.component';
import {UsermgmtComponent} from './usermgmt/usermgmt.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {CatalogDetailComponent} from "./catalog/catalog-detail/catalog-detail.component";
import {DashboardSpaceComponent} from './dashboard/dashboard-space/dashboard-space.component';
import {DashboardProduceComponent} from './dashboard/dashboard-produce/dashboard-produce.component';

/*
* Route 모듈 설정
*/

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'app', component: CfAppComponent, canActivate: [AuthGuard]},
  {path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'domain', component: DomainComponent, canActivate: [AuthGuard]},
  {path: 'log', component: LogComponent, canActivate: [AuthGuard]},
  {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'org', component: OrgMainComponent, canActivate: [AuthGuard]},
  {path: 'service', component: ServiceComponent, canActivate: [AuthGuard]},
  {path: 'space', component: SpaceComponent, canActivate: [AuthGuard]},
  {path: 'usage', component: UsageComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'usermgmt', component: UsermgmtComponent, canActivate: [AuthGuard]},
  {path: 'webideuser', component: WebIdeUserComponent, canActivate: [AuthGuard]},
  {path: 'catalogdetail/:id', component: CatalogDetailComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  {path: 'dashMain', component: DashMainComponent, canActivate: [AuthGuard]},
  {path: 'appMain', component: AppMainComponent, canActivate: [AuthGuard]}
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);



