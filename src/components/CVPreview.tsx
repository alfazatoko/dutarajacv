import React from 'react';
import { Phone, Mail, MapPin, Globe, User } from 'lucide-react';
import type { CVData } from '../types/cv';

interface CVPreviewProps { data: CVData; }

const CVPreview = React.forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {
  const { nama, profesi, profil, hp, email, alamat, photo, edu, exp, skills, theme, color, ttl, jk } = data;
  const skillList = skills.split(',').map(s => s.trim()).filter(s => s);
  const c = color || '#9b87c4';

  // Helper: section title for sidebar (light)
  const SideTitle = ({ label }: { label: string }) => (
    <p style={{ fontWeight:800, fontSize:9, textTransform:'uppercase', letterSpacing:3, marginBottom:10, opacity:0.75, borderBottom:'1px solid rgba(255,255,255,0.25)', paddingBottom:4 }}>{label}</p>
  );

  // Helper: section title for main area
  const MainTitle = ({ label, col }: { label: string; col: string }) => (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, paddingBottom:6, borderBottom:`2px solid ${col}22` }}>
      <div style={{ width:4, height:16, borderRadius:2, background:col, flexShrink:0 }} />
      <span style={{ fontWeight:900, fontSize:10, textTransform:'uppercase', letterSpacing:3, color:col }}>{label}</span>
    </div>
  );

  const getContent = () => {
    /* ===================== TEMA 1: STANDAR ===================== */
    if (theme === 1) return (
      <div style={{ display:'flex', width:'100%', minHeight:'297mm', fontFamily:'Inter,sans-serif', background:'#fff', color:'#333' }}>
        {/* Sidebar */}
        <div style={{ width:'38%', background:c, color:'#fff', padding:'32px 28px', display:'flex', flexDirection:'column', gap:28 }}>
          {photo && <div style={{ width:110, height:110, borderRadius:'50%', overflow:'hidden', border:'4px solid rgba(255,255,255,0.5)', alignSelf:'center', marginTop:8 }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <div style={{ textAlign:'center' }}>
            <h1 style={{ fontSize:20, fontWeight:900, lineHeight:1.2, textTransform:'uppercase' }}>{nama || 'Nama Lengkap'}</h1>
            <p style={{ fontSize:9, letterSpacing:3, textTransform:'uppercase', opacity:0.8, marginTop:4 }}>{profesi || 'Profesi'}</p>
          </div>
          <hr style={{ borderColor:'rgba(255,255,255,0.3)' }} />
          {/* DATA PRIBADI */}
          <div>
            <SideTitle label="Data Pribadi" />
            <div style={{ display:'flex', flexDirection:'column', gap:7, fontSize:10 }}>
              <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}><Phone size={12} style={{ marginTop:1, flexShrink:0 }} /><span>{hp}</span></div>
              <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}><Mail size={12} style={{ marginTop:1, flexShrink:0 }} /><span style={{ wordBreak:'break-all' }}>{email}</span></div>
              <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}><MapPin size={12} style={{ marginTop:1, flexShrink:0 }} /><span>{alamat}</span></div>
              {ttl && <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}><Globe size={12} style={{ marginTop:1, flexShrink:0 }} /><span>{ttl}</span></div>}
              {jk && <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}><User size={12} style={{ marginTop:1, flexShrink:0 }} /><span>{jk}</span></div>}
            </div>
          </div>
          {/* PROFIL */}
          <div>
            <SideTitle label="Profil Pribadi" />
            <p style={{ fontSize:10, lineHeight:1.9, opacity:0.9 }}>{profil}</p>
          </div>
          {/* PENDIDIKAN */}
          <div>
            <SideTitle label="Pendidikan" />
            {edu.map((e,i) => <div key={i} style={{ marginBottom:12 }}><p style={{ fontSize:9, opacity:0.6 }}>{e.year}</p><p style={{ fontSize:10, fontWeight:700 }}>{e.school}</p>{e.desc && <p style={{ fontSize:9, opacity:0.7 }}>{e.desc}</p>}</div>)}
          </div>
        </div>
        {/* Main */}
        <div style={{ width:'62%', padding:'32px 28px', background:'#fafafa', display:'flex', flexDirection:'column', gap:28 }}>
          {/* KEAHLIAN */}
          <div>
            <MainTitle label="Keahlian" col={c} />
            <ul style={{ paddingLeft:16, fontSize:10, lineHeight:2.2, columns:2 }}>{skillList.map((s,i)=><li key={i}>{s}</li>)}</ul>
          </div>
          {/* PENGALAMAN */}
          <div>
            <MainTitle label="Pengalaman Kerja" col={c} />
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {exp.map((e,i) => <div key={i} style={{ paddingLeft:14, borderLeft:`3px solid ${c}`, position:'relative' }}>
                <div style={{ width:9, height:9, borderRadius:'50%', background:c, position:'absolute', left:-6, top:3, border:'2px solid #fafafa' }} />
                <p style={{ fontWeight:800, fontSize:11, textTransform:'uppercase' }}>{e.comp}</p>
                <p style={{ fontSize:10, color:c, fontWeight:700, margin:'2px 0' }}>{e.pos}</p>
                <p style={{ fontSize:9, color:'#888', marginBottom:6 }}>{e.period}</p>
                <ul style={{ paddingLeft:14, fontSize:10, lineHeight:1.9, color:'#555' }}>{e.desc.split('\n').filter(x=>x.trim()).map((x,j)=><li key={j}>{x.replace(/^-/,'').trim()}</li>)}</ul>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    );

    /* ===================== TEMA 2: KLASIK ===================== */
    if (theme === 2) return (
      <div style={{ display:'flex', width:'100%', minHeight:'297mm', fontFamily:'Outfit,sans-serif', background:'#fff', color:'#333' }}>
        <div style={{ width:'35%', background:'#fdf2f2', padding:'32px 24px', display:'flex', flexDirection:'column', gap:24 }}>
          {photo && <div style={{ width:130, height:130, borderRadius:'50%', overflow:'hidden', border:'4px solid #fff', alignSelf:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <div>
            <p style={{ fontWeight:800, fontSize:9, textTransform:'uppercase', letterSpacing:3, borderBottom:`1px solid ${c}44`, paddingBottom:6, marginBottom:10, color:c }}>Data Pribadi</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:10 }}>
              {ttl && <span><b>TTL:</b> {ttl}</span>}
              {jk && <span><b>JK:</b> {jk}</span>}
              <div style={{ display:'flex', gap:6 }}><Mail size={11} color={c}/><span style={{ wordBreak:'break-all' }}>{email}</span></div>
              <div style={{ display:'flex', gap:6 }}><Phone size={11} color={c}/>{hp}</div>
              <div style={{ display:'flex', gap:6 }}><MapPin size={11} color={c}/>{alamat}</div>
            </div>
          </div>
          <div>
            <p style={{ fontWeight:800, fontSize:9, textTransform:'uppercase', letterSpacing:3, borderBottom:`1px solid ${c}44`, paddingBottom:6, marginBottom:10, color:c }}>Profil</p>
            <p style={{ fontSize:10, lineHeight:1.9, fontStyle:'italic', color:'#666' }}>{profil}</p>
          </div>
          <div>
            <p style={{ fontWeight:800, fontSize:9, textTransform:'uppercase', letterSpacing:3, borderBottom:`1px solid ${c}44`, paddingBottom:6, marginBottom:10, color:c }}>Pendidikan</p>
            {edu.map((e,i)=><div key={i} style={{ marginBottom:12 }}><p style={{ fontSize:9, color:'#aaa', fontWeight:700 }}>{e.year}</p><p style={{ fontSize:10, fontWeight:800, textTransform:'uppercase' }}>{e.school}</p><p style={{ fontSize:9, color:'#999', fontStyle:'italic' }}>{e.desc}</p></div>)}
          </div>
        </div>
        <div style={{ width:'65%', padding:'36px 32px' }}>
          <h1 style={{ fontSize:34, fontWeight:900, textTransform:'uppercase', letterSpacing:-1, lineHeight:1, marginBottom:4 }}>{nama || 'Nama Lengkap'}</h1>
          <p style={{ fontSize:11, letterSpacing:4, textTransform:'uppercase', color:c, opacity:0.8, marginBottom:32 }}>{profesi}</p>
          <div style={{ marginBottom:28 }}>
            <p style={{ fontWeight:800, fontSize:9, letterSpacing:3, textTransform:'uppercase', borderBottom:`2px solid ${c}`, paddingBottom:6, marginBottom:16, color:c }}>Pengalaman Kerja</p>
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              {exp.map((e,i)=><div key={i} style={{ display:'flex', gap:16 }}><div style={{ width:72, fontSize:9, fontWeight:700, color:'#aaa', flexShrink:0, paddingTop:2 }}>{e.period}</div><div><p style={{ fontWeight:800, fontSize:10, textTransform:'uppercase' }}>{e.pos}</p><p style={{ fontSize:9, color:c, fontWeight:700, textTransform:'uppercase', margin:'2px 0 6px' }}>{e.comp}</p><ul style={{ paddingLeft:12, fontSize:9, lineHeight:1.9, color:'#666' }}>{e.desc.split('\n').filter(x=>x.trim()).map((x,j)=><li key={j}>{x.replace(/^-/,'').trim()}</li>)}</ul></div></div>)}
            </div>
          </div>
          <div>
            <p style={{ fontWeight:800, fontSize:9, letterSpacing:3, textTransform:'uppercase', borderBottom:`2px solid ${c}`, paddingBottom:6, marginBottom:16, color:c }}>Kemampuan</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {skillList.map((s,i)=><div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:10 }}><span>{s}</span><div style={{ display:'flex', gap:3 }}>{[1,2,3,4,5].map(d=><div key={d} style={{ width:8, height:8, borderRadius:'50%', background: d<=4?c:'#eee' }}/>)}</div></div>)}
            </div>
          </div>
        </div>
      </div>
    );

    /* ===================== TEMA 3: KREATIF ===================== */
    if (theme === 3) return (
      <div style={{ width:'100%', minHeight:'297mm', padding:28, fontFamily:'Plus Jakarta Sans,sans-serif', background:c+'10', color:'#111' }}>
        {/* Header */}
        <div style={{ display:'flex', gap:28, alignItems:'flex-start', marginBottom:28 }}>
          {photo && <div style={{ width:150, height:150, borderRadius:24, overflow:'hidden', border:`5px solid ${c}`, boxShadow:`0 8px 30px ${c}44`, flexShrink:0, transform:'rotate(-2deg)' }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <div style={{ flex:1, paddingTop:12 }}>
            <h1 style={{ fontSize:48, fontWeight:900, letterSpacing:-2, lineHeight:0.9, marginBottom:14 }}>{nama || 'Nama Lengkap'}</h1>
            <div style={{ display:'inline-block', padding:'7px 18px', background:c, color:'#fff', fontWeight:900, fontSize:10, textTransform:'uppercase', letterSpacing:3, borderRadius:999, boxShadow:`4px 4px 0 ${c}88` }}>{profesi}</div>
            <p style={{ marginTop:16, fontSize:10, color:'#555', fontStyle:'italic', lineHeight:1.9, borderLeft:`4px solid ${c}`, paddingLeft:12, maxWidth:380 }}>{profil}</p>
          </div>
        </div>
        {/* Body grid */}
        <div style={{ display:'grid', gridTemplateColumns:'5fr 7fr', gap:18 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* DATA PRIBADI */}
            <div style={{ background:'#fff', padding:18, borderRadius:24, border:`2px solid ${c}`, boxShadow:`5px 5px 0 ${c}` }}>
              <p style={{ fontWeight:900, fontSize:9, textTransform:'uppercase', letterSpacing:2, marginBottom:12, color:c }}>● Data Pribadi</p>
              <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:10 }}>
                <div style={{ display:'flex', gap:8 }}><Phone size={11} color={c}/>{hp}</div>
                <div style={{ display:'flex', gap:8 }}><Mail size={11} color={c}/><span style={{ wordBreak:'break-all' }}>{email}</span></div>
                <div style={{ display:'flex', gap:8 }}><MapPin size={11} color={c}/>{alamat}</div>
                {ttl && <div style={{ display:'flex', gap:8 }}><Globe size={11} color={c}/>{ttl}</div>}
                {jk && <div style={{ display:'flex', gap:8 }}><User size={11} color={c}/>{jk}</div>}
              </div>
            </div>
            {/* KEAHLIAN */}
            <div style={{ background:c+'20', padding:18, borderRadius:24, border:`2px solid ${c}`, boxShadow:`5px 5px 0 ${c}` }}>
              <p style={{ fontWeight:900, fontSize:9, textTransform:'uppercase', letterSpacing:2, marginBottom:12, color:c }}>● Keahlian</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>{skillList.map((s,i)=><span key={i} style={{ padding:'4px 10px', background:c, color:'#fff', fontSize:9, borderRadius:999, fontWeight:700 }}>{s}</span>)}</div>
            </div>
            {/* PENDIDIKAN */}
            <div style={{ background:c+'15', padding:18, borderRadius:24, border:`2px solid ${c}`, boxShadow:`5px 5px 0 ${c}` }}>
              <p style={{ fontWeight:900, fontSize:9, textTransform:'uppercase', letterSpacing:2, marginBottom:12, color:c }}>● Pendidikan</p>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>{edu.map((e,i)=><div key={i}><p style={{ fontWeight:900, fontSize:10 }}>{e.school}</p><span style={{ display:'inline-block', background:c, color:'#fff', padding:'2px 8px', borderRadius:999, fontSize:8, fontWeight:900, margin:'4px 0' }}>{e.year}</span><p style={{ fontSize:9, color:'#666', fontStyle:'italic' }}>{e.desc}</p></div>)}</div>
            </div>
          </div>
          {/* PENGALAMAN */}
          <div style={{ background:'#fff', padding:24, borderRadius:32, border:`2px solid ${c}`, boxShadow:`8px 8px 0 ${c}` }}>
            <div style={{ display:'inline-block', padding:'8px 18px', background:c, color:'#fff', borderRadius:999, fontWeight:900, fontSize:13, textTransform:'uppercase', marginBottom:22, transform:'rotate(-1deg)' }}>✦ Pengalaman</div>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {exp.map((e,i)=><div key={i} style={{ paddingLeft:18, borderLeft:`3px solid ${c}`, position:'relative' }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:c, position:'absolute', left:-6, top:2, border:'2px solid #fff', boxShadow:`0 0 0 2px ${c}` }}/>
                <h3 style={{ fontWeight:900, fontSize:12, textTransform:'uppercase' }}>{e.pos}</h3>
                <div style={{ display:'flex', gap:10, margin:'5px 0', alignItems:'center' }}><span style={{ background:c, color:'#fff', fontSize:9, padding:'2px 8px', borderRadius:999, fontWeight:900 }}>{e.period}</span><span style={{ fontSize:10, fontWeight:700, color:'#888' }}>{e.comp}</span></div>
                <ul style={{ paddingLeft:14, fontSize:10, lineHeight:1.9, color:'#555' }}>{e.desc.split('\n').filter(x=>x.trim()).map((x,j)=><li key={j}>{x.replace(/^-/,'').trim()}</li>)}</ul>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    );

    /* ===================== TEMA 4: MODERN ===================== */
    if (theme === 4) return (
      <div style={{ display:'flex', width:'100%', minHeight:'297mm', fontFamily:'Inter,sans-serif', background:'#fff', color:'#111' }}>
        <div style={{ width:'62%', padding:'40px 36px', display:'flex', flexDirection:'column', gap:28 }}>
          <div style={{ paddingBottom:20, borderBottom:`4px solid ${c}` }}>
            <h1 style={{ fontSize:42, fontWeight:900, letterSpacing:-2, textTransform:'uppercase', lineHeight:1, marginBottom:6 }}>{nama}</h1>
            <p style={{ fontSize:10, letterSpacing:5, textTransform:'uppercase', color:c, fontWeight:700 }}>{profesi}</p>
          </div>
          <div>
            <MainTitle label="Profil Profesional" col={c} />
            <p style={{ fontSize:11, lineHeight:2, color:'#555' }}>{profil}</p>
          </div>
          <div>
            <MainTitle label="Pengalaman Kerja" col={c} />
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {exp.map((e,i)=>(
                <div key={i} style={{ paddingLeft:16, borderLeft:`3px solid ${c}`, position:'relative' }}>
                  <div style={{ width:10, height:10, borderRadius:'50%', background:c, position:'absolute', left:-6, top:3 }}/>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                    <p style={{ fontWeight:900, fontSize:11, textTransform:'uppercase' }}>{e.pos}</p>
                    <span style={{ background:c, color:'#fff', fontSize:9, padding:'2px 10px', borderRadius:999, fontWeight:700 }}>{e.period}</span>
                  </div>
                  <p style={{ fontSize:9, color:c, textTransform:'uppercase', fontWeight:700, marginBottom:6 }}>{e.comp}</p>
                  <ul style={{ paddingLeft:14, fontSize:10, lineHeight:1.9, color:'#555' }}>{e.desc.split('\n').filter(x=>x.trim()).map((x,j)=><li key={j}>{x.replace(/^-/,'').trim()}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar kanan berwarna */}
        <div style={{ width:'38%', background:c, padding:'36px 26px', display:'flex', flexDirection:'column', gap:24 }}>
          {photo && <div style={{ width:130, height:130, borderRadius:'50%', overflow:'hidden', marginBottom:4, border:'4px solid rgba(255,255,255,0.4)', alignSelf:'center' }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <div style={{ textAlign:'center' }}>
            <h2 style={{ fontSize:17, fontWeight:900, color:'#fff', textTransform:'uppercase', marginBottom:3 }}>{nama}</h2>
            <p style={{ fontSize:9, color:'rgba(255,255,255,0.7)', letterSpacing:3, textTransform:'uppercase' }}>{profesi}</p>
          </div>
          <hr style={{ borderColor:'rgba(255,255,255,0.2)' }}/>
          {/* DATA PRIBADI */}
          <div>
            <SideTitle label="Data Pribadi" />
            <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:10, color:'#fff' }}>
              <div style={{ display:'flex', gap:8 }}><Mail size={12}/><span style={{ wordBreak:'break-all', fontSize:9 }}>{email}</span></div>
              <div style={{ display:'flex', gap:8 }}><Phone size={12}/><span style={{ fontSize:9 }}>{hp}</span></div>
              <div style={{ display:'flex', gap:8 }}><MapPin size={12}/><span style={{ fontSize:9 }}>{alamat}</span></div>
              {ttl && <div style={{ display:'flex', gap:8 }}><Globe size={12}/><span style={{ fontSize:9 }}>{ttl}</span></div>}
              {jk && <div style={{ display:'flex', gap:8 }}><User size={12}/><span style={{ fontSize:9 }}>{jk}</span></div>}
            </div>
          </div>
          <hr style={{ borderColor:'rgba(255,255,255,0.2)' }}/>
          <div>
            <SideTitle label="Pendidikan" />
            {edu.map((e,i)=><div key={i} style={{ marginBottom:12 }}><p style={{ fontWeight:900, fontSize:10, textTransform:'uppercase', color:'#fff' }}>{e.school}</p><p style={{ fontSize:9, color:'rgba(255,255,255,0.6)', marginTop:2 }}>{e.year} • {e.desc}</p></div>)}
          </div>
          <hr style={{ borderColor:'rgba(255,255,255,0.2)' }}/>
          <div>
            <SideTitle label="Keahlian" />
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>{skillList.map((s,i)=><span key={i} style={{ padding:'4px 10px', background:'rgba(255,255,255,0.2)', color:'#fff', fontSize:9, fontWeight:700, borderRadius:6, border:'1px solid rgba(255,255,255,0.3)' }}>{s}</span>)}</div>
          </div>
        </div>
      </div>
    );

    /* ===================== TEMA 5: MINIMALIS ===================== */
    if (theme === 5) return (
      <div style={{ width:'100%', minHeight:'297mm', padding:'48px 52px', fontFamily:'Inter,sans-serif', background:'#fff', color:'#333' }}>
        {/* Header terpusat */}
        <div style={{ textAlign:'center', marginBottom:48 }}>
          {photo && <div style={{ width:88, height:88, borderRadius:'50%', overflow:'hidden', margin:'0 auto 18px', border:`2px solid ${c}22` }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <h1 style={{ fontSize:30, fontWeight:300, letterSpacing:7, textTransform:'uppercase', color:'#111', marginBottom:6 }}>{nama}</h1>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:5, textTransform:'uppercase', color:c }}>{profesi}</p>
          {/* DATA PRIBADI baris */}
          <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:20, marginTop:20, paddingTop:16, borderTop:`1px solid ${c}22`, borderBottom:`1px solid ${c}22`, paddingBottom:16, fontSize:9, fontWeight:700, color:'#aaa', textTransform:'uppercase', letterSpacing:2 }}>
            <span style={{ display:'flex', gap:5, alignItems:'center' }}><Mail size={11} color={c}/>{email}</span>
            <span style={{ display:'flex', gap:5, alignItems:'center' }}><Phone size={11} color={c}/>{hp}</span>
            {ttl && <span style={{ display:'flex', gap:5, alignItems:'center' }}><Globe size={11} color={c}/>{ttl}</span>}
            {jk && <span style={{ display:'flex', gap:5, alignItems:'center' }}><User size={11} color={c}/>{jk}</span>}
            <span style={{ display:'flex', gap:5, alignItems:'center' }}><MapPin size={11} color={c}/>{alamat}</span>
          </div>
        </div>
        <div style={{ maxWidth:580, margin:'0 auto', display:'flex', flexDirection:'column', gap:36 }}>
          <section>
            <h2 style={{ fontSize:9, fontWeight:900, letterSpacing:5, textTransform:'uppercase', color:c, textAlign:'center', marginBottom:14 }}>Tentang Saya</h2>
            <p style={{ fontSize:11, lineHeight:2, color:'#666', textAlign:'center', fontStyle:'italic' }}>{profil}</p>
          </section>
          <section>
            <h2 style={{ fontSize:9, fontWeight:900, letterSpacing:5, textTransform:'uppercase', color:c, textAlign:'center', marginBottom:18 }}>Pengalaman</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {exp.map((e,i)=><div key={i} style={{ textAlign:'center' }}>
                <p style={{ fontWeight:800, fontSize:11, textTransform:'uppercase', marginBottom:3 }}>{e.pos}</p>
                <p style={{ fontSize:9, color:c, textTransform:'uppercase', letterSpacing:2, marginBottom:8, fontWeight:700 }}>{e.comp} | {e.period}</p>
                <p style={{ fontSize:10, color:'#666' }}>{e.desc.replace(/^-/gm,'').split('\n').filter(x=>x.trim()).join(' • ')}</p>
              </div>)}
            </div>
          </section>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, paddingTop:20, borderTop:`1px solid ${c}22` }}>
            <section>
              <h2 style={{ fontSize:9, fontWeight:900, letterSpacing:5, textTransform:'uppercase', color:c, textAlign:'center', marginBottom:14 }}>Pendidikan</h2>
              {edu.map((e,i)=><div key={i} style={{ textAlign:'center', marginBottom:14 }}><p style={{ fontSize:10, fontWeight:800, textTransform:'uppercase' }}>{e.school}</p><p style={{ fontSize:9, color:c, textTransform:'uppercase', fontWeight:700, marginTop:2 }}>{e.year}</p></div>)}
            </section>
            <section>
              <h2 style={{ fontSize:9, fontWeight:900, letterSpacing:5, textTransform:'uppercase', color:c, textAlign:'center', marginBottom:14 }}>Keahlian</h2>
              <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8 }}>{skillList.map((s,i)=><span key={i} style={{ fontSize:10, fontWeight:700, color:'#555', borderBottom:`2px solid ${c}44`, paddingBottom:2 }}>{s}</span>)}</div>
            </section>
          </div>
        </div>
      </div>
    );

    /* ===================== TEMA 6: DINAMIS ===================== */
    if (theme === 6) return (
      <div style={{ width:'100%', minHeight:'297mm', fontFamily:'Inter,sans-serif', background:'#f0f0f0', color:'#222' }}>
        {/* Header: foto kiri gelap, info kanan terang */}
        <div style={{ display:'flex', minHeight:140 }}>
          {/* Kiri: foto + warna gelap */}
          <div style={{ width:200, background:'#3a3a3a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20, flexShrink:0, position:'relative' }}>
            {/* Aksen warna kecil */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:c }}/>
            {photo
              ? <div style={{ width:100, height:100, borderRadius:'50%', overflow:'hidden', border:`3px solid ${c}`, boxShadow:'0 4px 16px rgba(0,0,0,0.4)' }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>
              : <div style={{ width:100, height:100, borderRadius:'50%', background:'#555', border:`3px solid ${c}`, display:'flex', alignItems:'center', justifyContent:'center' }}><User size={40} color="#aaa"/></div>
            }
          </div>
          {/* Kanan: nama, profesi, kontak */}
          <div style={{ flex:1, background:'#fff', padding:'24px 32px', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative' }}>
            {/* Dekorasi sudut kanan atas */}
            <div style={{ position:'absolute', top:16, right:20, display:'flex', flexDirection:'column', gap:5, alignItems:'flex-end' }}>
              <div style={{ width:32, height:3, background:c, borderRadius:2 }}/>
              <div style={{ width:20, height:3, background:'#ddd', borderRadius:2 }}/>
              <div style={{ width:12, height:3, background:'#eee', borderRadius:2 }}/>
            </div>
            <h1 style={{ fontSize:28, fontWeight:900, color:'#111', letterSpacing:1, marginBottom:3, textTransform:'uppercase' }}>{nama || 'Nama Lengkap'}</h1>
            <p style={{ fontSize:10, fontWeight:700, color:c, letterSpacing:4, textTransform:'uppercase', marginBottom:14 }}>{profesi}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:5, fontSize:10, color:'#555' }}>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}><Mail size={11} color={c}/><span style={{ wordBreak:'break-all' }}>{email}</span></div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}><Phone size={11} color={c}/>{hp}</div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}><MapPin size={11} color={c}/>{alamat}</div>
            </div>
          </div>
        </div>
        {/* Body */}
        <div style={{ padding:'24px 28px', display:'flex', flexDirection:'column', gap:18 }}>
          {/* DATA PRIBADI – full width */}
          <div style={{ background:'#fff', borderRadius:10, padding:'16px 20px', boxShadow:'0 1px 4px rgba(0,0,0,0.07)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
              <div style={{ width:14, height:14, background:c, borderRadius:3, flexShrink:0 }}/>
              <span style={{ fontWeight:900, fontSize:11, textTransform:'uppercase', letterSpacing:2, color:'#222' }}>Data Pribadi</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'7px 24px', fontSize:10 }}>
              <div style={{ display:'flex', gap:8 }}><span style={{ color:'#888', minWidth:120 }}>Nama</span><span>: {nama}</span></div>
              {ttl && <div style={{ display:'flex', gap:8 }}><span style={{ color:'#888', minWidth:120 }}>Tempat, Tanggal Lahir</span><span>: {ttl}</span></div>}
              {jk && <div style={{ display:'flex', gap:8 }}><span style={{ color:'#888', minWidth:120 }}>Jenis Kelamin</span><span>: {jk}</span></div>}
              <div style={{ display:'flex', gap:8 }}><span style={{ color:'#888', minWidth:120 }}>Kewarganegaraan</span><span>: Indonesia</span></div>
              <div style={{ display:'flex', gap:8 }}><span style={{ color:'#888', minWidth:120 }}>Alamat</span><span>: {alamat}</span></div>
            </div>
          </div>
          {/* Pendidikan & Pengalaman – 2 kolom */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div style={{ background:'#fff', borderRadius:10, padding:'16px 20px', boxShadow:'0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                <div style={{ width:14, height:14, background:c, borderRadius:3, flexShrink:0 }}/>
                <span style={{ fontWeight:900, fontSize:11, textTransform:'uppercase', letterSpacing:2, color:'#222' }}>Pendidikan</span>
              </div>
              {edu.map((e,i)=><div key={i} style={{ display:'flex', gap:8, marginBottom:8, fontSize:10 }}><span style={{ color:c }}>•</span><span><b>{e.school}</b>{e.desc && <span style={{ color:'#888' }}> — {e.desc}</span>}{e.year && <span style={{ display:'block', fontSize:9, color:'#aaa' }}>{e.year}</span>}</span></div>)}
            </div>
            <div style={{ background:'#fff', borderRadius:10, padding:'16px 20px', boxShadow:'0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                <div style={{ width:14, height:14, background:c, borderRadius:3, flexShrink:0 }}/>
                <span style={{ fontWeight:900, fontSize:11, textTransform:'uppercase', letterSpacing:2, color:'#222' }}>Pengalaman</span>
              </div>
              {exp.map((e,i)=><div key={i} style={{ display:'flex', gap:8, marginBottom:8, fontSize:10 }}><span style={{ color:c }}>•</span><span><b>{e.pos}</b> — {e.comp}<span style={{ display:'block', fontSize:9, color:'#aaa' }}>{e.period}</span></span></div>)}
            </div>
          </div>
          {/* Kemampuan & Hobi – 2 kolom */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div style={{ background:'#fff', borderRadius:10, padding:'16px 20px', boxShadow:'0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                <div style={{ width:14, height:14, background:c, borderRadius:3, flexShrink:0 }}/>
                <span style={{ fontWeight:900, fontSize:11, textTransform:'uppercase', letterSpacing:2, color:'#222' }}>Kemampuan</span>
              </div>
              {skillList.map((s,i)=><div key={i} style={{ marginBottom:8 }}><div style={{ display:'flex', justifyContent:'space-between', fontSize:10, marginBottom:3 }}><span>{s}</span></div><div style={{ height:4, background:'#eee', borderRadius:2 }}><div style={{ height:'100%', background:c, borderRadius:2, width:`${70+i*5}%` }}/></div></div>)}
            </div>
            <div style={{ background:'#fff', borderRadius:10, padding:'16px 20px', boxShadow:'0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                <div style={{ width:14, height:14, background:c, borderRadius:3, flexShrink:0 }}/>
                <span style={{ fontWeight:900, fontSize:11, textTransform:'uppercase', letterSpacing:2, color:'#222' }}>Hobi</span>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:10 }}>
                <span>• Membaca</span><span>• Menulis</span><span>• Menggambar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    /* ===================== TEMA 7: PROFESIONAL BOLD HEADER ===================== */
    if (theme === 7) return (
      <div style={{ width:'100%', minHeight:'297mm', fontFamily:'Inter,sans-serif', background:'#fff', color:'#222' }}>
        {/* Bold header */}
        <div style={{ background:c, padding:'28px 36px', display:'flex', gap:0, alignItems:'stretch', position:'relative', overflow:'hidden' }}>
          {/* Decorative circle */}
          <div style={{ position:'absolute', right:-60, top:-60, width:220, height:220, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>
          <div style={{ position:'absolute', right:40, bottom:-80, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }}/>
          <div style={{ flex:1, zIndex:1 }}>
            <h1 style={{ fontSize:40, fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:6 }}>{nama ? nama.split(' ').map((w,i)=><span key={i} style={{ display:'block' }}>{w}</span>) : 'Nama Lengkap'}</h1>
            <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.8)', textTransform:'uppercase', letterSpacing:3, marginTop:8 }}>{profesi}</p>
          </div>
          {photo && <div style={{ width:130, height:130, borderRadius:'50%', overflow:'hidden', border:'4px solid rgba(255,255,255,0.5)', alignSelf:'center', flexShrink:0, zIndex:1 }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <div style={{ width:200, paddingLeft:24, display:'flex', flexDirection:'column', justifyContent:'center', gap:8, fontSize:10, color:'rgba(255,255,255,0.9)', zIndex:1, borderLeft:'1px solid rgba(255,255,255,0.2)', marginLeft:24 }}>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}><MapPin size={13}/>{alamat}</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}><Phone size={13}/>{hp}</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}><Mail size={13}/><span style={{ wordBreak:'break-all', fontSize:9 }}>{email}</span></div>
          </div>
        </div>
        {/* Ringkasan */}
        <div style={{ padding:'20px 36px', borderBottom:'1px solid #eee' }}>
          <div style={{ display:'flex', alignItems:'flex-end', gap:0, marginBottom:12 }}>
            <span style={{ fontWeight:900, fontSize:12, letterSpacing:3, textTransform:'uppercase', color:'#111' }}>Ringkasan</span>
            <div style={{ flex:1, height:2, background:c, marginLeft:10, marginBottom:3 }}/>
          </div>
          <p style={{ fontSize:11, lineHeight:2, color:'#444', textAlign:'justify' }}>{profil}</p>
        </div>
        {/* 2-kolom utama */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 3fr', gap:0 }}>
          {/* Kiri: Keterampilan + Pendidikan */}
          <div style={{ padding:'20px 24px', borderRight:'1px solid #eee', display:'flex', flexDirection:'column', gap:24 }}>
            <div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:0, marginBottom:14 }}>
                <span style={{ fontWeight:900, fontSize:12, letterSpacing:3, textTransform:'uppercase', color:'#111' }}>Keterampilan</span>
                <div style={{ flex:1, height:2, background:c, marginLeft:10, marginBottom:3 }}/>
              </div>
              {skillList.map((s,i)=><div key={i} style={{ display:'flex', gap:8, marginBottom:7, fontSize:10 }}><span style={{ color:c, fontWeight:700 }}>✓</span>{s}</div>)}
            </div>
            <div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:0, marginBottom:14 }}>
                <span style={{ fontWeight:900, fontSize:12, letterSpacing:3, textTransform:'uppercase', color:'#111' }}>Pendidikan</span>
                <div style={{ flex:1, height:2, background:c, marginLeft:10, marginBottom:3 }}/>
              </div>
              {edu.map((e,i)=><div key={i} style={{ display:'flex', gap:12, marginBottom:14 }}>
                <div style={{ fontSize:9, color:'#aaa', fontWeight:700, minWidth:60, lineHeight:1.6 }}>{e.year}</div>
                <div><p style={{ fontSize:10, fontWeight:800 }}>{e.desc && e.desc}</p><p style={{ fontSize:10, fontWeight:800, color:'#222' }}>{e.school}</p></div>
              </div>)}
            </div>
            {(ttl || jk) && <div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:0, marginBottom:14 }}>
                <span style={{ fontWeight:900, fontSize:12, letterSpacing:3, textTransform:'uppercase', color:'#111' }}>Data Pribadi</span>
                <div style={{ flex:1, height:2, background:c, marginLeft:10, marginBottom:3 }}/>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:7, fontSize:10 }}>
                {ttl && <div style={{ display:'flex', gap:8 }}><Globe size={12} color={c}/>{ttl}</div>}
                {jk && <div style={{ display:'flex', gap:8 }}><User size={12} color={c}/>{jk}</div>}
              </div>
            </div>}
          </div>
          {/* Kanan: Pengalaman Kerja */}
          <div style={{ padding:'20px 28px' }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:0, marginBottom:16 }}>
              <span style={{ fontWeight:900, fontSize:12, letterSpacing:3, textTransform:'uppercase', color:'#111' }}>Pengalaman Kerja</span>
              <div style={{ flex:1, height:2, background:c, marginLeft:10, marginBottom:3 }}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {exp.map((e,i)=><div key={i} style={{ display:'flex', gap:16 }}>
                <div style={{ fontSize:9, color:'#aaa', fontWeight:700, minWidth:72, lineHeight:1.8 }}>{e.period}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:900, fontSize:11 }}>{e.comp}</p>
                  <p style={{ fontSize:10, color:c, fontWeight:700, marginBottom:6 }}>{e.pos}</p>
                  <ul style={{ paddingLeft:14, fontSize:10, lineHeight:1.9, color:'#444' }}>{e.desc.split('\n').filter(x=>x.trim()).map((x,j)=><li key={j}>{x.replace(/^-/,'').trim()}</li>)}</ul>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    );

    // fallback — tema 1
    return null;
  };

  return (
    <div ref={ref} id="cv-preview-render" style={{ width:793, background:'#fff' }}>
      {getContent()}
    </div>
  );
});

CVPreview.displayName = 'CVPreview';
export default CVPreview;
