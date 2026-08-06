/* ============================================================
   MBA COMPASS — data layer
   All figures sourced Aug 2026. See README for provenance.
   FX: ₹95/$  ₹110/€  ₹128/£  ₹119/CHF  ₹74/S$
   ============================================================ */

const FX = { USD: 95, EUR: 110, GBP: 128, CHF: 119, SGD: 74 };

/* ---------- CAREER TRACKS ---------------------------------- */
const TRACKS = [
  {
    id: "brand",
    name: "Brand & Marketing Management",
    short: "Brand / CPG",
    blurb: "Own a brand's P&L at a consumer goods company — pricing, positioning, launches, campaigns. The classic creative-but-commercial MBA route.",
    dayToDay: "You own a product line. You decide what it costs, what it says, where it sits on a shelf, and what the ad looks like. You work with agencies, R&D, sales and finance. Half the job is taste, half is a spreadsheet.",
    whyHer: "This is the most natural creative pivot from where you are. You already do pharma commercial analytics — pricing, segmentation, launch strategy, sales-force sizing. That IS brand management, just for a molecule instead of a shampoo. You are not starting from zero; you are re-labelling three years of experience. The hard part is proving you have taste and instinct, not just models.",
    switchDifficulty: 2,
    switchNote: "Very achievable. CPG firms hire heavily from MBA internship pools and explicitly like analytical switchers.",
    ownBusiness: 4,
    ownBusinessNote: "Excellent founder training — you learn pricing, positioning, distribution and customer insight, which is 80% of a consumer startup.",
    compUS: "$140k–$155k base + ~$30k bonus",
    compEU: "€75k–€95k",
    compIndia: "₹35–55 LPA",
    employers: ["P&G", "Unilever", "Nestlé", "PepsiCo", "L'Oréal", "Mondelez", "Reckitt", "Diageo", "Johnson & Johnson", "Amazon (Brand)"],
    bestSchools: ["Kellogg", "Michigan Ross", "Duke Fuqua", "Columbia", "Wharton", "INSEAD", "London Business School"],
    visaNote: "CPG firms sponsor less readily than consulting in the US. Strong in Europe and excellent in India.",
    creativity: 4, analytics: 4, prestige: 3, hours: 2
  },
  {
    id: "product",
    name: "Product Management (Tech)",
    short: "Product",
    blurb: "Decide what gets built. Sit between engineering, design and business, and own whether a product succeeds.",
    dayToDay: "You write the spec, argue about the roadmap, talk to users, and ship. You have no direct authority over engineers and must persuade constantly. Data-heavy but judgement-driven.",
    whyHer: "A strong fit on paper — statistics honours plus three years of turning data into commercial decisions is exactly the PM raw material. Health-tech and pharma-tech PM is a genuinely under-served niche where your domain is a moat, not a liability. The gap is that you have never shipped a product to real users, and PM hiring screens hard for that.",
    switchDifficulty: 3,
    switchNote: "Doable but competitive. Tech PM hiring recovered through 2026. Health-tech and B2B SaaS are your realistic entry points, not consumer social.",
    ownBusiness: 5,
    ownBusinessNote: "The single best corporate training for founding a company. You learn to build, price, launch and iterate.",
    compUS: "$160k–$180k base + equity",
    compEU: "€85k–€110k",
    compIndia: "₹40–70 LPA",
    employers: ["Google", "Amazon", "Microsoft", "Meta", "Stripe", "Atlassian", "Salesforce", "Flipkart", "Razorpay", "Philips Health", "Roche Digital"],
    bestSchools: ["MIT Sloan", "Berkeley Haas", "Chicago Booth", "Kellogg", "NYU Stern", "INSEAD", "London Business School"],
    visaNote: "US tech sponsors H-1B but the $100k fee has cooled entry-level international hiring. Europe and Singapore are cleaner routes.",
    creativity: 4, analytics: 5, prestige: 4, hours: 3
  },
  {
    id: "luxury",
    name: "Luxury, Fashion & Design Business",
    short: "Luxury / Fashion",
    blurb: "Commercial roles inside houses where the product is desire — fashion, beauty, watches, hospitality, design.",
    dayToDay: "Merchandising, retail strategy, brand heat, collaborations, market entry. Extremely brand-led, relationship-driven, and geographically concentrated in Paris, Milan and London.",
    whyHer: "This is the most 'creative and engaging' answer on this list and the one that would genuinely change your daily life. It is also the biggest leap: nothing on your CV signals aesthetic judgement or consumer intuition yet. If this pulls at you, it must be evidenced before you apply — a styling side project, a fashion-retail pro bono engagement, a written point of view on Indian luxury. India is the fastest-growing luxury market in the world, which makes an Indian woman with commercial rigour genuinely valuable to these houses.",
    switchDifficulty: 4,
    switchNote: "Hard without a signal. Requires the right school (Milan or Paris), the right internship, and often working French or Italian.",
    ownBusiness: 5,
    ownBusinessNote: "The most direct route to founding a consumer brand — you learn margin, merchandising and brand-building from the people who do it best.",
    compUS: "$120k–$140k",
    compEU: "€70k–€95k",
    compIndia: "₹30–50 LPA",
    employers: ["LVMH", "Kering", "Richemont", "Chanel", "Hermès", "L'Oréal Luxe", "Estée Lauder", "Prada", "Reliance Brands", "Aditya Birla Fashion"],
    bestSchools: ["SDA Bocconi", "HEC Paris", "ESSEC", "INSEAD", "London Business School", "Columbia"],
    visaNote: "Milan and Paris are the hiring centres. Italian or French materially improves access; English-only roles exist but are fewer.",
    creativity: 5, analytics: 2, prestige: 4, hours: 3
  },
  {
    id: "media",
    name: "Media, Entertainment & Creative Industries",
    short: "Media / Creative",
    blurb: "Strategy, commercial and content roles at studios, streamers, gaming, sport, publishing and creator platforms.",
    dayToDay: "Content economics, licensing, audience strategy, partnerships. A business job wrapped around a creative product.",
    whyHer: "Genuinely engaging work and India's media economy is exploding. But it is the weakest fit for your current evidence and among the hardest to enter as an international student — these industries sponsor visas rarely and hire through networks. Consider it seriously only if you would take an India-based role immediately after the MBA, in which case it becomes very viable.",
    switchDifficulty: 4,
    switchNote: "Network-driven and sponsorship-poor abroad. Much easier if you intend to work in India.",
    ownBusiness: 4,
    ownBusinessNote: "Strong for creator-economy and content ventures; weaker for capital-intensive businesses.",
    compUS: "$130k–$150k",
    compEU: "€65k–€85k",
    compIndia: "₹30–55 LPA",
    employers: ["Netflix", "Disney", "Spotify", "Warner Bros Discovery", "Sony", "JioStar", "Nodwin", "Dream Sports", "Riot Games"],
    bestSchools: ["NYU Stern", "UCLA Anderson", "Columbia", "London Business School", "ISB"],
    visaNote: "Weak sponsorship abroad. The India route is the honest one.",
    creativity: 5, analytics: 2, prestige: 3, hours: 3
  },
  {
    id: "consulting",
    name: "Strategy & Management Consulting",
    short: "Consulting",
    blurb: "MBB and top-tier strategy houses. The default MBA outcome and the fastest brand and network compounding available.",
    dayToDay: "Structured problem-solving for senior clients, in teams, on the road. Steep learning curve, high hours, exceptional exit options.",
    whyHer: "The safest and highest-earning path, and the one that clears your loan fastest — but be honest that it is also a lateral move. You are already in consulting. The MBA version is broader in industry and more senior in scope, which is a real upgrade, not a fake one. The strongest argument for it: two to three years at MBB post-MBA gives you the brand and the capital to then do the creative thing on your own terms.",
    switchDifficulty: 1,
    switchNote: "Easiest transition available to you — your current job is the training ground for it.",
    ownBusiness: 3,
    ownBusinessNote: "Great network and credibility for raising money, weaker on building and shipping.",
    compUS: "$190k base, $260k–$285k total",
    compEU: "€100k–€130k total",
    compIndia: "₹40–55 LPA total",
    employers: ["McKinsey", "BCG", "Bain", "Kearney", "Strategy&", "Accenture Strategy", "EY-Parthenon", "Oliver Wyman"],
    bestSchools: ["INSEAD", "Chicago Booth", "Kellogg", "London Business School", "IESE", "UVA Darden", "MIT Sloan"],
    visaNote: "MBB are among the highest-volume visa sponsors in every market. The cleanest international route by far.",
    creativity: 2, analytics: 5, prestige: 5, hours: 5
  },
  {
    id: "founder",
    name: "Entrepreneurship / Founder",
    short: "Founder",
    blurb: "Build your own thing — during the MBA or straight after, using the school as a lab, a network and a safety net.",
    dayToDay: "Everything, badly, all at once, until something works. The MBA gives you co-founders, capital access and two years of permission to fail.",
    whyHer: "You said you want to eventually run a business. Every other track on this list is a route to that; this is the direct one. Realistically, going founder immediately post-MBA with a ₹1.5 crore loan is financially reckless. The sane sequence is: MBA → two to four years in brand, product or consulting → build, with savings, a network and a real problem you have seen up close. Choose a school with a genuine entrepreneurship ecosystem so the option stays open either way.",
    switchDifficulty: 3,
    switchNote: "No hiring gate — but the loan is the gate. Plan for a delayed launch, not an immediate one.",
    ownBusiness: 5,
    ownBusinessNote: "This is the thing itself.",
    compUS: "Nil to unbounded",
    compEU: "Nil to unbounded",
    compIndia: "Nil to unbounded",
    employers: ["Your own company", "Antler", "Y Combinator", "Sequoia Surge", "Accel", "Blume Ventures"],
    bestSchools: ["Stanford GSB", "INSEAD", "Babson", "IE Business School", "SDA Bocconi", "Harvard", "Berkeley Haas"],
    visaNote: "France, Italy, Portugal and the UK all have startup visa routes. The US does not have a real founder visa.",
    creativity: 5, analytics: 3, prestige: 3, hours: 5
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences Commercial",
    short: "Healthcare",
    blurb: "Strategy, market access, commercial and general management inside pharma, medtech, health systems and health-tech.",
    dayToDay: "Launch strategy, pricing and reimbursement, portfolio decisions, market entry. High stakes, heavily regulated, genuinely consequential.",
    whyHer: "Your strongest track on paper and the one where you would be hired fastest and paid best relative to effort — you are already three years in. It is also the least exciting answer to 'I want something creative.' The interesting version: use it as the domain and change the scope, i.e. move from analytics support to owning a therapy-area P&L, or into Indian healthcare access at a systems level. That is the version that matches what you actually wrote about wanting to change something in India.",
    switchDifficulty: 1,
    switchNote: "Trivial — you are already inside it. The switch is in scope and seniority, not sector.",
    ownBusiness: 4,
    ownBusinessNote: "Indian healthcare delivery, diagnostics and access are enormous, under-built markets you already understand.",
    compUS: "$150k–$170k",
    compEU: "€80k–€105k",
    compIndia: "₹35–60 LPA",
    employers: ["Novartis", "Roche", "AstraZeneca", "J&J", "GSK", "Sanofi", "Medtronic", "Philips", "Sun Pharma", "Practo", "PharmEasy"],
    bestSchools: ["Wharton", "Duke Fuqua", "INSEAD", "London Business School", "Kellogg", "Oxford Saïd"],
    visaNote: "Big pharma sponsors reasonably well in the US, EU and UK. Basel, London and New Jersey are the hubs.",
    creativity: 3, analytics: 5, prestige: 4, hours: 3
  },
  {
    id: "growth",
    name: "Growth, Digital & E-commerce",
    short: "Growth / Digital",
    blurb: "Own acquisition, retention and revenue at a consumer internet or D2C company. Marketing with a P&L and a dashboard.",
    dayToDay: "Performance marketing, funnels, pricing experiments, category management, retention loops. Fast feedback, very measurable.",
    whyHer: "An excellent middle path between the creative pull and your analytical strength — it is genuinely creative work that is scored in numbers, which suits how you think. India's D2C and quick-commerce sector is the most active hiring market for this skill set anywhere in the world right now, which makes it a strong 'return to India' play.",
    switchDifficulty: 2,
    switchNote: "Very achievable. Your analytics background is an asset rather than something to explain away.",
    ownBusiness: 5,
    ownBusinessNote: "The most directly transferable skill set to running your own consumer brand.",
    compUS: "$140k–$160k",
    compEU: "€70k–€90k",
    compIndia: "₹35–60 LPA",
    employers: ["Amazon", "Zepto", "Swiggy", "Nykaa", "Mamaearth", "Zalando", "Delivery Hero", "Shopify", "Sephora"],
    bestSchools: ["Kellogg", "Berkeley Haas", "London Business School", "INSEAD", "ISB", "NYU Stern"],
    visaNote: "Mixed abroad; outstanding in India.",
    creativity: 4, analytics: 5, prestige: 3, hours: 3
  },
  {
    id: "impact",
    name: "Social Impact & Development",
    short: "Impact",
    blurb: "Philanthropy, impact investing, development finance, policy and social enterprise — the structural-change route.",
    dayToDay: "Programme design, funding, measurement, partnerships with governments and foundations. Slower, lower-paid, high meaning.",
    whyHer: "This is what you said you want to do in the long run. Be clear-eyed: it does not repay a ₹1.5 crore loan. The workable version is a two-stage plan — earn in consulting, brand or healthcare for three to five years, clear the debt, then move into health-systems impact work in India with capital behind you and a network that takes your calls. Oxford's Skoll ecosystem is built for exactly this thesis and will fund it.",
    switchDifficulty: 3,
    switchNote: "Easy to enter, hard to afford immediately post-MBA.",
    ownBusiness: 4,
    ownBusinessNote: "Social enterprise and health-access ventures in India are a genuine, fundable category.",
    compUS: "$95k–$130k",
    compEU: "€55k–€80k",
    compIndia: "₹20–40 LPA",
    employers: ["Gates Foundation", "Dalberg", "IFC", "BCG Social Impact", "Omidyar", "Piramal Foundation", "Central Square Foundation"],
    bestSchools: ["Oxford Saïd", "Yale SOM", "Harvard", "INSEAD", "Cambridge Judge", "ISB"],
    visaNote: "Sponsorship is limited abroad; India and multilateral institutions are the practical routes.",
    creativity: 3, analytics: 3, prestige: 3, hours: 2
  }
];

