/**
 * data.js — every piece of dummy data the County Green partner app runs on.
 *
 * There is no backend. Screens read from here through src/store.js, which keeps
 * an in-memory copy so new leads / visits / status changes persist while the
 * app is running. Restarting the app resets everything back to this file.
 */

// ---------------------------------------------------------------------------
// App / brand
// ---------------------------------------------------------------------------

export const app = {
  name: 'County Green',
  tagline: 'New Chandigarh',
  strapline: 'Home That Comes With More',
  subStrapline: 'First Township From North of Chandigarh',
  version: '1.0.4',
  demoOtp: '123456',
  supportEmail: 'partners@countygreen.in',
};

export const images = {
  splashBg: require('./assets/images/splash-bg.jpg'),
  heroEntrance: require('./assets/images/hero-entrance.jpg'),
  logoLockup: require('./assets/images/logo-lockup.png'),
  logoMark: require('./assets/images/logo-mark.png'),
  unitInterior: require('./assets/images/unit-interior.jpg'),
  gardenPath: require('./assets/images/garden-path.jpg'),
  aerialTownship: require('./assets/images/aerial-township.jpg'),
  aerialLake: require('./assets/images/aerial-lake.png'),
  villaEvening: require('./assets/images/villa-evening.jpg'),
  newsHero: require('./assets/images/news-hero.jpg'),
  gateDay: require('./assets/images/gate-day.jpg'),
  sportsAerial: require('./assets/images/sports-aerial.jpg'),
  newsTownship: require('./assets/images/news-township.png'),
  newsGarden: require('./assets/images/news-garden.png'),
  newsSports: require('./assets/images/news-sports.png'),
  newsGate: require('./assets/images/news-gate.png'),
  newsVillas: require('./assets/images/news-villas.png'),
};

// ---------------------------------------------------------------------------
// Signed-in partner
// ---------------------------------------------------------------------------

export const profile = {
  id: 'CP-001',
  name: 'Aman Gill',
  initials: 'AG',
  role: 'Channel Partner',
  verified: true,
  mobile: '+919000000001',
  email: 'aman.gill@example.com',
  city: 'Chandigarh',
  state: 'Punjab',
  memberSince: '06 Sept 2026',
  dashboardDate: '07 Sept 2026',
  company: 'Gill Channel Partners LLP',
  rera: 'RERA-PB-2026-091',
  experience: '5+ Years',
  stats: { leads: 6, visits: 5, registrations: 4 },
  coverImage: 'aerialTownship',
};

// ---------------------------------------------------------------------------
// Onboarding options
// ---------------------------------------------------------------------------

export const partnerTypes = [
  { id: 'channel-partner', label: 'Channel Partner', icon: 'Users' },
  { id: 'broker', label: 'Broker', icon: 'Briefcase' },
  { id: 'influencer', label: 'Influencer', icon: 'Sparkles' },
  { id: 'freelancer', label: 'Freelancer', icon: 'User' },
];

export const entityTypes = [
  'Proprietorship',
  'Partnership Firm',
  'LLP',
  'Private Limited Company',
  'Individual',
];

export const experienceOptions = [
  'Less than 1 year',
  '1 - 3 years',
  '3 - 5 years',
  '5 - 10 years',
  'More than 10 years',
];

export const employeeOptions = ['Yes', 'No', 'Prefer not to say'];

export const uploadDocs = [
  { id: 'coi', title: 'Certificate of Incorporation', note: 'For companies / LLPs', optional: true },
  { id: 'deed', title: 'Partnership Deed', note: 'Only for Partnership Firms', optional: true },
  { id: 'llp', title: 'LLP Registration Certificate', note: 'Only for LLP Entities', optional: true },
];

export const states = [
  'Punjab',
  'Haryana',
  'Chandigarh',
  'Himachal Pradesh',
  'Delhi',
  'Maharashtra',
  'Uttar Pradesh',
  'Rajasthan',
];

export const leadCategories = ['Residential', 'Commercial', 'Plot', 'Investment'];

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------

