"use client";

import { useState } from 'react';
import { 
  Download, 
  Heart, 
  ExternalLink, 
  Calendar, 
  Copy, 
  MoreVertical,
  Play,
  Image as ImageIcon,
  RotateCcw,
  TrendingUp,
  Globe,
  Clock,
  Target
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Creative } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CreativeCardProps {
  creative: Creative;
  onSave?: (creative: Creative) => void;
  onDownload?: (creative: Creative) => void;
  onViewDetails?: (creative: Creative) => void;
  isSaved?: boolean;
}

// Utility functions
const formatDaysActive = (days: number): string => {
  if (days === 1) return '1 dia';
  if (days < 7) return `${days} dias`;
  if (days < 30) return `${Math.floor(days / 7)}sem`;
  return `${Math.floor(days / 30)}mês`;
};

const getScoreColor = (score: number): string => {
  if (score >= 90) return 'bg-green-500 text-white';
  if (score >= 80) return 'bg-blue-500 text-white';
  if (score >= 70) return 'bg-yellow-500 text-white';
  if (score >= 60) return 'bg-orange-500 text-white';
  return 'bg-red-500 text-white';
};

const getScoreLabel = (score: number): string => {
  if (score >= 90) return 'VIRAL';
  if (score >= 80) return 'ALTO';
  if (score >= 70) return 'BOM';
  if (score >= 60) return 'MÉDIO';
  return 'BAIXO';
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const getCountryFlag = (countryCode: string): string => {
  const flags: Record<string, string> = {
    'BR': '🇧🇷',
    'US': '🇺🇸',
    'MX': '🇲🇽',
    'AR': '🇦🇷',
    'CO': '🇨🇴',
    'PT': '🇵🇹',
    'PE': '🇵🇪',
    'CA': '🇨🇦'
  };
  return flags[countryCode] || '🌍';
};

const getPlatformIcon = (platform: string): string => {
  return platform === 'facebook' ? '📘' : '📷';
};

export function CreativeCard({ 
  creative, 
  onSave, 
  onDownload, 
  onViewDetails,
  isSaved = false 
}: CreativeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const scoreColorClass = getScoreColor(creative.score);
  const scoreLabel = getScoreLabel(creative.score);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-lg">
      <div className="relative">
        {/* Media Preview */}
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
            </div>
          )}
          
          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
              <ImageIcon className="h-12 w-12 mb-2" />
              <span className="text-sm">Preview indisponível</span>
            </div>
          ) : (
            <img
              src={creative.preview_url}
              alt={creative.headline || creative.snippet}
              className={cn(
                "w-full h-full object-cover transition-all duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          {/* Media Type Indicator */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs bg-black/70 text-white border-0">
              {creative.media_type === 'video' && <Play className="h-3 w-3 mr-1" />}
              {creative.media_type === 'carousel' && <RotateCcw className="h-3 w-3 mr-1" />}
              {creative.media_type === 'image' && <ImageIcon className="h-3 w-3 mr-1" />}
              {creative.media_type.charAt(0).toUpperCase() + creative.media_type.slice(1)}
            </Badge>
          </div>

          {/* Platform Indicator */}
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="text-xs bg-white/95 border-0">
              {getPlatformIcon(creative.platform)} {creative.platform}
            </Badge>
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onViewDetails?.(creative)}
              className="bg-white/95 hover:bg-white text-gray-900"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
          </div>
        </div>

        {/* Score Badge */}
        <div className="absolute -bottom-4 left-4">
          <div className={cn(
            "px-4 py-2 rounded-full text-sm font-bold shadow-lg",
            scoreColorClass
          )}>
            {creative.score} • {scoreLabel}
          </div>
        </div>
      </div>

      <CardContent className="p-5 pt-8">
        {/* Header Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1">
              {creative.headline || truncateText(creative.snippet, 50)}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {creative.advertiser}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0 ml-2 h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600 flex items-center justify-center gap-1">
              <Target className="h-4 w-4" />
              {creative.count_duplicates}
            </div>
            <div className="text-xs text-gray-500">Anúncios</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600 flex items-center justify-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDaysActive(creative.days_active)}
            </div>
            <div className="text-xs text-gray-500">Ativo</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600 flex items-center justify-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {creative.velocity?.toFixed(1) || '0.0'}
            </div>
            <div className="text-xs text-gray-500">Velocidade</div>
          </div>
        </div>

        {/* Countries */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-500 font-medium">Países Ativos:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {creative.countries.slice(0, 4).map((country) => (
              <span key={country} className="text-lg">
                {getCountryFlag(country)}
              </span>
            ))}
            {creative.countries.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{creative.countries.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Ad Copy Preview */}
        <div className="mb-5">
          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
            {truncateText(creative.text, 140)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSave?.(creative)}
            className={cn(
              "flex-1",
              isSaved && "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
            )}
          >
            <Heart className={cn("h-4 w-4 mr-2", isSaved && "fill-current")} />
            {isSaved ? 'Salvo' : 'Salvar'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload?.(creative)}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            Desde {new Date(creative.first_seen).toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: 'short' 
            })}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (creative.landing_url) {
                  window.open(creative.landing_url, '_blank');
                }
              }}
              className="text-xs p-1 h-auto hover:bg-gray-100"
              title="Abrir landing page"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(creative.text);
              }}
              className="text-xs p-1 h-auto hover:bg-gray-100"
              title="Copiar texto"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}