/* ---------- PATH FINDER DIAGNOSTIC -------------------------- */
const PATHFINDER = [
  { q: "Five years from now, which sentence would you rather be able to say?",
    a: [
      { t: "I own this brand and I decided what it stands for.", w: { brand: 3, luxury: 2, growth: 1 } },
      { t: "I built this product and millions of people use it.", w: { product: 3, founder: 2, growth: 1 } },
      { t: "I advise the people who run the biggest companies in the country.", w: { consulting: 3, healthcare: 1 } },
      { t: "I changed how healthcare reaches people who couldn't get it.", w: { impact: 3, healthcare: 2 } }
    ]},
  { q: "You have a free Saturday and no obligations. Honestly, what happens?",
    a: [
      { t: "I'm sketching, shopping, reading about design or watching something beautiful.", w: { luxury: 3, media: 2, brand: 1 } },
      { t: "I'm messing with a spreadsheet or a side idea I can't stop thinking about.", w: { founder: 3, product: 2, growth: 2 } },
      { t: "I'm reading about companies, markets, why things worked.", w: { consulting: 3, brand: 1, product: 1 } },
      { t: "I'm with people, volunteering, organising something.", w: { impact: 3, brand: 1 } }
    ]},
  { q: "Which part of your ZS work do you actually like?",
    a: [
      { t: "The moment the analysis turns into a decision someone acts on.", w: { consulting: 2, healthcare: 2, product: 2 } },
      { t: "Understanding why patients or customers behave the way they do.", w: { brand: 3, growth: 2, healthcare: 1 } },
      { t: "Building the model itself — the craft of it.", w: { product: 2, growth: 2, healthcare: 1 } },
      { t: "Honestly, presenting. The story and the room.", w: { brand: 2, media: 2, consulting: 2, luxury: 1 } }
    ]},
  { q: "How much do you need your work to be visibly creative?",
    a: [
      { t: "Completely. If it isn't, I'll leave within two years.", w: { luxury: 3, media: 3, brand: 2 } },
      { t: "A lot — but I want it measured, not just felt.", w: { brand: 3, growth: 3, product: 2 } },
      { t: "Somewhat. Interesting problems count as creative to me.", w: { consulting: 2, product: 2, healthcare: 2 } },
      { t: "Not much. I care more about consequence than expression.", w: { healthcare: 3, impact: 3, consulting: 2 } }
    ]},
  { q: "The loan is ₹1.2–1.5 crore. How does that sit with you?",
    a: [
      { t: "It terrifies me. I want it gone as fast as humanly possible.", w: { consulting: 3, product: 2, healthcare: 2 } },
      { t: "I'll take longer to repay if the work is right.", w: { brand: 2, luxury: 2, media: 2, impact: 2 } },
      { t: "I'd rather minimise the loan than maximise the salary.", w: { impact: 2, founder: 2, healthcare: 1 } },
      { t: "I'd take on more risk if the upside were mine.", w: { founder: 3, growth: 2 } }
    ]},
  { q: "Do you want to run your own business eventually?",
    a: [
      { t: "Yes — that's the actual goal. Everything else is preparation.", w: { founder: 4, growth: 2, brand: 1 } },
      { t: "Probably, in ten years, once I know something properly.", w: { brand: 2, product: 2, healthcare: 2, growth: 1 } },
      { t: "Maybe. I want the option, not the plan.", w: { consulting: 2, product: 1, brand: 1 } },
      { t: "No. I'd rather do something big inside an institution.", w: { healthcare: 2, impact: 2, consulting: 2 } }
    ]},
  { q: "Which of these would you be most embarrassed to be bad at?",
    a: [
      { t: "Taste — picking the right thing.", w: { luxury: 3, brand: 2, media: 2 } },
      { t: "Judgement under pressure with incomplete information.", w: { consulting: 3, product: 2 } },
      { t: "Getting a real thing built and shipped.", w: { product: 3, founder: 3 } },
      { t: "Reading people and building coalitions.", w: { impact: 2, brand: 2, media: 1, healthcare: 1 } }
    ]},
  { q: "How important is it that people outside your industry recognise your employer?",
    a: [
      { t: "Very. Brand matters to me and I won't pretend otherwise.", w: { consulting: 3, luxury: 2, brand: 1 } },
      { t: "Somewhat — enough that my family understands what I do.", w: { brand: 2, product: 2, healthcare: 1 } },
      { t: "Not at all, if the work is genuinely interesting.", w: { founder: 3, impact: 2, media: 1 } },
      { t: "I want the recognition to come from the work, not the logo.", w: { impact: 2, founder: 2, product: 1 } }
    ]},
  { q: "Where do you want to be working three years after graduating?",
    a: [
      { t: "India — that's the whole point of this.", w: { growth: 3, healthcare: 2, impact: 2, media: 2, brand: 1 } },
      { t: "Dubai or Singapore — close to home, saving hard.", w: { consulting: 3, healthcare: 1, growth: 1 } },
      { t: "Europe — London, Paris, Milan.", w: { luxury: 3, brand: 2, consulting: 1 } },
      { t: "Wherever the most interesting work is. I'll decide later.", w: { product: 2, founder: 2, consulting: 1 } }
    ]},
  { q: "Which failure would bother you more at 40?",
    a: [
      { t: "I never made anything that was mine.", w: { founder: 4, luxury: 2, brand: 1 } },
      { t: "I never reached a level where my decisions mattered at scale.", w: { consulting: 2, healthcare: 3, product: 1 } },
      { t: "I made a lot of money doing something I found boring.", w: { luxury: 2, media: 3, brand: 2, impact: 1 } },
      { t: "I never used what I know to fix something broken in India.", w: { impact: 4, healthcare: 2 } }
    ]},
  { q: "How do you feel about being the only Indian woman in the room?",
    a: [
      { t: "Used to it. It's fuel.", w: { consulting: 2, product: 2, founder: 1 } },
      { t: "Fine, but I want a community around me too.", w: { brand: 2, healthcare: 2, impact: 1 } },
      { t: "I'd rather work somewhere that already looks like the world.", w: { luxury: 1, media: 1, growth: 2, impact: 2 } },
      { t: "I want to be the reason there are more of us next year.", w: { impact: 3, founder: 2, brand: 1 } }
    ]},
  { q: "Last one. What's your honest reason for doing an MBA?",
    a: [
      { t: "To change what I do every day. The work itself has to change.", w: { brand: 2, luxury: 3, media: 2, product: 2 } },
      { t: "To move up faster and earn more in roughly the same lane.", w: { consulting: 3, healthcare: 2 } },
      { t: "To buy myself two years and a network to figure it out.", w: { founder: 3, product: 1, growth: 1 } },
      { t: "To get a brand that opens doors in India for the rest of my life.", w: { consulting: 2, healthcare: 1, impact: 2, growth: 1 } }
    ]}
];