export const leads = [
  {
    id: 'LD-1001',
    name: 'Rajesh Kumar',
    initials: 'RK',
    project: 'County Green',
    configuration: '3 BHK',
    temperature: 'Hot',
    status: 'In Progress',
    source: 'Walk-in',
    followUp: '07 Sep 2026',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    address: 'Sector 22, Chandigarh',
    city: 'Chandigarh',
    state: 'Punjab',
    category: 'Residential',
    interest: {
      project: 'County Green',
      configuration: '3 BHK',
      budget: '₹1.5 - 2.0 Cr',
      preferredFloor: '10-15th',
      possession: 'Immediate',
      financing: 'Home Loan',
    },
    notes:
      'Client expressed key interest in pool-facing apartments on higher floors. Needs site visit coordination with spouse.',
    history: [
      { date: '24 Jul 2025', time: '11:30 AM', title: 'Lead Created', detail: 'Leads created by Aman Verma', by: 'Aman Verma', tone: 'done' },
      { date: '24 Jul 2025', time: '15:15 PM', title: 'Follow Up Call', detail: 'Spoke with lead, shared brochure', by: 'Aman Verma', tone: 'done' },
      { date: '26 Jul 2025', time: '09:00 AM', title: 'Site Visit Scheduled', detail: 'Scheduled for 26 Jul 2025', by: 'Neha Sharma', tone: 'done' },
      { date: '26 Jul 2025', time: '12:30 PM', title: 'Site Visit Completed', detail: 'Visited site, shown model unit', by: 'Neha Sharma', tone: 'done' },
      { date: '28 Jul 2025', time: '16:00 PM', title: 'Follow Up', detail: 'Requested time to discuss', by: 'Neha Sharma', tone: 'pending' },
    ],
  },
  {
    id: 'LD-1002',
    name: 'Priya Sharma',
    initials: 'PS',
    project: 'County Green',
    configuration: '4 BHK',
    temperature: 'Warm',
    status: 'In Progress',
    source: 'Referral',
    followUp: '08 Sep 2026',
    phone: '+91 87654 32109',
    email: 'priya.sharma@email.com',
    address: '14, Sector 9, Panchkula',
    city: 'Panchkula',
    state: 'Haryana',
    category: 'Residential',
    interest: {
      project: 'County Green',
      configuration: '4 BHK',
      budget: '₹3.5 - 4.2 Cr',
      preferredFloor: '5-10th',
      possession: 'Dec 2026',
      financing: 'Self Funded',
    },
    notes: 'Looking for a corner unit with garden view. Decision expected after family visit.',
    history: [
      { date: '02 Aug 2026', time: '10:10 AM', title: 'Lead Created', detail: 'Referred by existing partner', by: 'Aman Gill', tone: 'done' },
      { date: '04 Aug 2026', time: '18:40 PM', title: 'Follow Up Call', detail: 'Shared 4 BHK layout options', by: 'Aman Gill', tone: 'done' },
      { date: '08 Sep 2026', time: '11:00 AM', title: 'Follow Up', detail: 'Awaiting family availability', by: 'Aman Gill', tone: 'pending' },
    ],
  },
  {
    id: 'LD-1003',
    name: 'Amit Patel',
    initials: 'AP',
    project: 'County Green',
    configuration: 'Plot',
    temperature: 'Hot',
    status: 'Converted',
    source: 'Campaign',
    followUp: '09 Sep 2026',
    phone: '+91 99887 76655',
    email: 'amit.patel@email.com',
    address: 'Zirakpur, Mohali',
    city: 'Mohali',
    state: 'Punjab',
    category: 'Plot',
    interest: {
      project: 'County Green',
      configuration: 'Plot',
      budget: '₹1.1 - 1.4 Cr',
      preferredFloor: 'N/A',
      possession: 'Immediate',
      financing: 'Home Loan',
    },
    notes: 'Booking completed for a 300 sq.yd plot in Block C. Documentation under process.',
    history: [
      { date: '18 Jul 2026', time: '09:20 AM', title: 'Lead Created', detail: 'Campaign enquiry', by: 'Aman Gill', tone: 'done' },
      { date: '21 Jul 2026', time: '14:00 PM', title: 'Site Visit Completed', detail: 'Walked the plot block', by: 'Aman Gill', tone: 'done' },
      { date: '09 Sep 2026', time: '12:00 PM', title: 'Converted', detail: 'Booking amount received', by: 'Aman Gill', tone: 'done' },
    ],
  },
  {
    id: 'LD-1004',
    name: 'Sneha Desai',
    initials: 'SD',
    project: 'County Green',
    configuration: '2 BHK',
    temperature: 'Cold',
    status: 'In Progress',
    source: 'Website',
    followUp: '10 Sep 2026',
    phone: '+91 76543 21098',
    email: 'sneha.desai@email.com',
    address: 'Sector 70, Mohali',
    city: 'Mohali',
    state: 'Punjab',
    category: 'Residential',
    interest: {
      project: 'County Green',
      configuration: '2 BHK',
      budget: '₹85 L - 1.1 Cr',
      preferredFloor: '1-5th',
      possession: 'Dec 2026',
      financing: 'Home Loan',
    },
    notes: 'Price sensitive. Asked to be informed about launch-phase offers.',
    history: [
      { date: '28 Aug 2026', time: '17:05 PM', title: 'Lead Created', detail: 'Website enquiry form', by: 'Aman Gill', tone: 'done' },
      { date: '10 Sep 2026', time: '10:00 AM', title: 'Follow Up', detail: 'Share revised payment plan', by: 'Aman Gill', tone: 'pending' },
    ],
  },
  {
    id: 'LD-1005',
    name: 'Vikram Singh',
    initials: 'VS',
    project: 'County Green',
    configuration: 'Villa',
    temperature: 'Warm',
    status: 'In Progress',
    source: 'Walk-in',
    followUp: '11 Sep 2026',
    phone: '+91 90000 11111',
    email: 'vikram.singh@email.com',
    address: 'New Chandigarh',
    city: 'New Chandigarh',
    state: 'Punjab',
    category: 'Residential',
    interest: {
      project: 'County Green',
      configuration: 'Villa',
      budget: '₹3.8 - 4.2 Cr',
      preferredFloor: 'Ground',
      possession: 'Dec 2026',
      financing: 'Self Funded',
    },
    notes: 'Keen on the club house and green areas. Wants a second visit with his architect.',
    history: [
      { date: '15 Sep 2026', time: '15:45 PM', title: 'Site Visit Completed', detail: 'Villa mock-up walkthrough', by: 'Aman Gill', tone: 'done' },
      { date: '11 Sep 2026', time: '11:20 AM', title: 'Follow Up', detail: 'Architect visit to be scheduled', by: 'Aman Gill', tone: 'pending' },
    ],
  },
  {
    id: 'LD-1006',
    name: 'Meera Patel',
    initials: 'MP',
    project: 'County Green',
    configuration: '3 BHK + Study',
    temperature: 'Warm',
    status: 'Converted',
    source: 'Referral',
    followUp: '18 Sep 2026',
    phone: '+91 95555 22233',
    email: 'meera.patel@email.com',
    address: 'Sector 5, Panchkula',
    city: 'Panchkula',
    state: 'Haryana',
    category: 'Investment',
    interest: {
      project: 'County Green',
      configuration: '3 BHK + Study',
      budget: '₹2.8 - 3.2 Cr',
      preferredFloor: '3-8th',
      possession: 'Dec 2026',
      financing: 'Home Loan',
    },
    notes: 'Investment buyer. Booked Block A unit, looking at a second unit for family.',
    history: [
      { date: '10 Sep 2026', time: '10:15 AM', title: 'Lead Created', detail: 'Referred by Meera Patel', by: 'Aman Gill', tone: 'done' },
      { date: '18 Sep 2026', time: '10:15 AM', title: 'Converted', detail: 'Unit A-304 blocked', by: 'Aman Gill', tone: 'done' },
    ],
  },
];

