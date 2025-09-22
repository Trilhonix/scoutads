import { Creative, SearchFilters, CountryData, SubscriptionPlan } from './types';

// Mock data for development and testing
export const mockCreatives: Creative[] = [
  {
    creative_id: '1',
    fingerprint_text: 'weight-loss-ad-1',
    fingerprint_media: 'img-hash-1',
    first_seen: '2024-01-15T10:00:00Z',
    last_seen: '2024-01-22T15:30:00Z',
    media_type: 'image',
    preview_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    count_duplicates: 23,
    score: 87,
    countries: ['BR', 'US', 'MX'],
    advertiser: 'FitLife Solutions',
    snippet: 'Perca 10kg em 30 dias com nosso método revolucionário...',
    headline: 'Transforme seu corpo em 30 dias',
    text: 'Perca 10kg em 30 dias com nosso método revolucionário. Sem dietas malucas, sem exercícios extremos. Apenas resultados reais.',
    landing_url: 'https://fitlife.com/weight-loss',
    platform: 'facebook',
    days_active: 7,
    engagement_proxy: 1250,
    velocity: 3.2
  },
  {
    creative_id: '2',
    fingerprint_text: 'crypto-course-ad-1',
    fingerprint_media: 'img-hash-2',
    first_seen: '2024-01-10T08:00:00Z',
    last_seen: '2024-01-22T18:45:00Z',
    media_type: 'video',
    preview_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=600&fit=crop',
    count_duplicates: 45,
    score: 92,
    countries: ['BR', 'US', 'AR', 'CO'],
    advertiser: 'Crypto Academy',
    snippet: 'Aprenda a ganhar R$ 5.000/mês com criptomoedas...',
    headline: 'Do Zero ao Primeiro Bitcoin',
    text: 'Aprenda a ganhar R$ 5.000/mês com criptomoedas. Curso completo do básico ao avançado. Mais de 10.000 alunos aprovados.',
    landing_url: 'https://cryptoacademy.com/curso',
    platform: 'facebook',
    days_active: 12,
    engagement_proxy: 2890,
    velocity: 4.1
  },
  {
    creative_id: '3',
    fingerprint_text: 'dropshipping-ad-1',
    fingerprint_media: 'img-hash-3',
    first_seen: '2024-01-18T14:20:00Z',
    last_seen: '2024-01-22T20:15:00Z',
    media_type: 'carousel',
    preview_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop',
    count_duplicates: 18,
    score: 76,
    countries: ['BR', 'PT'],
    advertiser: 'E-commerce Masters',
    snippet: 'Monte sua loja online sem estoque e fature R$ 10k/mês...',
    headline: 'Dropshipping do Zero',
    text: 'Monte sua loja online sem estoque e fature R$ 10k/mês. Método testado e aprovado por mais de 5.000 empreendedores.',
    landing_url: 'https://ecommercemaster.com/dropshipping',
    platform: 'instagram',
    days_active: 4,
    engagement_proxy: 890,
    velocity: 2.8
  },
  {
    creative_id: '4',
    fingerprint_text: 'english-course-ad-1',
    fingerprint_media: 'img-hash-4',
    first_seen: '2024-01-05T09:30:00Z',
    last_seen: '2024-01-22T16:20:00Z',
    media_type: 'image',
    preview_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop',
    count_duplicates: 67,
    score: 95,
    countries: ['BR', 'MX', 'AR', 'CO', 'PE'],
    advertiser: 'English Pro',
    snippet: 'Fale inglês fluente em 6 meses com apenas 15 min/dia...',
    headline: 'Inglês Fluente em 6 Meses',
    text: 'Fale inglês fluente em 6 meses com apenas 15 min/dia. Método exclusivo usado por diplomatas e executivos.',
    landing_url: 'https://englishpro.com/fluente',
    platform: 'facebook',
    days_active: 17,
    engagement_proxy: 4250,
    velocity: 5.2
  },
  {
    creative_id: '5',
    fingerprint_text: 'trading-ad-1',
    fingerprint_media: 'img-hash-5',
    first_seen: '2024-01-20T11:45:00Z',
    last_seen: '2024-01-22T19:30:00Z',
    media_type: 'video',
    preview_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop',
    count_duplicates: 31,
    score: 83,
    countries: ['BR', 'US'],
    advertiser: 'Trade Master',
    snippet: 'Ganhe R$ 500/dia operando apenas 2 horas...',
    headline: 'Trading Profissional',
    text: 'Ganhe R$ 500/dia operando apenas 2 horas. Estratégias profissionais reveladas por trader com 15 anos de experiência.',
    landing_url: 'https://trademaster.com/curso',
    platform: 'facebook',
    days_active: 2,
    engagement_proxy: 1560,
    velocity: 3.8
  },
  {
    creative_id: '6',
    fingerprint_text: 'marketing-ad-1',
    fingerprint_media: 'img-hash-6',
    first_seen: '2024-01-12T13:15:00Z',
    last_seen: '2024-01-22T17:45:00Z',
    media_type: 'image',
    preview_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop',
    count_duplicates: 29,
    score: 79,
    countries: ['BR', 'PT', 'US'],
    advertiser: 'Digital Marketing Pro',
    snippet: 'Domine o marketing digital e multiplique seus resultados...',
    headline: 'Marketing Digital Avançado',
    text: 'Domine o marketing digital e multiplique seus resultados. Curso completo com cases reais e estratégias atualizadas.',
    landing_url: 'https://digitalmarketingpro.com/curso',
    platform: 'instagram',
    days_active: 10,
    engagement_proxy: 1890,
    velocity: 3.1
  },
  {
    creative_id: '7',
    fingerprint_text: 'real-estate-ad-1',
    fingerprint_media: 'img-hash-7',
    first_seen: '2024-01-08T16:00:00Z',
    last_seen: '2024-01-22T14:30:00Z',
    media_type: 'video',
    preview_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=600&fit=crop',
    count_duplicates: 52,
    score: 89,
    countries: ['BR', 'US', 'CA'],
    advertiser: 'Real Estate Academy',
    snippet: 'Invista em imóveis nos EUA e ganhe em dólar...',
    headline: 'Investimento Imobiliário Internacional',
    text: 'Invista em imóveis nos EUA e ganhe em dólar. Consultoria especializada para brasileiros investirem no exterior.',
    landing_url: 'https://realestate.com/invest',
    platform: 'facebook',
    days_active: 14,
    engagement_proxy: 3120,
    velocity: 4.5
  },
  {
    creative_id: '8',
    fingerprint_text: 'beauty-ad-1',
    fingerprint_media: 'img-hash-8',
    first_seen: '2024-01-16T12:30:00Z',
    last_seen: '2024-01-22T21:15:00Z',
    media_type: 'carousel',
    preview_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop',
    count_duplicates: 38,
    score: 81,
    countries: ['BR', 'AR', 'MX'],
    advertiser: 'Beauty Secrets',
    snippet: 'Rejuvenesça 10 anos com este tratamento revolucionário...',
    headline: 'Pele Jovem aos 50',
    text: 'Rejuvenesça 10 anos com este tratamento revolucionário. Resultados visíveis em 7 dias, aprovado por dermatologistas.',
    landing_url: 'https://beautysecrets.com/treatment',
    platform: 'instagram',
    days_active: 6,
    engagement_proxy: 2340,
    velocity: 3.9
  },
  {
    creative_id: '9',
    fingerprint_text: 'business-ad-1',
    fingerprint_media: 'img-hash-9',
    first_seen: '2024-01-14T09:45:00Z',
    last_seen: '2024-01-22T18:20:00Z',
    media_type: 'image',
    preview_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    count_duplicates: 41,
    score: 85,
    countries: ['BR', 'US', 'MX', 'CO'],
    advertiser: 'Business Mentor',
    snippet: 'Escale seu negócio para 7 dígitos em 12 meses...',
    headline: 'Negócio de 7 Dígitos',
    text: 'Escale seu negócio para 7 dígitos em 12 meses. Mentoria exclusiva com empresários que já faturaram milhões.',
    landing_url: 'https://businessmentor.com/scale',
    platform: 'facebook',
    days_active: 8,
    engagement_proxy: 2780,
    velocity: 4.2
  },
  {
    creative_id: '10',
    fingerprint_text: 'health-ad-1',
    fingerprint_media: 'img-hash-10',
    first_seen: '2024-01-19T15:20:00Z',
    last_seen: '2024-01-22T16:45:00Z',
    media_type: 'video',
    preview_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop',
    count_duplicates: 26,
    score: 78,
    countries: ['BR', 'PT'],
    advertiser: 'Health Plus',
    snippet: 'Elimine a diabetes tipo 2 naturalmente em 30 dias...',
    headline: 'Cura Natural da Diabetes',
    text: 'Elimine a diabetes tipo 2 naturalmente em 30 dias. Protocolo médico aprovado, sem medicamentos, apenas alimentação.',
    landing_url: 'https://healthplus.com/diabetes',
    platform: 'facebook',
    days_active: 3,
    engagement_proxy: 1670,
    velocity: 3.5
  }
];

