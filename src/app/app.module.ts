import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { BasicComponent } from './basic/basic.component';
import { FormComponent } from './form/form.component';
import { KtpComponent } from './ktp/ktp.component';
import { ResultComponent } from './result/result.component';
import { MobxAngularModule } from 'mobx-angular';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    FormComponent,
    KtpComponent,
    ResultComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatSliderModule,
    MobxAngularModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [
    AppService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
