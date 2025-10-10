'use client';

import { useEffect } from 'react';

export default function PWAInstaller() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // PWA Install prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      
      // Update UI to notify the user they can add to home screen
      showInstallPromotion();
    });

    function showInstallPromotion() {
      // You can customize this to show your own install UI
      const installBanner = document.createElement('div');
      installBanner.innerHTML = `
        <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: #3b82f6; color: white; padding: 16px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1000; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>Instalar App</strong>
            <p style="margin: 4px 0 0 0; font-size: 14px;">Adicione SSBJr Landing Pages à sua tela inicial</p>
          </div>
          <div>
            <button id="install-button" style="background: white; color: #3b82f6; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; margin-right: 8px; cursor: pointer;">Instalar</button>
            <button id="dismiss-button" style="background: transparent; color: white; border: 1px solid white; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Depois</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(installBanner);
      
      document.getElementById('install-button')?.addEventListener('click', () => {
        // Hide the app provided install promotion
        installBanner.remove();
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
        });
      });
      
      document.getElementById('dismiss-button')?.addEventListener('click', () => {
        installBanner.remove();
      });
    }

    window.addEventListener('appinstalled', (evt) => {
      console.log('App was installed.', evt);
    });

  }, []);

  return null; // This component doesn't render anything
}