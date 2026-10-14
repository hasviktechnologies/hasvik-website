// All services. `kind` decides the Tech / Non-Tech tab.
// Entries with `published: false` are owner TODOs: they are kept here for
// editing but never rendered or added to the sitemap until set to true.
import type { Localized } from "@/i18n/config";
import type { IconName } from "@/components/icon";

export type ServiceKind = "tech" | "non-tech";

export type Service = {
  slug: string;
  kind: ServiceKind;
  published: boolean;
  icon: IconName;
  image?: { src: string; alt: Localized };
  title: Localized;
  short: Localized;
  description: Localized;
  features: Localized[];
  deliverables: Localized[];
  idealFor: Localized[];
  faqs: { q: Localized; a: Localized }[];
};

export const services: Service[] = [
  {
    slug: "custom-website-development",
    kind: "tech",
    published: true,
    icon: "layout",
    image: {
      src: "/images/Business.webp",
      alt: { en: "Custom business website shown on laptop and phone", hi: "लैपटॉप और फ़ोन पर दिखती कस्टम बिज़नेस वेबसाइट" },
    },
    title: { en: "Custom Website Development", hi: "कस्टम वेबसाइट डेवलपमेंट" },
    short: {
      en: "Websites for parlours, salons, portfolios and local businesses with modern layouts and a seamless experience.",
      hi: "पार्लर, सैलून, पोर्टफ़ोलियो और लोकल बिज़नेस के लिए आधुनिक, आसान और तेज़ वेबसाइट।",
    },
    description: {
      en: "Website design for parlours, salons, business portfolios, and other businesses with modern layouts, custom features, and a seamless user experience. Every site is built mobile-first, loads fast, and is easy for your customers to contact you from.",
      hi: "पार्लर, सैलून, बिज़नेस पोर्टफ़ोलियो और दूसरे व्यवसायों के लिए आधुनिक लेआउट, कस्टम फ़ीचर और आसान यूज़र अनुभव वाली वेबसाइट। हर वेबसाइट मोबाइल-फ़र्स्ट, तेज़ और ग्राहकों के लिए संपर्क करने में आसान होती है।",
    },
    features: [
      { en: "Mobile-first, modern design", hi: "मोबाइल-फ़र्स्ट, आधुनिक डिज़ाइन" },
      { en: "WhatsApp & call buttons built in", hi: "WhatsApp और कॉल बटन शामिल" },
      { en: "SEO-ready and fast loading", hi: "SEO के लिए तैयार और तेज़" },
    ],
    deliverables: [
      { en: "Up to 5–8 custom-designed pages", hi: "5–8 कस्टम डिज़ाइन पेज" },
      { en: "Contact form, map and WhatsApp integration", hi: "संपर्क फ़ॉर्म, मैप और WhatsApp इंटीग्रेशन" },
      { en: "Basic on-page SEO and Google indexing", hi: "बेसिक ऑन-पेज SEO और Google इंडेक्सिंग" },
      { en: "Training so you can update content", hi: "कंटेंट अपडेट करने की ट्रेनिंग" },
    ],
    idealFor: [
      { en: "Beauty parlours & salons", hi: "ब्यूटी पार्लर और सैलून" },
      { en: "Shops, tent houses & local services", hi: "दुकानें, टेंट हाउस और लोकल सर्विस" },
      { en: "Professionals & engineering firms", hi: "प्रोफ़ेशनल और इंजीनियरिंग फ़र्म" },
    ],
    faqs: [
      {
        q: { en: "Can I update the website myself?", hi: "क्या मैं ख़ुद वेबसाइट अपडेट कर सकता हूँ?" },
        a: {
          en: "Yes. We hand over a simple editing workflow and a short training session. If you prefer, our maintenance plan covers updates for you.",
          hi: "हाँ। हम आसान एडिटिंग तरीका और छोटी ट्रेनिंग देते हैं। चाहें तो हमारा मेंटेनेंस प्लान आपके लिए अपडेट करता है।",
        },
      },
    ],
  },
  {
    slug: "ecommerce-website-development",
    kind: "tech",
    published: true,
    icon: "shopping-bag",
    image: {
      src: "/images/shopping.webp",
      alt: { en: "Online store interface with products and cart", hi: "प्रोडक्ट और कार्ट वाला ऑनलाइन स्टोर" },
    },
    title: { en: "E-Commerce Website Development", hi: "ई-कॉमर्स वेबसाइट डेवलपमेंट" },
    short: {
      en: "Online stores that let you sell products with secure payments and easy management.",
      hi: "सुरक्षित पेमेंट और आसान मैनेजमेंट के साथ अपने प्रोडक्ट ऑनलाइन बेचें।",
    },
    description: {
      en: "Online stores that allow businesses to sell their products with secure payment and easy management. From product catalogue to checkout and order tracking, we build stores that are simple for you to run and easy for customers to buy from.",
      hi: "ऑनलाइन स्टोर जिनसे व्यवसाय सुरक्षित पेमेंट और आसान मैनेजमेंट के साथ प्रोडक्ट बेच सकें। प्रोडक्ट कैटलॉग से चेकआउट और ऑर्डर ट्रैकिंग तक, हम ऐसा स्टोर बनाते हैं जो चलाने में आसान हो।",
    },
    features: [
      { en: "Secure UPI & card payments", hi: "सुरक्षित UPI और कार्ड पेमेंट" },
      { en: "Easy product & order management", hi: "आसान प्रोडक्ट और ऑर्डर मैनेजमेंट" },
      { en: "Mobile-friendly shopping", hi: "मोबाइल-फ़्रेंडली शॉपिंग" },
    ],
    deliverables: [
      { en: "Product catalogue with categories and search", hi: "कैटेगरी और सर्च के साथ प्रोडक्ट कैटलॉग" },
      { en: "Cart, checkout and payment gateway setup", hi: "कार्ट, चेकआउट और पेमेंट गेटवे सेटअप" },
      { en: "Order notifications on email / WhatsApp", hi: "ईमेल / WhatsApp पर ऑर्डर नोटिफ़िकेशन" },
      { en: "Admin dashboard for stock and orders", hi: "स्टॉक और ऑर्डर के लिए एडमिन डैशबोर्ड" },
    ],
    idealFor: [
      { en: "Retail & kirana shops going online", hi: "ऑनलाइन आने वाली रिटेल और किराना दुकानें" },
      { en: "Handicraft and home-business sellers", hi: "हस्तशिल्प और होम-बिज़नेस विक्रेता" },
      { en: "Brands selling direct to customers", hi: "सीधे ग्राहकों को बेचने वाले ब्रांड" },
    ],
    faqs: [
      {
        q: { en: "Which payment methods can I accept?", hi: "मैं कौन-से पेमेंट तरीक़े ले सकता हूँ?" },
        a: {
          en: "We integrate popular Indian gateways that support UPI, cards, net banking and wallets. Gateway fees are charged by the provider.",
          hi: "हम लोकप्रिय भारतीय गेटवे जोड़ते हैं जो UPI, कार्ड, नेट बैंकिंग और वॉलेट सपोर्ट करते हैं। गेटवे शुल्क प्रदाता लेता है।",
        },
      },
    ],
  },
  {
    slug: "educational-website-development",
    kind: "tech",
    published: true,
    icon: "graduation-cap",
    image: {
      src: "/images/education.webp",
      alt: { en: "School website on a laptop with course information", hi: "कोर्स जानकारी वाली स्कूल वेबसाइट" },
    },
    title: { en: "Educational Website Development", hi: "एजुकेशनल वेबसाइट डेवलपमेंट" },
    short: {
      en: "Websites for schools, institutes and training centres to share information, courses and updates.",
      hi: "स्कूल, संस्थान और ट्रेनिंग सेंटर के लिए जानकारी, कोर्स और अपडेट साझा करने वाली वेबसाइट।",
    },
    description: {
      en: "Websites for schools, institutes, and training centers to manage courses and share learning materials. Parents and students get notices, admissions information, galleries and contact details in one trusted place.",
      hi: "स्कूल, संस्थान और ट्रेनिंग सेंटर के लिए वेबसाइट जहाँ कोर्स मैनेज हों और पढ़ाई की सामग्री साझा हो। अभिभावकों और छात्रों को नोटिस, एडमिशन जानकारी, गैलरी और संपर्क एक भरोसेमंद जगह मिलते हैं।",
    },
    features: [
      { en: "Notices, admissions & gallery", hi: "नोटिस, एडमिशन और गैलरी" },
      { en: "Easy course & content management", hi: "आसान कोर्स और कंटेंट मैनेजमेंट" },
      { en: "Highly professional & mobile friendly", hi: "प्रोफ़ेशनल और मोबाइल फ़्रेंडली" },
    ],
    deliverables: [
      { en: "Home, About, Academics, Admissions, Gallery, Contact", hi: "होम, परिचय, शिक्षा, एडमिशन, गैलरी, संपर्क" },
      { en: "Notice board with latest announcements", hi: "नई सूचनाओं वाला नोटिस बोर्ड" },
      { en: "Photo gallery for events and achievements", hi: "कार्यक्रमों और उपलब्धियों की फ़ोटो गैलरी" },
      { en: "Google Maps & Business Profile setup", hi: "Google मैप्स और बिज़नेस प्रोफ़ाइल सेटअप" },
    ],
    idealFor: [
      { en: "CBSE / state-board schools", hi: "CBSE / राज्य बोर्ड स्कूल" },
      { en: "Coaching & training institutes", hi: "कोचिंग और ट्रेनिंग संस्थान" },
      { en: "Colleges and skill centres", hi: "कॉलेज और स्किल सेंटर" },
    ],
    faqs: [
      {
        q: { en: "Can the school staff post notices?", hi: "क्या स्कूल स्टाफ़ नोटिस डाल सकता है?" },
        a: {
          en: "Yes. Notices and gallery updates can be published by your staff without any coding.",
          hi: "हाँ। आपका स्टाफ़ बिना कोडिंग के नोटिस और गैलरी अपडेट कर सकता है।",
        },
      },
    ],
  },
  {
    slug: "website-maintenance-support",
    kind: "tech",
    published: true,
    icon: "wrench",
    title: { en: "Website Maintenance & Support", hi: "वेबसाइट मेंटेनेंस और सपोर्ट" },
    short: {
      en: "Updates, security patches, backups and monitoring so your site stays fast and safe after launch.",
      hi: "अपडेट, सिक्योरिटी पैच, बैकअप और मॉनिटरिंग, ताकि लॉन्च के बाद भी वेबसाइट तेज़ और सुरक्षित रहे।",
    },
    description: {
      en: "Launch is only the beginning. We keep your website healthy with regular updates, security patches, backups, uptime monitoring, content changes and performance tuning, so you can focus on your business while we look after the site.",
      hi: "लॉन्च तो शुरुआत है। हम नियमित अपडेट, सिक्योरिटी पैच, बैकअप, अपटाइम मॉनिटरिंग, कंटेंट बदलाव और परफ़ॉर्मेंस सुधार से आपकी वेबसाइट को स्वस्थ रखते हैं, ताकि आप अपने व्यवसाय पर ध्यान दें।",
    },
    features: [
      { en: "Security patches & regular backups", hi: "सिक्योरिटी पैच और नियमित बैकअप" },
      { en: "Uptime & performance monitoring", hi: "अपटाइम और परफ़ॉर्मेंस मॉनिटरिंग" },
      { en: "Content updates on request", hi: "ज़रूरत पर कंटेंट अपडेट" },
    ],
    deliverables: [
      { en: "Monthly dependency and security updates", hi: "मासिक डिपेंडेंसी और सिक्योरिटी अपडेट" },
      { en: "Automated backups with quick restore", hi: "जल्दी रीस्टोर वाले ऑटोमैटिक बैकअप" },
      { en: "Uptime alerts and speed checks", hi: "अपटाइम अलर्ट और स्पीड जाँच" },
      { en: "Text, image and price changes", hi: "टेक्स्ट, इमेज और कीमत में बदलाव" },
    ],
    idealFor: [
      { en: "Businesses without an in-house developer", hi: "बिना इन-हाउस डेवलपर वाले व्यवसाय" },
      { en: "Schools with frequent notices", hi: "बार-बार नोटिस देने वाले स्कूल" },
      { en: "Online stores that change prices often", hi: "बार-बार कीमत बदलने वाले ऑनलाइन स्टोर" },
    ],
    faqs: [
      {
        q: { en: "Do you maintain websites you didn't build?", hi: "क्या आप दूसरों की बनाई वेबसाइट भी संभालते हैं?" },
        a: {
          en: "Usually yes. We first review the existing site and then suggest a maintenance plan.",
          hi: "आमतौर पर हाँ। हम पहले मौजूदा साइट की समीक्षा करते हैं, फिर मेंटेनेंस प्लान सुझाते हैं।",
        },
      },
    ],
  },
  {
    slug: "google-map-listing",
    kind: "tech",
    published: true,
    icon: "map-pin",
    title: { en: "Google Map Listing", hi: "Google मैप लिस्टिंग" },
    short: {
      en: "Get found on Google Maps: optimised listings that increase local reach and bring nearby customers.",
      hi: "Google मैप्स पर दिखें: ऑप्टिमाइज़्ड लिस्टिंग से लोकल पहुँच बढ़ाएँ और नज़दीकी ग्राहक पाएँ।",
    },
    description: {
      en: "Helping businesses improve their online visibility by optimizing Google Maps listings, increasing local reach, and attracting more customers. We set the right category, location pin, photos and details so people nearby can find, call and visit you.",
      hi: "Google मैप्स लिस्टिंग ऑप्टिमाइज़ करके व्यवसायों की ऑनलाइन पहचान बढ़ाना, लोकल पहुँच बढ़ाना और ज़्यादा ग्राहक लाना। सही कैटेगरी, लोकेशन पिन, फ़ोटो और जानकारी ताकि आस-पास के लोग आपको ढूँढ़ें, कॉल करें और आएँ।",
    },
    features: [
      { en: "Accurate pin, category & hours", hi: "सही पिन, कैटेगरी और समय" },
      { en: "Photos and service details", hi: "फ़ोटो और सर्विस विवरण" },
      { en: "More calls & direction requests", hi: "ज़्यादा कॉल और दिशा अनुरोध" },
    ],
    deliverables: [
      { en: "New listing or claim of existing listing", hi: "नई लिस्टिंग या मौजूदा लिस्टिंग क्लेम" },
      { en: "Category, keywords and description optimisation", hi: "कैटेगरी, कीवर्ड और विवरण ऑप्टिमाइज़ेशन" },
      { en: "Photo upload and contact details", hi: "फ़ोटो अपलोड और संपर्क विवरण" },
      { en: "Guidance on collecting reviews", hi: "रिव्यू जुटाने का मार्गदर्शन" },
    ],
    idealFor: [
      { en: "Shops and showrooms", hi: "दुकानें और शोरूम" },
      { en: "Clinics, schools and institutes", hi: "क्लिनिक, स्कूल और संस्थान" },
      { en: "Service providers with a local area", hi: "लोकल क्षेत्र में सर्विस देने वाले" },
    ],
    faqs: [
      {
        q: { en: "How long until my business shows on Maps?", hi: "मेरा व्यवसाय मैप्स पर कब दिखेगा?" },
        a: {
          en: "Once Google verifies the listing it usually appears within a few days. Verification time depends on Google.",
          hi: "Google के वेरिफ़ाई करने के बाद आमतौर पर कुछ दिनों में दिखता है। वेरिफ़िकेशन का समय Google पर निर्भर है।",
        },
      },
    ],
  },
  {
    slug: "google-business-profile",
    kind: "tech",
    published: true,
    icon: "badge-check",
    title: { en: "Google Business Profile Creation & Optimization", hi: "Google बिज़नेस प्रोफ़ाइल निर्माण और ऑप्टिमाइज़ेशन" },
    short: {
      en: "Create and optimise your Google Business Profile to build trust and attract nearby customers.",
      hi: "Google बिज़नेस प्रोफ़ाइल बनाएँ और ऑप्टिमाइज़ करें, भरोसा बढ़ाएँ और नज़दीकी ग्राहक पाएँ।",
    },
    description: {
      en: "Helping businesses create and optimize their Google Business Profile to improve local visibility, build customer trust, and attract more nearby customers. A complete, active profile helps you appear in local search and Maps results.",
      hi: "व्यवसायों को Google बिज़नेस प्रोफ़ाइल बनाने और ऑप्टिमाइज़ करने में मदद, ताकि लोकल पहचान बढ़े, ग्राहकों का भरोसा बने और ज़्यादा नज़दीकी ग्राहक आएँ।",
    },
    features: [
      { en: "Profile setup & verification help", hi: "प्रोफ़ाइल सेटअप और वेरिफ़िकेशन मदद" },
      { en: "Posts, photos & services", hi: "पोस्ट, फ़ोटो और सर्विसेज़" },
      { en: "Review & reputation guidance", hi: "रिव्यू और प्रतिष्ठा मार्गदर्शन" },
    ],
    deliverables: [
      { en: "Complete profile with services and products", hi: "सर्विस और प्रोडक्ट के साथ पूरी प्रोफ़ाइल" },
      { en: "Keyword-rich business description", hi: "कीवर्ड वाला बिज़नेस विवरण" },
      { en: "Website, WhatsApp and booking links", hi: "वेबसाइट, WhatsApp और बुकिंग लिंक" },
      { en: "Monthly post ideas (optional)", hi: "मासिक पोस्ट आइडिया (वैकल्पिक)" },
    ],
    idealFor: [
      { en: "New businesses starting online", hi: "ऑनलाइन शुरुआत करने वाले नए व्यवसाय" },
      { en: "Businesses with few or no reviews", hi: "कम या बिना रिव्यू वाले व्यवसाय" },
      { en: "Anyone appearing in local search", hi: "लोकल सर्च में आने वाले सभी" },
    ],
    faqs: [
      {
        q: { en: "Is Google Business Profile free?", hi: "क्या Google बिज़नेस प्रोफ़ाइल मुफ़्त है?" },
        a: {
          en: "Yes, Google does not charge for the profile. You pay us only for setup and optimisation work.",
          hi: "हाँ, Google प्रोफ़ाइल के लिए शुल्क नहीं लेता। आप केवल हमारे सेटअप और ऑप्टिमाइज़ेशन काम का भुगतान करते हैं।",
        },
      },
    ],
  },

  // ---------------- Non-tech services ----------------
  {
    slug: "data-entry-processing",
    kind: "non-tech",
    published: true,
    icon: "database",
    image: {
      src: "/images/data_entry.webp",
      alt: { en: "Data entry and processing work on a computer", hi: "कंप्यूटर पर डेटा एंट्री और प्रोसेसिंग" },
    },
    title: { en: "Data Entry & Processing", hi: "डेटा एंट्री और प्रोसेसिंग" },
    short: {
      en: "Accurate and organized data entry solutions for businesses and organizations.",
      hi: "व्यवसायों और संस्थाओं के लिए सटीक और व्यवस्थित डेटा एंट्री सेवाएँ।",
    },
    description: {
      en: "Accurate and organized data entry solutions for businesses and organizations. Our trained team converts records, forms and documents into clean, structured digital data delivered in the format you need.",
      hi: "व्यवसायों और संस्थाओं के लिए सटीक और व्यवस्थित डेटा एंट्री। हमारी प्रशिक्षित टीम रिकॉर्ड, फ़ॉर्म और दस्तावेज़ों को साफ़, व्यवस्थित डिजिटल डेटा में बदलती है, आपकी ज़रूरत के फ़ॉर्मेट में।",
    },
    features: [
      { en: "High accuracy, double-checked", hi: "उच्च सटीकता, दोबारा जाँचा गया" },
      { en: "Excel, Google Sheets or CSV", hi: "Excel, Google Sheets या CSV" },
      { en: "Confidential handling of records", hi: "रिकॉर्ड की गोपनीय हैंडलिंग" },
    ],
    deliverables: [
      { en: "Manual entry from paper or scanned records", hi: "काग़ज़ या स्कैन रिकॉर्ड से मैनुअल एंट्री" },
      { en: "Data cleaning and de-duplication", hi: "डेटा सफ़ाई और डुप्लीकेट हटाना" },
      { en: "Structured spreadsheets and reports", hi: "व्यवस्थित स्प्रेडशीट और रिपोर्ट" },
    ],
    idealFor: [
      { en: "Schools managing student records", hi: "छात्र रिकॉर्ड संभालने वाले स्कूल" },
      { en: "Shops digitising stock and bills", hi: "स्टॉक और बिल डिजिटल करने वाली दुकानें" },
      { en: "Offices with backlog paperwork", hi: "पुराने काग़ज़ी काम वाले ऑफ़िस" },
    ],
    faqs: [
      {
        q: { en: "Is my data kept confidential?", hi: "क्या मेरा डेटा गोपनीय रहता है?" },
        a: {
          en: "Yes. Access is limited to the assigned team members and files are deleted after delivery on request.",
          hi: "हाँ। केवल नियुक्त टीम सदस्यों की पहुँच होती है और अनुरोध पर डिलीवरी के बाद फ़ाइलें हटा दी जाती हैं।",
        },
      },
    ],
  },
  // TODO(owner): confirm, rewrite and set published: true for the non-tech services you offer.
  ...(
    [
      ["back-office-support", "briefcase", "Back-Office Support", "बैक-ऑफ़िस सपोर्ट"],
      ["document-digitization", "scan", "Document Digitization", "दस्तावेज़ डिजिटाइज़ेशन"],
      ["typing-form-filling", "keyboard", "Typing & Form Filling", "टाइपिंग और फ़ॉर्म भरना"],
      ["social-media-management", "megaphone", "Social Media Management", "सोशल मीडिया मैनेजमेंट"],
      ["graphic-design-printing", "palette", "Graphic Design & Printing", "ग्राफ़िक डिज़ाइन और प्रिंटिंग"],
    ] as const
  ).map(
    ([slug, icon, en, hi]): Service => ({
      slug,
      kind: "non-tech",
      published: false,
      icon,
      title: { en, hi },
      short: "TODO(owner): one-line description",
      description: "TODO(owner): full description",
      features: [],
      deliverables: [],
      idealFor: [],
      faqs: [],
    }),
  ),
];

