import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { IDob } from '../../interfaces/index';

@Component({
  selector: 'app-ktp',
  templateUrl: './ktp.component.html',
  styleUrls: ['./ktp.component.scss']
})

export class KtpComponent implements OnInit {
  private profile = {} as any;
  private dob = {} as IDob;
  private isError = false;

  public constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  private ktpFormValidations = this.fb.group({
    ktp: [
      '',
      [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern('[0-9]*')
      ],
    ],
  });

  private ktp: AbstractControl = this.ktpFormValidations.get('ktp');

  private get ktpErrors(): string[] {
    const ktp: AbstractControl = this.ktp;
    const errors: string[] = [];

    if (ktp.valid === true) {
      return errors;
    }

    if (!!ktp.errors.required === true) {
      errors.push('KTP dibutuhkan');
    }

    if (!!ktp.errors.pattern === true) {
      errors.push('Hanya diperbolehkan angka');
    }

    if (!!ktp.errors.minlength === true) {
      errors.push('Minimal 16 karakter');
    }

    if (!!ktp.errors.maxlength === true) {
      errors.push('Maksimal 16 karakter');
    }

    return errors;
  }

  public ngOnInit(): void {
    this.getProfile();
  }

  private getProfile(): void {
    this
      .appService
      .getProfile()
      .subscribe((profile) => this.profile = profile);

    this.getDob();
  }

  private getDob(): void {
    const dob = this.profile.dob;
    const tempDob = dob.split('-');

    if (this.profile.gender === 'female') {
      const dateString = tempDob[2];
      const dateNumber = Number(dateString);
      const newDate = dateNumber + 40;

      this.dob.date = String(newDate);
    } else {
      this.dob.date = tempDob[2];
    }

    this.dob.month = tempDob[1];
    this.dob.year = tempDob[0].substr(2, 2);
  }

  private checkKtp(): boolean {
    const { ktp } = this.profile;
    const newKtp = ktp.substr(6, 6);
    const date = newKtp.substr(0, 2);
    const month = newKtp.substr(2, 2);
    const year = newKtp.substr(4, 2);

    let result = '';

    if (date === this.dob.date) {
      result = result + '1';
    } else {
      result = result + '0';
    }

    if (month === this.dob.month) {
      result = result + '1';
    } else {
      result = result + '0';
    }

    if (year === this.dob.year) {
      result = result + '1';
    } else {
      result = result + '0';
    }

    if (result === '111') {
      return true;
    } else {
      return false;
    }
  }

  private async submitPinjaman(): Promise<void> {
    const check = await this.checkKtp();

    if (check === false) {
      this.isError = true;
    } else {
      this.isError = false;

      this.router.navigateByUrl('/result');
    }
  }
}
