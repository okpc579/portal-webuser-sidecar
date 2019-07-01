import {Injectable} from '@angular/core';
import {CommonService} from "../../common/common.service";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {HttpHeaders} from "@angular/common/http";


declare var require: any;
let appConfig = require('assets/resources/env/config.json');

@Injectable()
export class ExternalcommonService {

  apiversion = appConfig['apiversion'];

  constructor(private commonService: CommonService, public log: NGXLogger) {
  }


  getUserTokenInfo(userId: string, token: string, seq) {
    return this.commonService.doGet('/commonapi/v2/users/' + userId + '/search/refreshtoken?refreshToken=' + token + "&seq="+ seq,  '');
  }


  reset(param) {
    return this.commonService.doPost('/portalapi/' + this.apiversion + '/users/password/reset', param, '');
  }


  reset_external(url, authorization, param : any) {
    return this.commonService.doPostMulti(url + '/portalapi/' + this.apiversion + '/users/password/reset',authorization, param, '');
  }


  updateInfo(userId: string, param) {
    return this.commonService
      .doPut('/commonapi/v2/user/' + userId,  param, '').map((res: Response) => {
        return res['result'];
      }).subscribe();
  }


  createUser_external(url, authorization, param : any) {
    return this.commonService.doPostMulti(url + '/portalapi/' + this.apiversion + '/users', authorization,  param, '');

  }

}
