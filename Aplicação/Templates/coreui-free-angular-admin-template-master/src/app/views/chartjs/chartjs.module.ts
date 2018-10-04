import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import {CommonModule} from '@angular/common';
@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    CommonModule
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