/* ---------- SCHOOLS ---------------------------------------- */
const SCHOOLS = [
  {
    id: "insead", name: "INSEAD", loc: "Fontainebleau · Singapore · Abu Dhabi", country: "France / Singapore",
    region: "EU", months: 10, classSize: 1000, intakes: "Two per year — Jan & Aug",
    tuition: "€109,860", costCr: 1.54, women: 38, intl: 96, avgAge: 29, avgExp: 5.6,
    test: "GMAT median ~710 · GRE accepted", ftRank: 2,
    tags: ["1 year", "MBB machine", "Most international", "2 intakes/yr", "No visa lottery", "Singapore campus", "Entrepreneurship"],
    bestKnownFor: "The most internationally connected MBA on earth, and the highest-volume feeder into MBB offices across Europe, Asia and the Middle East. If your plan involves working in more than one country, this is the school.",
    consulting: 50, salary: "€106,100 median", deadline: "15 Sep 2026 (R1, Aug-2027 intake)", deadlineSort: 20260915,
    odds: [20, 28], brandIndia: 9, mbb: 10, speedS: 10, costS: 5, scholarship: 6, visaS: 7, network: 10, returnIndia: 10, intlExp: 10,
    majors: ["No formal majors — fully elective", "Strategy", "Entrepreneurship & Family Enterprise", "Marketing", "Finance", "Organisational Behaviour", "Technology & Operations", "Social Impact", "Healthcare Management electives"],
    recruiters: ["McKinsey", "BCG (60 hires, 2025)", "Bain (51 hires, 2025)", "Amazon", "Strategy&", "Kearney (15 hires)", "Google", "LVMH", "Roche", "Accenture"],
    trackFit: { consulting: 10, product: 7, brand: 7, luxury: 7, media: 4, founder: 9, healthcare: 7, growth: 7, impact: 6 },
    interviewFormat: "Two separate interviews, both with INSEAD alumni, 45–60 minutes each. Conversational rather than adversarial. Plus a pre-recorded video interview earlier in the process.",
    essays: [
      { p: "Job description — give a career summary and describe your current role.", w: "500 words" },
      { p: "Job description — what are your career aspirations and how will INSEAD help you achieve them?", w: "300 words" },
      { p: "Motivation essay — give a candid description of yourself as a person and as a leader, stressing the personal characteristics you feel to be your strengths and weaknesses.", w: "500 words" },
      { p: "Motivation essay — describe a stressful situation and how you managed it.", w: "400 words" },
      { p: "Motivation essay — is there anything else you would like the Admissions Committee to know? (optional)", w: "300 words" }
    ],
    essaySrc: "verified", essayUrl: "https://www.insead.edu/master-programmes/master-business-administration/admissions", essayChecked: "7 Aug 2026 · insead.edu",
    verdict: "The best single fit for your constraints anywhere in the world. Ten months, half the class into consulting, the deepest India and Middle East network outside the US, and a Singapore campus that makes a low-tax posting realistic — which is what actually halves your loan clock. Real risk: at 26 with four years you sit below their means on both, and they prize demonstrated international mobility, your weakest column. Your French matters more here than anywhere else on this list.",
    tier: 1,
    deadlineSrc: "verified", deadlineDetail: "Aug 2027 intake — R1 15 Sep 2026 · R2 3 Nov 2026 · R3 19 Jan 2027 · R4 9 Mar 2027. Jan 2027 intake is already closed (R4 was 25 Aug 2026)."
  },
  {
    id: "lbs", name: "London Business School", loc: "Regent's Park, London", country: "United Kingdom",
    region: "EU", months: 15, classSize: 514, intakes: "One per year — August",
    tuition: "£123,950", costCr: 2.10, women: 40, intl: 90, avgAge: 29, avgExp: 5.5,
    test: "GMAT ~700–730 for Indian applicants · GRE accepted", ftRank: 4,
    tags: ["15–21 months", "London", "English-speaking market", "12% South Asian", "Strong finance", "Flexible length", "Big alumni network"],
    bestKnownFor: "The strongest consulting and finance feeder in Europe outside INSEAD, in the only major European financial capital where you do not need a second language to get hired.",
    consulting: 40, salary: "£98,856 median", deadline: "R1 — not yet published", deadlineSort: 20261015,
    odds: [25, 32], brandIndia: 9, mbb: 9, speedS: 7, costS: 4, scholarship: 6, visaS: 6, network: 9, returnIndia: 9, intlExp: 9,
    majors: ["No compulsory major — 70+ electives", "Strategy & Entrepreneurship", "Marketing", "Finance", "Management Science & Operations", "Organisational Behaviour", "Economics", "Global Business Experiences", "London Business Experiences"],
    recruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "JP Morgan", "Morgan Stanley", "Amazon", "Google", "Unilever", "Diageo"],
    trackFit: { consulting: 9, product: 7, brand: 8, luxury: 6, media: 6, founder: 8, healthcare: 7, growth: 8, impact: 6 },
    interviewFormat: "One-on-one with an alumnus or admissions member, plus a five-minute impromptu presentation. You are given a case prompt drawn from recent business news, get five minutes to prepare and five to present. They assess structure — intro, argument, conclusion — as much as content.",
    essays: [
      { p: "What are your post-MBA goals and how will your prior experience and the London Business School programme contribute towards these?", w: "500 words" },
      { p: "What makes you unique?", w: "200 words" },
      { p: "Is there any other information you believe the Admissions Committee should know about you and your application? (optional)", w: "500 words" }
    ],
    essaySrc: "verified", essayUrl: "https://www.london.edu/masters-degrees/mba/apply", essayChecked: "7 Aug 2026 · london.edu",
    verdict: "The safest version of the Europe bet. Forty per cent into consulting with McKinsey, BCG and Bain as the top three employers, twelve per cent of the class from South Asia, and no language barrier to the local job market — a real advantage over Paris, Barcelona and Milan. Two watch-outs: plan for 15 months not 21, and note the Graduate Route drops to 18 months for anyone graduating from 2027. Ajay Arora (£50,000) and the India Scholarship (£35,000) are both worth an early application.",
    tier: 1,
    deadlineSrc: "unverified", deadlineDetail: "LBS runs three rounds. Applications for the Aug 2027 intake open later in Aug 2026 and the dates were NOT published when this was checked. Do not plan against a guessed date — check london.edu/masters-degrees/mba/apply."
  },
  {
    id: "oxford", name: "Oxford Saïd", loc: "Oxford", country: "United Kingdom",
    region: "EU", months: 12, classSize: 332, intakes: "One per year — September",
    tuition: "£88,800 (2026–27)", costCr: 1.41, women: 48, intl: 96, avgAge: 29, avgExp: 5,
    test: "GMAT median 690 · GRE accepted", ftRank: 27,
    tags: ["1 year", "Oxford brand", "48% women", "Skoll social impact", "Huge India recognition", "Collegiate system", "Impact-friendly"],
    bestKnownFor: "The most globally recognised university name in the world attached to a one-year MBA, plus the Skoll Centre — the leading social entrepreneurship ecosystem in European business education.",
    consulting: 23, salary: "£74,143 mean", deadline: "Stage 1, Sep 2026", deadlineSort: 20260902,
    odds: [40, 50], brandIndia: 9, mbb: 5, speedS: 9, costS: 5, scholarship: 7, visaS: 6, network: 8, returnIndia: 8, intlExp: 9,
    majors: ["Core + electives, no formal major", "Entrepreneurship", "Social Impact (Skoll)", "Finance", "Strategy & Innovation", "Global Rules of the Game", "Responsible Business", "Oxford Impact Lab", "Entrepreneurship Project"],
    recruiters: ["McKinsey", "BCG", "Amazon", "Google", "Deloitte", "EY-Parthenon", "Accenture", "Bain", "Microsoft", "Novartis"],
    trackFit: { consulting: 6, product: 6, brand: 6, luxury: 5, media: 5, founder: 8, healthcare: 7, growth: 6, impact: 10 },
    interviewFormat: "30–60 minutes with an admissions committee member. Non-blind — they have your full application. Closer in feel to a professional job interview than a conversation. Expect direct probing on goals and gaps.",
    essays: [
      { p: "Three questions are completed via the online assessment platform. The committee looks for communication skills, leadership potential, analytical skills and fit with the Oxford MBA community. Each answer is capped at 250 words — confirm the current wording in the portal, as Oxford rotates these.", w: "250 words each" }
    ],
    essaySrc: "verified", essayUrl: "https://www.sbs.ox.ac.uk/programmes/mbas/mba/how-apply", essayChecked: "7 Aug 2026 · sbs.ox.ac.uk",
    verdict: "The honest case is brand, not placement. Twenty-three per cent consulting and seventy per cent employed at three months are weak against INSEAD or LBS. But you intend to come home — and in India, 'Oxford' outranks every European business school brand, in rooms where nobody has heard of the FT ranking. Twelve months, ninety-six per cent international, forty-eight per cent women, and Skoll funding for exactly the India-healthcare thesis you should be building. If the ambition is genuinely to run something rather than to maximise an offer, this is more rational than its ranking suggests.",
    tier: 1,
    deadlineSrc: "verified", deadlineDetail: "Applications for 2027-28 entry open Aug 2026, in stages. Deadline is 23:59 UK on the day and is hard — incomplete applications roll to the next stage. IMPORTANT: to be considered for University of Oxford scholarships you must apply by the January (Stage 4) deadline. Fee for 2027-28 entry: £94,120. Application fee £75. Deposit on acceptance £9,800."
  },
  {
    id: "judge", name: "Cambridge Judge", loc: "Cambridge", country: "United Kingdom",
    region: "EU", months: 12, classSize: 230, intakes: "One per year — September",
    tuition: "£80,000 (Sept 2026)", costCr: 1.27, women: 47, intl: 95, avgAge: 29, avgExp: 6,
    test: "GMAT mean 697 · GRE accepted", ftRank: 17,
    tags: ["1 year", "Cambridge brand", "Cheapest elite option", "Small cohort (230)", "Faculty-led interview", "College membership", "Deep tech links"],
    bestKnownFor: "The cheapest route to a globally elite university brand, with an unusually intellectual, faculty-led admissions process and a small, tight cohort.",
    consulting: 20, salary: "£93,085 avg package", deadline: "24 Aug 2026 (R1)", deadlineSort: 20260824,
    odds: [40, 50], brandIndia: 9, mbb: 5, speedS: 9, costS: 6, scholarship: 5, visaS: 6, network: 7, returnIndia: 8, intlExp: 9,
    majors: ["Core + concentrations", "Digital Transformation", "Energy & Environment", "Entrepreneurship", "Finance", "Health & Biotech", "Marketing", "Strategy", "Cambridge Venture Project", "Global Consulting Project"],
    recruiters: ["McKinsey", "BCG", "Amazon", "Microsoft", "Deloitte", "AstraZeneca", "Accenture", "Google", "Bain", "Arm"],
    trackFit: { consulting: 6, product: 7, brand: 5, luxury: 4, media: 4, founder: 8, healthcare: 8, growth: 6, impact: 8 },
    interviewFormat: "A 30-minute slot with a faculty member who teaches on the MBA. Deliberately unconventional — expect questions well outside your CV. They are testing how you think on your feet, not whether you rehearsed. Many candidates describe it as an intellectual discussion.",
    essays: [
      { p: "Career objectives statement — your short and long term career objectives, how the Cambridge MBA will help you achieve them, the industry research you have done, why you are confident of achieving them, and the skills you bring.", w: "500 words max" },
      { p: "Short essay — a professional mistake and what you learned.", w: "~200 words" },
      { p: "Short essay — a team experience.", w: "~200 words" },
      { p: "Short essay — what drives your success.", w: "~200 words" }
    ],
    essaySrc: "verified", essayUrl: "https://www.jbs.cam.ac.uk/masters-degrees/mba/apply/", essayChecked: "7 Aug 2026 · jbs.cam.ac.uk",
    verdict: "£80,000 including college membership, twelve months, ₹1.27 crore all-in — roughly half a US M7. Eighty-three per cent placed within four months at a £93,085 average package: solid and unglamorous. The class of 230 averages 29 with six years, so at 26 with four you'd be noticeably junior. Its 24 August deadline is also the closest one to today. Treat Judge and Oxford as a pair — apply to both, decide on scholarship.",
    tier: 1,
    deadlineSrc: "verified", deadlineDetail: "Five rounds. R1 is 24 Aug 2026. Fee for Sept 2026 entry £80,000; 2027 fee not yet published. Application fee £165, with waivers for military and low-income-country candidates."
  },
  {
    id: "bocconi", name: "SDA Bocconi", loc: "Milan", country: "Italy",
    region: "EU", months: 12, classSize: 130, intakes: "One per year — September",
    tuition: "€82,000", costCr: 1.18, women: 35, intl: 75, avgAge: 29, avgExp: 5.5,
    test: "GMAT ~700 · GRE accepted", ftRank: 15,
    tags: ["1 year", "Luxury & Fashion track", "Milan", "Best value", "#1 in Europe (Bloomberg)", "Design capital", "MAFED pipeline"],
    bestKnownFor: "The only top-tier MBA in the world with a formal Luxury Business Management specialisation, taught in the global capital of fashion and design, with LVMH and Kering on the doorstep.",
    consulting: 23, salary: "€106,000 avg", deadline: "Rolling rounds", deadlineSort: 20261101,
    odds: [60, 70], brandIndia: 3, mbb: 5, speedS: 9, costS: 8, scholarship: 7, visaS: 5, network: 5, returnIndia: 3, intlExp: 7,
    majors: ["Luxury Business Management", "Finance", "Innovation & Technology Management", "Corporate Strategy & Consulting", "Brand Capstone Project", "Merchandising", "Luxury Retail Management", "Sustainability & Circularity"],
    recruiters: ["LVMH", "Kering", "Prada", "Amazon", "McKinsey", "BCG", "Ferrero", "Luxottica", "Armani", "Bain"],
    trackFit: { consulting: 6, product: 5, brand: 8, luxury: 10, media: 6, founder: 7, healthcare: 4, growth: 6, impact: 4 },
    interviewFormat: "One-on-one with an admissions member or alumnus, typically 45 minutes, non-blind. Expect strong focus on why Italy, why luxury (if that's your stated track), and how you'll handle a small cohort.",
    essays: [
      { p: "WARNING: SDA Bocconi uses roughly 13 short application questions rather than a conventional essay set, and sources disagree on the exact list and limits (reports range from ~230 to ~400 words each). Open the application portal and copy the current questions before drafting anything.", w: "verify in portal" },
      { p: "Reported themes include: community or cultural responsibilities in order of importance; interests and occupations in your free time; short-term professional goals (next four years); long-term professional goals; where you wish to work after the MBA; and a financial-independence question on how you will support yourself.", w: "~230–400 words each" }
    ],
    essaySrc: "partial", essayUrl: "https://www.sdabocconi.it/en/sda-bocconi-school-of-management/mba/full-time-mba", essayChecked: "7 Aug 2026 · PARTIAL — sources disagree",
    verdict: "If the creative pivot is real, this school changes from a fallback to a serious contender. It is the single best place in the world to convert a quantitative background into a luxury or fashion commercial career, and Milan is where those companies actually hire. Also the best pure value here — €82,000 for twelve months, ninety-five per cent employed within three months, ninety per cent changing industry, function or country. The costs: the Bocconi name does not travel to India, and Italian is expected for most local roles beyond the luxury houses.",
    tier: 2
  },
  {
    id: "hec", name: "HEC Paris", loc: "Jouy-en-Josas, Paris", country: "France",
    region: "EU", months: 16, classSize: 265, intakes: "Two per year — Jan & Sep",
    tuition: "€102,000", costCr: 1.40, women: 40, intl: 94, avgAge: 29, avgExp: 6,
    test: "GMAT Focus avg 635 · GRE accepted", ftRank: 6,
    tags: ["16 months", "FT #6 globally", "Best scholarships", "94% international", "LVMH partnership", "Luxury certificate", "French language asset"],
    bestKnownFor: "The most generous scholarship posture of any top-ten school, plus deep institutional ties to LVMH, Chanel and Hermès through its luxury chair and certificate.",
    consulting: 20, salary: "$98,956 median", deadline: "Rolling — decision ~5 weeks", deadlineSort: 20260930,
    odds: [45, 55], brandIndia: 5, mbb: 7, speedS: 6, costS: 6, scholarship: 9, visaS: 7, network: 7, returnIndia: 5, intlExp: 9,
    majors: ["Strategy", "Marketing", "Finance", "Entrepreneurship", "Luxury Certificate (LVMH chair)", "Digital Innovation", "Sustainability & Social Innovation", "Advanced Management Certificate"],
    recruiters: ["LVMH", "McKinsey", "BCG", "Amazon", "L'Oréal", "Google", "Danone", "Bain", "Capgemini Invent", "Sanofi"],
    trackFit: { consulting: 7, product: 6, brand: 8, luxury: 9, media: 5, founder: 8, healthcare: 6, growth: 6, impact: 6 },
    interviewFormat: "Two separate 45–60 minute interviews with individual alumni, equally weighted. Blind — the interviewer has only your CV. Each opens with a 10-minute oral presentation on a topic of your choice, then a deep dive into your CV, goals and motivations.",
    essays: [
      { p: "Essay 1 — Why are you applying to the HEC MBA Program now? What is the professional objective that will guide your career choice after your MBA, and how will the HEC MBA contribute to the achievement of this objective?", w: "3,500 characters (~700 words)" },
      { p: "Essay 2 — What do you consider your most significant life achievement?", w: "2,000 characters (~400 words)" },
      { p: "Essay 3 — Leadership and ethics are inevitably intertwined in the business world. Describe a situation in which you have dealt with these issues and how they have influenced you.", w: "~2,000 characters" },
      { p: "Optional — if there is anything else you would like to share with us that has not already been shared elsewhere in your file, please feel free to use this space.", w: "6,300 characters" }
    ],
    essaySrc: "verified", essayUrl: "https://www.hec.edu/en/mba-executive-mba/mba/admissions", essayChecked: "7 Aug 2026 · multi-source, Sept-2026 intake",
    verdict: "Ranked sixth in the world by the FT in 2026, a 265-person class that is ninety-four per cent international and forty per cent women, and Excellence and Diversity awards running up to fifty per cent of tuition with automatic consideration. Your working French is a real asset here, and the LVMH relationship makes it the second-best luxury route after Bocconi. Costs: sixteen months stretches your timeline, and outside consulting and multinationals the French market expects near-native French. Strong value play, weak India brand play.",
    tier: 2,
    deadlineSrc: "verified", deadlineDetail: "Rolling admissions year-round for January and September starts. Decisions come about five weeks after each deadline. Apply early for housing, visa and scholarship reasons."
  },
  {
    id: "iese", name: "IESE Business School", loc: "Barcelona · Madrid · New York", country: "Spain",
    region: "EU", months: 19, classSize: 445, intakes: "One per year — September",
    tuition: "€114,000", costCr: 1.64, women: 33, intl: 88, avgAge: 29, avgExp: 5.4,
    test: "GMAT Focus 545–715 · GRE accepted", ftRank: 4,
    tags: ["15–19 months", "FT #4 globally", "42% consulting", "Case method", "Barcelona", "Strong general management", "Spanish helps"],
    bestKnownFor: "Case-method general management taught as well as anywhere outside Harvard, with the strongest consulting placement in Europe after INSEAD.",
    consulting: 42, salary: "€101,900 median", deadline: "Rolling rounds", deadlineSort: 20261001,
    odds: [45, 55], brandIndia: 4, mbb: 8, speedS: 5, costS: 5, scholarship: 7, visaS: 6, network: 7, returnIndia: 4, intlExp: 8,
    majors: ["General management core", "Entrepreneurship", "Finance", "Marketing", "Operations", "Digital Transformation", "Healthcare Management", "Search Fund Track"],
    recruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Google", "Danone", "Kearney", "Nestlé", "Roche", "Accenture"],
    trackFit: { consulting: 9, product: 6, brand: 7, luxury: 5, media: 4, founder: 8, healthcare: 7, growth: 6, impact: 6 },
    interviewFormat: "One-on-one with an admissions member, ~45 minutes, usually after an initial assessment. Case-method oriented — expect to be pushed on how you reason, plus an assessment day for some candidates.",
    essays: [
      { p: "Career goals — what are your immediate post-MBA career goal and your mid-term (5–10 years) career goal? How will the IESE MBA program help you achieve them?", w: "450 words" },
      { p: "Why IESE — why is IESE the right MBA program for you? What aspects of IESE's program, values and community resonate most with your personal and professional goals? Provide specific examples.", w: "300 words" },
      { p: "Plan B — if your preferred post-MBA role or industry is not immediately attainable, what alternative path would you pursue? Why is it compelling, how does it align with your strengths, and how would the IESE MBA help you pursue it?", w: "250 words max" },
      { p: "Optional — what would you like to highlight about yourself or your journey which may not have been captured in your application?", w: "300 words max" },
      { p: "Video — four questions, 1 minute to prepare and 1.5 minutes to respond to each. To be completed within 48 hours of the invitation, which is sent after the application and fee are submitted.", w: "4 videos" }
    ],
    essaySrc: "verified", essayUrl: "https://www.iese.edu/mba/admissions/", essayChecked: "7 Aug 2026 · multi-source, 2026-27",
    verdict: "Joint fourth in the world on FT 2026, forty-two per cent into consulting, ninety-four per cent employed within three months. Genuinely excellent teaching. But the 15-to-19-month length pushes directly against the constraint you care most about, Spanish is expected for Spanish-market roles, twenty-seven per cent of the class ends up in Latin America, and IESE carries little weight in India. Apply if you fall in love on a visit — not on the ranking.",
    tier: 2
  },
  {
    id: "imd", name: "IMD", loc: "Lausanne", country: "Switzerland",
    region: "EU", months: 12, classSize: 90, intakes: "One per year — January",
    tuition: "CHF 97,500", costCr: 1.58, women: 24, intl: 98, avgAge: 31, avgExp: 6,
    test: "GMAT ~680 · GRE accepted", ftRank: 24,
    tags: ["1 year", "Tiny class (90)", "Oldest cohort", "Full-ride women's scholarship", "Hard Swiss visa", "Leadership-intensive", "Executive feel"],
    bestKnownFor: "The most intense leadership-development MBA in the world, delivered to ninety people with real seniority, with one-on-one psychoanalytic coaching built into the programme.",
    consulting: 25, salary: "$180,000 PPP median", deadline: "Rolling — ~6–8 weeks", deadlineSort: 20261101,
    odds: [15, 25], brandIndia: 3, mbb: 6, speedS: 9, costS: 6, scholarship: 8, visaS: 4, network: 6, returnIndia: 3, intlExp: 10,
    majors: ["No majors — single integrated programme", "Leadership Stream", "International Consulting Project", "Startup Project", "Discovery Expedition"],
    recruiters: ["Nestlé", "Novartis", "Roche", "McKinsey", "BCG", "Amazon", "Richemont", "ABB", "Philip Morris", "Bain"],
    trackFit: { consulting: 6, product: 5, brand: 6, luxury: 6, media: 3, founder: 7, healthcare: 7, growth: 4, impact: 5 },
    interviewFormat: "A full assessment day at Lausanne (or virtual): a personal interview, a group case discussion with other candidates, and an individual case presentation. The most demanding admissions process on this list.",
    essays: [
      { p: "Essay 1 — Tell us your story. We want to hear about the experiences that have shaped you as a person. Share the moments, challenges and lessons that have influenced your life and personal growth. This is your chance to offer insight into who you are beyond your resume.", w: "400 words" },
      { p: "Essay 2 — Additional information that would be helpful for the Admissions Committee to be aware of, e.g. periods of time not employed, health-related challenges, academic circumstances, or any other unique situations.", w: "400 words max" },
      { p: "Optional essay — use only if you have meaningful context that strengthens your candidacy or clarifies a red flag. Not an invitation to write a third essay.", w: "400 words" }
    ],
    essaySrc: "verified", essayUrl: "https://www.imd.org/degree/mba/admissions/", essayChecked: "7 Aug 2026 · Clear Admit, Jan-2027 intake",
    verdict: "A superb programme that is wrong for you right now. Ninety students averaging 31 with six years — you'd be the youngest person in a very small room, and the pedagogy assumes seniority you have not accumulated. Swiss work permits for non-EU nationals are quota-limited and among the hardest in Europe, which undermines the repayment plan. The one reason to look twice: the BackPack–Excellence Scholarship for Women covers CHF 133,500, full tuition plus living, aimed squarely at women who thought an MBA was out of reach. One award a year.",
    tier: 3
  },
  {
    id: "kellogg", name: "Kellogg", loc: "Evanston, Chicago", country: "USA",
    region: "US", months: 21, classSize: 534, intakes: "One per year — September",
    tuition: "$86,370/yr", costCr: 2.45, women: 46, intl: 37, avgAge: 28, avgExp: 5.1,
    test: "GRE 162/162 · GMAT 733 (10th ed)", ftRank: 11,
    tags: ["#1 for Marketing", "STEM-designated", "ZS founders' school", "1-year MBA option", "Team culture", "37.5% consulting", "Brand management"],
    bestKnownFor: "The number-one marketing school in the world, and the birthplace of modern brand management teaching. Also — ZS Associates was founded by two Kellogg professors.",
    consulting: 37.5, salary: "$190,000 median", deadline: "9 Sep 2026 (R1)", deadlineSort: 20260909,
    odds: [12, 16], brandIndia: 8, mbb: 9, speedS: 3, costS: 2, scholarship: 6, visaS: 4, network: 9, returnIndia: 7, intlExp: 5,
    majors: ["Marketing", "Brand Management pathway", "Marketing Analytics pathway", "Strategy", "Finance", "Managing Organizations", "Operations", "Entrepreneurship", "Healthcare at Kellogg", "Growth & Scaling", "Data Analytics", "Social Impact", "Real Estate"],
    recruiters: ["McKinsey", "BCG (41 hires, 2025)", "Bain", "Amazon", "P&G", "Google", "Microsoft", "Deloitte", "PepsiCo", "Unilever"],
    trackFit: { consulting: 9, product: 8, brand: 10, luxury: 6, media: 6, founder: 8, healthcare: 8, growth: 9, impact: 7 },
    interviewFormat: "Off-campus alumni interview or on-campus with admissions, ~45 minutes, blind (interviewer has only your résumé). Plus mandatory video essays — five short questions recorded with limited prep time.",
    essays: [
      { p: "Part I — tell us about the pivotal experiences and decisions that have brought you to this moment in your career, how they have shaped your ambitions, and why now is the right time to take this next step. Part II — now turn the lens outward: beyond what you hope to gain, what do you hope to contribute to the students who will learn alongside you?", w: "550 words total" },
      { p: "Video essay — three questions, due 96 hours after the application deadline. About 30 minutes total: brief thinking time then up to one minute per response. Practice questions available first; no re-dos on the official ones.", w: "3 videos, ~60s each" },
      { p: "Additional information — gaps, recommender choice, academic performance or other context. (optional)", w: "280 words" }
    ],
    essaySrc: "verified", essayUrl: "https://www.kellogg.northwestern.edu/programs/full-time-mba/admissions/", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "If the creative pivot is real, Kellogg is the single most important US school on your list — it is number one for marketing and the home of brand management pedagogy. It is also the one school where you can write a 'why us' essay nobody else in the Indian pool can write: ZS was founded by Kellogg professors Andris Zoltners and Prabhakant Sinha, and the firm's entire methodology descends from their research. That is intellectual lineage, not a networking anecdote. STEM-designated, 37.5% consulting, $190k median, and a one-year MBA option if the timeline binds.",
    tier: 2
  },
  {
    id: "booth", name: "Chicago Booth", loc: "Hyde Park, Chicago", country: "USA",
    region: "US", months: 21, classSize: 620, intakes: "One per year — September",
    tuition: "$89,976/yr", costCr: 2.52, women: 42, intl: 37, avgAge: 28, avgExp: 5,
    test: "GRE 163Q/161V · GMAT 736 (10th ed)", ftRank: 20,
    tags: ["Best MBB conversion (68%)", "STEM-designated", "Fully flexible curriculum", "Analytical rigour", "Record applications", "No required core"],
    bestKnownFor: "Converting more of its consulting placements into McKinsey, BCG and Bain than any school that publishes the data — 68%. Also the most flexible curriculum in the M7.",
    consulting: 36.7, salary: "$190,000 median", deadline: "15 Sep 2026 (R1)", deadlineSort: 20260915,
    odds: [10, 14], brandIndia: 8, mbb: 10, speedS: 2, costS: 2, scholarship: 6, visaS: 4, network: 9, returnIndia: 7, intlExp: 5,
    majors: ["Analytic Finance", "Marketing Management", "Strategic Management", "Entrepreneurship", "Behavioral Science", "Business Analytics", "Operations Management", "Economics", "Healthcare", "General Management"],
    recruiters: ["McKinsey (35)", "BCG (52)", "Bain (30)", "Amazon", "Google", "Goldman Sachs", "Microsoft", "Deloitte", "Citadel", "PepsiCo"],
    trackFit: { consulting: 10, product: 8, brand: 8, luxury: 4, media: 4, founder: 8, healthcare: 7, growth: 8, impact: 6 },
    interviewFormat: "By invitation, with an alumnus, admissions member or student, ~45 minutes, blind. Heavily behavioural — expect 'tell me about a time' throughout.",
    essays: [
      { p: "What is your immediate post-MBA career goal?", w: "300 characters" },
      { p: "What is your long-term post-MBA career goal?", w: "300 characters" },
      { p: "At Booth, we value the unique perspectives each student brings to our community. We want to understand your personality, your perspective, and what's important to you. Upload an image and explain its significance to you.", w: "300 characters + image" },
      { p: "Share a fun fact or something unique about yourself.", w: "300 characters" },
      { p: "Additional information — is there any unclear information in your application that needs further explanation? (optional)", w: "300 words" }
    ],
    essaySrc: "verified", essayUrl: "https://www.chicagobooth.edu/mba/full-time/admissions", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "The best MBB conversion rate anywhere and analytically rigorous in a way that suits a statistics honours background. The flexible curriculum lets you build the general-management breadth your ZS depth lacks. STEM-designated, converting one H-1B attempt into three. At 10–14% this is the most realistic American school on your list and the one worth the essay hours if you want US upside.",
    tier: 2
  },
  {
    id: "columbia", name: "Columbia Business School", loc: "Manhattanville, New York", country: "USA",
    region: "US", months: 21, classSize: 982, intakes: "Two per year — Aug & Jan (J-Term)",
    tuition: "$91,172/yr", costCr: 2.61, women: 46, intl: 41, avgAge: 28, avgExp: 5,
    test: "GRE 163/163 · GMAT 734 (10th ed)", ftRank: 30,
    tags: ["New York", "J-Term (no internship)", "STEM-designated", "Media & luxury access", "Large class", "Finance strength", "51% MBB conversion"],
    bestKnownFor: "Proximity — the only elite MBA where the media, fashion, advertising and finance industries are all a subway ride away, with a January entry option that finishes in 16 months.",
    consulting: 30, salary: "$175,000 median", deadline: "9 Sep 2026 (R1)", deadlineSort: 20260909,
    odds: [12, 16], brandIndia: 8, mbb: 8, speedS: 2, costS: 1, scholarship: 5, visaS: 4, network: 9, returnIndia: 7, intlExp: 6,
    majors: ["Marketing", "Media & Technology", "Retail & Luxury Goods", "Finance", "Entrepreneurship", "Healthcare & Pharmaceutical Management", "Social Enterprise", "Real Estate", "Value Investing", "Digital Future"],
    recruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Google", "L'Oréal", "Estée Lauder", "Nike", "Deloitte"],
    trackFit: { consulting: 8, product: 7, brand: 8, luxury: 8, media: 9, founder: 8, healthcare: 8, growth: 8, impact: 7 },
    interviewFormat: "With an alumnus, ~45 minutes, blind. Columbia's questions skew toward teamwork, conflict and inclusion. Note: they ask directly whether CBS is your first choice.",
    essays: [
      { p: "Short answer — what is your immediate post-MBA professional goal?", w: "50 characters" },
      { p: "Short answer — how do you plan to spend the summer after the first year of the MBA? If in an internship, include target industry and/or function. If your own venture, indicate the focus.", w: "50 characters" },
      { p: "Essay 1 — what are your career goals over the next three to five years and what is your long-term dream job?", w: "500 words" },
      { p: "Essay 2 — please share a specific example of how you made a team more collaborative, more inclusive, or fostered a greater sense of community within an organisation.", w: "250 words" },
      { p: "Essay 3 — how would you co-create your optimal MBA experience at CBS? Please be specific.", w: "250 words" }
    ],
    essaySrc: "verified", essayUrl: "https://business.columbia.edu/mba/admissions", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "The J-Term option is genuinely interesting for you — a January start finishes in sixteen months with no summer internship, which suits someone not making a hard industry switch and who wants to be out faster. Columbia's Retail & Luxury Goods and Media & Technology programmes are the strongest creative-industry offerings in the M7. New York access is the whole proposition.",
    tier: 2
  },
  {
    id: "mit", name: "MIT Sloan", loc: "Cambridge, Massachusetts", country: "USA",
    region: "US", months: 21, classSize: 450, intakes: "One per year — August",
    tuition: "$91,892/yr", costCr: 2.78, women: 47, intl: 42, avgAge: 28, avgExp: 5,
    test: "GRE 162V median · GMAT 720 median (10th ed)", ftRank: 1,
    tags: ["FT #1 in 2026", "STEM-designated", "Best for product", "47% women", "Action Learning labs", "Deep tech", "Entrepreneurship"],
    bestKnownFor: "Ranked number one in the world by the FT in 2026. The strongest technical-product and deep-tech MBA anywhere, built on hands-on Action Learning labs.",
    consulting: 32.3, salary: "$190,000 median", deadline: "29 Sep 2026 (R1)", deadlineSort: 20260929,
    odds: [6, 9], brandIndia: 9, mbb: 9, speedS: 2, costS: 1, scholarship: 5, visaS: 4, network: 9, returnIndia: 8, intlExp: 6,
    majors: ["Finance", "Business Analytics", "Enterprise Management", "Entrepreneurship & Innovation", "Sustainability", "Healthcare", "Product Management track", "Operations", "Digital Marketing"],
    recruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Google", "Microsoft", "Apple", "Deloitte", "Moderna", "Samsung"],
    trackFit: { consulting: 9, product: 10, brand: 6, luxury: 3, media: 4, founder: 9, healthcare: 8, growth: 8, impact: 7 },
    interviewFormat: "By invitation, with admissions staff, ~45 minutes, behavioural-only. MIT is famous for asking exclusively 'tell me about a time' questions, and for probing specifics relentlessly. Prepare 12–15 fully-detailed stories.",
    essays: [
      { p: "Cover letter — submit a cover letter seeking a place in the MIT Sloan MBA programme. Conform to standard business correspondence, include one or more professional examples that illustrate why you meet the desired criteria, and address it to the Admissions Committee.", w: "300 words" },
      { p: "Video 1 — take up to 90 seconds to share yours: who you are, where you come from, and what's shaped the person you are today. Be conversational, be yourself. Single take, no editing, no music or subtitles.", w: "90 seconds" },
      { p: "Video 2 — a randomly generated open-ended question. Five seconds to prepare, 60 seconds to record, one take.", w: "60 seconds" }
    ],
    essaySrc: "verified", essayUrl: "https://mitsloan.mit.edu/mba/admissions", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "The best school on this list for a product-management pivot, and now FT number one, which means application volume is surging. At 6–9% it is a genuine reach. Worth applying only if product is your chosen track and you can produce the specific behavioural stories their interview demands.",
    tier: 3
  },
  {
    id: "harvard", name: "Harvard Business School", loc: "Boston", country: "USA",
    region: "US", months: 21, classSize: 943, intakes: "One per year — August",
    tuition: "~$135k/yr all-in", costCr: 2.57, women: 44, intl: 37, avgAge: 27, avgExp: 5,
    test: "GRE 164/164 median · GMAT 685 Focus median", ftRank: 10,
    tags: ["Strongest global brand", "Case method", "~40 Indian admits/yr", "3% India admit rate", "Section culture", "Enormous network"],
    bestKnownFor: "The strongest brand in management education, full stop — and the case method, which is a genuinely different way of learning.",
    consulting: 22, salary: "$184,500 base · $232,800 total", deadline: "9 Sep 2026 (R1)", deadlineSort: 20260909,
    odds: [3, 5], brandIndia: 10, mbb: 9, speedS: 2, costS: 1, scholarship: 7, visaS: 3, network: 10, returnIndia: 9, intlExp: 5,
    majors: ["No majors — required core, then electives", "General Management", "Entrepreneurship (FIELD)", "Healthcare Initiative", "Social Enterprise Initiative", "Digital Value Lab", "Immersive Field Course"],
    recruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Google", "Blackstone", "Microsoft", "KKR", "Nike"],
    trackFit: { consulting: 9, product: 8, brand: 8, luxury: 7, media: 7, founder: 10, healthcare: 9, growth: 7, impact: 9 },
    interviewFormat: "A fast, 30-minute conversation with an Admissions Board member. Non-blind — they have read everything and prepared bespoke questions. Highly personalised, with rapid follow-ups. Followed by a mandatory written reflection submitted within 24 hours.",
    essays: [
      { p: "Business-Minded Essay — please reflect on how your choices have influenced your career path and aspirations.", w: "300 words" },
      { p: "Leadership-Focused Essay — what experiences have shaped how you invest in others and how you lead?", w: "250 words" },
      { p: "Growth-Oriented Essay — curiosity can be seen in many ways. Please share an example of how you have demonstrated curiosity and how that has influenced your growth.", w: "250 words" }
    ],
    essaySrc: "verified", essayUrl: "https://www.hbs.edu/mba/admissions/application-process", essayChecked: "7 Aug 2026 · Clear Admit / Stacy Blackman, MBA Class of 2029",
    verdict: "3–5% for you. Apply only if it costs you nothing elsewhere. The one genuine argument for trying: HBS is need-blind-generous on aid, and the India brand value is unmatched for someone returning home.",
    tier: 3
  },
  {
    id: "stanford", name: "Stanford GSB", loc: "Palo Alto", country: "USA",
    region: "US", months: 21, classSize: 434, intakes: "One per year — September",
    tuition: "~$134k/yr all-in", costCr: 2.55, women: 46, intl: 38, avgAge: 28, avgExp: 5.3,
    test: "GMAT avg 738 · GRE 164/164", ftRank: 13,
    tags: ["Hardest in the world", "Silicon Valley", "16% found companies", "434 seats", "d.school design", "Entrepreneurship #1"],
    bestKnownFor: "Founding companies. Around sixteen per cent of graduates go straight into starting or acquiring a business, and the d.school is the origin point of design thinking.",
    consulting: 14, salary: "$200,000+ median", deadline: "9 Sep 2026 (R1)", deadlineSort: 20260909,
    odds: [1, 2], brandIndia: 10, mbb: 8, speedS: 2, costS: 1, scholarship: 7, visaS: 3, network: 10, returnIndia: 8, intlExp: 5,
    majors: ["No majors", "Entrepreneurship (Center for Entrepreneurial Studies)", "Design thinking (d.school)", "Social Innovation", "Global Management", "Healthcare Innovation", "Startup Garage"],
    recruiters: ["McKinsey", "BCG", "Bain", "Google", "Own ventures", "Sequoia", "Amazon", "Stripe", "Apple", "Andreessen Horowitz"],
    trackFit: { consulting: 8, product: 9, brand: 6, luxury: 4, media: 6, founder: 10, healthcare: 8, growth: 8, impact: 9 },
    interviewFormat: "With an alumnus, ~60 minutes, blind. Almost entirely behavioural and past-focused — Stanford asks about what you have actually done, not what you plan to do.",
    essays: [
      { p: "Essay A — what matters most to you, and why?", w: "650 words" },
      { p: "Essay B — describe your aspirations and how your Stanford GSB experience will help you realise them.", w: "350 words" },
      { p: "Optional short answer — think about a time in the last five years when you've created a significant impact. Up to three examples.", w: "1,200 characters each" },
      { p: "Optional additional context — how have your life experiences shaped your worldview?", w: "800 characters" }
    ],
    essaySrc: "verified", essayUrl: "https://www.gsb.stanford.edu/programs/mba/admission/application-requirements", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "434 seats against 7,259 applications, and an India-specific rate near one per cent. Not a strategy. The 'What matters most to you, and why?' essay is, however, the single best writing exercise in MBA admissions — write it even if you never submit it. It will improve every other essay you write.",
    tier: 3
  },
  {
    id: "wharton", name: "Wharton", loc: "Philadelphia", country: "USA",
    region: "US", months: 21, classSize: 888, intakes: "One per year — August",
    tuition: "$135,441/yr all-in", costCr: 2.57, women: 44, intl: 35, avgAge: 28, avgExp: 5,
    test: "GRE 163Q/162V · GMAT 735 (10th ed)", ftRank: 3,
    tags: ["Finance powerhouse", "STEM majors", "Health Care Management", "Largest M7 class", "20 majors", "Team-based discussion"],
    bestKnownFor: "Depth and breadth — twenty formal majors including the Health Care Management programme, which is the strongest healthcare MBA specialisation in the world.",
    consulting: 28, salary: "$175,000 median", deadline: "9 Sep 2026 (R1)", deadlineSort: 20260909,
    odds: [5, 8], brandIndia: 10, mbb: 9, speedS: 2, costS: 1, scholarship: 5, visaS: 4, network: 10, returnIndia: 9, intlExp: 5,
    majors: ["Health Care Management", "Marketing", "Marketing & Operations", "Finance", "Business Analytics", "Entrepreneurship & Innovation", "Multinational Management", "OIDD", "Real Estate", "Strategic Management", "Statistics", "Social Impact"],
    recruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "JP Morgan", "Google", "Blackstone", "Johnson & Johnson", "Deloitte"],
    trackFit: { consulting: 9, product: 8, brand: 8, luxury: 6, media: 6, founder: 8, healthcare: 10, growth: 8, impact: 7 },
    interviewFormat: "The Team-Based Discussion — you and five other candidates get a prompt in advance, present a one-minute pitch, then collaborate for 35 minutes while admissions observes. Followed by a short one-on-one. Unique in the M7 and genuinely different to prepare for.",
    essays: [
      { p: "Essay 1a — what is your immediate post-MBA professional goal?", w: "50 words" },
      { p: "Essay 1b — describe your medium- and long-term professional goals after your Wharton MBA.", w: "150 words" },
      { p: "Essay 2 — taking into consideration your background (personal, professional and/or academic), how do you plan to add meaningful value to the Wharton community?", w: "350 words" },
      { p: "Optional — share any additional information about yourself that cannot be found elsewhere in your application, or address extenuating circumstances.", w: "500 words" }
    ],
    essaySrc: "verified", essayUrl: "https://mba.wharton.upenn.edu/mba-application-requirements/", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "The Health Care Management major is the best in the world and directly extends your three years of life-sciences work — this is the one US school where your existing domain becomes an elite specialisation rather than a niche. STEM majors available. At 5–8% it is a reach, but a defensible one if healthcare is your chosen track.",
    tier: 3
  },
  {
    id: "yale", name: "Yale SOM", loc: "New Haven", country: "USA",
    region: "US", months: 21, classSize: 350, intakes: "One per year — August",
    tuition: "~$120k/yr all-in", costCr: 2.40, women: 44, intl: 41, avgAge: 28, avgExp: 5,
    test: "GRE avg 329 — highest of any school", ftRank: 17,
    tags: ["Highest avg GRE", "Social impact leader", "Business & society", "Small class", "STEM-eligible", "Global Network"],
    bestKnownFor: "Business and society — the most credible non-profit, government and impact pipeline in the M7, plus the highest average GRE of any business school.",
    consulting: 26, salary: "$175,000 median", deadline: "15 Sep 2026 (R1)", deadlineSort: 20260915,
    odds: [15, 20], brandIndia: 8, mbb: 6, speedS: 2, costS: 2, scholarship: 7, visaS: 4, network: 7, returnIndia: 7, intlExp: 6,
    majors: ["Integrated core (no majors)", "Social Impact", "Healthcare", "Sustainability", "Asset Management", "Global Social Entrepreneurship", "Global Network for Advanced Management"],
    recruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Google", "Deloitte", "Gates Foundation", "Microsoft", "EY-Parthenon", "Bridgespan"],
    trackFit: { consulting: 7, product: 7, brand: 6, luxury: 4, media: 5, founder: 7, healthcare: 8, growth: 6, impact: 10 },
    interviewFormat: "With admissions staff or a second-year student, ~30 minutes, blind. Warm and conversational. Yale probes 'why this, why now' harder than most.",
    essays: [
      { p: "Choose ONE of three — (1) Describe the biggest commitment you have ever made. Why is this commitment meaningful to you and what actions have you taken to support it?", w: "under 500 words" },
      { p: "Choose ONE of three — (2) Describe the community that has been most meaningful to you. What is the most valuable thing you have gained from being part of it, and the most important thing you have contributed?", w: "under 500 words" },
      { p: "Choose ONE of three — (3) Describe the most significant challenge you have faced. How have you confronted it and how has it shaped you as a person?", w: "under 500 words" },
      { p: "Career interests — briefly describe your career interests and how you arrived at them. What have you already done to explore or pursue these interests? What have those efforts helped you understand about the opportunities you are considering and the preparation they will require?", w: "200 words" }
    ],
    essaySrc: "verified", essayUrl: "https://som.yale.edu/programs/mba/admissions", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "The best US school for your stated long-term India-impact ambition, and your highest US odds among genuinely elite programmes at 15–20%. Note the average GRE is 329 — a 330 is at par here, not above it.",
    tier: 3
  },
  {
    id: "isb", name: "ISB Hyderabad", loc: "Hyderabad · Mohali", country: "India",
    region: "AS", months: 12, classSize: 808, intakes: "One per year — April",
    tuition: "₹38.67 L", costCr: 0.47, women: 40, intl: 3, avgAge: 27, avgExp: 4.5,
    test: "GMAT/GRE accepted", ftRank: 12,
    tags: ["1 year", "₹47L all-in", "No visa needed", "FT #12 globally", "37% consulting", "Huge India network", "Fastest payback"],
    bestKnownFor: "The only Indian school ranked in the global top fifteen, and by far the best return on investment available to an Indian applicant.",
    consulting: 37, salary: "₹37.29 LPA average", deadline: "R1 Sep 2026", deadlineSort: 20260915,
    odds: [55, 65], brandIndia: 8, mbb: 7, speedS: 9, costS: 10, scholarship: 5, visaS: 10, network: 7, returnIndia: 10, intlExp: 2,
    majors: ["Strategy & Leadership", "Marketing", "Finance", "Operations & Supply Chain", "Information Technology", "Healthcare Management", "Entrepreneurship", "Public Policy"],
    recruiters: ["Accenture (100+ offers)", "McKinsey", "BCG", "Bain", "Amazon", "Microsoft", "Goldman Sachs", "Flipkart", "Reliance", "Tata"],
    trackFit: { consulting: 8, product: 8, brand: 7, luxury: 4, media: 7, founder: 8, healthcare: 8, growth: 9, impact: 7 },
    interviewFormat: "Panel interview, typically 2–3 interviewers including alumni and admissions, 20–30 minutes. Direct and fast-paced. Heavy focus on why ISB over an international MBA.",
    essays: [
      { p: "Essay 1 — What unique experiences have shaped who you are? What have these experiences taught you about leadership and the kind of leader you aspire to be?", w: "400 words" },
      { p: "Essay 2 — What intellectual experiences have influenced your approach to learning and have led you to pursue an MBA?", w: "400 words" },
      { p: "Essay 3 (optional) — Share with us any intellectual pursuits, unique perspectives, or experiences that you pursued that have shaped your worldview. How could they potentially contribute to our learning community?", w: "250 words" },
      { p: "NOTE: these are the 2026-27 cycle prompts. Prompts for the following cycle had not been announced when this was checked — confirm on isb.edu before drafting.", w: "verify" }
    ],
    essaySrc: "verified", essayUrl: "https://www.isb.edu/programmes/post-graduate-programmes/pgp-in-management/eligibility-and-requirements", essayChecked: "7 Aug 2026 · Clear Admit, 2026-27 cycle",
    verdict: "₹47 lakh all-in against ₹1.5 crore, no visa question, ₹37.29 LPA average, and you never leave home. The rational hedge if the international route stalls — but it delivers none of the international exposure you named as a goal, and no loan-repayment arbitrage. Apply as insurance, not as a plan.",
    tier: 3
  },
  {
    id: "haas", name: "Berkeley Haas", loc: "Berkeley, California", country: "USA",
    region: "US", months: 21, classSize: 240, intakes: "One per year — August",
    tuition: "~$132k/yr all-in", costCr: 2.50, women: 43, intl: 42, avgAge: 28, avgExp: 5.6,
    test: "GRE 162Q/161V", ftRank: 9,
    tags: ["Silicon Valley", "Design thinking", "Small class (240)", "STEM-designated", "Four Defining Principles", "Tech-weighted"],
    bestKnownFor: "Design thinking and questioning the status quo — Haas has an explicit values framework that its interview tests directly.",
    consulting: 18, salary: "$159,000 median", deadline: "10 Sep 2026 (R1)", deadlineSort: 20260910,
    odds: [8, 12], brandIndia: 7, mbb: 6, speedS: 2, costS: 2, scholarship: 5, visaS: 4, network: 8, returnIndia: 6, intlExp: 6,
    majors: ["No majors — certificates", "Technology Management", "Sustainable Business", "Entrepreneurship", "Healthcare", "Design Thinking", "Social Impact", "Product Management"],
    recruiters: ["Google", "Amazon", "Apple", "McKinsey", "BCG", "Microsoft", "Salesforce", "Bain", "Deloitte", "Adobe"],
    trackFit: { consulting: 6, product: 9, brand: 7, luxury: 4, media: 5, founder: 9, healthcare: 6, growth: 8, impact: 8 },
    interviewFormat: "With an alumnus or admissions, ~45 minutes, blind. Uniquely, Haas asks directly which of its Four Defining Principles resonates most with you — prepare that answer specifically.",
    essays: [
      { p: "Essay 1 (VIDEO — not written) — briefly introduce yourself, then tell us what makes you feel alive when you are doing it, and why?", w: "1–2 min video, 2 min max" },
      { p: "Essay 2 — what are your post-MBA career goals, and how will the resources at UC Berkeley Haas help you achieve them? How do you plan to remain adaptable as your career evolves?", w: "300 words" },
      { p: "Essay 3 — Distance Travelled. Contextual information that helps us understand the unique circumstances, challenges or influences that have shaped your personal and professional journey. (supplemental)", w: "300 words" }
    ],
    essaySrc: "verified", essayUrl: "https://haas.berkeley.edu/mba/admissions/", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "The best design-thinking curriculum in the M7 and a genuine product-management school, but only eighteen per cent consulting and a tech-weighted class in a market that has been sponsorship-cautious. A reach at 8–12% for a school that does not clearly beat Tier 1 on your criteria.",
    tier: 3
  },
  {
    id: "stern", name: "NYU Stern", loc: "Greenwich Village, New York", country: "USA",
    region: "US", months: 21, classSize: 380, intakes: "One per year — August",
    tuition: "~$134k/yr all-in", costCr: 2.55, women: 45, intl: 43, avgAge: 28, avgExp: 5.1,
    test: "GRE avg 327", ftRank: 23,
    tags: ["New York", "Luxury & Retail track", "Entertainment & Media", "EQ endorsement essay", "STEM tracks", "Fashion access"],
    bestKnownFor: "Industry-specific specialisations in fashion, luxury, entertainment and media that no other top school offers at the same depth, in the city where those industries live.",
    consulting: 32.8, salary: "$175,000 median", deadline: "15 Sep 2026 (R1)", deadlineSort: 20260915,
    odds: [15, 20], brandIndia: 6, mbb: 6, speedS: 2, costS: 2, scholarship: 5, visaS: 4, network: 7, returnIndia: 6, intlExp: 6,
    majors: ["Luxury & Retail", "Entertainment, Media & Technology", "Marketing", "Finance", "Fintech", "Business Analytics", "Product Management", "Sustainable Business", "Tech Product Management"],
    recruiters: ["Goldman Sachs", "McKinsey", "JP Morgan", "BCG", "Amazon", "L'Oréal", "LVMH", "Estée Lauder", "Google", "Warner Bros Discovery"],
    trackFit: { consulting: 7, product: 8, brand: 8, luxury: 9, media: 10, founder: 7, healthcare: 6, growth: 8, impact: 6 },
    interviewFormat: "By invitation, with admissions or an alumnus, ~30 minutes, non-blind. Stern is direct about recruiting readiness — expect 'name the companies you want' and 'what's your plan B'. Plus the unique 'EQ Endorsement' — a short statement from someone who knows you.",
    essays: [
      { p: "Essay 1 — Professional Aspirations. What are your short-term career goals? Why is the Stern MBA the necessary next chapter in your professional story? Please be specific.", w: "500 words" },
      { p: "Essay 2 — Pick Six. Introduce yourself with six images and a one-sentence caption for each. Include a brief intro of no more than 3 sentences, six images illustrating your interests, values, motivations, perspective and/or personality, and a one-sentence caption per image.", w: "6 images, no word limit" },
      { p: "Essay 3 — Additional information. (optional)", w: "500 words" },
      { p: "EQ Endorsement — a structured assessment from someone who can vouch for your emotional intelligence with a specific example. Assesses leadership, response to feedback and EQ.", w: "separate submission" }
    ],
    essaySrc: "verified", essayUrl: "https://www.stern.nyu.edu/programs-admissions/full-time-mba/admissions", essayChecked: "7 Aug 2026 · multi-source, 2026-27",
    verdict: "If the creative pivot is real and you want the US, Stern is the most relevant American school on this list — Luxury & Retail and Entertainment, Media & Technology are real, staffed specialisations, and New York is where those employers recruit. The 'Pick Six' essay is also the most enjoyable application you will write.",
    tier: 3
  },
  {
    id: "ross", name: "Michigan Ross", loc: "Ann Arbor", country: "USA",
    region: "US", months: 21, classSize: 400, intakes: "One per year — August",
    tuition: "~$120k/yr all-in", costCr: 2.28, women: 43, intl: 32, avgAge: 28, avgExp: 5.2,
    test: "GMAT ~720 · GRE accepted", ftRank: 28,
    tags: ["Top-3 marketing", "MAP action learning", "Strong CPG pipeline", "Generous aid", "Collaborative culture", "Brand management"],
    bestKnownFor: "The Multidisciplinary Action Project (MAP) — a seven-week, full-time real consulting engagement built into the core — and one of the strongest brand-management pipelines in America.",
    consulting: 36, salary: "$175,000 median", deadline: "8 Sep 2026 (R1)", deadlineSort: 20260908,
    odds: [20, 26], brandIndia: 6, mbb: 6, speedS: 2, costS: 3, scholarship: 8, visaS: 4, network: 7, returnIndia: 6, intlExp: 5,
    majors: ["Marketing", "Brand Management", "Strategy", "Finance", "Operations", "Technology & Operations", "Healthcare", "Sustainability (Erb Institute)", "Entrepreneurship"],
    recruiters: ["Amazon", "PepsiCo", "Microsoft", "Nike", "Nestlé", "P&G", "Samsung", "McKinsey", "BCG", "Deloitte"],
    trackFit: { consulting: 8, product: 8, brand: 10, luxury: 5, media: 5, founder: 7, healthcare: 7, growth: 8, impact: 7 },
    interviewFormat: "With an alumnus, second-year student or admissions, ~30–45 minutes, blind. Ross is known for failure and ambiguity questions — 'tell me about a time you failed' comes up almost every time.",
    essays: [
      { p: "Essay 1 — What is your short-term career goal, and how do you plan to leverage the Ross MBA and its program offerings in your first role after graduation? Please be specific and answer both parts of this question.", w: "300 words" },
      { p: "Essay 2 — choose ONE: (a) Think of a time something important did not go as planned. What did you do next? (b) What is something you worked on for an extended period of time (over six months) that ultimately resulted in a positive outcome? What kept you committed? (c) Share an example of a specific situation when your actions created a positive impact on your community or an individual.", w: "200 words" },
      { p: "Optional — is there something in your resume or application that needs a brief explanation? Employment gap, academic outliers, choice of recommender, supplemental coursework.", w: "250 words" }
    ],
    essaySrc: "verified", essayUrl: "https://michiganross.umich.edu/programs/full-time-mba/admissions", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "If brand management is your chosen track and you want a US school with realistic odds and generous scholarship money, Ross is the underrated answer — eighteen per cent of graduates go into marketing and sales, with Amazon, PepsiCo, Nike, Nestlé and P&G as core recruiters. Lower brand recognition in India than the M7, which is the trade.",
    tier: 3
  },
  {
    id: "fuqua", name: "Duke Fuqua", loc: "Durham, North Carolina", country: "USA",
    region: "US", months: 21, classSize: 440, intakes: "One per year — August",
    tuition: "~$122k/yr all-in", costCr: 2.32, women: 44, intl: 38, avgAge: 28, avgExp: 5.5,
    test: "GMAT ~715 · GRE accepted", ftRank: 16,
    tags: ["Team Fuqua culture", "Health Sector Management", "Strong CPG", "39% consulting", "25 Random Things essay", "Generous aid"],
    bestKnownFor: "Health Sector Management — the deepest healthcare MBA concentration after Wharton — and a genuinely distinctive collaborative culture that the application tests hard for.",
    consulting: 34, salary: "$175,000 median", deadline: "9 Sep 2026 (EA)", deadlineSort: 20260909,
    odds: [20, 26], brandIndia: 6, mbb: 7, speedS: 2, costS: 3, scholarship: 8, visaS: 4, network: 7, returnIndia: 6, intlExp: 5,
    majors: ["Health Sector Management", "Marketing", "Strategy", "Finance", "Decision Sciences", "Energy & Environment", "Social Entrepreneurship", "Technology"],
    recruiters: ["Accenture Strategy", "Bain", "BCG", "McKinsey", "Deloitte", "Amazon", "J&J", "Genentech", "Google", "IQVIA"],
    trackFit: { consulting: 8, product: 7, brand: 9, luxury: 4, media: 4, founder: 7, healthcare: 10, growth: 7, impact: 8 },
    interviewFormat: "Open interview available (you can request one before invitation), ~30 minutes, blind. Fuqua's culture questions are real screening — 'what does Team Fuqua mean to you' is asked directly.",
    essays: [
      { p: "Required short answer — what are your post-MBA career goals? Share with us your first-choice career plan and your alternate plan.", w: "100 words" },
      { p: "Essay 1 — 25 Random Things About Yourself. Share important life experiences, hobbies, achievements, fun facts, or anything that helps us understand what makes you who you are. Present your response in list form, numbered 1 to 25.", w: "750 words max" },
      { p: "Essay 2 — The Fuqua Community and You. Based on your understanding of the Fuqua culture, what are 3 ways you expect to contribute at Fuqua?", w: "500 words max" },
      { p: "Optional — if you feel there are circumstances of which the admissions committee should be aware, please explain them here.", w: "500 words max" }
    ],
    essaySrc: "verified", essayUrl: "https://www.fuqua.duke.edu/programs/daytime-mba/admissions", essayChecked: "7 Aug 2026 · Clear Admit 2026-27",
    verdict: "Health Sector Management plus a top-five brand-management pipeline makes Fuqua the best US school for combining your existing healthcare domain with a marketing pivot. Realistic odds and strong scholarship. The '25 Random Things' essay is the most revealing thing you will write about yourself.",
    tier: 3
  },
  {
    id: "nus", name: "NUS Singapore", loc: "Singapore", country: "Singapore",
    region: "AS", months: 17, classSize: 120, intakes: "One per year — August",
    tuition: "S$99,953", costCr: 1.00, women: 43, intl: 92, avgAge: 29, avgExp: 6,
    test: "GMAT avg 670 · GRE accepted", ftRank: 31,
    tags: ["#1 in Asia", "Low tax", "Close to India", "Small class (120)", "17 months", "Asia network"],
    bestKnownFor: "The best-ranked Asian MBA outside China, in a low-tax city four hours from Delhi with a large Indian professional community.",
    consulting: 20, salary: "US$88,002 average", deadline: "R1 Oct 2026", deadlineSort: 20261015,
    odds: [55, 65], brandIndia: 5, mbb: 4, speedS: 6, costS: 7, scholarship: 5, visaS: 5, network: 5, returnIndia: 6, intlExp: 8,
    majors: ["Strategy & Organisation", "Marketing", "Finance", "Analytics & Operations", "Innovation & Entrepreneurship", "Healthcare Management", "Real Estate"],
    recruiters: ["Amazon", "Google", "Shopee", "DBS", "Bain", "Accenture", "Grab", "Micron", "P&G", "Standard Chartered"],
    trackFit: { consulting: 5, product: 7, brand: 6, luxury: 4, media: 4, founder: 6, healthcare: 6, growth: 7, impact: 5 },
    interviewFormat: "With admissions, ~30 minutes, non-blind. Focused on why Asia and whether you intend to stay in the region.",
    essays: [
      { p: "Essay 1 — How have people, events, and/or situations in your life influenced who you are today?", w: "250 words" },
      { p: "Essay 2 — How do you plan to spend your time on The NUS MBA to transform yourself personally and professionally? Briefly describe your experience to date, and how this and The NUS MBA can help you achieve your mid and long-term career goals.", w: "350 words" },
      { p: "Optional — is there any additional information relevant to your application that you'd like to share with the Admissions Committee?", w: "200 words" }
    ],
    essaySrc: "verified", essayUrl: "https://mba.nus.edu.sg/admissions/", essayChecked: "7 Aug 2026 · multi-source, 2026 intake",
    verdict: "The lowest salary outcome and weakest consulting placement on this list at a cost close to the Europeans. The genuine argument for it is geography and tax — Singapore is four hours from home and keeps most of what you earn. Not a first choice, but a rational one if proximity is the priority.",
    tier: 3
  }
];

