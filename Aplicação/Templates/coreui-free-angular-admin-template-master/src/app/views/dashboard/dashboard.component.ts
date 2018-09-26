import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import * as ngxbootstrap from 'ngx-bootstrap'

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {

  }

  mostraAlert(){
    alert("funciona!!!");
  }


}
