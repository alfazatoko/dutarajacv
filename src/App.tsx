import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import BottomNav from './components/BottomNav';
import type { CVData } from './types/cv';
import { db } from './lib/firebase';
import { collection, addDoc, doc, updateDoc, getDoc, serverTimestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { CheckCircle } from 'lucide-react';
import { auth, googleProvider } from './lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';

const initialData: CVData = {
  nama: 'Cahaya Dewi',
  profesi: 'Admin Sosial Media',
  profil: 'Nama saya Cahaya Dewi. Saya lulusan komunikasi yang mencintai dunia internet. Saya memiliki banyak pengalaman menjadi admin sosial media selama 3 tahun.',
  hp: '0812-3456-7890',
  email: 'hello@reallygreatsite.com',
  alamat: 'Jakarta, Indonesia',
  ttl: 'Jakarta, 01 Jan 1995',
  jk: 'Perempuan',
  photo: '',
  edu: [{ year: '2014-2017', school: 'Universitas Fauget', desc: 'S1 Komunikasi' }],
  exp: [{ comp: 'Hanover and Tyke', period: '2014-2017', pos: 'Admin Sosial Media', desc: '- Konten kreator dengan membuat konten terupdate sehari-hari\n- Membuat konten gambar dengan informasi terbaru' }],
  skills: 'Copywriting, Analisis Data, Bahasa Inggris, Desain Grafis',
  theme: 1,
  color: '#9b87c4',
  updatedAt: null,
};

function App() {
  const [data, setData] = useState<CVData>(initialData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [cvId, setCvId] = useState<string | null>(null);
  const [userCVs, setUserCVs] = useState<{id: string, nama: string}[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.45);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, 'cvs'), 
            where('userId', '==', user.uid),
            orderBy('updatedAt', 'desc')
          );
          const querySnapshot = await getDocs(q);
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            nama: (doc.data() as CVData).nama || 'Tanpa Nama'
          }));
          setUserCVs(docs);
        } catch (e) {
          console.error("Error fetching history:", e);
        }
      } else {
        setUserCVs([]);
      }
    };
    fetchHistory();
  }, [user, isSaving]);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth - 32;
        const A4_WIDTH_PX = 793; // 210mm at 96dpi
        setPreviewScale(Math.min(containerWidth / A4_WIDTH_PX, 1));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      loadCV(id);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const loadCV = async (id: string) => {
    try {
      const docRef = doc(db, 'cvs', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as CVData);
        setCvId(id);
      }
    } catch (error) {
      console.error("Error loading CV:", error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (cvId) {
        const docRef = doc(db, 'cvs', cvId);
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
      } else {
        const docRef = await addDoc(collection(db, 'cvs'), {
          ...data,
          updatedAt: serverTimestamp(),
        });
        setCvId(docRef.id);
        window.history.pushState({}, '', `?id=${docRef.id}`);
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error saving CV:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const handleDownload = () => {
    if (!previewRef.current) return;
    const element = previewRef.current;
    element.classList.add('pdf-export-mode');
    
    const opt = {
      margin: 0,
      filename: `CV_${data.nama.replace(/\s+/g, '_') || 'Maker'}.pdf`,
      image: { type: 'jpeg' as const, quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        logging: false,
        scrollY: 0,
        windowWidth: 793
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const, compress: true },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      element.classList.remove('pdf-export-mode');
    });
  };

  const handleSectionClick = (section: string) => {
    setActiveTab('edit');
    setTimeout(() => {
      const element = document.getElementById(`${section}-section`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-blue-500/20', 'ring-offset-2');
        setTimeout(() => element.classList.remove('ring-4', 'ring-blue-500/20', 'ring-offset-2'), 2000);
      }
    }, 100);
  };

  const handleLoadCV = async (id: string) => {
    try {
      const docSnap = await getDoc(doc(db, 'cvs', id));
      if (docSnap.exists()) {
        setData(docSnap.data() as CVData);
        setCvId(id);
        setActiveTab('preview');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLayoutClick = () => {
    setActiveTab('edit');
    setTimeout(() => {
      const el = document.getElementById('theme-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-md-surface transition-all duration-300">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
        onDownload={handleDownload}
        onSave={handleSave}
        isSaving={isSaving}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onInstallPWA={handleInstallPWA}
        showInstallBtn={!!deferredPrompt}
        history={userCVs}
        onLoadCV={handleLoadCV}
      />
      
      <main className="max-w-7xl mx-auto pt-20 px-4 md:px-8">

        <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Layout for Mobile (Tab based) */}
        <div className={`w-full lg:w-1/2 ${activeTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
          <div className="mb-4">
            <h2 className="text-2xl font-bold tracking-tight px-2">Halo, {data.nama || 'Pengguna'} 👋</h2>
            <p className="text-sm text-gray-500 px-2">Ayo lengkapi data CV Anda hari ini.</p>
          </div>
          <CVForm data={data} onChange={(newData) => setData({ ...data, ...newData })} />
        </div>

        {/* Preview Side */}
        <div className={`w-full lg:w-1/2 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-20 pb-10">
            <div className="hidden lg:flex justify-between items-center mb-4 px-2">
              <h2 className="text-lg font-bold">Pratinjau Hasil</h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">A4 Standar</span>
            </div>
            {/* Preview container — scales CV to fit container width */}
            <div ref={previewContainerRef} style={{
              background: '#e2e8f0',
              borderRadius: 24,
              padding: 24,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              minHeight: 200,
            }}>
              {/* Outer div collapses to the scaled height */}
              <div style={{
                width: 793 * previewScale,
                height: 1122 * previewScale,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
                borderRadius: 2,
                flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 793,
                  transformOrigin: 'top left',
                  transform: `scale(${previewScale})`,
                }}>
                  <CVPreview data={data} ref={previewRef} onSectionClick={handleSectionClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl animate-fade-in z-[2000]">
          <CheckCircle size={18} className="text-green-400" />
          <span className="text-sm font-medium">CV Berhasil Disimpan Online!</span>
        </div>
      )}

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onDownload={handleDownload}
        onLayoutClick={handleLayoutClick}
      />
    </div>
  );
}

export default App;