export const mockCountries: CountryData[] = [
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', ad_count: 1247, growth_rate: 15.2 },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', ad_count: 892, growth_rate: 8.7 },
  { code: 'MX', name: 'México', flag: '🇲🇽', ad_count: 456, growth_rate: 12.3 },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', ad_count: 334, growth_rate: 9.8 },
  { code: 'CO', name: 'Colômbia', flag: '🇨🇴', ad_count: 278, growth_rate: 11.5 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', ad_count: 189, growth_rate: 7.2 },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', ad_count: 156, growth_rate: 13.1 },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦', ad_count: 134, growth_rate: 6.9 }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Para começar a explorar criativos que estão escalando',
    price_monthly: 0,
    price_yearly: 0,
    features: {
      searches_per_day: 10,
      downloads_per_month: 5,
      monitors: 0,
      workspaces: 1,
      api_access: false,
      priority_support: false,
      custom_webhooks: false,
      bulk_export: false,
      ai_insights: false,
      advanced_filters: false,
      historical_data_months: 1,
      concurrent_crawlers: 0
    },
    limits: {
      max_saved_searches: 3,
      max_swipe_files: 1,
      max_workspace_members: 1,
      rate_limit_per_minute: 10,
      storage_limit_gb: 0.1,
      export_limit_per_day: 1
    }
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal para afiliados e pequenos anunciantes',
    price_monthly: 47,
    price_yearly: 470,
    features: {
      searches_per_day: 100,
      downloads_per_month: 50,
      monitors: 3,
      workspaces: 1,
      api_access: false,
      priority_support: false,
      custom_webhooks: true,
      bulk_export: true,
      ai_insights: false,
      advanced_filters: true,
      historical_data_months: 6,
      concurrent_crawlers: 1
    },
    limits: {
      max_saved_searches: 20,
      max_swipe_files: 5,
      max_workspace_members: 3,
      rate_limit_per_minute: 30,
      storage_limit_gb: 1,
      export_limit_per_day: 5
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para profissionais de tráfego e agências pequenas',
    price_monthly: 97,
    price_yearly: 970,
    is_popular: true,
    features: {
      searches_per_day: 500,
      downloads_per_month: 200,
      monitors: 10,
      workspaces: 3,
      api_access: true,
      priority_support: true,
      custom_webhooks: true,
      bulk_export: true,
      ai_insights: true,
      advanced_filters: true,
      historical_data_months: 12,
      concurrent_crawlers: 3
    },
    limits: {
      max_saved_searches: 100,
      max_swipe_files: 20,
      max_workspace_members: 10,
      rate_limit_per_minute: 100,
      storage_limit_gb: 5,
      export_limit_per_day: 20
    }
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'Para agências e grandes anunciantes',
    price_monthly: 197,
    price_yearly: 1970,
    features: {
      searches_per_day: 2000,
      downloads_per_month: 1000,
      monitors: 50,
      workspaces: 10,
      api_access: true,
      priority_support: true,
      custom_webhooks: true,
      bulk_export: true,
      ai_insights: true,
      advanced_filters: true,
      historical_data_months: 24,
      concurrent_crawlers: 10
    },
    limits: {
      max_saved_searches: 500,
      max_swipe_files: 100,
      max_workspace_members: 50,
      rate_limit_per_minute: 500,
      storage_limit_gb: 50,
      export_limit_per_day: 100
    }
  }
];

