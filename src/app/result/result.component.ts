import { IPinjaman, IProfile } from 'src/interfaces';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {
  private pinjaman = {} as IPinjaman;
  private profile = {} as IProfile;

  public constructor(
    private appService: AppService,
    private router: Router,
    private titleService: Title
  ) { }

  /**
   * Computed untuk mendapatkan format tanggal Indonesia
   *
   * @returns `formattedDate`
   */
  private get formattedDate(): string {
    const currentDate: Date = new Date(this.profile.dob);
    const date: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1;
    const year: number = currentDate.getFullYear();
    const formattedDate = `${date}-${month}-${year}`;

    return formattedDate;
  }

  /**
   * Lifecycle Angular
   *
   * @listens `titleService.setTitle()`
   * @listens `getPinjaman()`
   * @listens `getProfile()`
   */
  public ngOnInit(): void {
    this.titleService.setTitle('Data Pengguna - Tunaiku');

    this.getPinjaman();
    this.getProfile();
  }

  /**
   * Method untuk mendapatkan data profile
   *
   * @listens `appService.getProfile()`
   * @todo    Mendapatkan data profile dari Service.
   */
  private getProfile(): void {
    this
      .appService
      .getProfile()
      .subscribe((profile) => this.profile = profile);
  }

  /**
   * Method untuk mendapatkan data pinjaman
   *
   * @listens `appService.getPinjaman()`
   * @todo    Mendapatkan data pinjaman dari Service.
   */
  private getPinjaman(): void {
    this
      .appService
      .getPinjaman()
      .subscribe(
        (pinjaman) => {
          if (!!pinjaman.cicilan === true) {
            this.pinjaman = pinjaman;
          } else {
            this.router.navigateByUrl('/');
          }
        }
      );
  }

  /**
   * Method untuk kembali ke halaman awal
   */
  private reset(): void {
    window.location.href = '/';
  }
}
