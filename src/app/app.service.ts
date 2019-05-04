import { Observable, of } from 'rxjs';
import { IPinjaman, IProfile } from 'src/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  public profile = {} as IProfile;
  public pinjaman = {} as IPinjaman;

  public constructor() {
    this.pinjaman.jumlah = 2;
    this.pinjaman.periode = 6;
  }

  /**
   * Method untuk mendapatkan data profile
   *
   * @returns `profile`
   */
  public getProfile(): Observable<IProfile> {
    return of(this.profile);
  }

  /**
   * Method untuk menyimpan data profile
   *
   * @param data - Data profile
   */
  public saveProfile(data: IProfile): void {
    this.profile = data;
  }

  /**
   * Method untuk mendapatkan data pinjaman
   *
   * @returns `pinjaman`
   */
  public getPinjaman(): Observable<IPinjaman> {
    return of(this.pinjaman);
  }

  /**
   * Method untuk menyimpan data pinjaman
   *
   * @param data - Data pinjaman
   */
  public savePinjaman(data: IPinjaman): void {
    this.pinjaman = data;
  }
}
