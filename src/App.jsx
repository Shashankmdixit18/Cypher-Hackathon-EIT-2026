import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { AccessibilityProvider } from './context/AccessibilityContext'

import Header from './components/Header'
import Footer from './components/Footer'
import SOSButton from './components/SOSButton'
import ParticlesBg from './components/ParticlesBg'
import TravelElements3D from './components/TravelElements3D'
import GlassAuroras from './components/GlassAuroras'

import HomePage from './pages/HomePage'
import GuidePage from './pages/GuidePage'
import CrowdPage from './pages/CrowdPage'
import TransportPage from './pages/TransportPage'
import SafetyPage from './pages/SafetyPage'
import EtiquettePage from './pages/EtiquettePage'
import NotFoundPage from './pages/NotFoundPage'

const PAGE_META = {
  '/': {
    title: { en: 'Gurudwara Bangla Sahib', hi: 'गुरुद्वारा बांग्ला साहिब' },
    description: {
      en: 'Plan a thoughtful visit to Gurudwara Bangla Sahib with heritage stories, travel guidance, crowd insights, and visitor information.',
      hi: 'गुरुद्वारा बंगला साहिब की यात्रा की योजना बनाएँ—इतिहास, यात्रा मार्गदर्शन, भीड़ की जानकारी और आगंतुक सुझावों के साथ।',
    },
  },
  '/guide': {
    title: { en: 'Heritage Story Walk', hi: 'ऐतिहासिक कहानी यात्रा' },
    description: {
      en: 'Explore six stories at Gurudwara Bangla Sahib with an interactive map, audio narration, and optional nearby arrival alerts.',
      hi: 'इंटरैक्टिव मानचित्र, ऑडियो और वैकल्पिक स्थान-आधारित सूचनाओं के साथ गुरुद्वारा बंगला साहिब की छह कहानियाँ जानें।',
    },
  },
  '/crowd': {
    title: { en: 'Crowd Guide', hi: 'भीड़ मार्गदर्शिका' },
    description: {
      en: 'Review estimated visitor patterns and practical planning notes for Gurudwara Bangla Sahib.',
      hi: 'गुरुद्वारा बंगला साहिब के अनुमानित आगंतुक पैटर्न और यात्रा योजना संबंधी सुझाव देखें।',
    },
  },
  '/transport': {
    title: { en: 'Transport Guide', hi: 'यातायात मार्गदर्शिका' },
    description: {
      en: 'Compare transport options, approximate fares, pickup points, and directions to Gurudwara Bangla Sahib.',
      hi: 'गुरुद्वारा बंगला साहिब तक पहुँचने के लिए यातायात विकल्प, अनुमानित किराया और दिशा-निर्देश देखें।',
    },
  },
  '/safety': {
    title: { en: 'Visitor Safety', hi: 'आगंतुक सुरक्षा' },
    description: {
      en: 'Find emergency contact numbers and safety information for your visit to Gurudwara Bangla Sahib.',
      hi: 'गुरुद्वारा बंगला साहिब की यात्रा के लिए आपातकालीन संपर्क नंबर और सुरक्षा जानकारी पाएँ।',
    },
  },
  '/etiquette': {
    title: { en: 'Visitor Etiquette', hi: 'आगंतुक शिष्टाचार' },
    description: {
      en: 'Learn respectful visitor etiquette and practical guidance before visiting Gurudwara Bangla Sahib.',
      hi: 'गुरुद्वारा बंगला साहिब जाने से पहले आगंतुक शिष्टाचार और उपयोगी सुझाव जानें।',
    },
  },
}

function PageMetadata() {
  const { pathname } = useLocation()
  const { lang } = useLanguage()
  const language = lang === 'hi' ? 'hi' : 'en'

  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const page = PAGE_META[path]
    const title = page
      ? `${page.title[language]} | Heritage Companion`
      : language === 'en'
        ? 'Page not found | Heritage Companion'
        : 'पृष्ठ नहीं मिला | Heritage Companion'
    const description = page
      ? page.description[language]
      : language === 'en'
        ? 'The page you requested could not be found. Explore the Heritage Companion for Gurudwara Bangla Sahib.'
        : 'आपका अनुरोधित पृष्ठ नहीं मिला। गुरुद्वारा बंगला साहिब के लिए हेरिटेज कम्पैनियन देखें।'

    document.title = title
    let descriptionTag = document.querySelector('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.name = 'description'
      document.head.appendChild(descriptionTag)
    }
    descriptionTag.content = description
  }, [language, pathname])

  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <div className="relative flex flex-col min-h-screen selection:bg-gold-300 selection:text-ink-900">
          <PageMetadata />
          {/* Ambient liquid glass auroras */}
          <GlassAuroras />

          {/* Animated atlas flight paths and destination beacons */}
          <ParticlesBg />

          {/* Ambient 3D travel elements */}
          <TravelElements3D />

          {/* Retro-modern header */}
          <Header />

          {/* Main content container with responsive max-width & padding */}
          <main className="relative z-10 min-w-0 flex-1 w-full pb-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/crowd" element={<CrowdPage />} />
              <Route path="/transport" element={<TransportPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/etiquette" element={<EtiquettePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Floating retro SOS button */}
          <SOSButton />

        </div>
      </AccessibilityProvider>
    </LanguageProvider>
  )
}
