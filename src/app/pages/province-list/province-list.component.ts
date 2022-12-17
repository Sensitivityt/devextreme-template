import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvinceListComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form!: DxFormComponent;
  dataSource: CmsProvinceInfo[] = [];
  radioActive: any = [{ id: "A", text: "ใช้งาน" }, { id: "I", text: "ไม่ใช้งาน" }];
  province = {};
  popupVisible = false;
  _idEdit: number = 0;
  statusFlag  = "A";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
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
    this._idEdit = e.data.PROVINCE_ID;
    this.statusFlag = e.data.RECORD_STATUS;
    this.province = e.data;
    this.popupVisible = true;
  }

  save() {
    if (!this.form.instance.validate().isValid) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      }).then(() => { });
      return;
    }

    this.http.put("https://bma-oss.demotoday.net/e-form/api/CmsProvince/"+ this._idEdit.toString(), this.province)
      .subscribe(() => {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'แก้ไขข้อมูลเรียบร้อย',
          icon: 'warning',
          confirmButtonText: 'ตกลง'
        }).then(() => {
        });
        this.loadData();
      });
  }

  Delete(e: any) {
    Swal.fire({
      title: '<strong>แจ้งเตือน</strong>',
      html:
        'คุณต้องการลบจังหวัด ' + e.data.PROVINCE_NAME_THA + ' ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2ecc71',
      cancelButtonColor: '#e74c3c',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put("https://bma-oss.demotoday.net/e-form/api/CmsProvince/" + e.data.PROVINCE_ID.toString(),
          {
            "DEL_FLAG": "Y"
          })
          .subscribe(() => {
            Swal.fire({
              title: 'สำเร็จ!',
              text: 'ลบข้อมูลเรียบร้อย',
              icon: 'success',
              confirmButtonText: 'ตกลง'
            }).then(() => {
              this.loadData();
            });
          });
      }
    });
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