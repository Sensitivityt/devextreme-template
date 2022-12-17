import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  dataSource: CmsPersonalInfo[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<CmsPersonal>('https://bma-oss.demotoday.net/e-form/api/CmsPersonal/officer?OfficerFlag=True')
      .subscribe(response => {
        this.dataSource = response.Value;
      });
  }
}

export interface CmsPersonal {
  IsSuccess: boolean;
  StatusCode: number;
  Message: string;
  StatusDateTime: string;
  Value: CmsPersonalInfo[];
}

export interface CmsPersonalInfo{
  PERSONAL_ID: number,
  PERSONAL_FULL_NAME:string;
}