export const defaultFilters: SearchFilters = {
  min_duplicates: 5,
  countries: [],
  platforms: ['facebook', 'instagram'],
  media_types: ['image', 'video', 'carousel'],
  sort_by: 'score',
  sort_order: 'desc'
};

// Sample queries for testing and development
export const sampleQueries = [
  'curso online',
  'emagrecimento',
  'bitcoin',
  'dropshipping',
  'inglês',
  'trading',
  'marketing digital',
  'investimento',
  'beleza',
  'negócio online',
  'saúde',
  'fitness',
  'educação',
  'tecnologia',
  'vendas',
  'empreendedorismo',
  'consultoria',
  'coaching',
  'imóveis',
  'criptomoedas'
];

// Utility functions for mock data
export const filterCreatives = (creatives: Creative[], filters: SearchFilters): Creative[] => {
  return creatives.filter(creative => {
    // Min duplicates filter
    if (creative.count_duplicates < filters.min_duplicates) return false;
    
    // Max duplicates filter
    if (filters.max_duplicates && creative.count_duplicates > filters.max_duplicates) return false;
    
    // Countries filter
    if (filters.countries.length > 0) {
      const hasMatchingCountry = creative.countries.some(country => 
        filters.countries.includes(country)
      );
      if (!hasMatchingCountry) return false;
    }
    
    // Platforms filter
    if (filters.platforms.length > 0 && !filters.platforms.includes(creative.platform)) {
      return false;
    }
    
    // Media types filter
    if (filters.media_types.length > 0 && !filters.media_types.includes(creative.media_type)) {
      return false;
    }
    
    // Query filter (search in text, headline, advertiser)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchableText = [
        creative.text,
        creative.headline,
        creative.advertiser,
        creative.snippet
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) return false;
    }
    
    // Date filters
    if (filters.date_from) {
      const creativeDate = new Date(creative.first_seen);
      const fromDate = new Date(filters.date_from);
      if (creativeDate < fromDate) return false;
    }
    
    if (filters.date_to) {
      const creativeDate = new Date(creative.last_seen);
      const toDate = new Date(filters.date_to);
      if (creativeDate > toDate) return false;
    }
    
    // Score filter
    if (filters.min_score && creative.score < filters.min_score) return false;
    if (filters.max_score && creative.score > filters.max_score) return false;
    
    // Days active filter
    if (filters.min_days_active && creative.days_active < filters.min_days_active) return false;
    if (filters.max_days_active && creative.days_active > filters.max_days_active) return false;
    
    // Landing domain filter
    if (filters.landing_domain && creative.landing_url) {
      try {
        const domain = new URL(creative.landing_url).hostname;
        if (!domain.includes(filters.landing_domain)) return false;
      } catch {
        return false;
      }
    }
    
    // Advertiser filter
    if (filters.advertiser) {
      const advertiserMatch = creative.advertiser.toLowerCase().includes(
        filters.advertiser.toLowerCase()
      );
      if (!advertiserMatch) return false;
    }
    
    return true;
  });
};

