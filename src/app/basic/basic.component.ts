import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IPinjaman, IProfile } from 'src/interfaces/index';
import { AppService } from '../app.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})

export class BasicComponent implements OnInit {
  private profile = {} as IProfile;
  private pinjaman = {} as IPinjaman;

  public constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.profile = {
      dob: '',
      email: '',
      gender: '',
      name: '',
    };
  }

  private basicFormValidations = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(25),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],
    gender: [
      '',
      Validators.required,
    ],
    dob: [
      '',
      Validators.required,
    ],
  });

  private controls: {[key: string]: AbstractControl} = this.basicFormValidations.controls;
  private name: AbstractControl = this.basicFormValidations.get('name');
  private email: AbstractControl = this.basicFormValidations.get('email');
  private gender: AbstractControl = this.basicFormValidations.get('gender');
  private dob: AbstractControl = this.basicFormValidations.get('dob');

  private get nameErrors(): string[] {
    const name: AbstractControl = this.name;
    const errors: string[] = [];

    if (name.valid === true) {
      return errors;
    }

    if (!!name.errors.required === true) {
      errors.push('Nama lengkap dibutuhkan');
    }

    if (!!name.errors.maxlength === true) {
      errors.push('Maksimal 25 karakter');
    }

    return errors;
  }

  private get emailErrors(): string[] {
    const email: AbstractControl = this.email;
    const errors: string[] = [];

    if (email.valid === true) {
      return errors;
    }

    if (!!email.errors.required === true) {
      errors.push('E-mail dibutuhkan');
    }

    if (!!email.errors.email === true) {
      errors.push('E-mail tidak valid');
    }

    return errors;
  }

  private get genderErrors(): string[] {
    const gender: AbstractControl = this.gender;
    const errors: string[] = [];

    if (gender.valid === true) {
      return errors;
    }

    if (!!gender.errors.required === true) {
      errors.push('Jenis kelamin dibutuhkan');
    }

    return errors;
  }

  private get dobErrors(): string[] {
    const dob: AbstractControl = this.dob;
    const errors: string[] = [];

    if (dob.valid === true) {
      return errors;
    }

    if (!!dob.errors.required === true) {
      errors.push('Tanggal lahir dibutuhkan');
    }

    return errors;
  }

  public ngOnInit(): void {
    this.getPinjaman();
    this.getProfile();
  }

  private getPinjaman(): void {
    this
      .appService
      .getPinjaman()
      .subscribe((pinjaman) => this.pinjaman = pinjaman);
  }

  private getProfile(): void {
    this
      .appService
      .getProfile()
      .subscribe(
        (profile) => {
          this.profile = profile;

          this.controls.dob.setValue(profile.dob);
          this.controls.email.setValue(profile.email);
          this.controls.gender.setValue(profile.gender);
          this.controls.name.setValue(profile.name);
        }
      );
  }

  private saveProfile(): void {
    if (this.basicFormValidations.valid === true) {
      const data = {
        dob: this.controls.dob.value,
        email: this.controls.email.value,
        gender: this.controls.gender.value,
        name: this.controls.name.value,
      };

      this.appService.saveProfile(data);

      this.router.navigateByUrl('/step/2');
    }
  }
}
