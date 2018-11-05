import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    WidgetsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
