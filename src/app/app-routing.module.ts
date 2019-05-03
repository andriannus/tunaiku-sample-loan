import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { BasicComponent } from './basic/basic.component';
import { KtpComponent } from './ktp/ktp.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
  },
  {
    path: 'step/1',
    component: BasicComponent,
  },
  {
    path: 'step/2',
    component: KtpComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
