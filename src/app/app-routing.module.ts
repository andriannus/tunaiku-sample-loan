import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { FormComponent } from './form/form.component';
import { KtpComponent } from './ktp/ktp.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'step/1',
    component: BasicComponent
  },
  {
    path: 'step/2',
    component: KtpComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
