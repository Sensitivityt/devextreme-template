import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import Swal from 'sweetalert2';
import { CmsProvinceInfo } from '../province-list/province-list.component';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: true }) form!: DxFormComponent;
  radioActive: any = [{ id: "A", text: "ใช้งาน" }, { id: "I", text: "ไม่ใช้งาน" }];
  public formData!: CmsProvinceInfo;
  province = {};
  _isLoading = false;
  constructor(
    private http: HttpClient,
    private router: Router) {
    this.formData = {} as any;
  }

  ngOnInit(): void {
  }

  click() {
    if (!this.form.instance.validate().isValid) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      }).then(() => { });
      return;
    }

    this._isLoading = true;
    this.http.post("https://bma-oss.demotoday.net/e-form/api/CmsProvince", this.province)
      .subscribe(() => {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'บันทึกข้อมูลเรียบร้อย',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then(() => {
        });
        this._isLoading = false;
      });
  }
}
