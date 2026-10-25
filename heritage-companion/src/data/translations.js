/**
 * translations.js
 * All UI label strings in English and Hindi.
 * Components must import t() from LanguageContext — never hardcode strings.
 *
 * Keys are grouped by feature area for easy maintenance.
 */

const translations = {

  // ─── Navigation ────────────────────────────────────────────────────────────
  nav: {
    guide:     { en: "Guide",     hi: "गाइड" },
    crowd:     { en: "Crowd",     hi: "भीड़" },
    transport: { en: "Transport", hi: "यातायात" },
    safety:    { en: "Safety",    hi: "सुरक्षा" },
    settings:  { en: "Settings",  hi: "सेटिंग्स" },
  },

  // ─── Home Page ──────────────────────────────────────────────────────────────
  home: {
    tagline:          { en: "Your pocket guide to Gurudwara Bangla Sahib", hi: "गुरुद्वारा बांग्ला साहिब के लिए आपका पॉकेट गाइड" },
    startExploring:   { en: "Start Exploring",   hi: "अन्वेषण शुरू करें" },
    viewEtiquette:    { en: "Visitor Etiquette", hi: "आगंतुक शिष्टाचार" },
    openingHours:     { en: "Opening Hours",     hi: "खुलने का समय" },
    address:          { en: "Address",           hi: "पता" },
  },

  // ─── Guide Page ─────────────────────────────────────────────────────────────
  guide: {
    pageTitle:       { en: "Story Guide",          hi: "कहानी गाइड" },
    audioPlay:       { en: "Play Audio",           hi: "ऑडियो चलाएं" },
    audioPause:      { en: "Pause",                hi: "रुकें" },
    audioStop:       { en: "Stop",                 hi: "बंद करें" },
    audioPlaying:    { en: "Playing…",             hi: "चल रहा है…" },
    point:           { en: "Point",                hi: "बिंदु" },
    of:              { en: "of",                   hi: "का" },
    next:            { en: "Next",                 hi: "अगला" },
    previous:        { en: "Previous",             hi: "पिछला" },
    listenInHindi:   { en: "Listen in Hindi",      hi: "हिंदी में सुनें" },
    listenInEnglish: { en: "Listen in English",    hi: "अंग्रेज़ी में सुनें" },
    ttsNotSupported: { en: "Audio not supported on this device.", hi: "इस डिवाइस पर ऑडियो समर्थित नहीं है।" },
  },

  // ─── Crowd Page ─────────────────────────────────────────────────────────────
  crowd: {
    pageTitle:        { en: 'Crowd Meter',               hi: 'भीड़ मीटर' },
    currentLevel:     { en: 'Current Crowd Level',       hi: 'वर्तमान भीड़ स्तर' },
    bestTime:         { en: 'Best Time to Visit',        hi: 'आने का सबसे अच्छा समय' },
    chartTitle:       { en: 'Expected Crowd by Hour',    hi: 'घंटे के अनुसार अपेक्षित भीड़' },
    low:              { en: 'Low',                       hi: 'कम' },
    medium:           { en: 'Moderate',                  hi: 'मध्यम' },
    high:             { en: 'Busy',                      hi: 'व्यस्त' },
    vhigh:            { en: 'Very Busy',                 hi: 'बहुत व्यस्त' },
    today:            { en: 'Today',                     hi: 'आज' },
    weekday:          { en: 'Weekday',                   hi: 'सप्ताह का दिन' },
    saturday:         { en: 'Saturday',                  hi: 'शनिवार' },
    sunday:           { en: 'Sunday',                    hi: 'रविवार' },
    hourLabel:        { en: 'Hour',                      hi: 'घंटा' },
    crowdLabel:       { en: 'Crowd %',                   hi: 'भीड़ %' },
    dailyVisitors:    { en: 'Daily Visitors',            hi: 'दैनिक आगंतुक' },
    festivalAlert:    { en: '🎉 Festival / Gurpurab Alert', hi: '🎉 त्यौहार / गुरपुरब अलर्ट' },
    sourceLabel:      { en: 'Data source',               hi: 'डेटा स्रोत' },
    dayNote:          { en: 'Pattern note',              hi: 'पैटर्न नोट' },
  },

  // ─── Transport Page ─────────────────────────────────────────────────────────
  transport: {
    pageTitle:        { en: "Transport & Fares",         hi: "यातायात और किराया" },
    badge:            { en: "TRANSIT & FAIR FARES",      hi: "स्थानीय आवागमन और उचित किराया" },
    fareChecker:      { en: "Fair-Fare Checker",         hi: "उचित किराया जांचकर्ता" },
    selectMode:       { en: "Select transport mode",     hi: "यातायात का तरीका चुनें" },
    approxFare:       { en: "Approximate Fare",          hi: "अनुमानित किराया" },
    route:            { en: "Route & Directions",        hi: "मार्ग और दिशा-निर्देश" },
    tip:              { en: "Local Travel Tip",          hi: "स्थानीय यात्रा सुझाव" },
    walkInfo:         { en: "Walking Route",             hi: "पैदल मार्ग" },
    accessibility:    { en: "Senior & Accessibility",    hi: "वरिष्ठ व दिव्यांग सुगमता" },
    parkingTitle:     { en: "Parking Advisory",          hi: "पार्किंग सलाह" },
    parkingNote:      { en: "Parking Information",       hi: "पार्किंग जानकारी" },
    fareDisclaimer:   {
      en: "Fares are based on DMRC tariff & standard Delhi NCR auto/cab metrics. Always check meter or in-app fare before boarding.",
      hi: "किराया DMRC शुल्क और दिल्ली NCR के ऑटो/कैब मानकों पर आधारित है। यात्रा शुरू करने से पहले हमेशा मीटर या ऐप किराया जांचें।"
    },
    mapTitle:         { en: "Transit Stops & Pickup Points", hi: "ट्रांजिट स्टॉप और पिकअप पॉइंट" },
    viewOnMap:        { en: "View on Map",               hi: "मानचित्र पर देखें" },
    metroRecommended: {
      en: "Recommended: Take the Metro (Yellow/Blue line) to avoid central Delhi gridlock during peak hours.",
      hi: "अनुशंसा: पीक आवर्स में मध्य दिल्ली के जाम से बचने के लिए मेट्रो (येलो/ब्लू लाइन) लें।"
    },
    officialRates:    { en: "Official Fare Guidelines",  hi: "आधिकारिक किराया दिशानिर्देश" },
  },

  // ─── Safety Page ────────────────────────────────────────────────────────────
  safety: {
    pageTitle:        { en: "Safety & SOS",              hi: "सुरक्षा और SOS" },
    sosButton:        { en: "🆘 SOS – Call for Help",    hi: "🆘 SOS – मदद के लिए कॉल करें" },
    sosConfirm:       { en: "Call emergency services?",  hi: "आपातकालीन सेवाओं को कॉल करें?" },
    emergencyTitle:   { en: "Emergency Numbers",         hi: "आपातकालीन नंबर" },
    callButton:       { en: "Call",                      hi: "कॉल करें" },
    sosFloatingLabel: { en: "SOS",                       hi: "SOS" },
  },

  // ─── Etiquette Card ─────────────────────────────────────────────────────────
  etiquette: {
    pageTitle:     { en: "Visitor Etiquette",             hi: "आगंतुक शिष्टाचार" },
    subtitle:      { en: "Please follow these guidelines to respect this sacred place.", hi: "इस पवित्र स्थान का सम्मान करने के लिए कृपया इन दिशानिर्देशों का पालन करें।" },
    understood:    { en: "I understand",                  hi: "मैं समझता/समझती हूँ" },
  },

  // ─── Settings Page ──────────────────────────────────────────────────────────
  settings: {
    pageTitle:          { en: "Settings",               hi: "सेटिंग्स" },
    language:           { en: "Language",               hi: "भाषा" },
    english:            { en: "English",                hi: "English" },
    hindi:              { en: "हिंदी",                  hi: "हिंदी" },
    accessibilityMode:  { en: "Accessibility Mode",     hi: "एक्सेसिबिलिटी मोड" },
    accessibilityDesc:  {
      en: "Larger text, high contrast, and slower audio.",
      hi: "बड़ा टेक्स्ट, उच्च कंट्रास्ट और धीमी ऑडियो।"
    },
    on:  { en: "On",  hi: "चालू" },
    off: { en: "Off", hi: "बंद" },
  },

  // ─── Common / Shared ────────────────────────────────────────────────────────
  common: {
    appName:      { en: "Heritage Companion",  hi: "हेरिटेज कम्पेनियन" },
    loading:      { en: "Loading…",            hi: "लोड हो रहा है…" },
    error:        { en: "Something went wrong.", hi: "कुछ गलत हो गया।" },
    back:         { en: "Back",                hi: "वापस" },
    close:        { en: "Close",               hi: "बंद करें" },
    yes:          { en: "Yes",                 hi: "हाँ" },
    no:           { en: "No",                  hi: "नहीं" },
    learnMore:    { en: "Learn more",          hi: "और जानें" },
    simulated:    { en: "Simulated",           hi: "अनुकरणीय" },
    verify:       { en: "To be confirmed",     hi: "पुष्टि की जानी है" },
  },
};

export default translations;