/* ---------- INTERVIEW QUESTION BANK ------------------------- */
/* src: "reported" = documented candidate reports (Clear Admit / P&Q Jan 2026 school-by-school list)
        "format"   = derived from published interview format; expect variants          */
const QUESTIONS = [
  // ---- INSEAD (reported)
  { s: "insead", t: "Fit", src: "reported", q: "Why INSEAD, and why a one-year programme?" },
  { s: "insead", t: "Fit", src: "reported", q: "Tell me more about your current role." },
  { s: "insead", t: "Curveball", src: "reported", q: "An MBA is costly. If I could give you the network you need via an introduction, would you still choose to do the MBA?" },
  { s: "insead", t: "Reflection", src: "reported", q: "What do you wish you had done differently?" },
  { s: "insead", t: "Global", src: "reported", q: "There are many nationalities and languages in the class. How would you work through the challenges that creates?" },
  { s: "insead", t: "Teamwork", src: "reported", q: "What will you contribute to your study group?" },
  { s: "insead", t: "Teamwork", src: "reported", q: "What would you lean on your study group for?" },
  { s: "insead", t: "Global", src: "reported", q: "How do you expect to adjust in a truly global environment?" },
  { s: "insead", t: "Behavioural", src: "reported", q: "How do you deliver constructive criticism?" },
  { s: "insead", t: "Logistics", src: "reported", q: "What language do you plan to use for the language requirement?" },
  { s: "insead", t: "Goals", src: "reported", q: "What are your post-MBA plans?" },
  { s: "insead", t: "Personal", src: "reported", q: "What do you do for fun?" },
  { s: "insead", t: "Fit", src: "reported", q: "What will be your biggest contribution to INSEAD?" },

  // ---- LBS (reported)
  { s: "lbs", t: "Behavioural", src: "reported", q: "Tell me about a time when you spoke up and it did not go well." },
  { s: "lbs", t: "Behavioural", src: "reported", q: "Tell me about a time when you implemented an out-of-the-box idea." },
  { s: "lbs", t: "Personal", src: "reported", q: "What motivates you?" },
  { s: "lbs", t: "Teamwork", src: "reported", q: "What is your role on a team?" },
  { s: "lbs", t: "Teamwork", src: "reported", q: "Tell us about a time you worked in a dysfunctional team. What did you do to improve it?" },
  { s: "lbs", t: "Presentation", src: "format", q: "Impromptu presentation: you get a business news prompt, five minutes to prepare, five to present. Structure it — intro, argument, conclusion." },
  { s: "lbs", t: "Fit", src: "format", q: "Why an MBA, and why London Business School specifically?" },

  // ---- HBS (reported)
  { s: "harvard", t: "Industry", src: "reported", q: "Tell me about developments in your industry. How do you picture its future based on the trends you're seeing?" },
  { s: "harvard", t: "Industry", src: "reported", q: "Tell me about the entrepreneurship landscape in your country." },
  { s: "harvard", t: "Industry", src: "reported", q: "What do you do every day? How is AI going to impact it?" },
  { s: "harvard", t: "Career", src: "reported", q: "Why did you choose this role or career path at that point in your life?" },
  { s: "harvard", t: "Written", src: "format", q: "Post-interview reflection, submitted within 24 hours: what would you like the committee to know that you didn't get to say?" },

  // ---- Stanford (reported)
  { s: "stanford", t: "Behavioural", src: "reported", q: "Tell me about a time when you were effective." },
  { s: "stanford", t: "Influence", src: "reported", q: "Tell me about a time you used your insights to persuade your team to do things differently." },
  { s: "stanford", t: "Behavioural", src: "reported", q: "Tell me about a time when you went above and beyond." },
  { s: "stanford", t: "Leadership", src: "reported", q: "Tell me about a time when you helped someone else develop their skill set." },
  { s: "stanford", t: "Initiative", src: "reported", q: "Tell me about a time you spotted an opportunity or a problem." },
  { s: "stanford", t: "Influence", src: "reported", q: "Tell me about a time when you had to get the support of others to get something done." },
  { s: "stanford", t: "Curveball", src: "reported", q: "Tell me about a time when you overstepped an authority." },
  { s: "stanford", t: "Personal", src: "reported", q: "Tell me about a defining moment in your life." },

  // ---- Wharton (reported)
  { s: "wharton", t: "Feedback", src: "reported", q: "What's a piece of criticism you received from a direct supervisor? How did you grow from it?" },
  { s: "wharton", t: "Initiative", src: "reported", q: "Tell me about a time when you took initiative." },
  { s: "wharton", t: "Influence", src: "reported", q: "Tell me about a time when you built something without formal authority or resources." },
  { s: "wharton", t: "Personal", src: "reported", q: "What is something new you learned recently?" },
  { s: "wharton", t: "Group", src: "format", q: "Team-Based Discussion: one-minute pitch on the given prompt, then 35 minutes collaborating with five other candidates while admissions observes." },

  // ---- MIT Sloan (reported)
  { s: "mit", t: "Impact", src: "reported", q: "Tell me about a time when you worked on something that had a lasting impact." },
  { s: "mit", t: "Failure", src: "reported", q: "Tell me about a time when something did not go to plan. How did you find out? What was your response? What was the outcome?" },
  { s: "mit", t: "Leadership", src: "reported", q: "Tell me about a time you revitalised a stagnant team." },
  { s: "mit", t: "Initiative", src: "reported", q: "Tell me about a time you challenged the status quo." },
  { s: "mit", t: "Leadership", src: "reported", q: "Tell me about a time when you mentored someone. What's your mentorship style?" },
  { s: "mit", t: "Conflict", src: "reported", q: "Recount a difficult conversation you had at work." },

  // ---- Booth (reported)
  { s: "booth", t: "Vulnerability", src: "reported", q: "Tell me about a time you had to ask for help." },
  { s: "booth", t: "Reflection", src: "reported", q: "Tell me about areas of improvement you've had to work on." },
  { s: "booth", t: "Entrepreneurial", src: "reported", q: "What is your startup idea, and what solutions have you considered?" },
  { s: "booth", t: "Learning", src: "reported", q: "Tell me about a time at work when you learned something that changed your perspective or way of thinking." },
  { s: "booth", t: "Influence", src: "reported", q: "Tell me about a time you had an unpopular idea." },
  { s: "booth", t: "Feedback", src: "reported", q: "Tell me about a time when you received feedback that surprised you." },

  // ---- Kellogg (reported)
  { s: "kellogg", t: "Teamwork", src: "reported", q: "Tell me about your experience with a team, through an example." },
  { s: "kellogg", t: "Leadership", src: "reported", q: "What is your leadership style?" },
  { s: "kellogg", t: "Video", src: "format", q: "Video essay: what would your friends say is your best quality? (~20s prep, ~60s to answer)" },
  { s: "kellogg", t: "Video", src: "format", q: "Video essay: tell us about a time you took on a leadership role. (~20s prep, ~60s to answer)" },
  { s: "kellogg", t: "Video", src: "format", q: "Video essay: why Kellogg? (~20s prep, ~60s to answer)" },

  // ---- Columbia (reported)
  { s: "columbia", t: "Inclusion", src: "reported", q: "Tell me about a time you made a team more inclusive." },
  { s: "columbia", t: "Conflict", src: "reported", q: "Tell me about a time you had a disagreement with a co-worker." },
  { s: "columbia", t: "Leadership", src: "reported", q: "Tell me about a project where you led a team and produced a good result." },
  { s: "columbia", t: "Reflection", src: "reported", q: "What is your greatest challenge?" },
  { s: "columbia", t: "Pitch", src: "reported", q: "If you had to tell the admissions committee one sentence about you, what would it be?" },
  { s: "columbia", t: "Teamwork", src: "reported", q: "Tell me how you would react in a team that didn't work well together." },
  { s: "columbia", t: "Fit", src: "reported", q: "Is there anything at CBS that you think will challenge you?" },

  // ---- Yale (reported)
  { s: "yale", t: "Achievement", src: "reported", q: "Tell me about an accomplishment you're proud of and why it was meaningful to you." },
  { s: "yale", t: "Conflict", src: "reported", q: "Tell me about a time when you had to resolve a conflict." },

  // ---- Haas (reported)
  { s: "haas", t: "Leadership", src: "reported", q: "Tell me about a time you had to work on a complicated project and morale was low." },
  { s: "haas", t: "Creativity", src: "reported", q: "Tell me about a time you championed a creative initiative in the workplace." },
  { s: "haas", t: "Leadership", src: "reported", q: "Tell me about a time when you had to manage a team." },
  { s: "haas", t: "Risk", src: "reported", q: "Tell me about a time when you took a professional risk." },
  { s: "haas", t: "Fit", src: "reported", q: "Which of the Four Defining Principles resonates with you the most, and why?" },
  { s: "haas", t: "Learning", src: "reported", q: "What is something you learned from something you read recently?" },

  // ---- Stern (reported)
  { s: "stern", t: "Teamwork", src: "reported", q: "How would you describe your role and leading style in a team?" },
  { s: "stern", t: "Recruiting", src: "reported", q: "What will you do to secure an internship and a post-MBA offer?" },
  { s: "stern", t: "Leadership", src: "reported", q: "What is a characteristic in a leader that you value?" },
  { s: "stern", t: "Recruiting", src: "reported", q: "Name some companies where you are looking to recruit." },
  { s: "stern", t: "Recruiting", src: "reported", q: "What will plan B look like for an internship or post-grad job?" },
  { s: "stern", t: "Fit", src: "reported", q: "How will you leverage NYU's career resources?" },
  { s: "stern", t: "Fit", src: "reported", q: "What do you look forward to about being in New York City?" },
  { s: "stern", t: "Leadership", src: "reported", q: "Think about leaders you have worked with — what do you admire, and what could you learn from them?" },

  // ---- Ross (reported)
  { s: "ross", t: "Failure", src: "reported", q: "Tell me about a time when you failed." },
  { s: "ross", t: "Failure", src: "reported", q: "Tell me about a time when things didn't go as planned." },
  { s: "ross", t: "Ambiguity", src: "reported", q: "Tell me about a time when you had to deal with ambiguity." },
  { s: "ross", t: "Curveball", src: "reported", q: "Who is your favourite historical figure?" },
  { s: "ross", t: "Curveball", src: "reported", q: "What company do you think has had the biggest impact on the world, and why?" },

  // ---- Fuqua (reported)
  { s: "fuqua", t: "Goals", src: "reported", q: "What are your goals and how will Fuqua help you achieve them?" },
  { s: "fuqua", t: "Personal", src: "reported", q: "How would others describe you?" },
  { s: "fuqua", t: "Diversity", src: "reported", q: "Tell me about a time you experienced challenges working with people who had a different perspective. How did you navigate it, and how would that shape what you bring to Fuqua?" },
  { s: "fuqua", t: "Differentiation", src: "reported", q: "What makes you stand out compared with your peers?" },
  { s: "fuqua", t: "Impact", src: "reported", q: "Tell me about a time when you made a positive impact." },
  { s: "fuqua", t: "Fit", src: "reported", q: "What does Team Fuqua mean to you?" },
  { s: "fuqua", t: "Leadership", src: "reported", q: "Describe a couple of leaders you've had exposure to and admire." },

  // ---- Oxford (format)
  { s: "oxford", t: "Goals", src: "format", q: "Walk me through your career to date and explain each transition." },
  { s: "oxford", t: "Goals", src: "format", q: "What is your post-MBA plan, and what is your backup if it doesn't happen?" },
  { s: "oxford", t: "Fit", src: "format", q: "Why Oxford rather than a two-year US programme?" },
  { s: "oxford", t: "Impact", src: "format", q: "You've written about wanting to create change in India. Be specific — what exactly, and how?" },
  { s: "oxford", t: "Reflection", src: "format", q: "What is the biggest weakness in your application, and what are you doing about it?" },
  { s: "oxford", t: "Fit", src: "format", q: "How will you contribute to the Oxford cohort beyond your professional expertise?" },

  // ---- Judge (format)
  { s: "judge", t: "Curveball", src: "format", q: "Expect a question well outside your CV — on a book, a current event, an ethical dilemma, or your view on a technology. They are testing how you think, not what you rehearsed." },
  { s: "judge", t: "Intellectual", src: "format", q: "What's a strongly held view in your industry that you think is wrong?" },
  { s: "judge", t: "Goals", src: "format", q: "Why a one-year MBA at this stage, and why Cambridge?" },
  { s: "judge", t: "Failure", src: "format", q: "What did you learn from your most spectacular failure?" },
  { s: "judge", t: "Analytical", src: "format", q: "Talk me through how you'd analyse a problem you've never seen before." },

  // ---- HEC (format)
  { s: "hec", t: "Presentation", src: "format", q: "Ten-minute oral presentation on a topic of your choice — you pick it. Pick something you genuinely care about and can defend under questions." },
  { s: "hec", t: "Fit", src: "format", q: "Why HEC Paris, and why France?" },
  { s: "hec", t: "Global", src: "format", q: "How much international exposure do you have, and how will you cope in a class that is 94% international?" },
  { s: "hec", t: "Goals", src: "format", q: "Walk me through your CV — the interviewer has only this, so make it self-explanatory." },
  { s: "hec", t: "Personal", src: "format", q: "What do you consider your most significant life achievement?" },
  { s: "hec", t: "Language", src: "format", q: "Do you intend to learn French? How seriously?" },

  // ---- IESE (format)
  { s: "iese", t: "Analytical", src: "format", q: "Expect case-style probing: you'll be given a business situation and asked how you'd structure it." },
  { s: "iese", t: "Fit", src: "format", q: "Why a 15–19 month programme rather than a one-year?" },
  { s: "iese", t: "Failure", src: "format", q: "Describe a situation where you failed. What did you learn?" },
  { s: "iese", t: "Values", src: "format", q: "IESE emphasises the ethical dimension of management. Tell me about an ethical dilemma you faced." },

  // ---- Bocconi (format)
  { s: "bocconi", t: "Fit", src: "format", q: "Why Italy, and why SDA Bocconi over a UK or French programme?" },
  { s: "bocconi", t: "Track", src: "format", q: "If you're targeting Luxury Business Management — what draws you to the sector, and what have you actually done about it?" },
  { s: "bocconi", t: "Goals", src: "format", q: "Where do you see yourself working immediately after the programme?" },
  { s: "bocconi", t: "Language", src: "format", q: "Do you plan to learn Italian?" },

  // ---- IMD (format)
  { s: "imd", t: "Group", src: "format", q: "Assessment day group case: you'll solve a business case with other candidates while assessors watch how you behave in a group." },
  { s: "imd", t: "Presentation", src: "format", q: "Individual case presentation to a panel, followed by questions." },
  { s: "imd", t: "Leadership", src: "format", q: "IMD's programme is built on self-awareness. What is your biggest blind spot as a leader?" },
  { s: "imd", t: "Maturity", src: "format", q: "You have four years of experience in a class averaging six. Why are you ready now?" },

  // ---- ISB (format)
  { s: "isb", t: "Fit", src: "format", q: "Why ISB rather than an international MBA — and be honest about whether we're your backup." },
  { s: "isb", t: "Goals", src: "format", q: "What are your short and long term goals, and what specifically will you do differently after ISB?" },
  { s: "isb", t: "Domain", src: "format", q: "Walk us through a project you led at ZS end to end, including the commercial outcome." },
  { s: "isb", t: "Curveball", src: "format", q: "What's happening in Indian pharma right now that most people are getting wrong?" },

  // ---- Cornell / Georgetown / Tuck / Tepper / Emory / Kelley (reported, useful as general prep)
  { s: "general", t: "Recruiting", src: "reported", q: "How have you prepared for recruitment?" },
  { s: "general", t: "Fit", src: "reported", q: "What clubs do you plan to join and how do you intend to contribute?" },
  { s: "general", t: "Career", src: "reported", q: "You're hoping to move into a new industry. Talk me through why that change, and why you need an MBA to make it." },
  { s: "general", t: "Fit", src: "reported", q: "Tell us about the connections you've had with our current community or alumni." },
  { s: "general", t: "Career", src: "reported", q: "How did you conclude that your career plan was right for you?" },
  { s: "general", t: "Personal", src: "reported", q: "Tell me about your hobbies or side projects." },
  { s: "general", t: "Conflict", src: "reported", q: "Tell me about a time when you disagreed with senior management." },
  { s: "general", t: "Learning", src: "reported", q: "What is the best bit of advice you have received to date?" },
  { s: "general", t: "Personal", src: "reported", q: "What do you do outside of work?" },
  { s: "general", t: "Community", src: "reported", q: "How are you involved in your community?" },
  { s: "general", t: "Feedback", src: "reported", q: "Tell me about a time you gave feedback." },
  { s: "general", t: "Inclusion", src: "reported", q: "Tell me about a time when you helped diverse voices in the room feel more represented." },
  { s: "general", t: "Academic", src: "reported", q: "Why did you choose your undergraduate degree?" },
  { s: "general", t: "Differentiation", src: "reported", q: "What unique perspective will you bring to the class?" },
  { s: "general", t: "Values", src: "reported", q: "Tell me about a time you encountered something you felt was unjust, and what you did in response." },
  { s: "general", t: "Quant", src: "reported", q: "How are you prepared for the quantitative rigour of the programme?" },
  { s: "general", t: "Decision", src: "reported", q: "Where do we rank out of the schools you applied to? What would be the deciding factor if you got into all of them?" },
  { s: "general", t: "Goals", src: "reported", q: "What do you hope to be doing in 10 to 15 years?" },
  { s: "general", t: "Personal", src: "reported", q: "Tell me something that is not on your resume that you'd like me to know." },
  { s: "general", t: "Decision", src: "reported", q: "What would stop you from joining if admitted?" },
  { s: "general", t: "Initiative", src: "reported", q: "Tell me about a time when you proactively took on a project or responsibility that wasn't required." },
  { s: "general", t: "Planning", src: "reported", q: "How would you use the first month of school?" },
  { s: "general", t: "Personal", src: "reported", q: "What three words would your colleagues use to describe you?" },
  { s: "general", t: "Teamwork", src: "reported", q: "How would you describe an effective team?" },
  { s: "general", t: "Leadership", src: "reported", q: "What are the traits of an effective leader?" },
  { s: "general", t: "Role", src: "reported", q: "What does your role entail on a day-to-day basis?" },
  { s: "general", t: "Leadership", src: "reported", q: "How have you demonstrated leadership?" },
  { s: "general", t: "Culture", src: "reported", q: "Tell me about a time when you had to change cultures." },
  { s: "general", t: "Pitch", src: "reported", q: "How will you introduce yourself to your classmates, including your strengths and weaknesses?" },
  { s: "general", t: "Research", src: "reported", q: "Did you speak with current students? What did you learn, and what surprised you?" },

  // ---- The ones aimed at HER profile specifically
  { s: "general", t: "Your gap", src: "format", q: "You already work at a consulting firm. Why can't you do this at ZS? (This is the question that decides your candidacy. Ninety seconds, out loud, no notes.)" },
  { s: "general", t: "Your gap", src: "format", q: "Three years in analytics — give me a number. What changed because of work you did?" },
  { s: "general", t: "Your gap", src: "format", q: "Everything on your leadership record ended in 2023. What have you led since?" },
  { s: "general", t: "Your gap", src: "format", q: "You've never worked outside India. How do you know you'll thrive in a class where you're a minority in every way?" },
  { s: "general", t: "Your gap", src: "format", q: "You say you want to create change in India. Name the sector, the specific failure, and your mechanism." },
  { s: "general", t: "Your gap", src: "format", q: "You have four years of experience where our average is five and a half. Convince me you're ready now rather than in two years." },
  { s: "general", t: "Your gap", src: "format", q: "Your CGPA is 8.3. Talk me through your academic record." },
  { s: "general", t: "Your gap", src: "format", q: "You want to move from analytics to something creative. What evidence is there that you have judgement about taste, not just data?" }
];

