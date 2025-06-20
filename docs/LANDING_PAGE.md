# 🎯 Landing Page - Don Menu

## Visão Geral

Esta landing page foi criada especificamente para capturar leads e impulsionar conversões para o Don Menu. Ela é otimizada para campanhas de marketing digital, incluindo Google Ads, Facebook Ads, LinkedIn Ads e outras plataformas.

## 📍 URL da Landing Page

```
https://seu-dominio.com/landing
```

## 🎨 Características da Landing Page

### ✅ **Elementos de Conversão**

1. **Hero Section Otimizada**
   - Headline persuasivo com benefício claro
   - Subheadline com prova social (500+ restaurantes)
   - CTA principal destacado
   - Formulário de captura integrado

2. **Formulário de Captura**
   - Campo de email obrigatório
   - Validação em tempo real
   - Mensagem de sucesso
   - Garantias de segurança

3. **Popup de Captura**
   - Aparece após 30 segundos
   - Oferta especial com benefícios extras
   - Design não intrusivo
   - Fechamento automático após conversão

4. **Seções Persuasivas**
   - Problemas identificados (dores do cliente)
   - Soluções oferecidas
   - Resultados comprovados
   - Depoimentos reais
   - Múltiplos CTAs

### 🎯 **Otimizações para Conversão**

- **Urgência**: "Oferta Especial" e "7 dias grátis"
- **Escassez**: "50% de desconto" limitado
- **Prova Social**: "500+ restaurantes ativos" e avaliações
- **Benefícios Claros**: "Aumente seu lucro em até 40%"
- **Redução de Fricção**: "Setup em 10 minutos"

## 📊 Integração com Analytics

### Google Analytics 4
```javascript
// Eventos rastreados:
- lead_capture (formulário principal)
- lead_capture_popup (popup)
- trial_signup (botão "Começar Agora")
- demo_request (botão "Ver Demo")
```

### Facebook Pixel
```javascript
// Eventos rastreados:
- Lead (captura de email)
- Purchase (assinatura)
- PageView (visualização da página)
```

### LinkedIn Insight Tag
```javascript
// Eventos rastreados:
- lead_capture
- trial_signup
- page_view
```

## 🔧 Configuração

### 1. Variáveis de Ambiente
```env
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX

# LinkedIn Insight Tag
NEXT_PUBLIC_LINKEDIN_ID=XXXXXXXXXX
```

### 2. Integração com Email Marketing
Edite o arquivo `app/landing/page.tsx` e `components/LeadCapturePopup.tsx` para integrar com seu sistema:

```javascript
// Exemplo para Mailchimp
const response = await fetch('https://us1.api.mailchimp.com/3.0/lists/LIST_ID/members', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      SOURCE: 'landing_page'
    }
  })
})
```

### 3. API de Leads
Crie o endpoint `/api/leads` para processar os leads:

```javascript
// pages/api/leads.ts
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, source, utm_source, utm_medium, utm_campaign } = req.body

  try {
    // Salvar no banco de dados
    // Enviar para CRM
    // Enviar email de boas-vindas
    
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar lead' })
  }
}
```

## 📈 Otimização para Campanhas

### Google Ads
- **Palavras-chave**: "sistema restaurante", "precificação restaurante", "controle custos restaurante"
- **Copy**: Foque em "aumentar lucro" e "precificação automática"
- **Landing Page**: Use UTM parameters para rastreamento

### Facebook Ads
- **Audience**: Proprietários de restaurantes, 25-55 anos
- **Interests**: Restaurante, gastronomia, empreendedorismo
- **Placements**: Feed, Stories, Marketplace
- **Creative**: Vídeos curtos mostrando o sistema em ação

### LinkedIn Ads
- **Audience**: Proprietários de restaurantes, gerentes de restaurante
- **Company Size**: 1-50 funcionários
- **Industries**: Restaurantes, alimentação, hospitalidade

## 🎨 Personalização

### Cores e Branding
Edite as cores no arquivo `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0fdf4',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
      }
    }
  }
}
```

### Conteúdo
- **Headlines**: Teste diferentes versões
- **Benefícios**: Adapte para seu público-alvo
- **Depoimentos**: Use casos reais de clientes
- **CTAs**: Teste diferentes textos e cores

## 📱 Responsividade

A landing page é totalmente responsiva e otimizada para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Performance

### Otimizações Implementadas
- Lazy loading de imagens
- CSS otimizado com Tailwind
- JavaScript minimalista
- Carregamento rápido (< 3s)

### Métricas de Performance
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🔍 SEO

### Meta Tags
```html
<title>Don Menu - Transforme seu restaurante em 30 dias | Sistema de Precificação</title>
<meta name="description" content="500+ restaurantes já aumentaram seus lucros com o Don Menu. Precificação inteligente, controle de custos e assistente de IA. Teste grátis por 7 dias.">
<meta name="keywords" content="sistema restaurante, precificação restaurante, controle custos, ficha técnica, cardápio digital">
```

### Schema Markup
```javascript
// Adicione schema markup para melhor SEO
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Don Menu",
  "description": "Sistema de gestão para restaurantes",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
    "description": "7 dias grátis"
  }
}
```

## 📊 A/B Testing

### Elementos para Testar
1. **Headlines**: "Transforme seu restaurante" vs "Aumente seu lucro"
2. **CTAs**: "Começar Agora" vs "Teste Grátis"
3. **Cores**: Verde vs Azul vs Laranja
4. **Formulário**: Lado direito vs lado esquerdo
5. **Popup**: 30s vs 60s vs scroll trigger

### Ferramentas Recomendadas
- Google Optimize
- VWO (Visual Website Optimizer)
- Optimizely

## 📞 Suporte

Para dúvidas sobre a landing page:
- Email: suporte@donmenu.com.br
- WhatsApp: (11) 99999-9999
- Documentação: docs.donmenu.com.br

---

**Última atualização**: Janeiro 2024
**Versão**: 1.0.0 