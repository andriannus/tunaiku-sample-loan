import { IPinjaman } from 'src/interfaces/index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  private pinjaman = {} as IPinjaman;

  /**
   * Computed untuk mendapatkan perhitungan cicilan
   *
   * @return `resultFixed`
   */
  private get cicilan(): string {
    const periode: number = this.pinjaman.periode;
    const jumlahPinjaman: number = this.pinjaman.jumlah * 1000000;
    const result: number = jumlahPinjaman / periode;
    const resultFixed = Number(result.toFixed(0));

    return resultFixed.toLocaleString(['ban', 'id']);
  }

  public constructor(
    public appService: AppService,
    private router: Router
  ) { }

  /**
   * Lifecycle Angular
   *
   * @listens `getPinjaman()`
   */
  public ngOnInit(): void {
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

  /**
   * Method untuk menyimpan data pinjaman
   *
   * @listens `appService.savePinjaman()`
   * @todo    Validasi form.
   * @todo    Simpan data pinjaman ke Service.
   */
  private savePinjaman(): void {
    const cicilan: string = this.cicilan;
    const jumlah: number = this.pinjaman.jumlah;
    const periode: number = this.pinjaman.periode;
    const data: IPinjaman = { cicilan, jumlah, periode };

    this.appService.savePinjaman(data);

    this.router.navigateByUrl('/step/1');
  }
}
