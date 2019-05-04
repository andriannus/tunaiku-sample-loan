import { IPinjaman } from 'src/interfaces/index';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  private pinjaman = {} as IPinjaman;

  public constructor(
    private appService: AppService,
    private titleService: Title
  ) { }

  /**
   * Lifecycle Angular
   *
   * @listens `titleService.setTitle()`
   * @listens `getPinjaman()`
   */
  public ngOnInit() {
    this.titleService.setTitle('Profil - Tunaiku');

    this.getPinjaman();
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
      .subscribe((pinjaman) => this.pinjaman = pinjaman);
  }
}
