// Configuração de Analytics e Tracking para Landing Page

export interface LeadData {
  email: string
  source: string
  timestamp: Date
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export interface ConversionEvent {
  type: 'lead_capture' | 'trial_signup' | 'demo_request' | 'contact_form'
  data: LeadData
  value?: number
}

// Função para capturar leads
export const captureLead = async (leadData: LeadData): Promise<boolean> => {
  try {
    // Aqui você pode integrar com:
    // - Google Analytics 4
    // - Facebook Pixel
    // - LinkedIn Insight Tag
    // - Email marketing (Mailchimp, ConvertKit, etc.)
    // - CRM (HubSpot, Salesforce, etc.)
    
    console.log('Lead capturado:', leadData)
    
    // Exemplo de integração com Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_capture', {
        event_category: 'engagement',
        event_label: leadData.source,
        value: 1
      })
    }
    
    // Exemplo de integração com Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Don Menu Landing Page',
        content_category: 'Restaurant Software',
        value: 1,
        currency: 'BRL'
      })
    }
    
    // Enviar para API do seu sistema
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    })
    
    return response.ok
  } catch (error) {
    console.error('Erro ao capturar lead:', error)
    return false
  }
}

// Função para rastrear conversões
export const trackConversion = async (event: ConversionEvent): Promise<void> => {
  try {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.type, {
        event_category: 'conversion',
        event_label: event.data.source,
        value: event.value || 1
      })
    }
    
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        content_name: 'Don Menu Subscription',
        content_category: 'Restaurant Software',
        value: event.value || 1,
        currency: 'BRL'
      })
    }
    
    // LinkedIn Insight Tag
    if (typeof window !== 'undefined' && (window as any).lintrk) {
      (window as any).lintrk('track', {
        conversion_id: event.type,
        value: event.value || 1
      })
    }
    
    console.log('Conversão rastreada:', event)
  } catch (error) {
    console.error('Erro ao rastrear conversão:', error)
  }
}

// Função para obter parâmetros UTM
export const getUTMParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {}
  
  const urlParams = new URLSearchParams(window.location.search)
  const utmParams: Record<string, string> = {}
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  
  utmKeys.forEach(key => {
    const value = urlParams.get(key)
    if (value) {
      utmParams[key] = value
    }
  })
  
  return utmParams
}

// Função para identificar fonte do tráfego
export const getTrafficSource = (): string => {
  if (typeof window === 'undefined') return 'direct'
  
  const utmParams = getUTMParams()
  
  if (utmParams.utm_source) {
    return utmParams.utm_source
  }
  
  const referrer = document.referrer
  if (referrer) {
    const url = new URL(referrer)
    if (url.hostname.includes('google')) return 'google'
    if (url.hostname.includes('facebook')) return 'facebook'
    if (url.hostname.includes('instagram')) return 'instagram'
    if (url.hostname.includes('linkedin')) return 'linkedin'
    return url.hostname
  }
  
  return 'direct'
}

// Configuração de retargeting
export const setupRetargeting = (): void => {
  if (typeof window === 'undefined') return
  
  // Facebook Pixel - Custom Audience
  if ((window as any).fbq) {
    (window as any).fbq('track', 'PageView')
  }
  
  // Google Ads - Remarketing
  if ((window as any).gtag) {
    (window as any).gtag('config', 'AW-CONVERSION-ID', {
      page_title: 'Don Menu - Landing Page',
      page_location: window.location.href
    })
  }
}

// Função para configurar analytics na página
export const initializeAnalytics = (): void => {
  if (typeof window === 'undefined') return
  
  // Configurar Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('config', 'G-XXXXXXXXXX', {
      page_title: 'Don Menu - Landing Page',
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'utm_source',
        'custom_parameter_2': 'utm_medium',
        'custom_parameter_3': 'utm_campaign'
      }
    })
  }
  
  // Configurar Facebook Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', 'PageView')
  }
  
  // Configurar LinkedIn Insight Tag
  if ((window as any).lintrk) {
    (window as any).lintrk('track', { conversion_id: 'page_view' })
  }
  
  setupRetargeting()
} 