export const leadStatuses = ['New', 'In Progress', 'Converted', 'Not Matured'];
export const leadTemperatures = ['Hot', 'Warm', 'Cold'];

// ---------------------------------------------------------------------------
// Project visits
// ---------------------------------------------------------------------------

export const visits = [
  {
    id: 'VS-2001',
    name: 'Arjun Malhotra',
    initials: 'AM',
    project: 'County Green',
    visitorType: 'Client',
    status: 'Attended',
    date: '31 Aug 2026',
    day: '31',
    month: 'AUG',
    time: '12:00 PM',
    mobile: '+91 90000 11111',
    email: 'arjun@example.com',
    address: 'Chandigarh, Punjab',
    site: 'County Green, New Chandigarh',
    bookedBy: 'You (Channel Partner)',
    notes: 'Client keen to see the sample layout, club house and green areas.',
    history: [
      { date: '30 Aug 2026 · 06:53 pm', title: 'Visit scheduled', detail: '12:00 PM', tone: 'gold' },
      { date: '31 Aug 2026 · 06:53 pm', title: 'Visit attended', detail: 'Walkthrough completed', tone: 'muted' },
    ],
  },
  {
    id: 'VS-2002',
    name: 'Priya Nair',
    initials: 'PN',
    project: 'County Green',
    visitorType: 'Client',
    status: 'In Progress',
    date: '07 Sep 2026',
    day: '07',
    month: 'SEP',
    time: '02:00 PM',
    mobile: '+91 93333 44455',
    email: 'priya.nair@example.com',
    address: 'Mohali, Punjab',
    site: 'County Green, New Chandigarh',
    bookedBy: 'You (Channel Partner)',
    notes: 'Wants to see 4 BHK sample flat and the sports facilities.',
    history: [{ date: '05 Sep 2026 · 04:10 pm', title: 'Visit scheduled', detail: '02:00 PM', tone: 'gold' }],
  },
  {
    id: 'VS-2003',
    name: 'Rahul Kapoor',
    initials: 'RK',
    project: 'County Green',
    visitorType: 'Client',
    status: 'In Progress',
    date: '06 Sep 2026',
    day: '06',
    month: 'SEP',
    time: '11:30 AM',
    mobile: '+91 98111 22233',
    email: 'rahul.kapoor@example.com',
    address: 'Panchkula, Haryana',
    site: 'County Green, New Chandigarh',
    bookedBy: 'You (Channel Partner)',
    notes: 'Repeat visit — bringing family this time.',
    history: [{ date: '04 Sep 2026 · 01:20 pm', title: 'Visit scheduled', detail: '11:30 AM', tone: 'gold' }],
  },
  {
    id: 'VS-2004',
    name: 'Sneha Sharma',
    initials: 'SS',
    project: 'County Green',
    visitorType: 'Investor',
    status: 'New',
    date: '12 Sep 2026',
    day: '12',
    month: 'SEP',
    time: '09:30 AM',
    mobile: '+91 97777 88899',
    email: 'sneha.sharma@example.com',
    address: 'New Delhi',
    site: 'County Green, New Chandigarh',
    bookedBy: 'You (Channel Partner)',
    notes: 'Investor enquiry — interested in block-level inventory and payment plans.',
    history: [{ date: '10 Sep 2026 · 09:00 am', title: 'Visit scheduled', detail: '09:30 AM', tone: 'gold' }],
  },
  {
    id: 'VS-2005',
    name: 'Vikram Singh',
    initials: 'VS',
    project: 'County Green',
    visitorType: 'Client',
    status: 'Attended',
    date: '15 Sep 2026',
    day: '15',
    month: 'SEP',
    time: '03:45 PM',
    mobile: '+91 90000 11111',
    email: 'vikram.singh@email.com',
    address: 'New Chandigarh',
    site: 'County Green, New Chandigarh',
    bookedBy: 'You (Channel Partner)',
    notes: 'Villa walkthrough done. Architect visit to be scheduled next.',
    history: [
      { date: '13 Sep 2026 · 11:00 am', title: 'Visit scheduled', detail: '03:45 PM', tone: 'gold' },
      { date: '15 Sep 2026 · 04:30 pm', title: 'Visit attended', detail: 'Villa walkthrough completed', tone: 'muted' },
    ],
  },
  {
    id: 'VS-2006',
    name: 'Meera Patel',
    initials: 'MP',
    project: 'County Green',
    visitorType: 'Client',
    status: 'In Progress',
    date: '18 Sep 2026',
    day: '18',
    month: 'SEP',
    time: '10:15 AM',
    mobile: '+91 95555 22233',
    email: 'meera.patel@email.com',
    address: 'Panchkula, Haryana',
    site: 'County Green, New Chandigarh',
    bookedBy: 'You (Channel Partner)',
    notes: 'Second unit discussion for family.',
    history: [{ date: '16 Sep 2026 · 05:00 pm', title: 'Visit scheduled', detail: '10:15 AM', tone: 'gold' }],
  },
];

