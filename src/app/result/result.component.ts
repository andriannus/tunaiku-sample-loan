import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPinjaman } from 'src/interfaces';
import { AppService } from '../app.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {
  private pinjaman = {} as IPinjaman;
  private profile = {} as any;

  public constructor(private appService: AppService, private router: Router) { }

  private get formattedDate(): string {
    const currentDate = new Date(this.profile.dob);
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${date}-${month}-${year}`;

    return formattedDate;
  }

  public ngOnInit(): void {
    this.getProfile();
    this.getPinjaman();
  }

  private getProfile(): void {
    this
      .appService
      .getProfile()
      .subscribe((profile) => this.profile = profile);
  }

  private getPinjaman(): void {
    this
      .appService
      .getPinjaman()
      .subscribe((pinjaman) => this.pinjaman = pinjaman);
  }

  private reset(): void {
    window.location.href = '/';
  }
}
