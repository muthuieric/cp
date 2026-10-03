export interface QuickChip {
  label: string;
  query: string;
}

export interface ChatAnswerAction {
  label: string;
  href?: string;
  whatsappText?: string;
  isWhatsApp?: boolean;
}

export interface PredefinedQA {
  id: string;
  category: string;
  keywords: string[];
  phrases: string[];
  response: string;
  actions?: ChatAnswerAction[];
}

export const WHATSAPP_PHONE = "254768096084";
export const DISPLAY_PHONE_1 = "0768 096 084";
export const DISPLAY_PHONE_2 = "0769 90 91 90";
export const CONTACT_EMAIL = "hello@karanholdings.com";
export const WEBSITE_URL = "www.karanholdings.com";

export function getWhatsAppUrl(customText?: string): string {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  if (!customText) {
    return `${base}?text=${encodeURIComponent("Hello Karan Holdings! I would like to inquire about your property services.")}`;
  }
  return `${base}?text=${encodeURIComponent(customText)}`;
}

export const QUICK_PROMPT_CHIPS: QuickChip[] = [
  { label: "About Karan Holdings", query: "Who is Karan Holdings and what do you do?" },
  { label: "Services Offered", query: "What services do you offer?" },
  { label: "Property Types", query: "What types of properties do you offer?" },
  { label: "Featured Projects", query: "What housing projects and locations do you have?" },
  { label: "Our Approach", query: "What is your approach to real estate?" },
  { label: "Core Values", query: "What are your core values?" },
  { label: "Contact Details", query: "How do I get in touch with Karan Holdings?" },
  { label: "Chat on WhatsApp", query: "Connect me with an agent on WhatsApp" },
];

