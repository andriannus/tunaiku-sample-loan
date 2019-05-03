import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { IPinjaman } from 'src/interfaces/index';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  private pinjaman = {} as IPinjaman;

  private get cicilan(): string {
    const periode: number = this.pinjaman.periode;
    const jumlahPinjaman: number = this.pinjaman.jumlah * 1000000;
    const result: number = jumlahPinjaman / periode;
    const resultFixed = Number(result.toFixed(0));

    return resultFixed.toLocaleString(['ban', 'id']);
  }

  public constructor(public appService: AppService, private router: Router) { }

  public ngOnInit(): void {
    this.getPinjaman();
  }

  private getPinjaman(): void {
    this
      .appService
      .getPinjaman()
      .subscribe((pinjaman) => this.pinjaman = pinjaman);
  }

  private savePinjaman(): void {
    const cicilan: string = this.cicilan;
    const jumlah: number = this.pinjaman.jumlah;
    const periode: number = this.pinjaman.periode;
    const data: IPinjaman = { cicilan, jumlah, periode };

    this.appService.savePinjaman(data);

    this.router.navigateByUrl('/step/1');
  }
}
