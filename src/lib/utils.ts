import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function calculateDaysActive(firstSeen: string, lastSeen: string): number {
  const first = new Date(firstSeen);
  const last = new Date(lastSeen);
  const diffTime = Math.abs(last.getTime() - first.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formatDaysActive(days: number): string {
  if (days === 0) return 'Hoje';
  if (days === 1) return '1 dia';
  if (days < 7) return `${days} dias`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 semana' : `${weeks} semanas`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return months === 1 ? '1 mês' : `${months} meses`;
  }
  const years = Math.floor(days / 365);
  return years === 1 ? '1 ano' : `${years} anos`;
}

export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}k`;
  return `${(num / 1000000).toFixed(1)}M`;
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600 bg-green-50';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50';
  if (score >= 50) return 'text-orange-600 bg-orange-50';
  return 'text-red-600 bg-red-50';
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excelente';
  if (score >= 70) return 'Bom';
  if (score >= 50) return 'Regular';
  return 'Baixo';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'BR': '🇧🇷',
    'US': '🇺🇸',
    'MX': '🇲🇽',
    'AR': '🇦🇷',
    'CO': '🇨🇴',
    'PT': '🇵🇹',
    'PE': '🇵🇪',
    'CL': '🇨🇱',
    'UY': '🇺🇾',
    'PY': '🇵🇾',
    'BO': '🇧🇴',
    'EC': '🇪🇨',
    'VE': '🇻🇪',
    'CA': '🇨🇦',
    'GB': '🇬🇧',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
    'IT': '🇮🇹',
    'ES': '🇪🇸'
  };
  return flags[countryCode] || '🌍';
}

export function getCountryName(countryCode: string): string {
  const names: Record<string, string> = {
    'BR': 'Brasil',
    'US': 'Estados Unidos',
    'MX': 'México',
    'AR': 'Argentina',
    'CO': 'Colômbia',
    'PT': 'Portugal',
    'PE': 'Peru',
    'CL': 'Chile',
    'UY': 'Uruguai',
    'PY': 'Paraguai',
    'BO': 'Bolívia',
    'EC': 'Equador',
    'VE': 'Venezuela',
    'CA': 'Canadá',
    'GB': 'Reino Unido',
    'DE': 'Alemanha',
    'FR': 'França',
    'IT': 'Itália',
    'ES': 'Espanha'
  };
  return names[countryCode] || countryCode;
}

export function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    'facebook': '📘',
    'instagram': '📷',
    'youtube': '📺',
    'tiktok': '🎵',
    'twitter': '🐦',
    'linkedin': '💼'
  };
  return icons[platform] || '🌐';
}

export function getMediaTypeIcon(mediaType: string): string {
  const icons: Record<string, string> = {
    'image': '🖼️',
    'video': '🎥',
    'carousel': '🎠',
    'collection': '📚'
  };
  return icons[mediaType] || '📄';
}

export function generateFingerprint(text: string): string {
  // Simple hash function for demo purposes
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch (_) {
    return url;
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function saveToLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
}