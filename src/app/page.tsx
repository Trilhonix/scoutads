"use client";

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Settings, 
  Bell, 
  User,
  BarChart3,
  TrendingUp,
  Eye,
  Zap,
  RefreshCw,
  Target,
  Globe,
  Calendar,
  Crown,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/search-bar';
import { CreativeCard } from '@/components/creative-card';
import { SearchFilters, Creative } from '@/lib/types';
import { 
  mockCreatives, 
  defaultFilters, 
  filterCreatives, 
  sortCreatives,
  getTopAdvertisers,
  getTopCountries,
  subscriptionPlans
} from '@/lib/mock-data';
import { saveToLocalStorage, loadFromLocalStorage } from '@/hooks/use-local-storage';

export default function ScoutAdsDashboard() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [creatives, setCreatives] = useState<Creative[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedCreatives, setSavedCreatives] = useState<Set<string>>(new Set());
  const [isAutoCrawling, setIsAutoCrawling] = useState(false);
  const [currentPlan] = useState('pro'); // Mock current plan
  const [showTrialBanner, setShowTrialBanner] = useState(true);

  // Load saved preferences on mount
  useEffect(() => {
    const savedFilters = loadFromLocalStorage('scoutads-filters', defaultFilters);
    const savedCreativeIds = loadFromLocalStorage('scoutads-saved', []);
    
    setFilters(savedFilters);
    setSavedCreatives(new Set(savedCreativeIds));
    
    // Initial search with saved filters
    handleSearch(savedFilters);
  }, []);

  // Save filters to localStorage when they change
  useEffect(() => {
    saveToLocalStorage('scoutads-filters', filters);
  }, [filters]);

  const handleSearch = async (searchFilters = filters) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const filtered = filterCreatives(mockCreatives, searchFilters);
    const sorted = sortCreatives(filtered, searchFilters.sort_by, searchFilters.sort_order);
    
    setCreatives(sorted);
    setIsLoading(false);
  };

  const handleSaveCreative = (creative: Creative) => {
    const newSaved = new Set(savedCreatives);
    
    if (newSaved.has(creative.creative_id)) {
      newSaved.delete(creative.creative_id);
    } else {
      newSaved.add(creative.creative_id);
    }
    
    setSavedCreatives(newSaved);
    saveToLocalStorage('scoutads-saved', Array.from(newSaved));
  };

  const handleDownloadCreative = (creative: Creative) => {
    // Simulate download
    console.log('Downloading creative:', creative.creative_id);
    // In real app, this would trigger actual download via proxy service
  };

  const handleViewDetails = (creative: Creative) => {
    // In real app, this would open a detailed view modal or page
    console.log('Viewing details for:', creative.creative_id);
  };

  const toggleAutoCrawl = () => {
    setIsAutoCrawling(!isAutoCrawling);
    // In real app, this would start/stop the background crawler
  };

  const topAdvertisers = getTopAdvertisers(creatives);
  const topCountries = getTopCountries(creatives);
  const currentPlanData = subscriptionPlans.find(p => p.id === currentPlan);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Trial Banner */}
      {showTrialBanner && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5" />
              <span className="text-sm font-medium">
                Você está no plano <strong>{currentPlanData?.name}</strong> • 
                Restam <strong>47 buscas</strong> hoje • 
                <strong>12 downloads</strong> este mês
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" className="text-purple-700">
                Upgrade
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTrialBanner(false)}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">ScoutAds</h1>
              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                BETA
              </Badge>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant={isAutoCrawling ? "default" : "outline"}
                size="sm"
                onClick={toggleAutoCrawl}
                className="hidden sm:flex"
              >
                <RefreshCw className={`h-4 w-4 ${isAutoCrawling ? 'animate-spin' : ''}`} />
                {isAutoCrawling ? 'Pausar Crawler' : 'Iniciar Crawler'}
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-100">Total Criativos</p>
                  <p className="text-2xl font-bold">{creatives.length}</p>
                  <p className="text-xs text-purple-200 mt-1">+12% vs ontem</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Score Médio</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {creatives.length > 0 
                      ? Math.round(creatives.reduce((acc, c) => acc + c.score, 0) / creatives.length)
                      : 0
                    }
                  </p>
                  <p className="text-xs text-green-600 mt-1">+5.2% vs semana</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Salvos</p>
                  <p className="text-2xl font-bold text-gray-900">{savedCreatives.size}</p>
                  <p className="text-xs text-blue-600 mt-1">Swipe File</p>
                </div>
                <Download className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Status Crawler</p>
                  <p className="text-sm font-bold text-green-600">
                    {isAutoCrawling ? 'Coletando' : 'Pausado'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {isAutoCrawling ? 'Última coleta: 2min' : 'Última coleta: 1h'}
                  </p>
                </div>
                <Zap className={`h-8 w-8 ${isAutoCrawling ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={() => handleSearch()}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with insights */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Advertisers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Top Anunciantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topAdvertisers.slice(0, 5).map((advertiser, index) => (
                  <div key={advertiser.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        #{index + 1}
                      </span>
                      <span className="text-sm text-gray-900 truncate">
                        {advertiser.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {advertiser.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Top Países
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topCountries.slice(0, 5).map((country, index) => (
                  <div key={country.code} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        #{index + 1}
                      </span>
                      <span className="text-sm text-gray-900">
                        {country.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {country.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar CSV
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Filter className="h-4 w-4 mr-2" />
                  Salvar Filtros
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Criar Monitor
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Relatório
                </Button>
              </CardContent>
            </Card>

            {/* Legal Notice */}
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                  <div className="text-xs text-amber-800">
                    <p className="font-medium mb-1">Aviso Legal</p>
                    <p>
                      Dados coletados da Biblioteca de Anúncios pública do Meta. 
                      Não fornecemos métricas de spend/ROAS. Use responsavelmente.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Creative Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Criativos Escalando
                </h2>
                <p className="text-sm text-gray-600">
                  {isLoading ? 'Buscando na Biblioteca de Anúncios...' : `${creatives.length} criativos encontrados`}
                  {filters.min_duplicates > 1 && ` • Mín. ${filters.min_duplicates} duplicatas`}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  className="text-sm border border-gray-200 rounded-md px-3 py-1"
                  value={`${filters.sort_by}-${filters.sort_order}`}
                  onChange={(e) => {
                    const [sort_by, sort_order] = e.target.value.split('-') as [SearchFilters['sort_by'], SearchFilters['sort_order']];
                    setFilters({ ...filters, sort_by, sort_order });
                    handleSearch({ ...filters, sort_by, sort_order });
                  }}
                >
                  <option value="score-desc">Maior Score</option>
                  <option value="duplicates-desc">Mais Duplicatas</option>
                  <option value="days_active-desc">Mais Dias Ativo</option>
                  <option value="first_seen-desc">Mais Recente</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[4/5] rounded-t-xl"></div>
                    <div className="bg-white p-4 rounded-b-xl border border-t-0">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-gray-200 rounded flex-1"></div>
                        <div className="h-8 bg-gray-200 rounded flex-1"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Creative Grid */}
            {!isLoading && creatives.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {creatives.map((creative) => (
                  <CreativeCard
                    key={creative.creative_id}
                    creative={creative}
                    onSave={handleSaveCreative}
                    onDownload={handleDownloadCreative}
                    onViewDetails={handleViewDetails}
                    isSaved={savedCreatives.has(creative.creative_id)}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && creatives.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum criativo encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar seus filtros ou fazer uma nova busca.
                  <br />
                  Dica: Reduza o número mínimo de duplicatas para ver mais resultados.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setFilters({ ...filters, min_duplicates: 1 });
                      handleSearch({ ...filters, min_duplicates: 1 });
                    }}
                  >
                    Mostrar Todos
                  </Button>
                  <Button onClick={() => handleSearch()}>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar Novamente
                  </Button>
                </div>
              </div>
            )}

            {/* Load More */}
            {!isLoading && creatives.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" className="px-8">
                  Carregar Mais Resultados
                  <span className="ml-2 text-xs text-gray-500">(Simulado)</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}