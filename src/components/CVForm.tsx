import React from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Camera, 
  Palette, 
  PlusCircle, 
  Trash2
} from 'lucide-react';
import type { CVData, Education, Experience } from '../types/cv';

interface CVFormProps {
  data: CVData;
  onChange: (newData: Partial<CVData>) => void;
}

const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateEdu = (index: number, field: keyof Education, value: string) => {
    const newEdu = [...data.edu];
    newEdu[index] = { ...newEdu[index], [field]: value };
    onChange({ edu: newEdu });
  };

  const addEdu = () => {
    onChange({ edu: [...data.edu, { year: '', school: '', desc: '' }] });
  };

  const removeEdu = (index: number) => {
    onChange({ edu: data.edu.filter((_, i) => i !== index) });
  };

  const updateExp = (index: number, field: keyof Experience, value: string) => {
    const newExp = [...data.exp];
    newExp[index] = { ...newExp[index], [field]: value };
    onChange({ exp: newExp });
  };

  const addExp = () => {
    onChange({ exp: [...data.exp, { comp: '', period: '', pos: '', desc: '' }] });
  };

  const removeExp = (index: number) => {
    onChange({ exp: data.exp.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Themes & Colors */}
      <section className="md-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-primary">
          <div className="p-2 bg-primary/10 rounded-lg"><Palette size={18} /></div>
          <span>Pilih Tema & Warna</span>
        </h2>
        <div className="border-t border-gray-100 my-4"></div>
        <p className="text-sm text-gray-600 mb-4">Layout CV (Review akan otomatis berubah)</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { id: 1, name: 'Standar' },
            { id: 2, name: 'Klasik' },
            { id: 3, name: 'Kreatif' },
            { id: 4, name: 'Modern' },
            { id: 5, name: 'Minimalis' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ theme: t.id })}
              className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
                data.theme === t.id 
                ? 'border-[#9b87c4] bg-[#fdf2f2] text-[#9b87c4]' 
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-bold text-gray-600">Warna Tema</label>
          <div className="relative group">
            <input 
              type="color" 
              value={data.color} 
              onChange={(e) => onChange({ color: e.target.value })}
              className="w-12 h-10 rounded-md cursor-pointer border-2 border-gray-200 p-0 overflow-hidden"
            />
          </div>
        </div>
      </section>

      {/* Photo */}
      <section className="md-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-primary">
          <div className="p-2 bg-primary/10 rounded-lg"><Camera size={18} /></div>
          <span>Unggah Foto Profil</span>
        </h2>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-background border-2 border-dashed border-border flex items-center justify-center overflow-hidden shrink-0">
            {data.photo ? (
              <img src={data.photo} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-text-muted opacity-30" />
            )}
          </div>
          <div className="flex-1">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePhotoChange}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer"
            />
            <p className="text-[10px] text-text-muted mt-2">Disarankan: Rasio foto 3:4 untuk hasil terbaik.</p>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="md-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-primary">
          <div className="p-2 bg-primary/10 rounded-lg"><User size={18} /></div>
          <span>Informasi Pribadi</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label>Nama Lengkap</label>
            <input 
              type="text" 
              value={data.nama} 
              onChange={(e) => onChange({ nama: e.target.value })}
              placeholder="Contoh: Cahaya Dewi" 
            />
          </div>
          <div>
            <label>Profesi / Judul Pekerjaan</label>
            <input 
              type="text" 
              value={data.profesi} 
              onChange={(e) => onChange({ profesi: e.target.value })}
              placeholder="Contoh: Admin Media Sosial" 
            />
          </div>
          <div>
            <label>Tempat, Tanggal Lahir</label>
            <input 
              type="text" 
              value={data.ttl} 
              onChange={(e) => onChange({ ttl: e.target.value })}
              placeholder="Contoh: Jakarta, 01 Jan 1995" 
            />
          </div>
          <div>
            <label>Jenis Kelamin</label>
            <select value={data.jk} onChange={(e) => onChange({ jk: e.target.value as any })}>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label>No. HP / WhatsApp</label>
            <input 
              type="text" 
              value={data.hp} 
              onChange={(e) => onChange({ hp: e.target.value })}
              placeholder="Contoh: 0812xxxx" 
            />
          </div>
          <div className="md:col-span-2">
            <label>Alamat Email</label>
            <input 
              type="email" 
              value={data.email} 
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="email@domain.com" 
            />
          </div>
          <div className="md:col-span-2">
            <label>Alamat Lengkap</label>
            <textarea 
              value={data.alamat} 
              onChange={(e) => onChange({ alamat: e.target.value })}
              rows={2}
              placeholder="Nama Jalan, Kota, Kode Pos"
            />
          </div>
          <div className="md:col-span-2">
            <label>Profil Profesional / Ringkasan</label>
            <textarea 
              value={data.profil} 
              onChange={(e) => onChange({ profil: e.target.value })}
              rows={3}
              placeholder="Ceritakan singkat tentang diri dan tujuan karir Anda..."
            />
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="md-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-primary">
            <div className="p-2 bg-primary/10 rounded-lg"><GraduationCap size={18} /></div>
            <span>Pendidikan Formal</span>
          </h2>
          <button onClick={addEdu} className="text-primary hover:text-primary-hover flex items-center gap-1 text-sm font-bold">
            <PlusCircle size={16} /> Tambah Lagi
          </button>
        </div>
        <div className="space-y-4">
          {data.edu.map((edu, idx) => (
            <div key={idx} className="p-4 bg-background rounded-xl border border-border relative group">
              <button 
                onClick={() => removeEdu(idx)}
                className="absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-surface border border-border text-red-500 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <input 
                  type="text" 
                  value={edu.year} 
                  onChange={(e) => updateEdu(idx, 'year', e.target.value)}
                  placeholder="Periode (Contoh: 2011-2014)" 
                  className="text-sm"
                />
                <input 
                  type="text" 
                  value={edu.school} 
                  onChange={(e) => updateEdu(idx, 'school', e.target.value)}
                  placeholder="Nama Instansi Pendidikan" 
                  className="col-span-2 text-sm"
                />
              </div>
              <input 
                type="text" 
                value={edu.desc} 
                onChange={(e) => updateEdu(idx, 'desc', e.target.value)}
                placeholder="Jurusan atau Prestasi" 
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="md-card animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-primary">
            <div className="p-2 bg-primary/10 rounded-lg"><Briefcase size={18} /></div>
            <span>Pengalaman Kerja</span>
          </h2>
          <button onClick={addExp} className="text-primary hover:text-primary-hover flex items-center gap-1 text-sm font-bold">
            <PlusCircle size={16} /> Tambah Lagi
          </button>
        </div>
        <div className="space-y-6">
          {data.exp.map((exp, idx) => (
            <div key={idx} className="p-5 bg-background rounded-xl border border-border relative group">
              <button 
                onClick={() => removeExp(idx)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-surface border border-border text-red-500 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  value={exp.comp} 
                  onChange={(e) => updateExp(idx, 'comp', e.target.value)}
                  placeholder="Nama Perusahaan" 
                  className="text-sm font-bold"
                />
                <input 
                  type="text" 
                  value={exp.period} 
                  onChange={(e) => updateExp(idx, 'period', e.target.value)}
                  placeholder="Periode (Contoh: 2018-Sekarang)" 
                  className="text-sm"
                />
                <input 
                  type="text" 
                  value={exp.pos} 
                  onChange={(e) => updateExp(idx, 'pos', e.target.value)}
                  placeholder="Posisi Pekerjaan" 
                  className="col-span-2 text-sm font-semibold"
                />
              </div>
              <textarea 
                value={exp.desc} 
                onChange={(e) => updateExp(idx, 'desc', e.target.value)}
                placeholder="Tanggung jawab utama dan pencapaian (satu per baris)..."
                rows={3}
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="md-card animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-primary">
          <div className="p-2 bg-primary/10 rounded-lg"><Award size={18} /></div>
          <span>Keahlian & Kompetensi</span>
        </h2>
        <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-3">Pisahkan dengan koma</p>
        <textarea 
          value={data.skills} 
          onChange={(e) => onChange({ skills: e.target.value })}
          rows={3}
          placeholder="Contoh: Adobe Photoshop, Content Writing, Public Speaking..."
          className="text-sm"
        />
      </section>
    </div>
  );
};

export default CVForm;
