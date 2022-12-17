import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvinceListComponent implements OnInit {
  dataSource: CmsProvinceInfo[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<CmsProvince>('https://bma-oss.demotoday.net/e-form/api/CmsProvince?RecordStatus=false')
      .subscribe(response => {
        this.dataSource = response.Value;
      });
  }

  GetStatus(Status: CmsProvinceInfo) {
    let data;
    if (Status.RECORD_STATUS === "A") {
      data = "ใช้งาน";
    } else if (Status.RECORD_STATUS === "I") { data = "ไม่ใช้งาน"; }
    return data;
  }

  Edit(e: any) {
    console.log(e.data);
  }

  Delete(e: any) {
    console.log(e.data);
  }
}

export interface CmsProvince {
  IsSuccess: boolean;
  StatusCode: number;
  Message: string;
  StatusDateTime: string;
  Value: CmsProvinceInfo[];
}

export interface CmsProvinceInfo {
  PROVINCE_ID: number,
  PROVINCE_NAME_THA: string;
  PROVINCE_NAME_ENG: string;
  RECORD_STATUS: string;
}