export const KNOWLEDGE_BASE: PredefinedQA[] = [
  {
    id: "about_company",
    category: "About",
    keywords: ["who is pm", "company profile", "pm consult", "overview", "what is pm consult", "about pm consult", "who are you"],
    phrases: [
      "who is pm consult",
      "tell me about pm consult",
      "what is pm consult",
      "company profile",
      "what do you do",
      "about us"
    ],
    response: "KARAN HOLDINGS is a dynamic real estate consultancy and management company based in Nairobi, Kenya.\n\nTagline: Home is Part of Your Family | Settle for Everything.\n\nWe specialize in providing tailored solutions in property advisory, marketing, management, and project consultancy, ensuring our clients achieve their real estate goals with ease and efficiency.\n\nVision:\nTo be the leading provider of luxury real estate solutions in Nairobi, known for our commitment to excellence, personalized service, and transformative property experiences.\n\nMission:\nWe are dedicated to understanding the unique needs of each client, providing timely solutions, and ensuring the highest standards of service in every transaction.",
    actions: [
      { label: "View Properties", href: "/properties" },
      { label: "Chat on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I would like to learn more about your company and properties." }
    ]
  },
  {
    id: "vision_mission",
    category: "About",
    keywords: ["vision", "mission", "goal", "purpose", "motto"],
    phrases: [
      "what is your vision",
      "what is your mission",
      "vision and mission"
    ],
    response: "Vision:\nTo be the leading provider of luxury real estate solutions in Nairobi, known for our commitment to excellence, personalized service, and transformative property experiences.\n\nMission:\nWe are dedicated to understanding the unique needs of each client, providing timely solutions, and ensuring the highest standards of service in every transaction.",
    actions: [
      { label: "About Page", href: "/about" },
      { label: "Chat on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I would like to speak with a representative." }
    ]
  },
  {
    id: "why_choose_us",
    category: "Why Choose Us",
    keywords: ["why", "choose", "advantage", "benefit", "difference", "standout"],
    phrases: [
      "why choose pm consult",
      "why should i work with you",
      "what makes you different"
    ],
    response: "Why Choose Karan Holdings:\n\nAt KARAN HOLDINGS, we are dedicated to transforming the way you experience real estate. Specializing in luxury properties across Nairobi's prestigious neighborhoods, we connect clients with exquisite homes, upscale apartments, and prime investment opportunities.\n\nWith a commitment to excellence, we pride ourselves on delivering tailored solutions that meet the unique needs of our clients. Whether you are searching for a family home, an off-plan project, or a high-return investment property, we are here to guide you every step of the way.",
    actions: [
      { label: "View Properties", href: "/properties" },
      { label: "Talk to a Consultant", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I'd like to discuss my property requirements." }
    ]
  },
  {
    id: "our_approach",
    category: "Approach",
    keywords: ["approach", "method", "process", "steps", "how you work", "implementation", "support"],
    phrases: [
      "what is your approach",
      "how do you work",
      "what is your process",
      "consultation process"
    ],
    response: "Our 4-Step Approach:\n\n1. Comprehensive Consultation:\nWe begin by understanding the specific goals and aspirations of each client. Our approach is consultative, ensuring that every property aligns with your unique objectives.\n\n2. Personalized Property Experiences:\nWe believe every client deserves an exceptional real estate journey, crafted to their unique preferences and goals. We select properties that align with your lifestyle, whether it is a serene family home in Karen or a high-yield apartment in Westlands.\n\n3. Seamless Implementation:\nOnce we have identified the right property or solution for you, our team handles every step with precision and professionalism. We facilitate smooth negotiations and documentation to secure your property with confidence.\n\n4. Post-Implementation Support:\nOur commitment to your satisfaction does not end at closing; we continue to support you long after the transaction.",
    actions: [
      { label: "Contact Us", href: "/contact" },
      { label: "Inquire on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I would like to schedule a consultation regarding your property approach." }
    ]
  },
  {
    id: "core_values",
    category: "Values",
    keywords: ["values", "integrity", "excellence", "innovation", "client success", "principles", "standards"],
    phrases: [
      "what are your core values",
      "what do you stand for",
      "company values"
    ],
    response: "Our Core Values:\n\n1. Integrity:\nUpholding the highest ethical standards in every interaction, ensuring transparency and trust with our clients.\n\n2. Excellence:\nWe go above and beyond to understand our clients' needs and provide tailored solutions that exceed expectations.\n\n3. Innovation:\nContinuously evolving and exploring new ways to address the unique property needs of each client.\n\n4. Client Success:\nYour satisfaction is at the heart of what we do. We measure our success by the success of our clients, ensuring every interaction is meaningful and results-oriented.",
    actions: [
      { label: "About Karan Holdings", href: "/about" },
      { label: "Speak to Us", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I would like to inquire about your property advisory services." }
    ]
  },
  {
    id: "services_offered",
    category: "Services",
    keywords: ["service", "services", "offer", "all services", "list of services", "what do you provide"],
    phrases: [
      "what services do you offer",
      "what do you provide",
      "services offered",
      "list of services"
    ],
    response: "Services Offered by Karan Holdings:\n\n1. Property Advisory:\nWe empower clients with expert advice to make confident, informed decisions by offering expert insights on market trends, rental yields, and lucrative properties and projects.\n\n2. Real Estate Marketing:\nWe craft tailored marketing campaigns using professional photography and engaging property descriptions. We also leverage social media and digital platforms to showcase properties to the right audience.\n\n3. Property Management:\nComprehensive management services, including tenant sourcing, rent collection, budget reports, and property maintenance ensuring smooth operations and optimal returns for landlords.\n\n4. Agency:\nAssisting clients in buying, selling, and leasing high-end residential and commercial properties. Additionally, we help clients identify and acquire prime land for residential or commercial development.",
    actions: [
      { label: "Browse Properties", href: "/properties" },
      { label: "Request Service on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I would like to inquire about your real estate services." }
    ]
  },
  {
    id: "service_property_management",
    category: "Services",
    keywords: ["property management", "manage property", "tenant sourcing", "rent collection", "budget reports", "landlord", "maintenance"],
    phrases: [
      "tell me about your property management",
      "property management services",
      "do you manage properties",
      "property maintenance and rent collection"
    ],
    response: "Property Management Service:\n\nWe provide comprehensive management services, including tenant sourcing, rent collection, budget reports, and property maintenance, ensuring smooth operations and optimal returns for landlords.",
    actions: [
      { label: "Inquire on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I would like to discuss property management for my property." },
      { label: "Contact Us", href: "/contact" }
    ]
  },
  {
    id: "service_property_advisory",
    category: "Services",
    keywords: ["property advisory", "advice", "consulting", "market trends", "rental yields", "lucrative projects", "investment advice"],
    phrases: [
      "property advisory",
      "real estate advice",
      "insights on market trends",
      "consultancy services"
    ],
    response: "Property Advisory Service:\n\nWe empower clients with expert advice to make confident, informed decisions by offering expert insights on market trends, rental yields, and lucrative properties and projects.",
    actions: [
      { label: "Consult on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I am seeking property advisory and market insights." },
      { label: "Contact Us", href: "/contact" }
    ]
  },
  {
    id: "service_marketing",
    category: "Services",
    keywords: ["marketing", "real estate marketing", "campaigns", "photography", "descriptions", "social media", "showcase"],
    phrases: [
      "real estate marketing",
      "how do you market properties",
      "property marketing campaigns"
    ],
    response: "Real Estate Marketing Service:\n\nWe craft tailored marketing campaigns using professional photography and engaging property descriptions. We also leverage social media and digital platforms to showcase properties to the right audience.",
    actions: [
      { label: "Discuss Marketing on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I would like assistance with marketing my property." }
    ]
  },
  {
    id: "service_agency",
    category: "Services",
    keywords: ["agency", "leasing", "selling", "buying", "acquire land", "residential agency", "commercial agency"],
    phrases: [
      "agency services",
      "buy sell lease",
      "help me acquire land",
      "agency support"
    ],
    response: "Agency Services:\n\nAssisting clients in buying, selling, and leasing high-end residential and commercial properties. Additionally, we help clients identify and acquire prime land for residential or commercial development.",
    actions: [
      { label: "View Properties", href: "/properties" },
      { label: "Chat on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I need assistance from your real estate agency." }
    ]
  },
  {
    id: "property_types",
    category: "Properties",
    keywords: ["property", "properties", "types", "homes", "apartments", "villas", "rentals", "offplan", "off plan", "commercial", "land", "plots"],
    phrases: [
      "what types of properties do you offer",
      "property types we offer",
      "do you have apartments",
      "do you have commercial property",
      "do you sell land",
      "residential homes"
    ],
    response: "Property Types We Offer:\n\n1. Residential Homes:\nExclusive villas, mansions, and townhouses in Nairobi's prime neighborhoods, such as Runda, Spring Valley, Lower Kabete, and Karen.\n\n2. High End Unfurnished Apartments:\nSpacious apartments fitting urban lifestyles in prime locations like Westlands, Kilimani, and Upper Hill.\n\n3. Serviced and Short-Term Rentals:\nFully furnished units suitable for executive and urban living.\n\n4. Off-Plan Investments:\nUnlocking the potential of off-plan projects and high-return investment opportunities in key business hubs.\n\n5. Commercial Properties:\nPremium office spaces, retail shops, and warehouses designed to meet your business needs.\n\n6. Land:\nPrime plots for residential or commercial development in fast-growing areas around Nairobi and beyond.",
    actions: [
      { label: "Explore Properties", href: "/properties" },
      { label: "Request Listings on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! Please share available property listings matching my criteria." }
    ]
  },
  {
    id: "projects_locations",
    category: "Projects",
    keywords: [
      "project", "projects", "locations", "developments", "ineza", "runda", "1870 west", "westlands",
      "astoria", "lavington", "muthaiga heights", "five star paradise", "kiambu rd", "kiambu road",
      "the convex", "riverside", "colloseum", "terraces", "arboretum", "gtc", "zelig villas",
      "oakland residences", "aria park", "karen", "one general mathenge", "mandrake", "saruni",
      "areas", "neighborhoods", "50+"
    ],
    phrases: [
      "what housing projects do you have",
      "featured projects",
      "what locations do you cover",
      "where are your properties located",
      "do you have projects in westlands",
      "do you have projects in runda",
      "do you have projects in karen"
    ],
    response: "Featured Housing Projects & Locations (50+ House Locations across Nairobi):\n\n• Ineza, Runda\n• 1870 West, Westlands\n• Astoria, Lavington\n• Muthaiga Heights\n• Five Star Paradise, Kiambu Road\n• The Convex, Riverside\n• Colloseum, Westlands\n• Terraces, Arboretum\n• GTC, Nairobi\n• Zelig Villas, Lavington\n• Oakland Residences, Westlands\n• Aria Park, Karen\n• One General Mathenge, Westlands\n• The Mandrake, Westlands\n• Saruni, Riverside\n\nWe cover over 50 prime locations across Nairobi and beyond.",
    actions: [
      { label: "Browse Locations", href: "/properties" },
      { label: "Inquire on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I am inquiring about one of your featured projects/locations." }
    ]
  },
  {
    id: "contact_details",
    category: "Contact",
    keywords: ["contact", "phone", "email", "website", "call", "reach", "touch", "office", "number", "talk"],
    phrases: [
      "how do i contact you",
      "what is your phone number",
      "what is your email",
      "let's get in touch",
      "contact details"
    ],
    response: "Contact Karan Holdings:\n\nPhone: 0768 096 084 / 0769 90 91 90\nEmail: hello@karanholdings.com\nWebsite: www.karanholdings.com\n\nWe are here to make your real estate journey seamless and enjoyable. Whether you are searching for your dream home, a high-yield investment, or expert advice, we would love to hear from you.",
    actions: [
      { label: "Chat on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I'd like to get in touch." },
      { label: "Contact Form", href: "/contact" }
    ]
  },
  {
    id: "greetings",
    category: "General",
    keywords: ["hi", "hello", "hey", "habari", "mambo", "greetings", "good morning", "good afternoon", "good evening", "sasa"],
    phrases: ["hello", "hi there", "good morning", "good afternoon", "habari yako"],
    response: "Hello and welcome to Karan Holdings. How can we assist you today with our property advisory, agency, marketing, or management services?",
    actions: [
      { label: "Browse Properties", href: "/properties" },
      { label: "Chat on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I would like assistance with luxury properties." }
    ]
  },
  {
    id: "whatsapp_direct",
    category: "Support",
    keywords: ["agent", "human", "person", "whatsapp", "consultant", "speak", "representative"],
    phrases: [
      "talk to an agent",
      "speak to a human",
      "chat on whatsapp",
      "connect to agent"
    ],
    response: "You can connect directly with our property consultants on WhatsApp for immediate assistance.",
    actions: [
      { label: "Open WhatsApp Chat", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I would like to speak directly with a consultant." },
      { label: "Call 0768 096 084", href: "tel:+254768096084" }
    ]
  }
];

export interface MatchResult {
  isMatch: boolean;
  response: string;
  actions?: ChatAnswerAction[];
  suggestWhatsAppFallback?: boolean;
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findMatchingAnswer(userInput: string): MatchResult {
  const normalized = normalizeText(userInput);

  if (!normalized) {
    return {
      isMatch: false,
      response: "Please select a topic or type your question below.",
      actions: [
        { label: "Chat on WhatsApp", isWhatsApp: true, whatsappText: "Hello Karan Holdings! I'd like assistance with properties." }
      ]
    };
  }

  // 1. Exact phrase matching
  for (const item of KNOWLEDGE_BASE) {
    for (const phrase of item.phrases) {
      if (normalized.includes(normalizeText(phrase))) {
        return {
          isMatch: true,
          response: item.response,
          actions: item.actions
        };
      }
    }
  }

  // 2. Tokenized keyword scoring
  const inputWords = normalized.split(" ").filter((w) => w.length > 0);
  const paddedNormalized = ` ${normalized} `;
  let bestMatch: PredefinedQA | null = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of item.keywords) {
      const normKeyword = normalizeText(keyword);
      if (normKeyword.includes(" ")) {
        // Multi-word phrase check (e.g. "property management", "1870 west")
        if (paddedNormalized.includes(` ${normKeyword} `)) {
          score += 8 + normKeyword.split(" ").length * 2;
        }
      } else {
        // Exact single word match
        if (inputWords.includes(normKeyword)) {
          score += 4;
        } else if (normKeyword.length > 4) {
          for (const word of inputWords) {
            if (word.length > 3 && (word.startsWith(normKeyword) || normKeyword.startsWith(word))) {
              score += 1;
            }
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return {
      isMatch: true,
      response: bestMatch.response,
      actions: bestMatch.actions
    };
  }

  // Fallback to WhatsApp
  const whatsappInquiryText = `Hello Karan Holdings! I was on your website and had a question: "${userInput}". Could a consultant assist me?`;

  return {
    isMatch: false,
    suggestWhatsAppFallback: true,
    response: "I do not have that specific detail in our profile. You can reach our property consultants directly on WhatsApp for immediate assistance.",
    actions: [
      {
        label: "Chat on WhatsApp",
        isWhatsApp: true,
        whatsappText: whatsappInquiryText
      },
      {
        label: "Contact Page",
        href: "/contact"
      }
    ]
  };
}