export const visitStatuses = ['New', 'In Progress', 'Attended'];
export const visitorTypes = ['Client', 'Investor', 'Broker', 'Family'];
export const visitTimeSlots = [
  '09:30 AM',
  '10:15 AM',
  '11:30 AM',
  '12:00 PM',
  '02:00 PM',
  '03:45 PM',
  '05:00 PM',
];

// ---------------------------------------------------------------------------
// Registrations (channel partners / brokers / influencers signed up by you)
// ---------------------------------------------------------------------------

export const registrations = [
  {
    id: 'CG-REG-2026-0103',
    name: 'Neha Iyer',
    initials: 'NI',
    status: 'Pending',
    stage: 'Pending',
    category: 'Channel Partner',
    firm: 'Iyer Realty',
    project: 'County Green',
    registeredOn: '06 Sept 2026',
    date: '06 Sept 2026',
    phone: '+91 98765 43210',
    email: 'ayesha.khan@email.com',
    address: '12, Marine Drive, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    dob: '15 Mar 1990',
    anniversary: '22 Dec 2015',
    company: 'Khan Properties',
    rera: 'RERA-MH-2024-001',
    experience: '8 Years',
    registrationDate: '28 May 2024',
    accountStatus: 'Active',
  },
  {
    id: 'CG-REG-2026-0104',
    name: 'Rajesh Kumar',
    initials: 'RK',
    status: 'Approved',
    stage: 'Completed',
    category: 'Broker',
    firm: 'Kumar Associates',
    project: 'County Green',
    registeredOn: '04 Sept 2026',
    date: '04 Sept 2026',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    address: 'Sector 22, Chandigarh',
    city: 'Chandigarh',
    state: 'Punjab',
    pincode: '160022',
    dob: '02 Jan 1985',
    anniversary: '11 Nov 2010',
    company: 'Kumar Associates',
    rera: 'RERA-PB-2023-114',
    experience: '12 Years',
    registrationDate: '14 Mar 2023',
    accountStatus: 'Active',
  },
  {
    id: 'CG-REG-2026-0105',
    name: 'Priya Sharma',
    initials: 'PS',
    status: 'Pending',
    stage: 'Pending',
    category: 'Influencer',
    firm: 'Independent',
    project: 'County Green',
    registeredOn: '02 Sept 2026',
    date: '02 Sept 2026',
    phone: '+91 87654 32109',
    email: 'priya.sharma@email.com',
    address: '14, Sector 9, Panchkula',
    city: 'Panchkula',
    state: 'Haryana',
    pincode: '134109',
    dob: '19 Jun 1994',
    anniversary: '—',
    company: 'Independent',
    rera: '—',
    experience: '3 Years',
    registrationDate: '02 Sept 2026',
    accountStatus: 'Under Review',
  },
  {
    id: 'CG-REG-2026-0106',
    name: 'Amit Gupta',
    initials: 'AG',
    status: 'Approved',
    stage: 'Completed',
    category: 'Freelancer',
    firm: 'Gupta Consulting',
    project: 'County Green',
    registeredOn: '28 Aug 2026',
    date: '28 Aug 2026',
    phone: '+91 76543 21098',
    email: 'amit.gupta@email.com',
    address: 'Sector 70, Mohali',
    city: 'Mohali',
    state: 'Punjab',
    pincode: '160071',
    dob: '08 Sep 1988',
    anniversary: '04 Feb 2016',
    company: 'Gupta Consulting',
    rera: 'RERA-PB-2025-077',
    experience: '6 Years',
    registrationDate: '28 Aug 2026',
    accountStatus: 'Active',
  },
  {
    id: 'CG-REG-2026-0107',
    name: 'Simran Bedi',
    initials: 'SB',
    status: 'Approved',
    stage: 'Completed',
    category: 'Broker',
    firm: 'Bedi Estates',
    project: 'County Green',
    registeredOn: '21 Aug 2026',
    date: '21 Aug 2026',
    phone: '+91 93456 78123',
    email: 'simran.bedi@email.com',
    address: 'Sector 35, Chandigarh',
    city: 'Chandigarh',
    state: 'Chandigarh',
    pincode: '160035',
    dob: '30 Apr 1991',
    anniversary: '17 Dec 2018',
    company: 'Bedi Estates',
    rera: 'RERA-CH-2024-052',
    experience: '9 Years',
    registrationDate: '21 Aug 2026',
    accountStatus: 'Active',
  },
];

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------

