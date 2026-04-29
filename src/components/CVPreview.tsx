import React from 'react';
import { Phone, Mail, MapPin, Briefcase, ClipboardList, Globe } from 'lucide-react';
import type { CVData } from '../types/cv';

interface CVPreviewProps { data: CVData; }

const CVPreview = React.forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {
  const { nama, profesi, profil, hp, email, alamat, photo, edu, exp, skills, theme, color } = data;
  const skillList = skills.split(',').map(s => s.trim()).filter(s => s);
  const c = color || '#9b87c4';

  const getContent = () => {
    if (theme === 1) return (
      <div style={{ display:'flex', width:'100%', minHeight:'297mm', fontFamily:'Inter,sans-serif', background:'#fff', color:'#333' }}>
        <div style={{ width:'40%', background: c, color:'#fff', padding:32, display:'flex', flexDirection:'column', gap:24 }}>
          {photo && <div style={{ width:120, height:120, borderRadius:'50%', overflow:'hidden', border:'4px solid rgba(255,255,255,0.5)', alignSelf:'center', marginTop:16 }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <h1 style={{ fontSize:22, fontWeight:900, lineHeight:1.2, textTransform:'uppercase', marginTop: photo ? 8 : 24 }}>{nama || 'Nama Lengkap'}</h1>
          <p style={{ fontSize:10, letterSpacing:3, textTransform:'uppercase', opacity:0.8 }}>{profesi || 'Profesi'}</p>
          <hr style={{ borderColor:'rgba(255,255,255,0.3)', margin:'8px 0' }} />
          <div>
            <p style={{ fontWeight:700, fontSize:10, textTransform:'uppercase', letterSpacing:2, marginBottom:8, opacity:0.7 }}>Profil Pribadi</p>
            <p style={{ fontSize:10, lineHeight:1.8, opacity:0.9 }}>{profil}</p>
          </div>
          <div>
            <p style={{ fontWeight:700, fontSize:10, textTransform:'uppercase', letterSpacing:2, marginBottom:8, opacity:0.7 }}>Pendidikan</p>
            {edu.map((e,i) => <div key={i} style={{ marginBottom:10 }}><p style={{ fontSize:9, opacity:0.7 }}>{e.year}</p><p style={{ fontSize:10, fontWeight:700 }}>{e.school}</p><p style={{ fontSize:9, opacity:0.7 }}>{e.desc}</p></div>)}
          </div>
          <div>
            <p style={{ fontWeight:700, fontSize:10, textTransform:'uppercase', letterSpacing:2, marginBottom:8, opacity:0.7 }}>Hobi</p>
            <p style={{ fontSize:10 }}>Membaca, Makan, Edit Video</p>
          </div>
        </div>
        <div style={{ width:'60%', padding:32, background:'#fafafa' }}>
          <div style={{ background:'#fff', borderRadius:12, padding:16, marginBottom:24, border:'1px solid #eee', fontSize:10, display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}><Phone size={14} color={c} />{hp}</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}><Mail size={14} color={c} />{email}</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}><Globe size={14} color={c} />{alamat}</div>
          </div>
          <div style={{ marginBottom:24 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}><ClipboardList size={16} color={c} /><span style={{ fontWeight:700, fontSize:12, color:c, textTransform:'uppercase', letterSpacing:2 }}>Keahlian</span></div>
            <ul style={{ paddingLeft:16, fontSize:10, lineHeight:2 }}>{skillList.map((s,i)=><li key={i}>{s}</li>)}</ul>
          </div>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:16 }}><Briefcase size={16} color={c} /><span style={{ fontWeight:700, fontSize:12, color:c, textTransform:'uppercase', letterSpacing:2 }}>Pengalaman</span></div>
            {exp.map((e,i) => <div key={i} style={{ paddingLeft:12, borderLeft:`2px solid ${c}`, marginBottom:16, position:'relative' }}><div style={{ width:8, height:8, borderRadius:'50%', background:c, position:'absolute', left:-5, top:2 }} /><p style={{ fontWeight:700, fontSize:11 }}>{e.period} | {e.comp}</p><p style={{ fontSize:10, color:'#666', margin:'4px 0' }}>{e.pos}</p><ul style={{ paddingLeft:14, fontSize:10, lineHeight:1.8, color:'#555' }}>{e.desc.split('\n').filter(x=>x.trim()).map((x,j)=><li key={j}>{x.replace(/^-/,'').trim()}</li>)}</ul></div>)}
          </div>
        </div>
      </div>
    );

    if (theme === 2) return (
      <div style={{ display:'flex', width:'100%', minHeight:'297mm', fontFamily:'Outfit,sans-serif', background:'#fff', color:'#333' }}>
        <div style={{ width:'35%', background:'#fdf2f2', padding:32, display:'flex', flexDirection:'column', gap:24 }}>
          {photo && <div style={{ width:140, height:140, borderRadius:'50%', overflow:'hidden', border:'4px solid #fff', alignSelf:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <div><p style={{ fontWeight:700, fontSize:9, textTransform:'uppercase', letterSpacing:3, borderBottom:'1px solid #ddd', paddingBottom:6, marginBottom:10 }}>Profil</p><p style={{ fontSize:10, lineHeight:1.8, fontStyle:'italic', color:'#666' }}>{profil}</p></div>
          <div><p style={{ fontWeight:700, fontSize:9, textTransform:'uppercase', letterSpacing:3, borderBottom:'1px solid #ddd', paddingBottom:6, marginBottom:10 }}>Kontak</p><div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:10 }}><span style={{ display:'flex', gap:6, alignItems:'center' }}><Mail size={12} />{email}</span><span style={{ display:'flex', gap:6, alignItems:'center' }}><Phone size={12} />{hp}</span><span style={{ display:'flex', gap:6, alignItems:'center' }}><MapPin size={12} />{alamat}</span></div></div>
        </div>
        <div style={{ width:'65%', padding:40 }}>
          <h1 style={{ fontSize:36, fontWeight:900, textTransform:'uppercase', letterSpacing:-1, lineHeight:1, marginBottom:4 }}>{nama || 'Nama Lengkap'}</h1>
          <p style={{ fontSize:11, letterSpacing:4, textTransform:'uppercase', color:c, opacity:0.7, marginBottom:32 }}>{profesi}</p>
          {[{title:'Pendidikan', items: edu.map(e=>({left:e.year, top:e.school, bot:e.desc}))}, {title:'Pengalaman Kerja', items: exp.map(e=>({left:e.period, top:e.pos, sub:e.comp, bot:e.desc}))}].map((sec,si)=>(<section key={si} style={{ marginBottom:24 }}><h2 style={{ fontSize:9, fontWeight:900, letterSpacing:3, textTransform:'uppercase', borderBottom:`2px solid ${c}`, paddingBottom:6, marginBottom:12 }}>{sec.title}</h2>{sec.items.map((item:any,i)=><div key={i} style={{ display:'flex', gap:16, marginBottom:12 }}><div style={{ width:72, fontSize:9, fontWeight:700, color:'#aaa', flexShrink:0 }}>{item.left}</div><div><p style={{ fontWeight:700, fontSize:10, textTransform:'uppercase' }}>{item.top}</p>{item.sub && <p style={{ fontSize:9, color:'#aaa', fontWeight:700, textTransform:'uppercase', margin:'2px 0' }}>{item.sub}</p>}<ul style={{ paddingLeft:12, fontSize:9, lineHeight:1.8, color:'#666' }}>{(item.bot||'').split('\n').filter((x:string)=>x.trim()).map((x:string,j:number)=><li key={j}>{x.replace(/^-/,'').trim()}</li>)}</ul></div></div>)}</section>))}
          <section><h2 style={{ fontSize:9, fontWeight:900, letterSpacing:3, textTransform:'uppercase', borderBottom:`2px solid ${c}`, paddingBottom:6, marginBottom:12 }}>Kemampuan</h2><div style={{ display:'flex', flexDirection:'column', gap:6 }}>{skillList.map((s,i)=><div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:10 }}><span>{s}</span><div style={{ display:'flex', gap:3 }}>{[1,2,3,4,5].map(d=><div key={d} style={{ width:8, height:8, borderRadius:'50%', background: d<=4?'#333':'#eee' }} />)}</div></div>)}</div></section>
        </div>
      </div>
    );

    if (theme === 3) return (
      <div style={{ width:'100%', minHeight:'297mm', padding:32, fontFamily:'Plus Jakarta Sans,sans-serif', background: c+'10', color:'#111' }}>
        <div style={{ display:'flex', gap:32, alignItems:'flex-start', marginBottom:32 }}>
          {photo && <div style={{ width:160, height:160, borderRadius:24, overflow:'hidden', border:`5px solid ${c}`, boxShadow:`0 8px 30px ${c}44`, flexShrink:0, transform:'rotate(-2deg)' }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <div style={{ flex:1, paddingTop:16 }}>
            <h1 style={{ fontSize:52, fontWeight:900, letterSpacing:-2, lineHeight:0.85, marginBottom:16, color:'#111' }}>{nama || 'Nama Lengkap'}</h1>
            <div style={{ display:'inline-block', padding:'8px 20px', background:c, color:'#fff', fontWeight:900, fontSize:10, textTransform:'uppercase', letterSpacing:3, borderRadius:999, border:`2px solid ${c}`, boxShadow:`4px 4px 0 ${c}88` }}>{profesi}</div>
            <p style={{ marginTop:20, fontSize:10, color:'#555', fontStyle:'italic', lineHeight:1.8, borderLeft:`4px solid ${c}`, paddingLeft:12, maxWidth:380 }}>{profil}</p>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'5fr 7fr', gap:20 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:'#fff', padding:20, borderRadius:28, border:`2px solid ${c}`, boxShadow:`6px 6px 0 ${c}` }}>
              <p style={{ fontWeight:900, fontSize:10, textTransform:'uppercase', letterSpacing:2, marginBottom:12, color:c }}>● Kontak</p>
              <ul style={{ display:'flex', flexDirection:'column', gap:8 }}>
                <li style={{ display:'flex', gap:8, alignItems:'center', fontSize:10, fontWeight:700 }}><Phone size={12} color={c}/>{hp}</li>
                <li style={{ display:'flex', gap:8, alignItems:'center', fontSize:10, fontWeight:700 }}><Mail size={12} color={c}/>{email}</li>
                <li style={{ display:'flex', gap:8, alignItems:'center', fontSize:10, fontWeight:700 }}><MapPin size={12} color={c}/>{alamat}</li>
              </ul>
            </div>
            <div style={{ background: c+'20', padding:20, borderRadius:28, border:`2px solid ${c}`, boxShadow:`6px 6px 0 ${c}` }}>
              <p style={{ fontWeight:900, fontSize:10, textTransform:'uppercase', letterSpacing:2, marginBottom:12, color:c }}>● Keahlian</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>{skillList.map((s,i)=><span key={i} style={{ padding:'4px 10px', background:c, color:'#fff', fontSize:9, borderRadius:999, fontWeight:700 }}>{s}</span>)}</div>
            </div>
            <div style={{ background: c+'15', padding:20, borderRadius:28, border:`2px solid ${c}`, boxShadow:`6px 6px 0 ${c}` }}>
              <p style={{ fontWeight:900, fontSize:10, textTransform:'uppercase', letterSpacing:2, marginBottom:12, color:c }}>● Pendidikan</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>{edu.map((e,i)=><div key={i}><p style={{ fontWeight:900, fontSize:10 }}>{e.school}</p><span style={{ display:'inline-block', background:c, color:'#fff', padding:'2px 8px', borderRadius:999, fontSize:8, fontWeight:900, margin:'4px 0' }}>{e.year}</span><p style={{ fontSize:9, color:'#666', fontStyle:'italic' }}>{e.desc}</p></div>)}</div>
            </div>
          </div>
          <div style={{ background:'#fff', padding:28, borderRadius:36, border:`2px solid ${c}`, boxShadow:`8px 8px 0 ${c}` }}>
            <div style={{ display:'inline-block', padding:'8px 20px', background:c, color:'#fff', borderRadius:999, fontWeight:900, fontSize:14, textTransform:'uppercase', marginBottom:24, transform:'rotate(-1deg)', boxShadow:`4px 4px 0 ${c}66` }}>✦ Pengalaman</div>
            {exp.map((e,i) => <div key={i} style={{ paddingLeft:20, borderLeft:`3px solid ${c}`, marginBottom:20, position:'relative' }}><div style={{ width:10, height:10, borderRadius:'50%', background:c, position:'absolute', left:-6, top:2, border:'2px solid #fff', boxShadow:`0 0 0 2px ${c}` }} /><h3 style={{ fontWeight:900, fontSize:12, textTransform:'uppercase', color:'#111' }}>{e.pos}</h3><div style={{ display:'flex', gap:10, margin:'6px 0', alignItems:'center' }}><span style={{ background:c, color:'#fff', fontSize:9, padding:'2px 8px', borderRadius:999, fontWeight:900 }}>{e.period}</span><span style={{ fontSize:10, fontWeight:900, color:'#888' }}>{e.comp}</span></div><ul style={{ paddingLeft:16, fontSize:10, lineHeight:1.8, color:'#555' }}>{e.desc.split('\n').filter(x=>x.trim()).map((x,j)=><li key={j}>{x.replace(/^-/,'').trim()}</li>)}</ul></div>)}
          </div>
        </div>
      </div>
    );

    if (theme === 4) return (
      <div style={{ display:'flex', width:'100%', minHeight:'297mm', fontFamily:'Inter,sans-serif', background:'#fff', color:'#111' }}>
        <div style={{ width:'65%', padding:48 }}>
          <div style={{ marginBottom:32, paddingBottom:24, borderBottom:`4px solid ${c}` }}>
            <h1 style={{ fontSize:44, fontWeight:900, letterSpacing:-2, textTransform:'uppercase', lineHeight:1, marginBottom:8 }}>{nama}</h1>
            <p style={{ fontSize:10, letterSpacing:5, textTransform:'uppercase', color:c, fontWeight:700 }}>{profesi}</p>
          </div>
          <div style={{ marginBottom:28 }}>
            <p style={{ fontSize:9, fontWeight:900, letterSpacing:4, textTransform:'uppercase', color:c, borderBottom:`2px solid ${c}22`, paddingBottom:6, marginBottom:12 }}>Profil Profesional</p>
            <p style={{ fontSize:11, lineHeight:1.9, color:'#555' }}>{profil}</p>
          </div>
          <div>
            <p style={{ fontSize:9, fontWeight:900, letterSpacing:4, textTransform:'uppercase', color:c, borderBottom:`2px solid ${c}22`, paddingBottom:6, marginBottom:16 }}>Pengalaman</p>
            {exp.map((e,i) => (
              <div key={i} style={{ marginBottom:20, paddingLeft:16, borderLeft:`3px solid ${c}`, position:'relative' }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:c, position:'absolute', left:-6, top:3 }} />
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <p style={{ fontWeight:900, fontSize:11, textTransform:'uppercase' }}>{e.pos}</p>
                  <span style={{ background:c, color:'#fff', fontSize:9, padding:'2px 10px', borderRadius:999, fontWeight:700, height:'fit-content' }}>{e.period}</span>
                </div>
                <p style={{ fontSize:9, color:c, textTransform:'uppercase', fontWeight:700, marginBottom:8 }}>{e.comp}</p>
                <ul style={{ paddingLeft:14, fontSize:10, lineHeight:1.8, color:'#555' }}>{e.desc.split('\n').filter(x=>x.trim()).map((x,j)=><li key={j}>{x.replace(/^-/,'').trim()}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width:'35%', background:c, padding:32, display:'flex', flexDirection:'column', gap:0 }}>
          {photo && <div style={{ width:140, height:140, borderRadius:'50%', overflow:'hidden', marginBottom:28, border:'4px solid rgba(255,255,255,0.4)', boxShadow:'0 8px 30px rgba(0,0,0,0.2)', alignSelf:'center' }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <h2 style={{ fontSize:20, fontWeight:900, color:'#fff', textAlign:'center', marginBottom:4, textTransform:'uppercase' }}>{nama}</h2>
          <p style={{ fontSize:9, color:'rgba(255,255,255,0.7)', textAlign:'center', letterSpacing:3, textTransform:'uppercase', marginBottom:28 }}>{profesi}</p>
          <hr style={{ borderColor:'rgba(255,255,255,0.2)', marginBottom:20 }} />
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:9, fontWeight:900, letterSpacing:3, textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:12 }}>Kontak</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:10, color:'#fff' }}>
              <span style={{ display:'flex', gap:8, alignItems:'center' }}><Mail size={13}/><span style={{ wordBreak:'break-all', fontSize:9 }}>{email}</span></span>
              <span style={{ display:'flex', gap:8, alignItems:'center' }}><Phone size={13}/><span style={{ fontSize:9 }}>{hp}</span></span>
              <span style={{ display:'flex', gap:8, alignItems:'center' }}><MapPin size={13}/><span style={{ fontSize:9 }}>{alamat}</span></span>
            </div>
          </div>
          <hr style={{ borderColor:'rgba(255,255,255,0.2)', marginBottom:20 }} />
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:9, fontWeight:900, letterSpacing:3, textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:12 }}>Pendidikan</p>
            {edu.map((e,i)=><div key={i} style={{ marginBottom:10 }}><p style={{ fontWeight:900, fontSize:10, textTransform:'uppercase', color:'#fff' }}>{e.school}</p><p style={{ fontSize:9, color:'rgba(255,255,255,0.6)', marginTop:2 }}>{e.year} • {e.desc}</p></div>)}
          </div>
          <hr style={{ borderColor:'rgba(255,255,255,0.2)', marginBottom:20 }} />
          <div>
            <p style={{ fontSize:9, fontWeight:900, letterSpacing:3, textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:12 }}>Keahlian</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>{skillList.map((s,i)=><span key={i} style={{ padding:'4px 10px', background:'rgba(255,255,255,0.2)', color:'#fff', fontSize:9, fontWeight:700, borderRadius:6, border:'1px solid rgba(255,255,255,0.3)' }}>{s}</span>)}</div>
          </div>
        </div>
      </div>
    );

    return (
      <div style={{ width:'100%', minHeight:'297mm', padding:48, fontFamily:'Inter,sans-serif', background:'#fff', color:'#333' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          {photo && <div style={{ width:88, height:88, borderRadius:'50%', overflow:'hidden', margin:'0 auto 20px', border:'1px solid #eee' }}><img src={photo} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="foto" /></div>}
          <h1 style={{ fontSize:32, fontWeight:300, letterSpacing:6, textTransform:'uppercase', color:'#111', marginBottom:6 }}>{nama}</h1>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:5, textTransform:'uppercase', color:'#aaa' }}>{profesi}</p>
          <div style={{ display:'flex', justifyContent:'center', gap:24, marginTop:24, paddingTop:16, borderTop:'1px solid #f0f0f0', borderBottom:'1px solid #f0f0f0', paddingBottom:16, fontSize:9, fontWeight:700, color:'#aaa', textTransform:'uppercase', letterSpacing:2 }}>
            <span style={{ display:'flex', gap:6, alignItems:'center' }}><Mail size={11} />{email}</span>
            <span style={{ display:'flex', gap:6, alignItems:'center' }}><Phone size={11} />{hp}</span>
            <span style={{ display:'flex', gap:6, alignItems:'center' }}><MapPin size={11} />{alamat}</span>
          </div>
        </div>
        <div style={{ maxWidth:560, margin:'0 auto', display:'flex', flexDirection:'column', gap:40 }}>
          <section><h2 style={{ fontSize:9, fontWeight:900, letterSpacing:5, textTransform:'uppercase', color:'#ccc', textAlign:'center', marginBottom:16 }}>Tentang Saya</h2><p style={{ fontSize:11, lineHeight:1.9, color:'#666', textAlign:'center', fontStyle:'italic' }}>{profil}</p></section>
          <section><h2 style={{ fontSize:9, fontWeight:900, letterSpacing:5, textTransform:'uppercase', color:'#ccc', textAlign:'center', marginBottom:20 }}>Pengalaman</h2>{exp.map((e,i)=><div key={i} style={{ textAlign:'center', marginBottom:24 }}><p style={{ fontWeight:700, fontSize:11, textTransform:'uppercase', marginBottom:4 }}>{e.pos}</p><p style={{ fontSize:9, color:'#aaa', textTransform:'uppercase', letterSpacing:2, marginBottom:8 }}>{e.comp} | {e.period}</p><p style={{ fontSize:10, color:'#666' }}>{e.desc.replace(/^-/gm,'').split('\n').filter(x=>x.trim()).join(' • ')}</p></div>)}</section>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, paddingTop:24, borderTop:'1px solid #f0f0f0' }}>
            <section><h2 style={{ fontSize:9, fontWeight:900, letterSpacing:5, textTransform:'uppercase', color:'#ccc', textAlign:'center', marginBottom:16 }}>Pendidikan</h2>{edu.map((e,i)=><div key={i} style={{ textAlign:'center', marginBottom:12 }}><p style={{ fontSize:10, fontWeight:700, textTransform:'uppercase' }}>{e.school}</p><p style={{ fontSize:9, color:'#aaa', textTransform:'uppercase', fontWeight:700, marginTop:2 }}>{e.year}</p></div>)}</section>
            <section><h2 style={{ fontSize:9, fontWeight:900, letterSpacing:5, textTransform:'uppercase', color:'#ccc', textAlign:'center', marginBottom:16 }}>Keahlian</h2><div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8 }}>{skillList.map((s,i)=><span key={i} style={{ fontSize:10, fontWeight:700, color:'#555', borderBottom:'2px solid #eee' }}>{s}</span>)}</div></section>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} id="cv-preview-render" style={{ width: '210mm', background:'#fff' }}>
      {getContent()}
    </div>
  );
});

CVPreview.displayName = 'CVPreview';
export default CVPreview;
