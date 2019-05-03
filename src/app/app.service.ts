import { Observable, of } from 'rxjs';
import { IPinjaman, IProfile } from 'src/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  public profile = {} as IProfile;
  private pinjaman = {} as IPinjaman;

  public constructor() {
    this.pinjaman.jumlah = 2;
    this.pinjaman.periode = 6;
  }

  public getProfile(): Observable<IProfile> {
    return of(this.profile);
  }

  public saveProfile(data: IProfile): void {
    this.profile = data;
  }

  public getPinjaman(): Observable<IPinjaman> {
    return of(this.pinjaman);
  }

  public savePinjaman(data: IPinjaman): void {
    this.pinjaman = data;
  }
}