export const project = {
  id: 'PR-001',
  name: 'County Green',
  location: 'New Chandigarh',
  tagline: 'Home That Comes With More',
  badge: 'Arriving Soon',
  heroImage: 'heroEntrance',
  totalUnits: 320,
  available: 48,
  priceRange: '₹1.8 - 4.2 Cr',
  overview:
    'County Green is a township arriving soon in New Chandigarh — a home that comes with more. Positioned as the first township from north of Chandigarh, it is designed to be close to the city, yet away from its chaos: optimum greenery, multiple water features and everyday moments thoughtfully designed.',
  rera: 'P51900028732',
  developer: 'County Green',
  projectType: 'Residential',
  possession: 'Dec 2026',
  totalTowers: '4 Towers',
  totalFloors: '32 Floors',
  configurations: [
    { id: '2bhk', name: '2 BHK', area: '850-1050 sq.ft', price: 'From ₹1.8 Cr' },
    { id: '3bhk', name: '3 BHK', area: '1200-1450 sq.ft', price: 'From ₹2.8 Cr' },
    { id: '4bhk', name: '4 BHK', area: '1800-2100 sq.ft', price: 'From ₹3.8 Cr' },
  ],
  amenities: [
    { id: 'pool', label: 'Pool', icon: 'GlassWater' },
    { id: 'gym', label: 'Gym', icon: 'Dumbbell' },
    { id: 'club', label: 'Club House', icon: 'Home' },
    { id: 'garden', label: 'Garden', icon: 'Leaf' },
    { id: 'parking', label: 'Parking', icon: 'Car' },
    { id: 'security', label: 'Security', icon: 'ShieldCheck' },
    { id: 'play', label: 'Playground', icon: 'ToyBrick' },
    { id: 'spa', label: 'Spa', icon: 'CircleX' },
  ],
};

// ---------------------------------------------------------------------------
// Inventory
// ---------------------------------------------------------------------------

const unitSpecs = {
  '2 BHK': { superArea: 1175, carpet: 845, balconies: 2, parking: '1 Covered' },
  '3 BHK + Study': { superArea: 1890, carpet: 1360, balconies: 3, parking: '2 Covered' },
  '4 BHK': { superArea: 2450, carpet: 1760, balconies: 4, parking: '2 Covered' },
};

const facings = ['East', 'West', 'North', 'South', 'North-East', 'South-West'];

// Repeats across the 54 units so the grid reads like the Figma: a studied
// 3 BHK first, pairs of 2 BHKs, a 4 BHK on alternating floors.
const CONFIG_CYCLE = ['3 BHK + Study', '2 BHK', '2 BHK', '4 BHK', '2 BHK', '2 BHK'];

// 26 of the 54 units are available, matching the inventory header in the design.
const UNAVAILABLE = new Set([
  3, 6, 8, 11, 14, 16, 19, 21, 24, 26, 29, 31, 34, 36,
  39, 41, 44, 46, 48, 49, 50, 51, 52, 53, 54, 45, 42, 38,
]);

