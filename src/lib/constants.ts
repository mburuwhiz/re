export const VISIBILITY_OPTIONS = [
  { value: 'public' as const, label: 'Public', description: 'Visible on the landing page gallery', icon: 'globe' },
  { value: 'pinned' as const, label: 'Pinned', description: 'Featured in the hero section', icon: 'star' },
  { value: 'unlisted' as const, label: 'Unlisted', description: 'Only accessible via direct link', icon: 'lock' },
];

export const EXPIRY_OPTIONS = [
  { value: '3d' as const, label: '3 Days' },
  { value: '1m' as const, label: '1 Month' },
  { value: '1y' as const, label: '1 Year' },
  { value: 'never' as const, label: 'Never' },
];

export const MAX_FILE_SIZE_MB = 50;
export const SUPPORTED_FILE_TYPES = ['application/pdf'];
export const WEBP_QUALITY = 0.85;
export const TARGET_DPI = 150;
