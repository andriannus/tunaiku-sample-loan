export interface IDob {
  date: string;
  month: string;
  year: string;
}

export interface IPinjaman {
  cicilan: string;
  jumlah: number;
  periode: number;
}

export interface IProfile {
  dob: string;
  email: string;
  gender: string;
  ktp?: string;
  name: string;
}
