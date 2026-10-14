import type { Localized } from "@/i18n/config";

export type TeamMember = {
  name: string;
  role: Localized;
  photo: { src: string; width: number; height: number };
};

export const team: TeamMember[] = [
  {
    name: "Balwant Singh",
    role: { en: "Team Supervisor", hi: "टीम सुपरवाइज़र" },
    photo: { src: "/images/team/balwant.webp", width: 640, height: 636 },
  },
  {
    name: "Akankshya Mishra",
    role: { en: "Frontend Expert", hi: "फ़्रंटएंड एक्सपर्ट" },
    photo: { src: "/images/team/akankshya.webp", width: 460, height: 425 },
  },
  {
    name: "Annu Singh",
    role: { en: "Sales Expert", hi: "सेल्स एक्सपर्ट" },
    photo: { src: "/images/team/annu.webp", width: 640, height: 652 },
  },
  {
    name: "Aakriti Singh",
    role: { en: "Sales Expert", hi: "सेल्स एक्सपर्ट" },
    photo: { src: "/images/team/aakriti.webp", width: 485, height: 514 },
  },
  {
    name: "Youvraj Singh",
    role: { en: "Software Development Intern", hi: "सॉफ़्टवेयर डेवलपमेंट इंटर्न" },
    photo: { src: "/images/team/YouvrajPhoto.webp", width: 640, height: 640 },
  },
  {
    name: "Abhishek Gupta",
    role: { en: "Software Development Intern", hi: "सॉफ़्टवेयर डेवलपमेंट इंटर्न" },
    photo: { src: "/images/team/AbhishekPhoto.webp", width: 640, height: 640 },
  },
];

// Mentor names are withheld on purpose (as on the old site).
// TODO(owner): add `name` / photo if the mentors agree to be named.
export const mentors: { title: Localized; body: Localized; icon: "monitor" | "server" }[] = [
  {
    icon: "monitor",
    title: { en: "Frontend Mentor", hi: "फ़्रंटएंड मेंटर" },
    body: {
      en: "Experienced UI architect with extensive expertise in building enterprise-grade products for leading global tech companies.",
      hi: "अग्रणी वैश्विक टेक कंपनियों के लिए एंटरप्राइज़-ग्रेड प्रोडक्ट बनाने में व्यापक अनुभव वाले UI आर्किटेक्ट।",
    },
  },
  {
    icon: "server",
    title: { en: "Backend Mentor", hi: "बैकएंड मेंटर" },
    body: {
      en: "Highly experienced system design specialist with strong corporate exposure in scalable backend infrastructure and cloud systems.",
      hi: "स्केलेबल बैकएंड इंफ़्रास्ट्रक्चर और क्लाउड सिस्टम में मज़बूत कॉर्पोरेट अनुभव वाले सिस्टम डिज़ाइन विशेषज्ञ।",
    },
  },
];
