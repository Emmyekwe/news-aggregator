

export const colors = {
    // Primary Colors
    primary: '#000000',
    primaryHover: '#1a1a1a',
    
    // Secondary Colors
    secondary: '#2563eb',
    secondaryHover: '#1d4ed8',
    
    // Accent Colors
    accent: '#062659',
    accentLight: '#c2e8ff',
    
    // Background Colors
    bgMain: '#f0f2f5',
    bgWhite: '#ffffff',
    bgHover: '#c2e8ff',
    bgDark: '#010d1b',
    
    // Text Colors
    textPrimary: '#000000',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    textWhite: '#ffffff',
    
    // Border Colors
    border: '#e5e7eb',
    borderHover: '#d1d5db',
    
    // Status Colors
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6',
  } as const;
  
  export type ColorKey = keyof typeof colors;
  