function buildInventory() {
  const list = [];
  const blocks = ['A', 'B', 'C'];
  let n = 0;
  blocks.forEach((block) => {
    for (let floor = 1; floor <= 9; floor += 1) {
      for (let i = 0; i < 2; i += 1) {
        const config = CONFIG_CYCLE[n % CONFIG_CYCLE.length];
        const spec = unitSpecs[config];
        const area = config === '2 BHK' ? (floor % 2 === 1 ? 1175 : 1190) : spec.superArea;
        n += 1;
        list.push({
          id: `${block}-${floor}0${i + 1}`,
          block: `Block ${block}`,
          blockKey: block,
          floor,
          floorLabel: `${floor}${floor === 1 ? 'st' : floor === 2 ? 'nd' : floor === 3 ? 'rd' : 'th'} Floor`,
          config,
          superArea: area,
          carpetArea: spec.carpet,
          balconies: spec.balconies,
          parking: spec.parking,
          facing: facings[n % facings.length],
          status: UNAVAILABLE.has(n) ? (n % 3 === 0 ? 'Booked' : 'Blocked') : 'Available',
          price: config === '2 BHK' ? '₹1.8 Cr' : config === '4 BHK' ? '₹3.9 Cr' : '₹2.9 Cr',
        });
      }
    }
  });
  return list;
}

export const inventory = buildInventory();

export const inventoryBlocks = ['All', 'Block A', 'Block B', 'Block C'];

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

export const documents = [
  { id: 'doc-1', title: 'Project Brochure', size: '8.4 MB', updated: '03 Sept 2026', tag: 'Marketing', category: 'Marketing', type: 'PDF' },
  { id: 'doc-2', title: 'Master Layout Plan', size: '4.1 MB', updated: '31 Aug 2026', tag: 'Technical', category: 'Legal', type: 'PDF' },
  { id: 'doc-3', title: 'Price List (Placeholder)', size: '1.2 MB', updated: '28 Aug 2026', tag: 'Pricing', category: 'Pricing', type: 'PDF' },
  { id: 'doc-4', title: 'Site Map & Amenities', size: '3.8 MB', updated: '25 Aug 2026', tag: 'Planning', category: 'Marketing', type: 'PDF' },
  { id: 'doc-5', title: 'Payment Schedule', size: '2.5 MB', updated: '20 Aug 2026', tag: 'Finance', category: 'Pricing', type: 'PDF' },
  { id: 'doc-6', title: 'Floor Plans - Tower A', size: '6.2 MB', updated: '15 Aug 2026', tag: 'Technical', category: 'Legal', type: 'PDF' },
  { id: 'doc-7', title: 'RERA Certificate', size: '0.9 MB', updated: '10 Aug 2026', tag: 'Legal', category: 'Legal', type: 'PDF' },
  { id: 'doc-8', title: 'Partner Commission Kit', size: '1.8 MB', updated: '05 Aug 2026', tag: 'Marketing', category: 'Marketing', type: 'PDF' },
];

