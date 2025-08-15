// Language data
const languages = {
  English: {
    name: 'English',
    code: 'en',
    translations: {
      title: 'Agricultural Schemes & Weather Dashboard',
      subtitle: 'Explore government agricultural schemes and get real-time weather updates for better farming decisions.',
      loadingWeather: 'Loading weather data...',
      errorWeather: 'Error loading weather data:',
      usingDemo: 'Using demo data for display purposes',
      view24Hour: 'View 24-Hour Forecast',
      hourlyForecast: '24-Hour Weather Forecast',
      placeholder: 'Type your message here...',
      chatHistory: '💬 Chat History',
      settings: '⚙️ Settings',
      profile: '👤 Profile',
      helpSupport: '❓ Help & Support',
      language: '🌐 Language',
      selectLanguage: 'Select your language',
      otherLanguages: 'Other languages',
      clickVisit: 'Click to visit official website',
      menu: 'Menu'
    }
  },
  हिंदी: {
    name: 'हिंदी',
    code: 'hi',
    translations: {
      title: 'कृषि योजनाएं और मौसम डैशबोर्ड',
      subtitle: 'बेहतर कृषि निर्णयों के लिए सरकारी कृषि योजनाओं का अन्वेषण करें और वास्तविक समय के मौसम अपडेट प्राप्त करें।',
      loadingWeather: 'मौसम डेटा लोड हो रहा है...',
      errorWeather: 'मौसम डेटा लोड करने में त्रुटि:',
      usingDemo: 'प्रदर्शन उद्देश्यों के लिए डेमो डेटा का उपयोग',
      view24Hour: '24-घंटे का पूर्वानुमान देखें',
      hourlyForecast: '24-घंटे का मौसम पूर्वानुमान',
      placeholder: 'यहाँ अपना संदेश टाइप करें...',
      chatHistory: '💬 चैट इतिहास',
      settings: '⚙️ सेटिंग्स',
      profile: '👤 प्रोफाइल',
      helpSupport: '❓ सहायता और समर्थन',
      language: '🌐 भाषा',
      selectLanguage: 'अपनी भाषा चुनें',
      otherLanguages: 'अन्य भाषाएं',
      clickVisit: 'आधिकारिक वेबसाइट पर जाने के लिए क्लिक करें',
      menu: 'मेन्यू'
    }
  },
  ગુજરાતી: {
    name: 'ગુજરાતી',
    code: 'gu',
    translations: {
      title: 'કૃષિ યોજનાઓ અને હવામાન ડેશબોર્ડ',
      subtitle: 'વધુ સારા ખેતી નિર્ણયો માટે સરકારી કૃષિ યોજનાઓનું અન્વેષણ કરો અને વાસ્તવિક સમયના હવામાન અપડેટ મેળવો।',
      loadingWeather: 'હવામાન ડેટા લોડ થઈ રહ્યો છે...',
      errorWeather: 'હવામાન ડેટા લોડ કરવામાં ભૂલ:',
      usingDemo: 'પ્રદર્શન હેતુઓ માટે ડેમો ડેટાનો ઉપયોગ',
      view24Hour: '24-કલાકની આગાહી જુઓ',
      hourlyForecast: '24-કલાકની હવામાન આગાહી',
      placeholder: 'અહીં તમારો સંદેશ ટાઈપ કરો...',
      chatHistory: '💬 ચેટ હિસ્ટ્રી',
      settings: '⚙️ સેટિંગ્સ',
      profile: '👤 પ્રોફાઈલ',
      helpSupport: '❓ મદદ અને સપોર્ટ',
      language: '🌐 ભાષા',
      selectLanguage: 'તમારી ભાષા પસંદ કરો',
      otherLanguages: 'અન્ય ભાષાઓ',
      clickVisit: 'સત્તાવાર વેબસાઈટ પર જવા માટે ક્લિક કરો',
      menu: 'મેનુ'
    }
  },
  தமிழ்: {
    name: 'தமிழ்',
    code: 'ta',
    translations: {
      title: 'விவசாய திட்டங்கள் & வானிலை டாஷ்போர்டு',
      subtitle: 'சிறந்த விவசாய முடிவுகளுக்கு அரசு விவசாய திட்டங்களை ஆராய்ந்து நிகழ்நேர வானிலை புதுப்பிப்புகளைப் பெறுங்கள்.',
      loadingWeather: 'வானிலை தரவு ஏற்றப்படுகிறது...',
      errorWeather: 'வானிலை தரவை ஏற்றுவதில் பிழை:',
      usingDemo: 'காட்சி நோக்கங்களுக்காக டெமோ தரவைப் பயன்படுத்துதல்',
      view24Hour: '24-மணிநேர முன்னறிவிப்பைப் பார்க்கவும்',
      hourlyForecast: '24-மணிநேர வானிலை முன்னறிவிப்பு',
      placeholder: 'உங்கள் செய்தியை இங்கே தட்டச்சு செய்யுங்கள்...',
      chatHistory: '💬 அரட்டை வரலாறு',
      settings: '⚙️ அமைப்புகள்',
      profile: '👤 சுயவிவரம்',
      helpSupport: '❓ உதவி & ஆதரவு',
      language: '🌐 மொழி',
      selectLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
      otherLanguages: 'பிற மொழிகள்',
      clickVisit: 'அதிகாரப்பூர்வ இணையதளத்திற்குச் செல்ல கிளிக் செய்யவும்',
      menu: 'மெனு'
    }
  },
  తెలుగు: {
    name: 'తెలుగు',
    code: 'te',
    translations: {
      title: 'వ్యవసాయ పథకాలు & వాతావరణ డాష్‌బోర్డ్',
      subtitle: 'మెరుగైన వ్యవసాయ నిర్ణయాల కోసం ప్రభుత్వ వ్యవసాయ పథకాలను అన్వేషించండి మరియు నిజ-సమయ వాతావరణ అప్‌డేట్‌లను పొందండి.',
      loadingWeather: 'వాతావరణ డేటా లోడ్ అవుతోంది...',
      errorWeather: 'వాతావరణ డేటా లోడ్ చేయడంలో లోపం:',
      usingDemo: 'ప్రదర్శన ప్రయోజనాల కోసం డెమో డేటాను ఉపయోగించడం',
      view24Hour: '24-గంటల అంచనాను చూడండి',
      hourlyForecast: '24-గంటల వాతావరణ అంచనా',
      placeholder: 'మీ సందేశాన్ని ఇక్కడ టైప్ చేయండి...',
      chatHistory: '💬 చాట్ చరిత్ర',
      settings: '⚙️ సెట్టింగ్‌లు',
      profile: '👤 ప్రొఫైల్',
      helpSupport: '❓ సహాయం & మద్దతు',
      language: '🌐 భాష',
      selectLanguage: 'మీ భాషను ఎంచుకోండి',
      otherLanguages: 'ఇతర భాషలు',
      clickVisit: 'అధికారిక వెబ్‌సైట్‌ని సందర్శించడానికి క్లిక్ చేయండి',
      menu: 'మెనూ'
    }
  },
  বাংলা: {
    name: 'বাংলা',
    code: 'bn',
    translations: {
      title: 'কৃষি প্রকল্প ও আবহাওয়া ড্যাশবোর্ড',
      subtitle: 'উন্নত কৃষি সিদ্ধান্তের জন্য সরকারি কৃষি প্রকল্পগুলি অন্বেষণ করুন এবং রিয়েল-টাইম আবহাওয়া আপডেট পান।',
      loadingWeather: 'আবহাওয়া ডেটা লোড হচ্ছে...',
      errorWeather: 'আবহাওয়া ডেটা লোড করতে ত্রুটি:',
      usingDemo: 'প্রদর্শনের উদ্দেশ্যে ডেমো ডেটা ব্যবহার করা হচ্ছে',
      view24Hour: '২৪-ঘন্টার পূর্বাভাস দেখুন',
      hourlyForecast: '২৪-ঘন্টার আবহাওয়ার পূর্বাভাস',
      placeholder: 'এখানে আপনার বার্তা টাইপ করুন...',
      chatHistory: '💬 চ্যাট ইতিহাস',
      settings: '⚙️ সেটিংস',
      profile: '👤 প্রোফাইল',
      helpSupport: '❓ সাহায্য ও সহায়তা',
      language: '🌐 ভাষা',
      selectLanguage: 'আপনার ভাষা নির্বাচন করুন',
      otherLanguages: 'অন্যান্য ভাষা',
      clickVisit: 'অফিসিয়াল ওয়েবসাইট পরিদর্শন করতে ক্লিক করুন',
      menu: 'মেনু'
    }
  },
  मराठी: {
    name: 'मराठी',
    code: 'mr',
    translations: {
      title: 'कृषी योजना आणि हवामान डॅशबोर्ड',
      subtitle: 'चांगल्या शेती निर्णयांसाठी सरकारी कृषी योजनांचा शोध घ्या आणि रिअल-टाइम हवामान अपडेट मिळवा.',
      loadingWeather: 'हवामान डेटा लोड होत आहे...',
      errorWeather: 'हवामान डेटा लोड करण्यात त्रुटी:',
      usingDemo: 'प्रदर्शन हेतूंसाठी डेमो डेटा वापरत आहे',
      view24Hour: '24-तासांचा अंदाज पहा',
      hourlyForecast: '24-तासांचा हवामान अंदाज',
      placeholder: 'येथे तुमचा संदेश टाइप करा...',
      chatHistory: '💬 चॅट इतिहास',
      settings: '⚙️ सेटिंग्स',
      profile: '👤 प्रोफाइल',
      helpSupport: '❓ मदत आणि समर्थन',
      language: '🌐 भाषा',
      selectLanguage: 'तुमची भाषा निवडा',
      otherLanguages: 'इतर भाषा',
      clickVisit: 'अधिकृत वेबसाइटला भेट देण्यासाठी क्लिक करा',
      menu: 'मेनू'
    }
  },
  ಕನ್ನಡ: {
    name: 'ಕನ್ನಡ',
    code: 'kn',
    translations: {
      title: 'ಕೃಷಿ ಯೋಜನೆಗಳು ಮತ್ತು ಹವಾಮಾನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      subtitle: 'ಉತ್ತಮ ಕೃಷಿ ನಿರ್ಧಾರಗಳಿಗಾಗಿ ಸರ್ಕಾರಿ ಕೃಷಿ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ ಮತ್ತು ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ.',
      loadingWeather: 'ಹವಾಮಾನ ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      errorWeather: 'ಹವಾಮಾನ ಡೇಟಾ ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ:',
      usingDemo: 'ಪ್ರದರ್ಶನ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಡೆಮೊ ಡೇಟಾ ಬಳಸಲಾಗುತ್ತಿದೆ',
      view24Hour: '24-ಗಂಟೆಗಳ ಮುನ್ಸೂಚನೆ ವೀಕ್ಷಿಸಿ',
      hourlyForecast: '24-ಗಂಟೆಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',
      placeholder: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...',
      chatHistory: '💬 ಚಾಟ್ ಇತಿಹಾಸ',
      settings: '⚙️ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      profile: '👤 ಪ್ರೊಫೈಲ್',
      helpSupport: '❓ ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ',
      language: '🌐 ಭಾಷೆ',
      selectLanguage: 'ನಿಮ್ಮ ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
      otherLanguages: 'ಇತರ ಭಾಷೆಗಳು',
      clickVisit: 'ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
      menu: 'ಮೆನು'
    }
  },
  ਪੰਜਾਬੀ: {
    name: 'ਪੰਜਾਬੀ',
    code: 'pa',
    translations: {
      title: 'ਖੇਤੀਬਾੜੀ ਸਕੀਮਾਂ ਅਤੇ ਮੌਸਮ ਡੈਸ਼ਬੋਰਡ',
      subtitle: 'ਬਿਹਤਰ ਖੇਤੀ ਦੇ ਫੈਸਲਿਆਂ ਲਈ ਸਰਕਾਰੀ ਖੇਤੀਬਾੜੀ ਸਕੀਮਾਂ ਦੀ ਪੜਚੋਲ ਕਰੋ ਅਤੇ ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਅਪਡੇਟ ਪ੍ਰਾਪਤ ਕਰੋ।',
      loadingWeather: 'ਮੌਸਮ ਦਾ ਡੇਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      errorWeather: 'ਮੌਸਮ ਡੇਟਾ ਲੋਡ ਕਰਨ ਵਿੱਚ ਗਲਤੀ:',
      usingDemo: 'ਪ੍ਰਦਰਸ਼ਨ ਦੇ ਉਦੇਸ਼ਾਂ ਲਈ ਡੈਮੋ ਡੇਟਾ ਦੀ ਵਰਤੋਂ',
      view24Hour: '24-ਘੰਟੇ ਦੀ ਪੂਰਵ-ਅਨੁਮਾਨ ਦੇਖੋ',
      hourlyForecast: '24-ਘੰਟੇ ਦਾ ਮੌਸਮ ਪੂਰਵ-ਅਨੁਮਾਨ',
      placeholder: 'ਇੱਥੇ ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ...',
      chatHistory: '💬 ਚੈਟ ਇਤਿਹਾਸ',
      settings: '⚙️ ਸੈਟਿੰਗਾਂ',
      profile: '👤 ਪ੍ਰੋਫਾਈਲ',
      helpSupport: '❓ ਮਦਦ ਅਤੇ ਸਹਾਇਤਾ',
      language: '🌐 ਭਾਸ਼ਾ',
      selectLanguage: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ',
      otherLanguages: 'ਹੋਰ ਭਾਸ਼ਾਵਾਂ',
      clickVisit: "'ਅਧਿਕਾਰਤ ਵੈਬਸਾਈਟ 'ਤੇ ਜਾਣ ਲਈ ਕਲਿਕ ਕਰੋ'",
      menu: 'ਮੈਨੂ'
    }
  },
  മലയാളം: {
    name: 'മലയാളം',
    code: 'ml',
    translations: {
      title: 'കൃഷി പദ്ധതികളും കാലാവസ്ഥാ ഡാഷ്‌ബോർഡും',
      subtitle: 'മികച്ച കൃഷി തീരുമാനങ്ങൾക്കായി സർക്കാർ കൃഷി പദ്ധതികൾ പര്യവേക്ഷണം ചെയ്യുകയും തത്സമയ കാലാവസ്ഥാ അപ്‌ഡേറ്റുകൾ നേടുകയും ചെയ്യുക.',
      loadingWeather: 'കാലാവസ്ഥാ ഡാറ്റ ലോഡ് ചെയ്യുന്നു...',
      errorWeather: 'കാലാവസ്ഥാ ഡാറ്റ ലോഡ് ചെയ്യുന്നതിൽ പിശക്:',
      usingDemo: 'പ്രദർശന ആവശ്യങ്ങൾക്കായി ഡെമോ ഡാറ്റ ഉപയോഗിക്കുന്നു',
      view24Hour: '24-മണിക്കൂർ പ്രവചനം കാണുക',
      hourlyForecast: '24-മണിക്കൂർ കാലാവസ്ഥാ പ്രവചനം',
      placeholder: 'നിങ്ങളുടെ സന്ദേശം ഇവിടെ ടൈപ്പ് ചെയ്യുക...',
      chatHistory: '💬 ചാറ്റ് ചരിത്രം',
      settings: '⚙️ ക്രമീകരണങ്ങൾ',
      profile: '👤 പ്രൊഫൈൽ',
      helpSupport: '❓ സഹായവും പിന്തുണയും',
      language: '🌐 ഭാഷ',
      selectLanguage: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
      otherLanguages: 'മറ്റ് ഭാഷകൾ',
      clickVisit: 'ഔദ്യോഗിക വെബ്‌സൈറ്റ് സന്ദർശിക്കാൻ ക്ലിക്ക് ചെയ്യുക',
      menu: 'മെനു'
    }
  },
  Español: {
    name: 'Español',
    code: 'es',
    translations: {
      title: 'Esquemas Agrícolas y Panel Meteorológico',
      subtitle: 'Explora los esquemas agrícolas del gobierno y obtén actualizaciones meteorológicas en tiempo real para mejores decisiones agrícolas.',
      loadingWeather: 'Cargando datos meteorológicos...',
      errorWeather: 'Error al cargar datos meteorológicos:',
      usingDemo: 'Usando datos de demostración con fines de visualización',
      view24Hour: 'Ver Pronóstico de 24 Horas',
      hourlyForecast: 'Pronóstico Meteorológico de 24 Horas',
      placeholder: 'Escribe tu mensaje aquí...',
      chatHistory: '💬 Historial de Chat',
      settings: '⚙️ Configuración',
      profile: '👤 Perfil',
      helpSupport: '❓ Ayuda y Soporte',
      language: '🌐 Idioma',
      selectLanguage: 'Selecciona tu idioma',
      otherLanguages: 'Otros idiomas',
      clickVisit: 'Haz clic para visitar el sitio web oficial',
      menu: 'Menú'
    }
  },
  Português: {
    name: 'Português',
    code: 'pt',
    translations: {
      title: 'Esquemas Agrícolas e Painel Meteorológico',
      subtitle: 'Explore os esquemas agrícolas do governo e obtenha atualizações meteorológicas em tempo real para melhores decisões agrícolas.',
      loadingWeather: 'Carregando dados meteorológicos...',
      errorWeather: 'Erro ao carregar dados meteorológicos:',
      usingDemo: 'Usando dados de demonstração para fins de exibição',
      view24Hour: 'Ver Previsão de 24 Horas',
      hourlyForecast: 'Previsão Meteorológica de 24 Horas',
      placeholder: 'Digite sua mensagem aqui...',
      chatHistory: '💬 Histórico de Chat',
      settings: '⚙️ Configurações',
      profile: '👤 Perfil',
      helpSupport: '❓ Ajuda e Suporte',
      language: '🌐 Idioma',
      selectLanguage: 'Selecione seu idioma',
      otherLanguages: 'Outros idiomas',
      clickVisit: 'Clique para visitar o site oficial',
      menu: 'Menu'
    }
  },
  '日本語': {
    name: '日本語',
    code: 'ja',
    translations: {
      title: '農業スキームと気象ダッシュボード',
      subtitle: 'より良い農業決定のために政府の農業スキームを探索し、リアルタイムの気象更新を取得してください。',
      loadingWeather: '気象データを読み込んでいます...',
      errorWeather: '気象データの読み込みエラー:',
      usingDemo: '表示目的でデモデータを使用しています',
      view24Hour: '24時間予報を見る',
      hourlyForecast: '24時間気象予報',
      placeholder: 'ここにメッセージを入力してください...',
      chatHistory: '💬 チャット履歴',
      settings: '⚙️ 設定',
      profile: '👤 プロフィール',
      helpSupport: '❓ ヘルプとサポート',
      language: '🌐 言語',
      selectLanguage: '言語を選択してください',
      otherLanguages: 'その他の言語',
      clickVisit: '公式ウェブサイトを訪問するにはクリックしてください',
      menu: 'メニュー'
    }
  }
}

