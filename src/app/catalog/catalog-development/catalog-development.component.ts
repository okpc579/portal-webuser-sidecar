import { Component, OnInit } from '@angular/core';
import {NGXLogger} from "ngx-logger";
import {BuildPack, CatalogService} from "../main/catalog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CATALOGURLConstant} from "../common/catalog.constant";
import {Space} from "../../model/space";
import {Organization} from "../../model/organization";
import {cataloghistroy} from "../model/cataloghistory";
import {CatalogComponent} from "../main/catalog.component";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {isNullOrUndefined, isUndefined} from "util";
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-catalog-development',
  templateUrl: './catalog-development.component.html',
  styleUrls: ['./catalog-development.component.css']
})
export class CatalogDevelopmentComponent implements OnInit {
  catalogcontans = CATALOGURLConstant;
  translateEntities : any;
  namecheck : number = 0;
  routecheck : number = 0;

  orgname : string;
  spacename : string;

  appnames : Array<string>;
  hostnames : Array<string>;

  org : Organization; // 선택한 조직정보
  space : Space; // 선택한 공간정보
  orgs: Array<Organization> = new Array<Organization>(); // 조직 정보 리스트
  spaces: Array<Space> = new Array<Space>(); // 공간 정보 리스트

  sharedomain : any;
  currentdomain : any;
  domainList : Array<any>;
  buildpack : BuildPack; //빌드팩 정보
  appname: string = ''; //앱 이름
  hostname : string;
  appurl: string =''; // 앱URL
  memory: number; // 메모리
  disk: number; // 디스크
  appStart : boolean = true; // 앱 시작 여부