/* ---------- ADVISOR KNOWLEDGE BASE -------------------------- */
const KB = [
  { k: ["late", "age", "too old", "26", "28", "29", "timing", "when should i apply", "wait"],
    q: "Am I too late / too old?",
    a: "No — and the maths says the opposite of what you fear. At 26 with four years you are *young* for INSEAD (avg 29), IESE (29), Judge (29) and far too young for IMD (31). At US two-year programmes you are comfortably in range. The real risk isn't being late, it's being under-evidenced.\n\nThe timing that actually matters: start a two-year US MBA in Aug 2028 and you're home at 33–35. Start a one-year European MBA in Aug 2027 and you're home at 31–32 with the loan cleared. Your own two lists — 'not late' and 'late' — resolve in favour of Europe, one year, starting 2027." },
  { k: ["loan", "repay", "debt", "afford", "money", "emi", "how long to repay"],
    q: "How long will the loan actually take to repay?",
    a: "It depends on the *tax jurisdiction you work in*, not the school.\n\n• Europe (London/Paris) on a €106k median: surplus ≈ ₹33–39L/yr → 3.5–4.5 years.\n• Dubai or Singapore, near-zero income tax: surplus ≈ ₹60–75L/yr → 2–2.5 years, and you're a four-hour flight from home.\n• US MBB at $267–285k total: surplus ≈ ₹1 Cr/yr → 2.5–3 years, but only if the H-1B lands.\n\nThis is the highest-leverage financial fact in your whole decision. INSEAD is the best-positioned school in the world for the Dubai/Singapore move, which is why it tops your list — not its FT rank." },
  { k: ["gre", "retake", "330", "335", "score", "test", "gmat"],
    q: "Should I retake the GRE to get above 330?",
    a: "No. Stop at 330.\n\nAcross all 22 schools, 330 → 335 moves your expected outcome by roughly one to two percentage points. Producing three quantified impact statements and one led initiative moves it five to eight. Your test score is not the binding constraint — for Indian applicants it almost never is above the 95th percentile.\n\nOne exception: if you're below 325, keep going. Your 8.3 CGPA needs the score to neutralise it, and quant should be 165+." },
  { k: ["why can't i do this at zs", "why mba", "consultant applying to consulting", "domain change"],
    q: "How do I answer 'why can't you do this at ZS?'",
    a: "This is the question that decides your candidacy, and 'better brand and placements' fails instantly.\n\nThe answer that works reframes it from a *job title* change to a *scope and domain* change: 'At ZS I produce the analytics that inform one function of one industry's commercial decisions. I want to own the whole decision, across industries — and specifically, I want the general-management toolkit to work on Indian healthcare access at a systems level, which is a problem I can already see in my data but cannot act on from where I sit.'\n\nThat's the structure. Now make it specific and true. Record yourself. If it takes more than ninety seconds, it isn't an answer yet." },
  { k: ["weakness", "what's wrong", "gaps", "improve", "fix"],
    q: "What are my biggest gaps?",
    a: "Six fixable, three structural.\n\nFixable by January: (1) no quantified impact anywhere — not one number; (2) zero post-college leadership, everything ends in 2023; (3) a vague India thesis that thousands of applicants write verbatim; (4) recommender risk from two people in the same delivery hierarchy; (5) an unrehearsed 'why MBA'; (6) no evidence of taste or creative judgement if you're pivoting that way.\n\nStructural: (7) international exposure ≈ 0 — the IBM line says 'United Kingdom · Remote' and no adcom counts that; (8) one firm, one function, one industry, one country; (9) ZS sits one band below MBB in employer tier." },
  { k: ["strength", "what's good", "advantage", "rare"],
    q: "What's actually rare about my profile?",
    a: "Three things, and they're all the same thing viewed from different angles:\n\n1. **Woman + non-engineer + statistics honours + life sciences.** That four-way intersection is genuinely scarce in the Indian pool, which is dominated by male engineers from IT services. Lead with the combination, never with 'I work at ZS.'\n2. **Healthcare/pharma domain depth.** Schools are structurally short of it and the Indian pool skews IT/engineering/BFSI.\n3. **Four languages including French.** Matters enormously at INSEAD (third language required to graduate) and HEC. Nowhere else, but those two are your top targets.\n\nEverything else on your CV — the boards, the promotion, the campus leadership — is strong but common." },
  { k: ["visa", "h1b", "h-1b", "stay back", "work permit", "opt", "graduate route"],
    q: "What are the visa realities in each country?",
    a: "• **US:** 12-month OPT, or 36 months if the MBA is STEM-designated (Booth, Kellogg, Columbia, MIT, Wharton majors, Haas, Cornell, Darden are; HBS and Stanford are not for the core MBA). H-1B lottery ≈ 25% per attempt, so STEM turns one shot into three. The $100k H-1B fee applies to petitions filed from *outside* the US — students already on F-1/OPT are exempt.\n• **UK:** Graduate Route drops from 2 years to 18 months for anyone graduating from 1 Jan 2027. Skilled Worker switch needs £33,400+ and B2 English from Jan 2026.\n• **France:** APS gives 12 months to job-hunt, then Passeport Talent at €33,924+.\n• **Italy:** *attesa occupazione*, 12 months, one-time.\n• **Switzerland:** non-EU quotas are among Europe's hardest. This is why IMD is risky for you.\n• **Singapore:** Employment Pass at S$5,000+/month. Clean and fast." },
  { k: ["marketing", "brand", "creative", "switch", "pivot", "not consulting", "something else"],
    q: "Can I actually switch out of consulting into something creative?",
    a: "Yes, and your background helps more than you think.\n\nThe most realistic creative pivots, ranked by how easy they'd be for you:\n1. **Brand & Marketing Management** — you already do pricing, segmentation and launch strategy for pharma. That IS brand management. Easiest switch, best schools: Kellogg, Ross, Fuqua.\n2. **Growth / Digital / D2C** — creative work scored in numbers, which suits how you think. Enormous India market.\n3. **Product Management** — statistics + commercial decisions is the raw material; the gap is that you've never shipped.\n4. **Luxury & Fashion** — the most exciting and the biggest leap. Needs Bocconi or HEC, and you must evidence taste before applying.\n\nRun the Path Finder — it scores all nine tracks against your actual answers rather than my guesses." },
  { k: ["essay", "write", "how to write", "essays"],
    q: "How should I approach the essays?",
    a: "Four rules, in order of impact:\n\n1. **Numbers or it didn't happen.** Every claim about your work needs a figure — client scale, revenue influenced, team size, percentage change.\n2. **Answer 'why now' before 'why us'.** Most Indian essays spend 80% on credentials and 20% on purpose. Invert it.\n3. **Name the India thesis.** One sector, one specific failure, one mechanism. 'Structural change' is worth zero.\n4. **Write the Stanford essay even if you never apply there.** 'What matters most to you, and why?' is the best writing exercise in MBA admissions and it will improve every other essay.\n\nThe Essays tab has the real 2026-27 prompts per school and a checker that flags the patterns that get applications rejected." },
  { k: ["interview", "prepare", "practice"],
    q: "How do I prepare for interviews?",
    a: "Build 12–15 stories in STAR form and reuse them. Almost every question in the Vault is a re-skin of: leadership, failure, conflict, influence without authority, teamwork, initiative, and 'why us'.\n\nSchool-specific formats you must prepare separately:\n• **LBS** — 5-minute impromptu presentation on a business news prompt.\n• **HEC** — YOU choose a 10-minute presentation topic. Blind interviewer, CV only.\n• **Wharton** — Team-Based Discussion with five other candidates.\n• **MIT** — behavioural only, relentless follow-ups. Know your stories to the third level of detail.\n• **Judge** — deliberately unconventional, outside your CV.\n• **IMD** — full assessment day with a group case.\n• **HBS** — 30 minutes, non-blind, plus a written reflection within 24 hours.\n\nUse the Practice tab. Answer out loud. Time yourself." },
  { k: ["scholarship", "funding", "money for", "aid", "free"],
    q: "Which scholarships should I actually apply for?",
    a: "In order of expected value for you:\n\n• **HEC Excellence & Diversity** — up to 50% of tuition, automatic consideration, apply in early rounds. Your best odds of real money.\n• **INSEAD Indian Alumni + Deepak & Sunita Gupta** — €25,000 each, Indian-specific, need-based.\n• **LBS Ajay Arora (£50,000)** and **India Scholarship (£35,000)** — one each per year, so competitive, but apply R1/R2.\n• **Oxford scholarships up to £40,000 + Skoll** — strong if your India-impact thesis is real.\n• **IMD BackPack–Excellence for Women** — CHF 133,500, full ride. One award. Long odds, enormous prize, and you fit the brief exactly.\n• **India-wide:** J.N. Tata Endowment (₹1–10L), Narotam Sekhsaria (₹22.5L interest-free), Aga Khan Foundation. Low effort, real money. Apply to all three.\n• **Forté Fellowship** wherever it exists.\n\nDo NOT spend time on Inlaks — it explicitly excludes management studies." },
  { k: ["visit", "campus", "when to visit", "trip"],
    q: "When should I visit campuses?",
    a: "September–November or January–April, when classes are in session and the admissions visit programme runs. Summer visits are worthless — no students, no classes.\n\nIf you make one trip, make it Europe: INSEAD Fontainebleau and LBS in one week, with Oxford and Cambridge as day trips from London. Register through each admissions office so the visit is logged in your file, sit in on a class, and have lunch with students — that lunch is where you learn whether you actually want the place.\n\nA US trip is only worth the money if you're seriously applying to four or more American schools." },
  { k: ["which school", "best school", "where should i go", "shortlist", "recommend"],
    q: "Which schools should I actually apply to?",
    a: "Apply to eight to ten. More than that and every application gets worse.\n\n**Tier 1 — all four:** INSEAD, London Business School, Oxford Saïd, Cambridge Judge. These are the only programmes that satisfy every constraint you wrote down.\n**Tier 2 — pick three:** Booth, Kellogg, Columbia (Yale and MIT as alternates). Real chances at 10–16%, all STEM-designated.\n**Tier 3 — one or two:** HEC Paris, IESE, ISB as hedges.\n**Skip:** Harvard and Stanford unless you have spare hours. IMD — you're two years too young.\n\nIf the creative pivot is real, add **Kellogg** (marketing #1), **SDA Bocconi** (luxury) and **NYU Stern** (luxury/media) and re-run the Schools tab weighted for your chosen track." },
  { k: ["round 1", "r1", "round 2", "r2", "when to apply", "deadline"],
    q: "Round 1 or Round 2?",
    a: "R1 deadlines are 24 Aug (Judge) to 29 Sep (MIT) — weeks away. R1 is only realistic if your GRE is already banked at 327+ AND you can produce quantified impact and two briefed recommenders in that window.\n\nWatch the calendar: INSEAD R2 for the Aug-2027 intake is 3 NOVEMBER 2026, not January — six weeks ahead of the US Round 2 wave. INSEAD R3 is 19 Jan 2027. Oxford requires a January (Stage 4) application to stay eligible for University of Oxford scholarships.\n\nOtherwise Round 2, early January 2027, for the US schools. R2 costs you roughly a quarter of your US odds and a large share of the scholarship pool — accept that trade rather than filing a rushed, weak R1. A bad R1 application is worse than no application, because most schools will not let you reapply in the same cycle.\n\nEurope is more forgiving: INSEAD, HEC and IMD run rolling rounds, and INSEAD has two intakes a year." },
  { k: ["one year", "two year", "1 year", "2 year", "internship"],
    q: "One-year or two-year programme?",
    a: "Two-year gives you a summer internship, which is the single biggest de-risking tool for a career switcher — consulting and banking recruit almost entirely from the internship pool at US schools. One-year programmes place 68% into the same industry; two-year programmes enable pivots for 73%.\n\nBut: two years costs you ₹1 crore more and two extra years away from home, which breaks the constraint you care most about.\n\nThe resolution: if you're switching to something genuinely different (luxury, media, product), the internship matters and you should weight two-year or a longer European programme like LBS at 15 months. If you're staying adjacent (consulting, healthcare, brand), one year is strictly better for you." },
  { k: ["india", "come back", "return", "family", "loved ones"],
    q: "How do I balance coming home against the loan?",
    a: "These are the two constraints that pull hardest against each other, and the answer is geographic, not emotional.\n\nWorking in Dubai or Singapore after the MBA does three things at once: it clears the loan in 2–2.5 years instead of 4, it puts you four hours from home instead of ten, and it keeps you in an MBB-tier role. INSEAD dominates Middle East and Singapore placement; LBS is strong in Dubai too.\n\nSo the plan that satisfies everything: 1-year Europe starting Aug 2027 → Dubai or Singapore MBB → home by 30–31, debt-free, with the brand and the network. Nothing else on the board does all of that." },
  { k: ["ranking", "ft", "which is better"],
    q: "How much should rankings matter to me?",
    a: "Less than you think, because the FT ranks for a global average applicant and you have specific constraints.\n\nThe FT 2026 order is MIT #1, INSEAD #2, Wharton #3, IESE and LBS #4, HEC #6. But in *India*, where you intend to build a career, the brand order is different: Harvard/Stanford/Wharton, then INSEAD/LBS/Oxford/Cambridge/MIT/Booth/Kellogg/Columbia, then ISB, then HEC/IESE/IMD/Bocconi.\n\nOxford and Cambridge are household names in India in a way HEC and Bocconi will never be, regardless of ranking. If you're returning home, weight India brand recognition over global rank — the Schools tab lets you do exactly that." },
  { k: ["recommender", "recommendation", "letter", "who should recommend"],
    q: "Who should write my recommendations?",
    a: "Not two people from the same delivery hierarchy — you'll get two letters about the same three projects.\n\nYou need: (1) a direct manager who can speak to delivery excellence with specifics and numbers, and (2) someone who can speak to leadership, initiative or judgement in a context you weren't paid to be in — a pro-bono client, a senior sponsor, someone from an initiative you started.\n\nBrief both in person with a one-page memo listing the exact stories you want told. Do not leave this to chance; a generic recommendation from a senior person is worth less than a specific one from a manager. Line up the second recommender now, because you may need to *create* the relationship first." },
  { k: ["what should i do now", "next step", "start", "first"],
    q: "What should I do this week?",
    a: "Three things, in this order:\n\n1. **Decide the geography.** Europe-primary or US-primary. Every essay, recommender briefing and campus visit depends on it. Do not write anything until this is settled.\n2. **Ask your manager where your June promotion sat against your cohort.** If it was early, that single sentence is worth more than anything else you can add this year.\n3. **Write down three quantified outcomes from your ZS work** — client scale, revenue influenced, decision changed. Get them signed off. This is the single most damaging gap in your profile and it takes an afternoon to start fixing.\n\nThen run the Path Finder, because whether you're targeting consulting or brand management changes the school list materially." }
];

