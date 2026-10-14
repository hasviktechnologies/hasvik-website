// TODO(owner): have these reviewed by a legal professional before launch.
import type { Localized } from "@/i18n/config";

export type LegalDoc = { updatedISO: string; sections: { heading: Localized; body: Localized }[] };

export const privacy: LegalDoc = {
  updatedISO: "2026-10-14",
  sections: [
    {
      heading: { en: "Who we are", hi: "हम कौन हैं" },
      body: {
        en: "HASVIK Technologies (Ward No 6, Uttar Tola, Maniar, Ballia, Uttar Pradesh 277207) operates hasviktech.com. For any privacy question, write to info@hasviktech.com.",
        hi: "HASVIK Technologies (वार्ड नंबर 6, उत्तर टोला, मनियर, बलिया, उत्तर प्रदेश 277207) hasviktech.com चलाता है। गोपनीयता से जुड़े किसी भी सवाल के लिए info@hasviktech.com पर लिखें।",
      },
    },
    {
      heading: { en: "What we collect", hi: "हम क्या जानकारी लेते हैं" },
      body: {
        en: "When you submit the quote form we receive your name, phone number, optional email, selected service, budget range and message. We do not ask for payment details on this website.",
        hi: "कोटेशन फ़ॉर्म भरने पर हमें आपका नाम, फ़ोन नंबर, वैकल्पिक ईमेल, चुनी गई सेवा, बजट और संदेश मिलता है। इस वेबसाइट पर हम भुगतान की जानकारी नहीं माँगते।",
      },
    },
    {
      heading: { en: "How we use it", hi: "हम इसका उपयोग कैसे करते हैं" },
      body: {
        en: "Only to reply to your enquiry, prepare a quote and deliver the services you ask for. We never sell your information. Form submissions are delivered to our inbox by our email provider (Resend).",
        hi: "केवल आपकी पूछताछ का जवाब देने, कोटेशन बनाने और आपकी माँगी सेवाएँ देने के लिए। हम आपकी जानकारी कभी नहीं बेचते। फ़ॉर्म की जानकारी हमारे ईमेल प्रदाता (Resend) के ज़रिए हमारे इनबॉक्स तक पहुँचती है।",
      },
    },
    {
      heading: { en: "Analytics and third parties", hi: "एनालिटिक्स और तृतीय पक्ष" },
      body: {
        en: "We use privacy-friendly, cookie-less Vercel Analytics to understand page visits in aggregate. The Google Map on our contact page loads only after you click it. WhatsApp links open WhatsApp, which has its own privacy policy.",
        hi: "हम पेज विज़िट को सामूहिक रूप से समझने के लिए बिना कुकी वाले Vercel Analytics का उपयोग करते हैं। संपर्क पेज का Google मैप आपके क्लिक करने पर ही लोड होता है। WhatsApp लिंक WhatsApp खोलते हैं, जिसकी अपनी गोपनीयता नीति है।",
      },
    },
    {
      heading: { en: "Retention and your rights", hi: "रखने की अवधि और आपके अधिकार" },
      body: {
        en: "We keep enquiry details only as long as needed to serve you. You can ask us to see, correct or delete your information at any time by emailing info@hasviktech.com.",
        hi: "हम पूछताछ की जानकारी केवल उतने समय रखते हैं जितनी ज़रूरत हो। आप info@hasviktech.com पर ईमेल करके कभी भी अपनी जानकारी देखने, सुधारने या हटाने को कह सकते हैं।",
      },
    },
  ],
};

export const terms: LegalDoc = {
  updatedISO: "2026-10-14",
  sections: [
    {
      heading: { en: "Services", hi: "सेवाएँ" },
      body: {
        en: "HASVIK Technologies provides website development, Google listing, maintenance, data entry and related services. The exact scope, timeline and price of each project are agreed in writing (email or WhatsApp) before work starts.",
        hi: "HASVIK Technologies वेबसाइट डेवलपमेंट, Google लिस्टिंग, मेंटेनेंस, डेटा एंट्री और संबंधित सेवाएँ देता है। हर प्रोजेक्ट का दायरा, समय और क़ीमत काम शुरू होने से पहले लिखित (ईमेल या WhatsApp) में तय होती है।",
      },
    },
    {
      heading: { en: "Payments", hi: "भुगतान" },
      body: {
        en: "Projects usually begin after an advance payment, with the balance due before go-live, unless agreed otherwise. All payments are receipted.",
        hi: "आमतौर पर प्रोजेक्ट अग्रिम भुगतान के बाद शुरू होते हैं और बाक़ी राशि लाइव होने से पहले देनी होती है, जब तक कुछ और तय न हो। हर भुगतान की रसीद दी जाती है।",
      },
    },
    {
      heading: { en: "Ownership", hi: "स्वामित्व" },
      body: {
        en: "Once paid in full, you own your website content and domain. We may show the finished work in our portfolio unless you ask us not to.",
        hi: "पूरा भुगतान होने पर वेबसाइट का कंटेंट और डोमेन आपका होता है। आप मना न करें तो हम पूरा हुआ काम अपने पोर्टफ़ोलियो में दिखा सकते हैं।",
      },
    },
    {
      heading: { en: "Website use", hi: "वेबसाइट का उपयोग" },
      body: {
        en: "Content on hasviktech.com is for general information. Client names, logos and screenshots belong to their respective owners and are shown with permission.",
        hi: "hasviktech.com की सामग्री सामान्य जानकारी के लिए है। ग्राहकों के नाम, लोगो और स्क्रीनशॉट उनके मालिकों के हैं और अनुमति से दिखाए गए हैं।",
      },
    },
    {
      heading: { en: "Contact", hi: "संपर्क" },
      body: {
        en: "Questions about these terms: info@hasviktech.com or +91 94542 63965.",
        hi: "इन शर्तों के बारे में सवाल: info@hasviktech.com या +91 94542 63965।",
      },
    },
  ],
};