  constructor(private translate: TranslateService,private router : Router, private route: ActivatedRoute, private catalogService: CatalogService, private log: NGXLogger) {
    this.catalogService.isLoading(false);
    this.translate.get('catalog').subscribe((res: string) => {
      this.translateEntities = res;
      console.log(this.translateEntities);
    });
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEntities = event.translations.catalog;
    });
  }

  ngOnInit() {
    this.domainList = new Array<any>();
    $('#nav_first').attr('class','');
    $('#nav_second').attr('class','');
    $('#nav_third ').attr('class','cur');
    $('#nav_fourth').attr('class','');
    this.activatedRouteInit();
    this.shareDomainInit();
    this.buildInit();
    this.getRoutes();
    this.orgsFrist();
    this.spacesFrist();
    this.orgsInit();
    this.doLayout();
    this.memory = 256;
    this.disk = 512;
  }

  errorMsg(value : any){
    this.catalogService.alertMessage(value, false);
    this.catalogService.isLoading(false);
  }

  successMsg(value : any){
    this.catalogService.alertMessage(value, true);
    this.catalogService.isLoading(false);
  }

  doLayout() {
    $(document).ready(() => {
      //TODO 임시로...
      $.getScript("../../assets/resources/js/common2.js")
        .done(function (script, textStatus) {
          //console.log( textStatus );
        })
        .fail(function (jqxhr, settings, exception) {
          console.log(exception);
        });
    });
  }

  activatedRouteInit(){
    const orgname = this.catalogService.getOrgName();
    if(orgname !== null){
      this.catalogService.getOrgPrivateDomain('/portalapi/v2/'+this.catalogService.getOrgGuid()+'/domains').subscribe(data =>{
        data.resources.forEach(domain => {
          this.domainList.push(domain);
        });
      },error => {
        this.errorMsg(error);
      });
    }
    const spacename = this.catalogService.getSpaceName();
    console.log(orgname, spacename);
    orgname == null ? this.orgname = CATALOGURLConstant.OPTIONORG : this.orgname = orgname;
    spacename == null ? (this.spacename = CATALOGURLConstant.OPTIONSPACE) : (this.spacename = spacename);
  }

  shareDomainInit(){
    this.catalogService.getDomain().subscribe(data => {
      this.sharedomain = data['resources'][0];
      this.currentdomain = this.sharedomain;
      this.domainList.unshift(this.sharedomain);
    });
  }

  privateDomainInit(value){
    this.catalogService.getOrgPrivateDomain('/portalapi/v2/'+value+'/domains').subscribe(data =>{
      this.domainList = new Array<any>();
      this.domainList.unshift(this.sharedomain);
      this.currentdomain = this.sharedomain;
      data.resources.forEach(domain => {
        this.domainList.push(domain);
      });
    },error => {
      this.errorMsg(error);
    });
  }

  buildInit() {
    if(!isUndefined(this.catalogService.getCurrentCatalogNumber())){
    this.catalogService.getBuildPacks(CATALOGURLConstant.GETBUILDPACKS+'/'+this.catalogService.getCurrentCatalogNumber()).subscribe(data => {
      this.buildpack =  data['list'][0];
    },error => {
      this.router.navigate(['catalog']);
    });
    }
  }

  getRoutes(){
    this.hostnames = new Array<string>();
    this.catalogService.getRoutes(CATALOGURLConstant.GETLISTROUTE).subscribe(data => {
      data.forEach(route => {
        this.hostnames.push(route['host']);
      });
      this.catalogService.isLoading(false);
    },error => {
      this.errorMsg(error);
    });
  }

  getAppNames(){
    this.catalogService.getAppNames(CATALOGURLConstant.GETLISTAPP+this.org.guid+'/'+this.space.guid).subscribe(data => {
      this.appnames = new Array<string>();
      data['resources'].forEach(res => {
        this.appnames.push(res['entity']['name']);
      });
      this.checkAppName();
      this.catalogService.isLoading(false);
    },error => {
      this.errorMsg(error);
    });
  }

  orgsFrist(){
    this.org = new Organization(null, null);
    this.org.name = CATALOGURLConstant.OPTIONORG;
    this.orgs.push(this.org);
  }

  spacesFrist(){
    this.space = new Space(null, null, null);
    this.space.name = CATALOGURLConstant.OPTIONSPACE;
    this.spaces.push(this.space);
  }


  orgsInit(){
    this.catalogService.getOrglist().subscribe(data => {
      data['resources'].forEach(res => {
        const _org = new Organization(res['metadata'], res['entity']);
        this.orgs.push(_org);
        if(_org.name === this.orgname){
          this.org = _org;
        }
      });
        this.catalogService.getSpacelist(this.org.guid).subscribe(data => {
          data['spaceList']['resources'].forEach(res => {
            const _space = new Space(res['metadata'], res['entity'], null);
            this.spaces.push(_space);
            if(_space.name === this.spacename){
              this.space = _space;
              this.getAppNames();
            } });
        },error => {
          this.errorMsg(error);
        });
    },error => {
      this.errorMsg(error);
    });
  }


  orgSelect() {
    this.catalogService.isLoading(true);
    this.catalogService.setCurrentOrg(this.org.name, this.org.guid);
    this.catalogService.setCurrentSpace(null, null);
    this.spaces = new Array<Space>();
    this.spacesFrist();
    this.privateDomainInit(this.org.guid);
    this.catalogService.getSpacelist(this.org.guid).subscribe(data => {

      data['spaceList']['resources'].forEach(res => {
        this.spaces.push(new Space(res['metadata'], res['entity'], null));
      });
      this.catalogService.isLoading(false);
    },error => {
      this.errorMsg(error);
    });
  }

  spaceSelect(){
    this.catalogService.isLoading(true);
    this.catalogService.setCurrentSpace(this.space.name, this.space.guid);
    this.getAppNames();
  }

  checkAppName() {
    this.pattenTest();
    if(this.appname.length < 64){
      $('#routename').val(this.appname);
    }
    this.nameCheck();
    this.checkHostName();
  }

  checkHostName(){
    this.routepattenTest();
    this.routeCheck();
  }

  pattenTest(){
    const regExpPattern = /[\{\}\[\]\/?,;:|\)*~`!^+<>\#$%&\\\=\(\'\"]/gi;
    const regExpBlankPattern = /[\s]/g;
    const regKoreanPatten = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    $('#orgname').val($('#orgname').val().replace(regExpPattern, '')
      .replace(regExpBlankPattern, '')
      .replace(regKoreanPatten, ''));
    this.appname =$('#orgname').val();
  }
  routepattenTest(){
    const regExpPattern = /[\@\{\}\[\]\/?.,;:|\)*~`!^+<>\#$%&\\\=\(\'\"]/gi;
    const regExpBlankPattern = /[\s]/g;
    const regKoreanPatten = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    $('#routename').val($('#routename').val().replace(regExpPattern, '')
      .replace(regExpBlankPattern, '')
      .replace(regKoreanPatten, ''));
    this.appurl =$('#routename').val();
  }

  createApp() {
    this.catalogService.isLoading(true);
    var encodename = encodeURI(this.appname);
    this.catalogService.getNameCheck(CATALOGURLConstant.NAMECHECK+this.appname+'/?orgid='+this.org.guid+'&spaceid='+this.space.guid).subscribe(data => {
      this.catalogService.getRouteCheck(CATALOGURLConstant.ROUTECHECK+this.appurl).subscribe(data => {
        if(data['RESULT']===CATALOGURLConstant.SUCCESS) {
          let appSampleFilePath = this.buildpack['appSampleFilePath'];
          if(appSampleFilePath ==='' || appSampleFilePath === null)
            appSampleFilePath = 'N';
          let params = {
            appSampleStartYn : this.appStart ? 'Y' : 'N',
            appSampleFileName: this.buildpack['appSampleFileName'],
            spaceId: this.space.guid,
            spaceName: this.space.name,
            orgName: this.org.name,
            appName: this.appname,
            name : this.appname,
            hostName: this.appurl,
            domainId: this.currentdomain.metadata.guid,
            memorySize : this.memory,
            diskSize : this.disk,
            buildPackName: this.buildpack['buildPackName'],
            appSampleFilePath : appSampleFilePath,
            catalogType : CATALOGURLConstant.BUILDPACK,
            catalogNo : this.buildpack.no,
            userId : this.catalogService.getUserid()
          };
          this.catalogService.postApp(CATALOGURLConstant.CREATEAPP, params).subscribe(data => {
            this.successMsg(this.translateEntities.result.buildPackSusses);
            this.router.navigate(['dashboard']);
          }, error =>{
            this.errorMsg(this.translateEntities.result.buildPackError);
          });
        }
        else if (data['RESULT']===CATALOGURLConstant.FAIL){
          this.errorMsg(this.translateEntities.result.routeNameError);
          this.getRoutes();
          this.routecheck = CATALOGURLConstant.NO;
        }
      }, error => {
        this.errorMsg(this.translateEntities.result.routeNameError);
        this.getRoutes();
        this.routecheck = CATALOGURLConstant.NO;
      });
    }, error => {
      this.errorMsg(this.translateEntities.result.appNameError);
      this.getAppNames();
      this.namecheck = CATALOGURLConstant.NO;
    });

  }

  nameCheck() {
    this.namecheck = CATALOGURLConstant.OK;
    if(!isNullOrUndefined(this.appnames)){
    this.appnames.forEach(name => {
      if(name === this.appname){
        this.namecheck = CATALOGURLConstant.NO;
        return;
      }
    });
    }
  }

  routeCheck(){
    console.log(this.appurl);
    this.routecheck = CATALOGURLConstant.OK;
    this.hostnames.forEach(host => {
      if(host === this.appurl){
        this.routecheck = CATALOGURLConstant.NO;
        return;
      }
    });
  }
}
