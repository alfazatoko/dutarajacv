export interface Education {
  year: string;
  school: string;
  desc: string;
}

export interface Experience {
  comp: string;
  period: string;
  pos: string;
  desc: string;
}

export type CVData = {
  id?: string;
  nama: string;
  profesi: string;
  profil: string;
  hp: string;
  email: string;
  alamat: string;
  ttl: string;
  jk: 'Laki-laki' | 'Perempuan';
  photo: string;
  edu: Education[];
  exp: Experience[];
  skills: string;
  theme: number;
  color: string;
  updatedAt: any;
};
