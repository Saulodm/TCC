import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
