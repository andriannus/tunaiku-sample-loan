import { MobxAngularModule } from 'mobx-angular';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app.service';
import { BasicComponent } from './basic/basic.component';
import { FormComponent } from './form/form.component';
import { KtpComponent } from './ktp/ktp.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    FormComponent,
    KtpComponent,
    NotFoundComponent,
    ProfileComponent,
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