import React, { useState, useEffect } from 'react';
import { Send, Menu, X, Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, ExternalLink } from 'lucide-react';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSchemeIndex, setCurrentSchemeIndex] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHourlyModal, setShowHourlyModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Agricultural schemes data
  const agriculturalSchemes = [
    {
      scheme_name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      link: "https://pmkisan.gov.in/"
    },
    {
      scheme_name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      link: "https://pmfby.gov.in/"
    },
    {
      scheme_name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      link: "https://pmksy.gov.in/"
    },
    {
      scheme_name: "National Food Security Mission (NFSM)",
      link: "https://www.nfsm.gov.in/"
    },
    {
      scheme_name: "Kisan Credit Card (KCC)",
      link: "https://www.jansamarth.in/agri-loan-kisan-credit-card"
    },
    {
      scheme_name: "Paramparagat Krishi Vikas Yojana (PKVY)",
      link: "https://pgsindia-ncof.gov.in/pkvy/index.html"
    },
    {
      scheme_name: "Rashtriya Krishi Vikas Yojana (RKVY)",
      link: "https://rkvy.nic.in/"
    },
    {
      scheme_name: "e-NAM (National Agriculture Market)",
      link: "https://www.enam.gov.in/web/"
    },
    {
      scheme_name: "Soil Health Card Scheme",
      link: "https://soilhealth.dac.gov.in/"
    },
    {
      scheme_name: "Pradhan Mantri Kisan Maan-Dhan Yojana (PM-KMY)",
      link: "https://maandhan.in/"
    },
    {
      scheme_name: "Agriculture Infrastructure Fund (AIF)",
      link: "https://agriinfra.dac.gov.in/"
    },
    {
      scheme_name: "National Mission on Oilseeds and Oil Palm (NMOOP)",
      link: "https://nmoop.gov.in/"
    }
  ];

  // Handle scheme rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSchemeIndex((prev) => (prev + 1) % agriculturalSchemes.length);
    }, 6000); // Increased interval to 6 seconds for better readability

    return () => clearInterval(interval);
  }, [agriculturalSchemes.length]);

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        // Fetch 3-day forecast

        const Weather_Api_Key = '86Ils1zBsLLsuPH8BdJ1gUa9CEwno31F';
        const user_location = "Kharagpur";

        const forecastResponse = await fetch(
          `https://api.tomorrow.io/v4/weather/forecast?location=${user_location}&apikey=${Weather_Api_Key}`,
          {
            method: 'GET',
            headers: {
              'accept': 'application/json'
            }
          }
        );

        if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');
        const forecastData = await forecastResponse.json();

        // Fetch 24-hour timeline
        const timelineResponse = await fetch(
          `https://api.tomorrow.io/v4/timelines?apikey=${Weather_Api_Key}`,
          {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              location: user_location,
              fields: ['temperature', 'humidity', 'windSpeed', 'weatherCode', 'precipitationProbability'],
              units: 'metric',
              timesteps: ['1h'],
              startTime: 'now',
              endTime: 'nowPlus24h'
            })
          }
        );

        if (!timelineResponse.ok) throw new Error('Failed to fetch timeline data');
        const timelineData = await timelineResponse.json();

        setWeatherData(forecastData);
        setHourlyData(timelineData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Redirecting with message:', message);
      setMessage('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleHourlyModal = () => {
    setShowHourlyModal(!showHourlyModal);
  };

  const handleSchemeClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const getWeatherIcon = (code) => {
    if (code <= 1100) return <Sun className="text-yellow-500" size={24} />;
    if (code <= 2100) return <Cloud className="text-gray-500" size={24} />;
    return <CloudRain className="text-blue-500" size={24} />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    hamburgerButton: {
      position: 'absolute',
      top: '16px',
      left: '16px',
      zIndex: 50,
      padding: '12px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    menuOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 40
    },
    sideMenu: {
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100%',
      width: '288px',
      backgroundColor: 'white',
      boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
      zIndex: 50,
      transform: 'translateX(0)',
      transition: 'transform 0.3s'
    },
    menuContent: {
      padding: '24px'
    },
    menuHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    menuTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937'
    },
    menuButton: {
      padding: '8px',
      borderRadius: '8px',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent'
    },
    menuItem: {
      padding: '12px',
      borderRadius: '8px',
      cursor: 'pointer',
      color: '#374151',
      transition: 'background-color 0.2s',
      marginBottom: '8px'
    },
    movingModal: {
      position: 'absolute',
      top: '80px',
      left: 0,
      right: 0,
      height: '80px',
      overflow: 'hidden',
      zIndex: 30
    },
    movingContent: {
      position: 'absolute',
      whiteSpace: 'nowrap',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      animation: 'slideLeftToRight 12s linear infinite'
    },
    movingBox: {
      background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
      color: 'white',
      padding: '16px 32px',
      margin: '0 16px',
      borderRadius: '16px',
      boxShadow: '0 12px 30px rgba(34, 197, 94, 0.4)',
      minWidth: 'max-content',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      border: '2px solid rgba(255, 255, 255, 0.2)'
    },
    schemeTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '4px'
    },
    schemeSubtitle: {
      fontSize: '12px',
      opacity: '0.9',
      fontWeight: '400'
    },
    mainContent: {
      flex: 1,
      padding: '32px',
      marginTop: '144px',
      paddingBottom: '120px'
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '24px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '20px',
      color: '#4b5563',
      marginBottom: '48px',
      lineHeight: '1.6',
      textAlign: 'center'
    },
    weatherSection: {
      marginBottom: '48px'
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '24px',
      textAlign: 'center'
    },
    weatherGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    weatherCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: '1px solid #dbeafe',
      transition: 'all 0.3s'
    },
    hourlyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '16px',
      maxHeight: '400px',
      overflowY: 'auto'
    },
    hourlyCard: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
      border: '1px solid #e5e7eb'
    },
    loadingCard: {
      backgroundColor: 'white',
      padding: '48px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      textAlign: 'center',
      color: '#6b7280'
    },
    errorCard: {
      backgroundColor: '#fef2f2',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #fecaca',
      textAlign: 'center',
      color: '#dc2626'
    },
    inputContainer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '1px solid #dbeafe',
      padding: '24px',
      zIndex: 40,
      boxShadow: '0 -10px 25px rgba(0,0,0,0.1)'
    },
    inputWrapper: {
      maxWidth: '1024px',
      margin: '0 auto',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-end'
    },
    inputField: {
      flex: 1,
      padding: '16px 24px',
      fontSize: '18px',
      border: '2px solid #bfdbfe',
      borderRadius: '16px',
      outline: 'none',
      backgroundColor: '#f0f9ff',
      transition: 'all 0.2s',
      height: '56px',
      boxSizing: 'border-box'
    },
    sendButton: {
      padding: '16px 24px',
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
      height: '56px',
      minWidth: '56px'
    },
    sendButtonDisabled: {
      backgroundColor: '#d1d5db',
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '32px',
      maxWidth: '900px',
      maxHeight: '80vh',
      width: '90%',
      overflowY: 'auto',
      boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2937'
    },
    closeButton: {
      padding: '8px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#f3f4f6',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    viewForecastButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      display: 'block',
      margin: '0 auto'
    }
  };

  const currentScheme = agriculturalSchemes[currentSchemeIndex];

  return (
    <div style={styles.container}>
      {/* Hamburger Menu */}
      <button
        onClick={toggleMenu}
        style={styles.hamburgerButton}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <Menu size={24} color="#374151" />
      </button>

      {/* Side Menu */}
      {isMenuOpen && (
        <>
          <div style={styles.menuOverlay} onClick={toggleMenu} />
          <div style={styles.sideMenu}>
            <div style={styles.menuContent}>
              <div style={styles.menuHeader}>
                <h2 style={styles.menuTitle}>Menu</h2>
                <button
                  onClick={toggleMenu}
                  style={styles.menuButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <X size={20} color="#6b7280" />
                </button>
              </div>
              <nav>
                {['💬 Chat History', '⚙️ Settings', '👤 Profile', '❓ Help & Support'].map((item, index) => (
                  <div
                    key={index}
                    style={styles.menuItem}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f9ff'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {item}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Moving Modal - Agricultural Schemes */}
      <div style={styles.movingModal}>
        <div style={styles.movingContent}>
          <div
            style={styles.movingBox}
            onClick={() => handleSchemeClick(currentScheme.link)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 15px 40px rgba(34, 197, 94, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 12px 30px rgba(34, 197, 94, 0.4)';
            }}
          >
            <div>
              <div style={styles.schemeTitle}>
                {currentScheme.scheme_name}
              </div>
              <div style={styles.schemeSubtitle}>
                Click to visit official website
              </div>
            </div>
            <ExternalLink size={20} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentWrapper}>
          <h1 style={styles.title}>Welcome to AgriBot</h1>

          {/* Weather Forecast */}
          <div style={styles.weatherSection}>
            {loading ? (
              <div style={styles.loadingCard}>
                <div>Loading weather data...</div>
              </div>
            ) : error ? (
              <div style={styles.errorCard}>
                <div>Error loading weather data: {error}</div>
                <div style={{ fontSize: '14px', marginTop: '8px' }}>
                  Using demo data for display purposes
                </div>
              </div>
            ) : null}

            <div style={styles.weatherGrid}>
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} style={styles.weatherCard}>
                    <div style={{ textAlign: 'center', color: '#9ca3af' }}>Loading...</div>
                  </div>
                ))
              ) : weatherData?.timelines?.daily?.slice(0, 3).map((day, index) => (
                <div
                  key={index}
                  style={styles.weatherCard}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                      {formatDate(day.time)}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      {getWeatherIcon(day.values.weatherCodeMax)}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                      {Math.round(day.values.temperatureMax)}°C / {Math.round(day.values.temperatureMin)}°C
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '14px', color: '#6b7280' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Droplets size={16} />
                        {Math.round(day.values.precipitationProbabilityMax)}%
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Wind size={16} />
                        {Math.round(day.values.windSpeedMax)} km/h
                      </div>
                    </div>
                  </div>
                </div>
              )) || (
                // Demo data fallback
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    style={styles.weatherCard}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                        {new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Sun className="text-yellow-500" size={24} />
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {22 + index}°C / {15 + index}°C
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '14px', color: '#6b7280' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Droplets size={16} />
                          {20 + index * 10}%
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Wind size={16} />
                          {15 + index * 2} km/h
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 24-Hour Forecast Button */}
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button
                onClick={toggleHourlyModal}
                style={styles.viewForecastButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                View Next 24-Hour Forecast
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 24-Hour Forecast Modal */}
      {showHourlyModal && (
        <div style={styles.modalOverlay} onClick={toggleHourlyModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>24-Hour Weather Forecast</h2>
              <button
                onClick={toggleHourlyModal}
                style={styles.closeButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                <X size={20} color="#6b7280" />
              </button>
            </div>
            <div style={styles.hourlyGrid}>
              {loading ? (
                Array.from({ length: 24 }).map((_, index) => (
                  <div key={index} style={styles.hourlyCard}>
                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>Loading...</div>
                  </div>
                ))
              ) : hourlyData?.data?.timelines?.[0]?.intervals?.slice(0, 24).map((hour, index) => (
                <div key={index} style={styles.hourlyCard}>
                  <div style={{ fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                    {formatTime(hour.startTime)}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    {getWeatherIcon(hour.values.weatherCode)}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {Math.round(hour.values.temperature)}°C
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>
                    {Math.round(hour.values.precipitationProbability)}%
                  </div>
                </div>
              )) || (
                // Demo data fallback
                Array.from({ length: 24 }).map((_, index) => (
                  <div key={index} style={styles.hourlyCard}>
                    <div style={{ fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                      {new Date(Date.now() + index * 60 * 60 * 1000).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        hour12: true
                      })}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <Sun className="text-yellow-500" size={20} />
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {Math.round(20 + Math.sin(index / 4) * 5)}°C
                    </div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>
                      {Math.max(0, 30 - index)}%
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Input Box */}
      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message here..."
            style={styles.inputField}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#bfdbfe'}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            style={{
              ...styles.sendButton,
              ...(message.trim() ? {} : styles.sendButtonDisabled)
            }}
            onMouseEnter={(e) => {
              if (message.trim()) {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (message.trim()) {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideLeftToRight {
          0% {
            transform: translateX(-100vw);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        
        * {
          box-sizing: border-box;
        }

        .text-yellow-500 {
          color: #eab308;
        }

        .text-gray-500 {
          color: #6b7280;
        }

        .text-blue-500 {
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
}