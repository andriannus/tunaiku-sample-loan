import { IDob, IProfile } from 'src/interfaces/index';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-ktp',
  templateUrl: './ktp.component.html',
  styleUrls: ['./ktp.component.scss']
})

export class KtpComponent implements OnInit {
  public dob = {} as IDob;
  public isError = false;
  public isLoading = false;
  public profile = {} as IProfile;

  public constructor(
    public appService: AppService,
    public fb: FormBuilder,
    public router: Router
  ) { }

  /**
   * Daftar rules untuk validasi
   */
  public ktpFormValidations = this.fb.group({
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

  public ktp: AbstractControl = this.ktpFormValidations.get('ktp');

  /**
   * Computed untuk validasi KTP
   *
   * @return `errors`
   */
  public get ktpErrors(): string[] {
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
      .subscribe((profile) => this.profile = profile);

    this.getDob();
  }

  /**
   * Method untuk mendapatkan detail tanggal lahir
   *
   * @todo Mendapatkan data DOB dari model.
   * @todo Split data DOB.
   * @todo Apabila perempuan, +40 untuk data tanggal.
   * @todo Simpan data tanggal, bulan, dan tahun sesuai DOB.
   */
  public getDob(): void {
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

  /**
   * Method untuk validasi format KTP
   *
   * @todo Substring data KTP sesuai posisi yang ditentukan.
   * @todo Cek kesesuaian data KTP dengan tanggal lahir.
   * @todo Cek kesesuaian data KTP dengan bulan lahir.
   * @todo Cek kesesuaian data KTP dengan tahun lahir.
   * @todo Apabila sesuai kondisi, berikan nilai `true`.
   * @todo Jika tidak, berikan nilai `false`.
   */
  public checkKtp(): boolean {
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

  /**
   * Method untuk submit form
   *
   * @async
   * @listens `checkKtp()`
   * @todo    Cek format KTP
   * @todo    Jika berhasil, submit form dan arahkan ke halaman result.
   * @todo    Jika gagal, tampilkan pesan error.
   */
  public async submitPinjaman(): Promise<void> {
    this.isLoading = true;

    const check = await this.checkKtp();

    if (check === false) {
      setTimeout(() => {
        this.isLoading = false;
        this.isError = true;
      }, 500);
    } else {
      this.isError = false;

      setTimeout(() => {
        this.router.navigateByUrl('/result');
      }, 1000);
    }
  }
}