/* ---------- PLAN / TIMELINE --------------------------------- */
const PLAN = [
  { date: "August 2026", hot: true, title: "Decide the geography. Then take the GRE.",
    items: ["Commit: Europe-primary or US-primary", "Sit the GRE by mid-September — target 330, stop at 330", "Ask your manager where your June promotion sat vs cohort", "Run the Path Finder and commit to a target function"] },
  { date: "Aug – Oct 2026", hot: true, title: "Manufacture the missing evidence.",
    items: ["Three quantified impact statements, manager-signed", "Start one named initiative you lead", "Ask to be staffed on a global or cross-office client", "Write a one-page India healthcare thesis: sector, failure, mechanism", "If pivoting creative: start a visible side project that evidences taste"] },
  { date: "24 Aug – 29 Sep 2026", hot: false, title: "Round 1 deadlines pass.",
    items: ["Judge 24 Aug · Oxford 2 Sep · Ross 8 Sep", "HBS, Wharton, Kellogg, Stanford, Columbia, Fuqua 9 Sep · Haas 10 Sep", "Yale, Stern, Booth, INSEAD 15 Sep · Cornell 17 Sep · MIT 29 Sep", "Apply only if the GRE is banked. A rushed R1 is worse than no R1."] },
  { date: "Sep – Nov 2026", hot: false, title: "Visit campuses. This is the window.",
    items: ["Only visit when classes are in session", "One trip: INSEAD + LBS in a week, Oxford & Cambridge as day trips", "Register through admissions so the visit is logged in your file", "Sit in on a class and have lunch with students"] },
  { date: "Oct – Dec 2026", hot: false, title: "Essays, recommenders, interview prep.",
    items: ["Brief both recommenders in person with a one-page memo", "Draft the 'why not ZS' answer out loud before writing any essay", "Write the Stanford 'what matters most' essay as an exercise", "Build 12–15 STAR stories in the Practice tab"] },
  { date: "Early January 2027", hot: true, title: "Round 2. Your real deadline.",
    items: ["File INSEAD, LBS, HEC, Oxford, Judge, IESE", "Add Booth, Kellogg, Columbia, Yale, MIT for US upside", "Apply for J.N. Tata, Sekhsaria and Forté in parallel"] },
  { date: "Feb – Apr 2027", hot: false, title: "Interviews, decisions, negotiation.",
    items: ["Prepare each format separately — they are not interchangeable", "European scholarship money is often negotiable against competing offers", "Ask. The worst answer is no."] },
  { date: "By April 2027", hot: true, title: "The decision gate.",
    items: ["Hold a Tier 1 offer → take it, start August 2027", "Only mid-tier with no money → decline, execute the profile list, apply R1 Sept 2027", "Attempt an MBB lateral in the interim year either way", "Do not accept a school you wouldn't be proud of at a price you'd resent"] }
];

