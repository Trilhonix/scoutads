"use client";

import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchFilters } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export function SearchBar({ filters, onFiltersChange, onSearch, isLoading }: SearchBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleQueryChange = (query: string) => {
    onFiltersChange({ ...filters, query });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const clearFilters = () => {
    onFiltersChange({
      min_duplicates: 5,
      countries: [],
      platforms: ['facebook', 'instagram'],
      media_types: ['image', 'video', 'carousel'],
      sort_by: 'score',
      sort_order: 'desc'
    });
  };

  const activeFiltersCount = [
    filters.query,
    filters.min_duplicates > 5,
    filters.max_duplicates,
    filters.countries.length > 0,
    filters.platforms.length < 2,
    filters.media_types.length < 3,
    filters.date_from,
    filters.date_to,
    filters.advertiser,
    filters.landing_domain,
    filters.min_score,
    filters.max_score,
    filters.min_days_active,
    filters.max_days_active
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por palavra-chave, anunciante, produto..."
            value={filters.query || ''}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-purple-500 rounded-xl"
          />
          {filters.query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQueryChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button 
          onClick={onSearch} 
          disabled={isLoading}
          size="lg"
          className="px-8 h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          Buscar
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "px-6 h-12 border-2",
            showAdvanced && "bg-purple-50 border-purple-200 text-purple-700"
          )}
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 font-medium">Filtros rápidos:</span>
        {[
          { label: 'Mín. 10 duplicatas', action: () => onFiltersChange({ ...filters, min_duplicates: 10 }) },
          { label: 'Mín. 20 duplicatas', action: () => onFiltersChange({ ...filters, min_duplicates: 20 }) },
          { label: 'Apenas Brasil', action: () => onFiltersChange({ ...filters, countries: ['BR'] }) },
          { label: 'Apenas Vídeos', action: () => onFiltersChange({ ...filters, media_types: ['video'] }) },
          { label: 'Score 80+', action: () => onFiltersChange({ ...filters, min_score: 80 }) }
        ].map((quickFilter) => (
          <Button
            key={quickFilter.label}
            variant="outline"
            size="sm"
            onClick={quickFilter.action}
            className="text-xs"
          >
            {quickFilter.label}
          </Button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Filtros Avançados</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar Todos
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Min Duplicates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mín. Duplicatas
              </label>
              <Input
                type="number"
                min="1"
                value={filters.min_duplicates}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  min_duplicates: parseInt(e.target.value) || 1
                })}
                className="w-full"
              />
            </div>

            {/* Max Duplicates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Máx. Duplicatas
              </label>
              <Input
                type="number"
                min="1"
                value={filters.max_duplicates || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  max_duplicates: e.target.value ? parseInt(e.target.value) : undefined
                })}
                placeholder="Sem limite"
                className="w-full"
              />
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Inicial
              </label>
              <Input
                type="date"
                value={filters.date_from || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  date_from: e.target.value || undefined
                })}
                className="w-full"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Final
              </label>
              <Input
                type="date"
                value={filters.date_to || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  date_to: e.target.value || undefined
                })}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Countries */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Países
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
                  { code: 'US', name: 'EUA', flag: '🇺🇸' },
                  { code: 'MX', name: 'México', flag: '🇲🇽' },
                  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
                  { code: 'CO', name: 'Colômbia', flag: '🇨🇴' }
                ].map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      const newCountries = filters.countries.includes(country.code)
                        ? filters.countries.filter(c => c !== country.code)
                        : [...filters.countries, country.code];
                      onFiltersChange({ ...filters, countries: newCountries });
                    }}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-1",
                      filters.countries.includes(country.code)
                        ? "bg-purple-100 border-purple-300 text-purple-700"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    <span>{country.flag}</span>
                    {country.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plataformas
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'facebook', label: 'Facebook', icon: '📘' },
                  { key: 'instagram', label: 'Instagram', icon: '📷' }
                ].map((platform) => (
                  <button
                    key={platform.key}
                    onClick={() => {
                      const newPlatforms = filters.platforms.includes(platform.key as any)
                        ? filters.platforms.filter(p => p !== platform.key)
                        : [...filters.platforms, platform.key as any];
                      onFiltersChange({ ...filters, platforms: newPlatforms });
                    }}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-1",
                      filters.platforms.includes(platform.key as any)
                        ? "bg-purple-100 border-purple-300 text-purple-700"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    <span>{platform.icon}</span>
                    {platform.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipos de Mídia
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'image', label: 'Imagem', icon: '🖼️' },
                  { key: 'video', label: 'Vídeo', icon: '🎥' },
                  { key: 'carousel', label: 'Carrossel', icon: '🎠' }
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => {
                      const newTypes = filters.media_types.includes(type.key as any)
                        ? filters.media_types.filter(t => t !== type.key)
                        : [...filters.media_types, type.key as any];
                      onFiltersChange({ ...filters, media_types: newTypes });
                    }}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-1",
                      filters.media_types.includes(type.key as any)
                        ? "bg-purple-100 border-purple-300 text-purple-700"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    <span>{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anunciante
              </label>
              <Input
                placeholder="Nome do anunciante..."
                value={filters.advertiser || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  advertiser: e.target.value || undefined
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domínio da Landing
              </label>
              <Input
                placeholder="exemplo.com"
                value={filters.landing_domain || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  landing_domain: e.target.value || undefined
                })}
              />
            </div>
          </div>

          {/* Score Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score Mínimo
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                value={filters.min_score || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  min_score: e.target.value ? parseInt(e.target.value) : undefined
                })}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score Máximo
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                value={filters.max_score || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  max_score: e.target.value ? parseInt(e.target.value) : undefined
                })}
                placeholder="100"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {filters.query && `Busca: "${filters.query}" • `}
              Mín. {filters.min_duplicates} duplicatas
              {filters.countries.length > 0 && ` • ${filters.countries.length} países`}
              {filters.platforms.length < 2 && ` • ${filters.platforms.join(', ')}`}
              {filters.media_types.length < 3 && ` • ${filters.media_types.join(', ')}`}
            </div>
            <Button onClick={onSearch} className="bg-purple-600 hover:bg-purple-700">
              Aplicar Filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}