export const documentCategories = ['All', 'Marketing', 'Pricing', 'Legal'];

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export const news = [
  {
    id: 'nw-1',
    title: 'County Green Arriving Soon in New Chandigarh',
    category: 'Project Updates',
    date: '05 Sept 2026',
    readTime: '2 min read',
    author: 'County Green Sales',
    image: 'gateDay',
    detailImage: 'newsHero',
    featured: true,
    excerpt:
      'County Green, positioned as the first township from north of Chandigarh, is arriving soon. Partners can begin registering interest and scheduling project visits through the app.',
    body: [
      'County Green, positioned as the first township from north of Chandigarh, is arriving soon. Partners can begin registering interest and scheduling project visits through the app.',
      'The township is designed to be close to the city, away from its chaos — with optimum greenery, multiple water features and round-the-clock security.',
      'Detailed configurations, pricing and possession timelines will be shared with partners as they are announced.',
    ],
  },
  {
    id: 'nw-2',
    title: 'A Township Built for Young Champions',
    category: 'Announcements',
    date: '03 Sept 2026',
    readTime: '3 min read',
    author: 'County Green Sales',
    image: 'newsGarden',
    excerpt: 'Dedicated academies, coaching lawns and practice courts designed around the next generation.',
    body: [
      'County Green is being planned around families — and in particular, around the children growing up in them.',
      'Dedicated academies, coaching lawns and practice courts sit within walking distance of every block, so that structured sport is part of everyday life rather than a weekend commute.',
      'Partners can request the sports masterplan sheet from the Documents section.',
    ],
  },
  {
    id: 'nw-3',
    title: 'Everyday Moments, Thoughtfully Designed',
    category: 'Marketing',
    date: '01 Sept 2026',
    readTime: '2 min read',
    author: 'County Green Marketing',
    image: 'newsSports',
    excerpt: 'Water features, shaded walkways and courtyards sized for the way people actually use them.',
    body: [
      'Every landscaped pocket at County Green has been sized for the way people actually use it — a short morning walk, an evening on a bench, a place for children to gather after school.',
      'Water features and shaded walkways run through the township, keeping the common areas usable through the Punjab summer.',
    ],
  },
  {
    id: 'nw-4',
    title: 'World-Class Sports Facilities',
    category: 'Project Updates',
    date: '01 Sept 2026',
    readTime: '2 min read',
    author: 'County Green Sales',
    image: 'aerialLake',
    excerpt: 'Tennis, basketball and a full-size lap pool join the club house plan.',
    body: [
      'The club house plan has been expanded to include tennis and basketball courts alongside a full-size lap pool.',
      'Construction on the sports block is scheduled to begin alongside Tower B.',
    ],
  },
  {
    id: 'nw-5',
    title: 'Green Living Festival Coming This Fall',
    category: 'Events',
    date: '28 Aug 2026',
    readTime: '1 min read',
    author: 'County Green Events',
    image: 'newsVillas',
    excerpt: 'A weekend of workshops, markets and site walkthroughs for partners and their clients.',
    body: [
      'County Green will host a Green Living Festival this fall — a weekend of workshops, farmers markets and guided site walkthroughs.',
      'Channel partners can register up to ten clients each. Registration opens through the app next month.',
    ],
  },
  {
    id: 'nw-6',
    title: 'Luxury Living Redefined at County Green',
    category: 'Lifestyle',
    date: '25 Aug 2026',
    readTime: '3 min read',
    author: 'County Green Marketing',
    image: 'aerialLake',
    excerpt: 'Inside the material palette, the arrival court and the specification sheet behind the township.',
    body: [
      'The arrival court sets the tone for the township — a landscaped forecourt, a covered drop-off and a material palette of stone, timber and brushed metal.',
      'The full specification sheet is available to partners under Documents.',
    ],
  },
  {
    id: 'nw-7',
    title: 'Meet Your Neighbors Weekend Event',
    category: 'Community',
    date: '20 Aug 2026',
    readTime: '1 min read',
    author: 'County Green Community',
    image: 'newsVillas',
    excerpt: 'An informal evening for booked buyers to meet the people they will be living beside.',
    body: [
      'An informal evening for booked buyers to meet the people they will be living beside, hosted at the experience centre.',
      'Partners accompanying their clients are welcome.',
    ],
  },
];

export const newsCategories = ['All', 'Project Updates', 'Announcements', 'Marketing', 'Events'];

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export const notifications = [
  { id: 'nt-1', group: 'Today', title: 'Flexi Payment Plan', body: 'Pay 20% now and the rest as per your convenience. Limited time offer. Avail now!', time: '10:30 AM', unread: true },
  { id: 'nt-2', group: 'Today', title: 'Special Offer for You!', body: 'Zero floor rise charges on select units. Explore the offer now!', time: '9:15 AM', unread: true },
  { id: 'nt-3', group: 'Today', title: 'New Lead Assigned', body: 'A new lead has been assigned to you. Check details in Leads section.', time: '8:05 AM', unread: true },
  { id: 'nt-4', group: 'Yesterday', title: 'Quarterly MIS Report', body: 'Your MIS report for Q1 Apr - Jun 2025 is now available.', time: '6:30 PM', unread: false },
  { id: 'nt-5', group: 'Yesterday', title: 'New Project Launch', body: 'Introducing Meraqui Downtown - Premium Residences in the Heart of the City.', time: '4:20 PM', unread: false },
  { id: 'nt-6', group: 'Earlier', title: 'News Update', body: 'Construction update: Meraqui Greens - Tower B reaches 12th floor.', time: '25 Jul, 11:45 AM', unread: false },
  { id: 'nt-7', group: 'Earlier', title: 'System Notification', body: 'Scheduled maintenance will be performed on 27 Jul 2025 from 1:00 AM to 3:00 AM.', time: '24 Jul, 7:30 PM', unread: false },
];

// ---------------------------------------------------------------------------
// MIS report
// ---------------------------------------------------------------------------