/* ---------- SCORECARD --------------------------------------- */
const SCORECARD = [
  ["Academics", 7.0, "Near-perfect Class 12 boards and a hard honours degree, dragged by an 8.3/10 CGPA against class averages of 3.60–3.76. GRE 330 lifts this to 8.0."],
  ["Brand employer", 7.5, "ZS is respected and known. Not MBB, not Big-4 Strategy, not a bulge bracket. One band below the elite Indian pool."],
  ["Leadership", 6.0, "Deep, escalating, genuine — and entirely finished by 2023. No professional leadership artifact in three years."],
  ["Work experience", 6.5, "Three years, one firm, one function, one industry, one country. Depth without range."],
  ["Impact", 5.5, "No number anywhere in the profile. The lowest-hanging and most damaging gap."],
  ["Career progression", 7.0, "Associate → Associate Consultant in 2y10m is on-track at ZS, not accelerated. Rises to 8.5 if the promotion was early vs cohort."],
  ["Extracurriculars", 6.0, "Rich through 2023, dormant since. A three-year gap readers notice."],
  ["Community service", 6.0, "NSS 17 months, pro-bono consulting, UNICEF. Real, but undergraduate-era and unquantified."],
  ["International exposure", 3.5, "A remote internship listed under the UK. No overseas work, staffing or study. Weakest column, at the schools that weight it most."],
  ["Overall story", 6.0, "Currently reads as 'high achiever wants a better brand.' No specific answer to why the MBA is necessary or what changes in India."],
  ["Overall competitiveness", 6.4, "Strong interviews in the 10–20 band, denials at the top five. Reaches 8.0 with ten weeks of deliberate work."]
];

