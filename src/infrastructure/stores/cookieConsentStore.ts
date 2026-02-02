/**
 * Cookie Consent Store using Zustand
 * Manages cookie preference state with localStorage persistence
 * Compliant with PDPA (Thailand) and GDPR standards
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CookiePreferences {
  necessary: boolean; // Always true, required for site to function
  analytics: boolean; // Google Analytics, etc.
  marketing: boolean; // Advertising cookies
  functional: boolean; // Enhanced functionality
}

interface CookieConsentState {
  // State
  hasConsented: boolean;
  consentDate: string | null;
  preferences: CookiePreferences;
  showBanner: boolean;
  showSettings: boolean;

  // Actions
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: Partial<CookiePreferences>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  resetConsent: () => void;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set) => ({
      // Initial state
      hasConsented: false,
      consentDate: null,
      preferences: DEFAULT_PREFERENCES,
      showBanner: true,
      showSettings: false,

      // Accept all cookies
      acceptAll: () => {
        set({
          hasConsented: true,
          consentDate: new Date().toISOString(),
          preferences: {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true,
          },
          showBanner: false,
          showSettings: false,
        });
      },

      // Reject all optional cookies
      rejectAll: () => {
        set({
          hasConsented: true,
          consentDate: new Date().toISOString(),
          preferences: {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false,
          },
          showBanner: false,
          showSettings: false,
        });
      },

      // Save custom preferences
      savePreferences: (newPreferences: Partial<CookiePreferences>) => {
        set((state) => ({
          hasConsented: true,
          consentDate: new Date().toISOString(),
          preferences: {
            ...state.preferences,
            ...newPreferences,
            necessary: true, // Always required
          },
          showBanner: false,
          showSettings: false,
        }));
      },

      // Open settings modal
      openSettings: () => {
        set({ showSettings: true });
      },

      // Close settings modal
      closeSettings: () => {
        set({ showSettings: false });
      },

      // Reset consent (for testing or when user wants to change)
      resetConsent: () => {
        set({
          hasConsented: false,
          consentDate: null,
          preferences: DEFAULT_PREFERENCES,
          showBanner: true,
          showSettings: false,
        });
      },
    }),
    {
      name: 'haqq-vault-cookie-consent',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        hasConsented: state.hasConsented,
        consentDate: state.consentDate,
        preferences: state.preferences,
        showBanner: !state.hasConsented, // Show banner if not consented
      }),
    }
  )
);