export const mis = {
  asOf: '26 May 2024, 08:30 AM',
  date: '26 May 2024',
  ranges: ['Daily', 'Weekly', 'Monthly', 'Custom'],
  tiles: [
    { id: 'visits', value: '56', label: 'Total Visits', delta: '↑ 12% vs yesterday' },
    { id: 'attended', value: '28', label: 'Attended Visits', delta: '↑ 15% vs yesterday' },
    { id: 'regs', value: '18', label: 'New Registrations', delta: '↑ 8% vs yesterday' },
    { id: 'leads', value: '34', label: 'New Leads', delta: '↑ 6% vs yesterday' },
  ],
  conversion: [
    { id: 'lead', label: 'Lead\nConversion', value: 33, color: 'gold' },
    { id: 'visit', label: 'Visits\nAttended', value: 60, color: 'sage' },
  ],
  leadsSummary: [
    { label: 'In Progress', value: 3, max: 6, color: 'gold' },
    { label: 'Converted', value: 2, max: 6, color: 'primary' },
    { label: 'Not Matured', value: 1, max: 6, color: 'brown' },
  ],
  visitsSummary: [
    { label: 'Attended', value: 3, max: 5, color: 'primary' },
    { label: 'In Progress', value: 2, max: 5, color: 'gold' },
  ],
  registrationsByCategory: [
    { label: 'Influencer', value: 1, max: 5, color: 'primary' },
    { label: 'Broker', value: 2, max: 5, color: 'gold' },
    { label: 'Channel Partner', value: 1, max: 5, color: 'goldLight' },
    { label: 'Freelancer', value: 1, max: 5, color: 'sage' },
  ],
  footerLeft: 'Pending 3',
  footerRight: 'Completed 2',
};

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const about = {
  eyebrow: 'New Chandigarh',
  title: 'Home That Comes With More',
  subtitle: 'Arriving Soon · New Chandigarh',
  heroImage: 'gardenPath',
  heroCaption: 'Close to the city,\naway from its chaos',
  philosophyTitle: 'The Philosophy of County Green',
  philosophy:
    'County Green is envisioned as a sanctuary of premium living. Spanned across acres of untouched rolling flora in New Chandigarh, it brings you a unique balance of high-end design, urban connectivity, and pristine peaceful spaces.',
  stats: [
    { value: '80%', label: 'Open Green Area' },
    { value: '15 Mins', label: 'To Chandigarh City' },
  ],
  highlights: [
    { title: 'Optimum Greenery', body: 'Eighty percent of the township is open green area, planned around existing flora rather than cleared for it.' },
    { title: 'Water Features', body: 'Multiple water bodies run through the township, cooling the common areas and shaping the walkways.' },
    { title: 'Everyday Moments', body: 'Courtyards, benches and shaded paths sized for the way residents actually use them.' },
    { title: 'Round-the-Clock Security', body: 'A single controlled arrival court, perimeter surveillance and on-ground security teams.' },
  ],
  contact: {
    address: 'County Green Experience Centre, New Chandigarh, Punjab 140901',
    phone: '+91 98765 00000',
    email: 'partners@countygreen.in',
  },
};

// ---------------------------------------------------------------------------
// Terms & Conditions
// ---------------------------------------------------------------------------

export const terms = {
  lastUpdated: '01 Jun 2026',
  intro:
    'Please read these terms and conditions carefully before using the County Green partner app and services.',
  sections: [
    {
      title: '1. Introduction',
      body: 'Welcome to the County Green Channel Partner application. By accessing or using the app, you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree, please do not use the application. [Placeholder — replace with County Green legal copy.]',
    },
    {
      title: '2. Channel Partner Eligibility',
      body: 'Registration as a channel partner is subject to verification of identity, company and RERA documentation submitted through the app. County Green reserves the right to approve, hold or decline applications.',
    },
    {
      title: '3. Leads & Registrations',
      body: "Leads, registrations and project visits recorded through the app are governed by County Green's partner policy. Attribution is based on first valid registration and may be subject to verification.",
    },
    {
      title: '4. Project Information',
      body: 'Project details, configurations, pricing and inventory shown in the app are indicative and subject to change without notice. Please refer to official project documents for confirmed information.',
    },
    {
      title: '5. Data & Privacy',
      body: "Personal information collected is used solely to operate the partner programme and is handled in accordance with County Green's privacy policy.",
    },
    {
      title: '6. Changes to Terms',
      body: 'County Green may update these terms from time to time. Continued use of the application constitutes acceptance of the revised terms.',
    },
  ],
  footer: 'For questions about these terms, contact the County Green partner desk.',
};

// ---------------------------------------------------------------------------
// Home dashboard
// ---------------------------------------------------------------------------

export const homeBanners = [
  { id: 'b1', badge: 'New Chandigarh', title: 'County Green · Arriving Soon', subtitle: 'Home That Comes With More', image: 'heroEntrance' },
  { id: 'b2', badge: 'Amenities', title: 'World-Class Sports Facilities', subtitle: 'Tennis, basketball and a lap pool', image: 'sportsAerial' },
  { id: 'b3', badge: 'Lifestyle', title: '80% Open Green Area', subtitle: 'Close to the city, away from its chaos', image: 'aerialLake' },
];

export default {
  app,
  images,
  profile,
  partnerTypes,
  entityTypes,
  experienceOptions,
  employeeOptions,
  uploadDocs,
  states,
  leadCategories,
  leads,
  leadStatuses,
  leadTemperatures,
  visits,
  visitStatuses,
  visitorTypes,
  visitTimeSlots,
  registrations,
  project,
  inventory,
  inventoryBlocks,
  documents,
  documentCategories,
  news,
  newsCategories,
  notifications,
  mis,
  about,
  terms,
  homeBanners,
};
