// ===================== COUNTRY → FLOW MAPPING =====================
const COUNTRIES = [
  { name: "Thailand", flag: "\u{1F1F9}\u{1F1ED}", flow: 1, rank: 2, popular: true },
  { name: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}", flow: 1, rank: 7, popular: true },
  { name: "Indonesia", flag: "\u{1F1EE}\u{1F1E9}", flow: 1, rank: 6, popular: true },
  { name: "UAE / Dubai", flag: "\u{1F1E6}\u{1F1EA}", flow: 2, rank: 8, popular: true },
  { name: "Singapore", flag: "\u{1F1F8}\u{1F1EC}", flow: 3, rank: 9, popular: true },
  { name: "Japan", flag: "\u{1F1EF}\u{1F1F5}", flow: 3, rank: 10, popular: true },
  { name: "South Korea", flag: "\u{1F1F0}\u{1F1F7}", flow: 3, rank: 13, popular: true },
  { name: "France", flag: "\u{1F1EB}\u{1F1F7}", flow: 4, rank: 4, popular: true },
  { name: "Greece", flag: "\u{1F1EC}\u{1F1F7}", flow: 4, rank: 1, popular: true },
  { name: "Germany", flag: "\u{1F1E9}\u{1F1EA}", flow: 4, rank: 3, popular: true },
  { name: "Sri Lanka", flag: "\u{1F1F1}\u{1F1F0}", flow: 1, rank: 11 },
  { name: "Malaysia", flag: "\u{1F1F2}\u{1F1FE}", flow: 1, rank: 12 },
  { name: "Cambodia", flag: "\u{1F1F0}\u{1F1ED}", flow: 1, rank: 23 },
  { name: "Hong Kong", flag: "\u{1F1ED}\u{1F1F0}", flow: 1, rank: 14 },
  { name: "Laos", flag: "\u{1F1F1}\u{1F1E6}", flow: 1, rank: 24 },
  { name: "New Zealand", flag: "\u{1F1F3}\u{1F1FF}", flow: 2, rank: 18 },
  { name: "Turkey", flag: "\u{1F1F9}\u{1F1F7}", flow: 2, rank: 17 },
  { name: "Azerbaijan", flag: "\u{1F1E6}\u{1F1FF}", flow: 2, rank: 16 },
  { name: "Kenya", flag: "\u{1F1F0}\u{1F1EA}", flow: 2, rank: 27 },
  { name: "Morocco", flag: "\u{1F1F2}\u{1F1E6}", flow: 2, rank: 30 },
  { name: "Georgia", flag: "\u{1F1EC}\u{1F1EA}", flow: 2, rank: 19 },
  { name: "Australia", flag: "\u{1F1E6}\u{1F1FA}", flow: 3, rank: 15 },
  { name: "Russia", flag: "\u{1F1F7}\u{1F1FA}", flow: 3, rank: 20 },
  { name: "Austria", flag: "\u{1F1E6}\u{1F1F9}", flow: 4, rank: 5 },
  { name: "Italy", flag: "\u{1F1EE}\u{1F1F9}", flow: 4, rank: 40 },
  { name: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", flow: 4, rank: 41 },
  { name: "Switzerland", flag: "\u{1F1E8}\u{1F1ED}", flow: 4, rank: 42 },
  { name: "Netherlands", flag: "\u{1F1F3}\u{1F1F1}", flow: 4, rank: 43 },
  { name: "Spain", flag: "\u{1F1EA}\u{1F1F8}", flow: 4, rank: 44 },
  { name: "United States", flag: "\u{1F1FA}\u{1F1F8}", flow: 4, rank: 45, popular: true },
  { name: "Armenia", flag: "\u{1F1E6}\u{1F1F2}", flow: 2, rank: 38 },
  { name: "Ethiopia", flag: "\u{1F1EA}\u{1F1F9}", flow: 2, rank: 39 },
];

// ===================== PLANNING ITEMS (per flow, randomized at render) =====================
const PLANNING_ITEMS = {
  1: ["Book flights", "Book hotels", "Research visa requirements", "Start applying for the visa", "Plan the itinerary for each day"],
  2: ["Book flights", "Book hotels", "Research visa requirements", "Start applying for the visa", "Plan the itinerary for each day", "Coordinate with friends"],
  3: ["Book flights", "Book hotels", "Research visa requirements", "Gather documents", "Start applying for the visa", "Plan the itinerary for each day"],
  4: ["Book flights", "Book hotels", "Research visa requirements", "Prepare all documents", "Start applying for the visa", "Plan the itinerary for each day", "Look for the earliest appointment date"]
};

// ===================== FIRST MOVE (same across all flows) =====================
const FIRST_MOVE_OPTIONS = [
  { id: "google", icon: "\u{1F50D}", label: "Google \"{country} visa for Indians\"" },
  { id: "friend", icon: "\u{1F4AC}", label: "Ask someone who's been to {country}" },
  { id: "agent", icon: "\u{1F4DE}", label: "Check with a travel agent" },
  { id: "official", icon: "\u{1F3DB}", label: "Go to the embassy or official visa website" },
  { id: "app", icon: "\u{1F4F1}", label: "Check an app (Atlys, MakeMyTrip, etc.)" },
  { id: "youtube", icon: "\u{25B6}\u{FE0F}", label: "Watch a YouTube video about the process" },
  { id: "later", icon: "\u{1F937}", label: "Assume I can figure it out later" }
];

// ===================== AGENT CARDS v3 — FINAL =====================
// Each agent: promise (headline), claim (description), gets (array), donts (array), price, time, play, color
const AGENTS = {
  1: [ // Thailand (visa-free)
    { id:"rocket", name:"Rocket Singh", icon:"\u26A1", promise:"{country} is visa-free. TDAC for \u20B9500.", claim:"Cheapest. I fill the TDAC form. That's it.", gets:["TDAC form completed","Confirmation emailed","Immigration tips"], donts:["Slowest (7 days)","No travel guidance","No support if something goes wrong"], price:"\u20B9500", time:"7 days", play:"price", color:"#FEE2E2" },
    { id:"yoda", name:"Yoda", icon:"\u{1F9D9}", promise:"{country} rules changed in 2026. I'll explain what you actually need.", claim:"I clarify the confusing stuff. You'll know exactly what to do at immigration.", gets:["I clarify: TDAC, VOA, or e-visa for YOUR trip","Document check before travel","WhatsApp for questions"], donts:["I don't do it for you \u2014 I guide you","No trip planning"], price:"\u20B91,500", time:"1 day", play:"guidance", color:"#E0F2FE" },
    { id:"sharma", name:"Sharma Ji", icon:"\u{1F468}\u200D\u{1F4BC}", promise:"Come to my office. I'll explain {country} and do the TDAC.", claim:"20 years doing visas. Face-to-face. I sit with you and explain everything.", gets:["Face-to-face explanation","TDAC done + printed airport checklist","Call me anytime"], donts:["Need to visit office","No online tracking"], price:"\u20B91,500", time:"Same day", play:"relationship", color:"#F3F0EB" },
    { id:"shield", name:"Captain Shield", icon:"\u{1F6E1}\uFE0F", promise:"If anything goes wrong at immigration, I'm one call away. \u20B915,000 trip cover.", claim:"Travel worry-free. If there's any issue at arrival, call me. I'll help resolve it.", gets:["TDAC prepared","24/7 phone support at immigration","\u20B915,000 trip compensation if turned away"], donts:["Not the cheapest","No trip planning"], price:"\u20B92,000", time:"1 day", play:"guarantee", color:"#EDE9FE" },
    { id:"jarvis", name:"Jarvis", icon:"\u2728", promise:"Send passport photo. I handle TDAC and everything. Done.", claim:"Zero effort from you. I do all forms and email you a ready-to-go travel pack.", gets:["Zero effort from you","TDAC + all forms done","Travel pack emailed"], donts:["Not the cheapest","No trip planning"], price:"\u20B92,500", time:"Same day", play:"convenience", color:"#FFF7ED" },
    { id:"gatsby", name:"Gatsby", icon:"\u{1F37E}", promise:"{country} trip planned. TDAC + flights + hotels. Cancel anytime.", claim:"One payment. Flights, hotels, TDAC, insurance. Plans change? Full refund.", gets:["Refundable flights + hotels","TDAC + insurance handled","Cancel everything free"], donts:["Most expensive for a free visa"], price:"\u20B96,000", time:"2-3 days", play:"premium", color:"#FEF3C7" }
  ],
  2: [ // Dubai (standard e-visa)
    { id:"rocket", name:"Rocket Singh", icon:"\u26A1", promise:"Cheapest {country} visa. All fees included.", claim:"Lowest price. I submit your application. Visa emailed. That's it.", gets:["Complete visa processing","All government fees included","Visa emailed","Track status online"], donts:["Not the fastest (3-5 days, not 24hr)","No WhatsApp support","No document help","No timing guarantee"], price:"\u20B97,000", time:"3-5 days", play:"price", color:"#FEE2E2" },
    { id:"yoda", name:"Yoda", icon:"\u{1F9D9}", promise:"{country} visa? I check everything so nothing goes wrong.", claim:"I verify photo, passport, form details. WhatsApp me any question.", gets:["Photo verified (size, background)","Passport scan quality checked","Form reviewed before submission","WhatsApp \u2014 ask me anything"], donts:["Not the cheapest","Not the fastest","No timing guarantee"], price:"\u20B98,500", time:"2 days", play:"guidance", color:"#E0F2FE" },
    { id:"sharma", name:"Sharma Ji", icon:"\u{1F468}\u200D\u{1F4BC}", promise:"WhatsApp me your passport photo. Pay when visa is ready.", claim:"Hundreds of {country} visas done. WhatsApp me. Pay only when you get it.", gets:["Just WhatsApp \u2014 no app needed","I handle everything","Pay when visa is ready (not upfront)","Call me anytime"], donts:["Not the fastest (2-3 days)","No online tracking","No formal guarantee"], price:"\u20B98,000", time:"2-3 days", play:"relationship", color:"#F3F0EB" },
    { id:"shield", name:"Captain Shield", icon:"\u{1F6E1}\uFE0F", promise:"Visa guaranteed before your flight. Late by 1 hour? I pay you back.", claim:"On-time guarantee. Late = full refund + \u20B95,000 trip compensation.", gets:["On-time delivery guarantee","Full refund if late (even by 1 hour)","\u20B95,000 trip compensation if delayed","24/7 phone \u2014 real person","Free re-submission if any issue"], donts:["Not the cheapest","Not the fastest (2 days, not 24hr)","No trip planning"], price:"\u20B99,000", time:"2 days", play:"guarantee", color:"#EDE9FE" },
    { id:"jarvis", name:"Jarvis", icon:"\u2728", promise:"Send passport photo. Visa in inbox. That's your only job.", claim:"Zero forms. I handle complete application. 24-hour processing.", gets:["Zero forms to fill","I handle complete application","24-hour processing \u2014 fastest option","WhatsApp updates"], donts:["Not the cheapest (\u20B92,500 more than Rocket)","No timing guarantee","No trip planning"], price:"\u20B99,500", time:"24 hours", play:"convenience", color:"#FFF7ED" },
    { id:"gatsby", name:"Gatsby", icon:"\u{1F37E}", promise:"Visa + flights + hotel. Plans change? Cancel everything free.", claim:"One payment covers visa, refundable flights, hotel, insurance. Cancel anytime.", gets:["Visa processing","Refundable flight booking","Refundable hotel booking","Travel insurance","Cancel anything, full refund"], donts:["Most expensive (2x Rocket Singh)","Not the fastest (2 days)"], price:"\u20B914,000", time:"2 days", play:"premium", color:"#FEF3C7" }
  ],
  3: [ // South Korea (sticker visa)
    { id:"rocket", name:"Rocket Singh", icon:"\u26A1", promise:"{country} visa. Lowest price. I submit, you wait.", claim:"Basic service, honest price. Passport goes in, visa comes back.", gets:["Application prep + embassy submission","All fees included","Email when passport is ready"], donts:["No document guidance","No passport tracking (only status-change emails)","No cover letter help","No guarantee"], price:"\u20B95,000", time:"10 days", play:"price", color:"#FEE2E2" },
    { id:"yoda", name:"Yoda", icon:"\u{1F9D9}", promise:"{country} embassy is specific. Wrong photo size? Rejected. I know what they want.", claim:"I review every document before your passport goes in.", gets:["Embassy-specific checklist","I review every document before submission","WhatsApp support during the wait","I flag issues before submission"], donts:["I don't WRITE your cover letter","I don't handle passport logistics","No guarantee"], price:"\u20B97,000", time:"12 days", play:"guidance", color:"#E0F2FE" },
    { id:"sharma", name:"Sharma Ji", icon:"\u{1F468}\u200D\u{1F4BC}", promise:"I personally take your passport to the embassy. I know the staff.", claim:"15 years visiting this embassy. I know what they want and who to talk to.", gets:["I personally submit at the embassy","I know the embassy staff","Phone calls with honest updates","Face-to-face meeting first"], donts:["Slowest option","No online tracking","Need to visit office","No formal guarantee"], price:"\u20B96,000", time:"12-18 days", play:"relationship", color:"#F3F0EB" },
    { id:"shield", name:"Captain Shield", icon:"\u{1F6E1}\uFE0F", promise:"I pre-screen before your passport goes anywhere. Rejected? Full refund.", claim:"Pre-screening before submission. If still rejected, every rupee back.", gets:["Pre-screening before passport submission","Full refund if rejected (all fees)","Free second attempt","24/7 phone during processing"], donts:["I don't create your dossier","No flight/hotel bookings","No passport courier"], price:"\u20B98,000", time:"12 days", play:"guarantee", color:"#EDE9FE" },
    { id:"jarvis", name:"Jarvis", icon:"\u2728", promise:"Give me your passport. I prepare everything, submit, track, and return it.", claim:"Complete file preparation. Passport picked up and delivered to your doorstep.", gets:["Complete file prep (cover letter, forms, photos)","I submit to embassy and track daily","Passport picked up from your home","Passport returned to your doorstep","WhatsApp updates every 2 days"], donts:["No refund if rejected","No flight/hotel bookings"], price:"\u20B99,000", time:"12 days", play:"convenience", color:"#FFF7ED" },
    { id:"gatsby", name:"Gatsby", icon:"\u{1F37E}", promise:"Visa + flights + hotels. Rejected? Everything cancels free.", claim:"I handle visa, book refundable flights, arrange hotels. Rejected = full refund.", gets:["Everything Jarvis does","Refundable flight bookings","Refundable hotel bookings","Daily passport tracking","If rejected: all bookings cancelled, full refund"], donts:["Most expensive","Slowest option"], price:"\u20B912,000", time:"14 days", play:"premium", color:"#FEF3C7" }
  ],
  4: [ // Schengen (complex appointment)
    { id:"rocket", name:"Rocket Singh", icon:"\u26A1", promise:"Schengen visa. Lowest price. No markup.", claim:"VFS appointment + form prep. All fees in one price. No extras.", gets:["VFS appointment booking","Application form filled","All fees in one price (embassy + VFS + service)","Email status updates"], donts:["No document guidance","No cover letter help","No document review","No WhatsApp support","No guarantee if rejected"], price:"\u20B95,000", time:"15-20 days", play:"price", color:"#FEE2E2" },
    { id:"yoda", name:"Yoda", icon:"\u{1F9D9}", promise:"I've reviewed 3,000 Schengen apps. I know what each embassy rejects for.", claim:"Embassy-specific checklist. I review every document. You gather, I verify.", gets:["Embassy-SPECIFIC checklist (French vs German vs Italian)","I review every document: bank format, photo, insurance","I flag problems BEFORE VFS","WhatsApp support \u2014 response within 2 hours","VFS appointment booking","Freelancer/business owner profiles handled"], donts:["I don't WRITE your cover letter","I don't CREATE your itinerary","No flight/hotel bookings","No guarantee if rejected","You still gather all documents yourself"], price:"\u20B98,000", time:"18-22 days", play:"guidance", color:"#E0F2FE" },
    { id:"sharma", name:"Sharma Ji", icon:"\u{1F468}\u200D\u{1F4BC}", promise:"500 Schengen visas since 2008. Come to my office. I know the embassy.", claim:"15 years experience. French wants X, German wants Y. I know the difference.", gets:["Face-to-face meeting \u2014 explains your situation","Dossier prepared from 15 years experience","VFS appointment + submission","Personal phone calls \u2014 me, not a call center","Flexible on tricky documents","Cheaper than most digital premium"], donts:["Slowest option (manual process)","No online tracking","No formal guarantee","Need to visit office","No flight/hotel bookings"], price:"\u20B97,000", time:"22-30 days", play:"relationship", color:"#F3F0EB" },
    { id:"shield", name:"Captain Shield", icon:"\u{1F6E1}\uFE0F", promise:"Scared of rejection? I only submit when I'm confident you'll get approved.", claim:"Pre-screen everything. If rejected after my screening, ALL fees refunded.", gets:["I evaluate your app like an embassy officer","I fix issues BEFORE submission","Rejected = full refund ALL fees (service + embassy + VFS)","\u20B915,000 trip disruption compensation","Free reapplication","24/7 phone \u2014 call a real person at 2 AM"], donts:["I don't write your cover letter from scratch","I don't book flights/hotels","Focus is PROTECTION, not convenience"], price:"\u20B912,000", time:"18-22 days", play:"guarantee", color:"#EDE9FE" },
    { id:"jarvis", name:"Jarvis", icon:"\u2728", promise:"I create your entire Schengen dossier. You just review and sign.", claim:"Cover letter, itinerary, hotel confirmations \u2014 I prepare everything.", gets:["I WRITE your cover letter (tailored to embassy)","I BUILD your travel itinerary","I arrange hotel confirmations","Complete dossier formatted","VFS appointment + submission","Group trips: consistent files across all travelers"], donts:["No refund if rejected","No real flight bookings (confirmations only)","No dedicated expert \u2014 you're in a queue","You still PROVIDE bank statements, ITR, employment letter"], price:"\u20B910,000", time:"18-22 days", play:"convenience", color:"#FFF7ED" },
    { id:"gatsby", name:"Gatsby", icon:"\u{1F37E}", promise:"Real flights, real hotels, complete dossier. Rejected? Everything cancels free.", claim:"REAL refundable flights + hotels. Complete dossier + VFS. Rejected = \u20B90 lost.", gets:["Everything Jarvis does (cover letter, itinerary, dossier, VFS)","REAL refundable flights (not dummy tickets)","REAL refundable hotels (named for every traveler)","Schengen-compliant travel insurance","If rejected: ALL costs refunded","Dedicated relationship manager"], donts:["Most expensive option","Slowest (real bookings take time)"], price:"\u20B915,000", time:"20-25 days", play:"premium", color:"#FEF3C7" }
  ]
};

// ===================== MOMENT OF TRUTH (flow-specific) =====================
const MOMENT_SCENARIOS = {
  1: { scenario:"You've read that Indians can get a {country} visa on arrival, but you've also seen conflicting posts online.", question:"How does this make you feel?", options:[{id:"confident",text:"Confident \u2014 official sources say it works"},{id:"nervous",text:"Slightly nervous \u2014 I'll prepare all documents just in case"},{id:"pay",text:"Anxious enough to get an e-visa, even if it costs more"},{id:"confused",text:"Confused \u2014 I don't know what to believe"},{id:"copy",text:"I'll copy what someone who went recently did"}] },
  2: { scenario:"You've applied for your {country} visa. It's been 3 days, status says 'Processing.' Your trip is in 5 days.", question:"What do you do?", options:[{id:"wait",text:"Nothing \u2014 plenty of buffer"},{id:"message",text:"WhatsApp the agent asking for update"},{id:"switch",text:"Start looking at other agents"},{id:"postpone",text:"Consider postponing my trip"},{id:"call",text:"Call someone \u2014 I need to hear it's fine"}] },
  3: { scenario:"Your passport has been with the embassy for 2 weeks. No update. Your trip is in 10 days.", question:"What do you do?", options:[{id:"wait",text:"Wait patiently \u2014 it'll come through"},{id:"embassy",text:"Call the embassy directly"},{id:"agent",text:"Ask the agent to check status"},{id:"panic",text:"Start panicking about the trip"},{id:"forums",text:"Check online forums for similar wait times"},{id:"reschedule",text:"Start looking at rescheduling the trip"}] },
  4: { scenario:"You've submitted your {country} visa application. Embassy says '15-45 calendar days.' You're waiting.", question:"What worries you MOST?", options:[{id:"fee",text:"I'll get rejected and lose the visa fee"},{id:"stamp",text:"I'll get a rejection stamp in my passport"},{id:"timeline",text:"I won't hear back in time for my flights"},{id:"mistake",text:"I made a mistake in documents and don't know it"},{id:"days",text:"They'll give me fewer days than I need"},{id:"dread",text:"Just a general sense of dread"}] }
};

// ===================== TRUST SIGNALS (flow-specific) =====================
const TRUST_SIGNALS = {
  1: [
    {id:"friend",icon:"\u{1F46B}",text:"A friend or family member used this"},
    {id:"reviews",icon:"\u2B50",text:"10,000+ positive reviews"},
    {id:"digilocker",icon:"\u{1F512}",text:"Verified by DigiLocker"},
    {id:"price",icon:"\u{1F4B3}",text:"Total price was clear before I started"},
    {id:"guarantee",icon:"\u{1F6E1}\uFE0F",text:"Money-back if visa doesn't arrive on time"},
    {id:"tracking",icon:"\u{1F50D}",text:"I can track my application in real-time"}
  ],
  2: [
    {id:"friend",icon:"\u{1F46B}",text:"A friend or family member used this"},
    {id:"reviews",icon:"\u2B50",text:"10,000+ positive reviews"},
    {id:"digilocker",icon:"\u{1F512}",text:"Verified by DigiLocker"},
    {id:"price",icon:"\u{1F4B3}",text:"Total price was clear before I started"},
    {id:"guarantee",icon:"\u{1F6E1}\uFE0F",text:"Money-back if visa doesn't arrive on time"},
    {id:"tracking",icon:"\u{1F50D}",text:"I can track my application in real-time"}
  ],
  3: [
    {id:"friend",icon:"\u{1F46B}",text:"A friend or family member used this"},
    {id:"govt",icon:"\u{1F3DB}",text:"Government-authorized visa partner"},
    {id:"passport_track",icon:"\u{1F4CD}",text:"I can track my passport location live"},
    {id:"call",icon:"\u{1F4DE}",text:"I can call the company if passport is stuck"},
    {id:"approval",icon:"\u{1F4CA}",text:"99.4% visa approval rate"},
    {id:"refund",icon:"\u{1F4B0}",text:"Clear refund policy if anything goes wrong"}
  ],
  4: [
    {id:"friend",icon:"\u{1F46B}",text:"A friend recommended this specific platform"},
    {id:"approval",icon:"\u{1F4CA}",text:"97% approval rate with verified statistics"},
    {id:"call",icon:"\u{1F4DE}",text:"I can call the company or expert directly"},
    {id:"prescreen",icon:"\u{1F50E}",text:"They pre-screen my application before submitting"},
    {id:"refund",icon:"\u{1F4B0}",text:"Full refund if rejected, including embassy fees"},
    {id:"digilocker",icon:"\u{1F512}",text:"Verified by DigiLocker or government authorized"}
  ]
};

// ===================== CRISIS (flow-specific) =====================
const CRISIS_SCENARIOS = {
  1: "You fly to {country} tomorrow. You still haven't sorted the visa situation.",
  2: "Night before your trip. Your {country} e-visa hasn't arrived in your email.",
  3: "Your passport is still at the embassy. Trip to {country} is in 4 days. No status update.",
  4: "It's 11 PM. Your VFS appointment for {country} is tomorrow at 9 AM. You realize you might be missing a document."
};
const CRISIS_OPTIONS = [
  {id:"call",icon:"\u{1F4DE}",text:"Call or message someone immediately"},
  {id:"app",icon:"\u{1F4F1}",text:"Check the app or website for status"},
  {id:"google",icon:"\u{1F50D}",text:"Google to figure out what to do"},
  {id:"whatsapp",icon:"\u{1F4AC}",text:"Ask a friend or WhatsApp group"},
  {id:"nothing",icon:"\u{1F64F}",text:"Do nothing, hope for the best"},
  {id:"planner",icon:"\u{1F4CB}",text:"This wouldn't happen to me \u2014 I plan ahead"}
];