export const sortCreatives = (creatives: Creative[], sortBy: SearchFilters['sort_by'], sortOrder: SearchFilters['sort_order']): Creative[] => {
  return [...creatives].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'score':
        comparison = a.score - b.score;
        break;
      case 'duplicates':
        comparison = a.count_duplicates - b.count_duplicates;
        break;
      case 'days_active':
        comparison = a.days_active - b.days_active;
        break;
      case 'first_seen':
        comparison = new Date(a.first_seen).getTime() - new Date(b.first_seen).getTime();
        break;
      case 'last_seen':
        comparison = new Date(a.last_seen).getTime() - new Date(b.last_seen).getTime();
        break;
      default:
        comparison = a.score - b.score;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });
};

export const sortCreativesByScore = (creatives: Creative[]): Creative[] => {
  return sortCreatives(creatives, 'score', 'desc');
};

export const getCreativeById = (id: string): Creative | undefined => {
  return mockCreatives.find(creative => creative.creative_id === id);
};

export const getTopAdvertisers = (creatives: Creative[]): Array<{name: string, count: number}> => {
  const advertiserCounts = creatives.reduce((acc, creative) => {
    acc[creative.advertiser] = (acc[creative.advertiser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(advertiserCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

export const getTopCountries = (creatives: Creative[]): Array<{code: string, name: string, count: number}> => {
  const countryCounts = creatives.reduce((acc, creative) => {
    creative.countries.forEach(country => {
      acc[country] = (acc[country] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(countryCounts)
    .map(([code, count]) => {
      const countryData = mockCountries.find(c => c.code === code);
      return {
        code,
        name: countryData?.name || code,
        count
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

export const calculateScoreBreakdown = (creative: Creative) => {
  const weights = {
    variation: 0.3,
    country: 0.2,
    duration: 0.2,
    engagement: 0.2,
    recency: 0.1
  };

  const variation_score = Math.min(100, (creative.count_duplicates / 50) * 100);
  const country_score = Math.min(100, (creative.countries.length / 5) * 100);
  const duration_score = Math.min(100, (creative.days_active / 30) * 100);
  const engagement_score = creative.engagement_proxy ? Math.min(100, (creative.engagement_proxy / 5000) * 100) : 50;
  const recency_score = Math.max(0, 100 - (creative.days_active * 2));

  const total_score = Math.round(
    variation_score * weights.variation +
    country_score * weights.country +
    duration_score * weights.duration +
    engagement_score * weights.engagement +
    recency_score * weights.recency
  );

  return {
    variation_score: Math.round(variation_score),
    country_score: Math.round(country_score),
    duration_score: Math.round(duration_score),
    engagement_score: Math.round(engagement_score),
    recency_score: Math.round(recency_score),
    total_score,
    weights
  };
};