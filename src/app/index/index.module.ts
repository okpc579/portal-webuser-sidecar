import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResetpasswdComponent} from './resetpasswd/resetpasswd.component';
import {CreateuserComponent} from "./createuser/createuser.component";
import {RoutingModule} from "../app.routing";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login/login.service";
import {IndexComponent} from "./index.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CreateuserService} from "./createuser/createuser.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
  ],
  declarations: [
    IndexComponent,
    LoginComponent,
    CreateuserComponent,
    ResetpasswdComponent
  ],
  providers: [LoginService, CreateuserService]
})
export class IndexModule {
}