export const publishedServices = services.filter((s) => s.published);
export const techServices = publishedServices.filter((s) => s.kind === "tech");
export const nonTechServices = publishedServices.filter((s) => s.kind === "non-tech");

export function getService(slug: string) {
  return publishedServices.find((s) => s.slug === slug);
}

/** "How We Work" process strip. */
export const processSteps: { icon: IconName; title: Localized; body: Localized }[] = [
  { icon: "messages", title: { en: "Discuss", hi: "चर्चा" }, body: { en: "We understand your goals, audience and budget.", hi: "हम आपके लक्ष्य, ग्राहक और बजट समझते हैं।" } },
  { icon: "pen-tool", title: { en: "Design", hi: "डिज़ाइन" }, body: { en: "A clean, on-brand design you approve first.", hi: "पहले आपकी मंज़ूरी वाला साफ़, ब्रांड के अनुरूप डिज़ाइन।" } },
  { icon: "code", title: { en: "Develop", hi: "डेवलप" }, body: { en: "Fast, secure, mobile-first build with modern tech.", hi: "आधुनिक तकनीक से तेज़, सुरक्षित, मोबाइल-फ़र्स्ट निर्माण।" } },
  { icon: "rocket", title: { en: "Deploy", hi: "लॉन्च" }, body: { en: "Go live on your domain, indexed on Google.", hi: "आपके डोमेन पर लाइव, Google पर इंडेक्स।" } },
  { icon: "life-buoy", title: { en: "Support", hi: "सपोर्ट" }, body: { en: "Updates, fixes and help whenever you need it.", hi: "जब भी ज़रूरत हो, अपडेट, सुधार और मदद।" } },
];
