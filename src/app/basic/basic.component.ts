import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})

export class BasicComponent implements OnInit {

  public constructor(
    public appService: AppService,
    public fb: FormBuilder,
    public router: Router,
  ) { }

  /**
   * Daftar rules untuk validasi
   */
  public basicFormValidations = this.fb.group({
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

  public controls: {[key: string]: AbstractControl} = this.basicFormValidations.controls;
  public name: AbstractControl = this.basicFormValidations.get('name');
  public email: AbstractControl = this.basicFormValidations.get('email');
  public gender: AbstractControl = this.basicFormValidations.get('gender');
  public dob: AbstractControl = this.basicFormValidations.get('dob');

  /**
   * Computed untuk validasi nama
   *
   * @return `errors`
   */
  public get nameErrors(): string[] {
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

  /**
   * Computed untuk validasi e-mail
   *
   * @return `errors`
   */
  public get emailErrors(): string[] {
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

  /**
   * Computed untuk validasi gender
   *
   * @return `errors`
   */
  public get genderErrors(): string[] {
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

  /**
   * Computed untuk validasi tanggal lahir
   *
   * @return `errors`
   */
  public get dobErrors(): string[] {
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

  /**
   * Lifecycle Angular
   *
   * @listens `getProfile()`
   */
  public ngOnInit(): void {
    this.getProfile();
  }

  /**
   * Method untuk mendapatkan data profile
   *
   * @listens `appService.getProfile()`
   * @todo    Mendapatkan data profile dari Service.
   */
  public getProfile(): void {
    this
      .appService
      .getProfile()
      .subscribe(
        (profile) => {
          this.controls.dob.setValue(profile.dob);
          this.controls.email.setValue(profile.email);
          this.controls.gender.setValue(profile.gender);
          this.controls.name.setValue(profile.name);
        }
      );
  }

  /**
   * Method untuk menyimpan data profile
   *
   * @listens `appService.saveProfile()`
   * @todo    Validasi form.
   * @todo    Simpan data profile ke Service.
   */
  public saveProfile(): void {
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