/* ---------- ESSAY CHECKER RULES ----------------------------- */
const ESSAY_RULES = [
  { id: "numbers", label: "Quantified impact", test: t => (t.match(/\d+\s?(%|percent|crore|lakh|lakhs|million|bn|billion|k\b|\$|₹|€|£)/gi) || []).length,
    good: n => n >= 3, msg: n => n >= 3 ? `${n} quantified claims — good.` : `Only ${n} numbers. Adcoms want three or more. Add client scale, revenue influenced, team size, or percentage change.` },
  { id: "cliche", label: "Clichés", test: t => (t.match(/\b(passionate about|synergy|think outside the box|leverage my|game.?changer|dynamic environment|fast.?paced|hit the ground running|at the end of the day|holistic|paradigm|bring to the table|make a difference|change the world|structural change|create impact)\b/gi) || []),
    good: a => a.length === 0, msg: a => a.length === 0 ? "No stock phrases detected." : `${a.length} cliché(s): ${[...new Set(a.map(x=>x.toLowerCase()))].slice(0,5).join(", ")}. Replace each with something only you could write.` },
  { id: "passive", label: "Passive voice", test: t => (t.match(/\b(was|were|been|being|is|are)\s+\w+(ed|en)\b/gi) || []),
    good: a => a.length <= 3, msg: a => a.length <= 3 ? `${a.length} passive constructions — fine.` : `${a.length} passive constructions. Adcoms read passive voice as distance from the work. Say "I built", not "was built by the team I was on".` },
  { id: "i", label: "Ownership", test: t => (t.match(/\bI\b/g) || []).length,
    good: n => n >= 5, msg: n => n >= 5 ? `${n} first-person claims — you're in the story.` : `Only ${n} uses of "I". This reads as a team report, not your application.` },
  { id: "why", label: "Why-this-school specificity", test: t => (t.match(/\b(professor|course|club|elective|centre|center|lab|trek|programme|program|initiative|chair|institute|fellowship)\b/gi) || []),
    good: a => a.length >= 2, msg: a => a.length >= 2 ? `${a.length} specific school references — good.` : `Only ${a.length} specific references to courses, professors, clubs or centres. Generic "why school" paragraphs are the most common reason strong essays fail.` },
  { id: "hedge", label: "Hedging", test: t => (t.match(/\b(I think|I believe|maybe|perhaps|sort of|kind of|hopefully|I feel like|somewhat|fairly|quite)\b/gi) || []),
    good: a => a.length <= 2, msg: a => a.length <= 2 ? "Confident tone." : `${a.length} hedging phrases. Cut them. "I believe I contributed" is weaker than "I contributed".` },
  { id: "sentlen", label: "Sentence length", test: t => { const s = t.split(/[.!?]+/).filter(x=>x.trim().length>3); const avg = s.length ? s.reduce((a,b)=>a+b.trim().split(/\s+/).length,0)/s.length : 0; return Math.round(avg); },
    good: n => n > 0 && n <= 24, msg: n => n === 0 ? "Nothing to measure yet." : n <= 24 ? `Average ${n} words per sentence — readable.` : `Average ${n} words per sentence. Too long. Adcoms read hundreds of these; break them up.` }
];

const DEFAULT_PROFILE = {
  name: "",
  age: 26, exp: 4, gre: 330, cgpa: 8.3,
  intake: "Aug 2027",
  track: "",
  weights: { brandIndia: 3, mbb: 2.5, speedS: 2, costS: 1.5, scholarship: 1.5, visaS: 2, network: 2.5, returnIndia: 3, intlExp: 2.5, odds: 1.5 }
};

const PRESETS = {
  balanced: { label: "My stated goals, balanced", w: { brandIndia: 3, mbb: 2.5, speedS: 2, costS: 1.5, scholarship: 1.5, visaS: 2, network: 2.5, returnIndia: 3, intlExp: 2.5, odds: 1.5 } },
  india31:  { label: "Home in India by 31–32",    w: { brandIndia: 3, mbb: 2, speedS: 4, costS: 2.5, scholarship: 2, visaS: 2, network: 1.5, returnIndia: 4, intlExp: 1.5, odds: 2 } },
  brand:    { label: "Maximum brand & network",   w: { brandIndia: 4, mbb: 3, speedS: 0.5, costS: 0.5, scholarship: 0.5, visaS: 1, network: 4, returnIndia: 1.5, intlExp: 3, odds: 0.5 } },
  mbb:      { label: "MBB / strategy placement",  w: { brandIndia: 1.5, mbb: 5, speedS: 1, costS: 1, scholarship: 1, visaS: 2, network: 2.5, returnIndia: 1, intlExp: 1.5, odds: 1.5 } },
  money:    { label: "Lowest financial risk",     w: { brandIndia: 1.5, mbb: 1, speedS: 2, costS: 4, scholarship: 3.5, visaS: 2.5, network: 1, returnIndia: 2, intlExp: 0.5, odds: 2 } },
  odds:     { label: "Best admission odds",       w: { brandIndia: 2, mbb: 1.5, speedS: 1, costS: 1, scholarship: 1, visaS: 1, network: 1.5, returnIndia: 1.5, intlExp: 1, odds: 5 } }
};

const GRE_CURVE = {
  // multiplier applied to base (330) odds
  320: 0.62, 325: 0.85, 327: 0.93, 330: 1.0, 332: 1.05, 335: 1.10
};
