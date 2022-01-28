import {Component, DoCheck, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {IndexCommonService} from '../userAccountMgmt/index-common.service';
import {CommonService} from '../../common/common.service';
import {User, UsermgmtService} from '../../usermgmt/usermgmt.service';
import {Observable} from 'rxjs';
import {error} from 'util';
import {forEach} from '@angular/router/src/utils/collection';
import {CATALOGURLConstant} from '../../catalog/common/catalog.constant';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit, DoCheck {

  public user: Observable<User>;

  public email: string;
  public isValidation: boolean;
  public isUsed: boolean;
  public isSendEmail: boolean;

  constructor(public indexCommonService: IndexCommonService, private common: CommonService, private usermgmtService: UsermgmtService, private router: Router, private log: NGXLogger) {
    this.email = '';
    this.isValidation = true;
    this.isUsed = false;

    if(this.common.getSeq() == null || this.common.getSeq() === ''){
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
  }

  ngDoCheck() {

    if (this.isSendEmail != this.indexCommonService.isSendEmail) {
      this.isSendEmail = this.indexCommonService.isSendEmail;
    }
    if (this.isUsed != this.indexCommonService.isUsed) {
      this.isUsed = this.indexCommonService.isUsed;
    }

    if (this.isSendEmail) {
      this.isSendEmail = false;
      this.indexCommonService.alertMessage('Mail sent successfully.', true);
      this.router.navigate(['/']);
    }
  }


  checkValidation() {
    this.isValidation = this.indexCommonService.checkValidation(this.email);
  }

  checkUser() {
    if (!this.isValidation) {
      let usedCount = 0;     //userId 개수 확인
      let forEachCount = 0;  //apiUrl 개수 확인
      this.common.getInfrasAll().subscribe(data => {
        let size = data.length;
        data.forEach(data => {
          let result = data['apiUri'];
          this.usermgmtService.userInfoAll(result, data['authorization']).subscribe(data2 => {
            forEachCount++;
            this.common.isLoading = false;
            let infoEnv = data2.userInfo;
            infoEnv.forEach(infoEnv => {
              let userName = infoEnv['userName'];
              if (this.email == userName) {
                usedCount++;
              }
            });

            if (forEachCount == size) {
              if (usedCount == 0) {
                this.multiUsedCreate();
              }
              if (usedCount == 1) {
                this.common.alertMessage('Please create a different account.', false);
              }
              if (usedCount == size) {
                this.common.alertMessage('User information exists.', false);
              }
            }
          }, error => {
            this.common.alertMessage('A system error has occurred. Please try again. ', false);
          });
        });
      }, error => {
        this.common.alertMessage('A system error has occurred. Please try again. ', false);
      });
    }
  }


  multiUsedCreate() {
    if (!this.isValidation) {
      this.common.getInfra(this.common.getSeq()).subscribe(infra => {
        this.indexCommonService.sendCreateEmail(infra['apiUri'], infra['authorization'], this.email);
      });
    }
  }

}


