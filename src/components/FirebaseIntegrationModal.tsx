import React, { useState } from 'react';
import { X, Database, Check, Copy, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import { firebaseConfig } from '../firebase';

interface FirebaseIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConnected: boolean;
  reservationsCount: number;
  menuItemsCount: number;
}

export const FirebaseIntegrationModal: React.FC<FirebaseIntegrationModalProps> = ({
  isOpen,
  onClose,
  isConnected,
  reservationsCount,
  menuItemsCount
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  if (!isOpen) return null;

  // The client script to drop into their external HTML file
  const externalSiteScriptSnippet = `<!-- ========================================== -->
<!-- TOTOT KITFO FIREBASE BACKEND INTEGRATION   -->
<!-- Paste this right before </body> in your    -->
<!-- other website HTML to sync Menu & Bookings -->
<!-- ========================================== -->

<!-- 1. Firebase App & Firestore SDKs (v10 modular/compat) -->
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>

<script>
  // 2. Your Totot Firebase Configuration
  const firebaseConfig = {
    apiKey: "${firebaseConfig.apiKey}",
    authDomain: "${firebaseConfig.authDomain}",
    projectId: "${firebaseConfig.projectId}",
    storageBucket: "${firebaseConfig.storageBucket}",
    messagingSenderId: "${firebaseConfig.messagingSenderId}",
    appId: "${firebaseConfig.appId}",
    measurementId: "${firebaseConfig.measurementId}"
  };

  // 3. Initialize Firebase & Firestore
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  // 4. Real-time Live Menu Synchronization
  // Pulls dishes directly managed from your Totot Admin Console!
  db.collection('menu_items').where('available', '==', true).onSnapshot((snapshot) => {
    const liveMenu = { specialties: [], sides: [], drinks: [] };
    
    snapshot.forEach(doc => {
      const item = doc.data();
      const cat = item.category || 'specialties';
      if (liveMenu[cat]) {
        liveMenu[cat].push({
          name: item.name,
          desc: item.description,
          price: (item.price || 0) + ' ETB'
        });
      }
    });

    // Update the local menuData object and re-render if active
    if (typeof menuData !== 'undefined') {
      if (liveMenu.specialties.length) menuData.specialties = liveMenu.specialties;
      if (liveMenu.sides.length) menuData.sides = liveMenu.sides;
      if (liveMenu.drinks.length) menuData.drinks = liveMenu.drinks;
      
      const activeBtn = document.querySelector('.tab-btn.active');
      const activeTab = activeBtn ? activeBtn.dataset.tab : 'specialties';
      if (typeof renderMenu === 'function') {
        renderMenu(activeTab);
      }
    }
  }, (err) => {
    console.warn('Firestore live menu listener note:', err);
  });

  // 5. Connect Table Reservation Form Directly to Firestore Backend
  const reserveForm = document.getElementById('reserveForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (reserveForm) {
    reserveForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.textContent = 'Registering with Totot Front Desk...';
        submitBtn.disabled = true;
      }

      const rName = document.getElementById('rName')?.value || '';
      const rPhone = document.getElementById('rPhone')?.value || '';
      const rGuests = document.getElementById('rGuests')?.value || '2 People';
      const rDate = document.getElementById('rDate')?.value || '';
      const rTime = document.getElementById('rTime')?.value || '';

      const numericGuests = parseInt(rGuests) || 2;

      try {
        // Save booking directly to Firestore 'reservations' collection
        await db.collection('reservations').add({
          customerName: rName,
          contactPhone: rPhone,
          partySize: numericGuests,
          date: rDate,
          time: rTime,
          status: 'Pending',
          isVIP: false,
          specialRequests: 'Online booking via Consumer Website',
          createdAt: new Date().toISOString()
        });

        if (formSuccess) {
          formSuccess.classList.add('show');
        }
        if (submitBtn) {
          submitBtn.textContent = 'Table Reserved!';
        }
        reserveForm.reset();
      } catch (error) {
        console.error('Reservation error:', error);
        alert('Could not submit booking: ' + error.message);
        if (submitBtn) {
          submitBtn.textContent = 'Confirm Reservation';
          submitBtn.disabled = false;
        }
      }
    });
  }
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(externalSiteScriptSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(firebaseConfig, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-3xl overflow-hidden shadow-2xl animate-fadeIn text-[#1A1A1A] my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#EFECE5]/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#1A1A1A] text-[#FDFCF5] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50">
                Cloud Backend Pipeline
              </div>
              <h3 className="font-serif italic text-[20px] font-normal text-[#1A1A1A]">
                Firebase Firestore Real-Time Connection
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-1.5 rounded-md hover:bg-[#EFECE5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status Banner */}
          <div className="p-4 rounded-md border border-[#1A1A1A]/10 bg-[#FFFFFF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
              <div>
                <p className="text-[13px] font-bold text-[#1A1A1A]">
                  Connected to <code className="bg-[#EFECE5] px-1.5 py-0.5 rounded font-mono text-[12px]">{firebaseConfig.projectId}</code>
                </p>
                <p className="text-[11px] text-[#1A1A1A]/60">
                  Real-time database sync active: {reservationsCount} bookings, {menuItemsCount} dishes in Firestore.
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyConfig}
              className="px-3.5 py-1.5 border border-[#1A1A1A]/15 hover:bg-[#EFECE5] rounded-md text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A] flex items-center gap-1.5 shrink-0"
            >
              {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedConfig ? 'Config Copied' : 'Copy Config JSON'}</span>
            </button>
          </div>

          {/* Explanation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-2">
              How Both Sites Are Connected
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px]">
              <div className="p-3.5 rounded-md bg-[#FAF8F0] border border-[#1A1A1A]/10">
                <p className="font-bold text-[#1A1A1A] mb-1">1. Live Reservations Flow</p>
                <p className="text-[#1A1A1A]/70 text-[12px] leading-relaxed">
                  When a customer fills out the reservation form on your other website, it writes directly to your Firestore <code className="font-mono text-[11px] bg-[#EFECE5] px-1 rounded">reservations</code> collection. It appears instantly in this Admin Console without refreshing!
                </p>
              </div>
              <div className="p-3.5 rounded-md bg-[#FAF8F0] border border-[#1A1A1A]/10">
                <p className="font-bold text-[#1A1A1A] mb-1">2. Dynamic Menu Catalog</p>
                <p className="text-[#1A1A1A]/70 text-[12px] leading-relaxed">
                  Any price change, dish availability toggle, or new item added in this Admin Console updates the <code className="font-mono text-[11px] bg-[#EFECE5] px-1 rounded">menu_items</code> collection, automatically rendering on your consumer site in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Script Snippet for the other site */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/70">
                Drop-in Code Snippet for your other HTML site:
              </label>
              <button
                onClick={handleCopyCode}
                className="px-4 py-1.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded-md text-[11px] font-bold tracking-[0.15em] uppercase transition-all shadow-2xs flex items-center gap-1.5"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Code Snippet Copied!' : 'Copy Script Code'}</span>
              </button>
            </div>
            <pre className="bg-[#1A1A1A] text-[#FDFCF5] p-4 rounded-md text-[11px] font-mono overflow-x-auto max-h-64 leading-relaxed select-all">
              {externalSiteScriptSnippet}
            </pre>
            <p className="text-[11px] text-[#1A1A1A]/60 mt-1.5">
              💡 Simply paste this code block directly right before <code className="font-mono bg-[#EFECE5] px-1 rounded text-[#1A1A1A]">&lt;/body&gt;</code> in your attached HTML website file.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1A1A1A]/10 bg-[#EFECE5]/40 flex justify-between items-center">
          <div className="text-[11px] text-[#1A1A1A]/60">
            Project: <strong className="text-[#1A1A1A] font-mono">{firebaseConfig.projectId}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1A1A1A] text-[#FDFCF5] font-bold tracking-[0.2em] uppercase rounded-md hover:bg-[#333333] text-[11px] transition-all shadow-2xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
