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
    { id:"rocket", name:"Rocket Singh", icon:"\u26A1", channel:"Online", promise:"{country} is visa-free. I'll handle the TDAC for \u20B9500.", claim:"I fill the TDAC form and email you the confirmation. You prepare your travel documents.", gets:["TDAC form completed","Confirmation emailed","Immigration tips"], donts:["You prepare your own travel documents","No support if something goes wrong at immigration"], price:"\u20B9500", time:"7 days", play:"price", color:"#FEE2E2" },
    { id:"yoda", name:"Yoda", icon:"\u{1F9D9}", channel:"Online + WhatsApp", promise:"{country} rules changed in 2026. I'll explain what you actually need.", claim:"I clarify the confusing stuff. You'll know exactly what to do at immigration.", gets:["I clarify: TDAC, VOA, or e-visa for YOUR trip","Document check before travel","WhatsApp for questions"], donts:["I guide you \u2014 you do it yourself","No flight or hotel bookings"], price:"\u20B91,500", time:"1 day", play:"guidance", color:"#E0F2FE" },
    { id:"sharma", name:"Sharma Ji", icon:"\u{1F468}\u200D\u{1F4BC}", channel:"Offline / In-person", promise:"Come to my office. I'll explain {country} and do the TDAC.", claim:"20 years doing visas. I sit with you face-to-face and explain everything.", gets:["Face-to-face explanation","TDAC done + printed airport checklist","Call me anytime"], donts:["No online tracking","Need to visit my office"], price:"\u20B91,500", time:"Same day", play:"relationship", color:"#F3F0EB" },
    { id:"shield", name:"Captain Shield", icon:"\u{1F6E1}\uFE0F", channel:"Online", promise:"If anything goes wrong at immigration, I'm one call away. \u20B915,000 trip cover.", claim:"I prepare your TDAC and if there's any issue at arrival, call me.", gets:["TDAC prepared","24/7 phone support at immigration","\u20B915,000 trip compensation if turned away"], donts:["No flight or hotel bookings","I can't control immigration decisions"], price:"\u20B92,000", time:"1 day", play:"guarantee", color:"#EDE9FE" },
    { id:"jarvis", name:"Jarvis", icon:"\u2728", channel:"Online", promise:"Send passport photo. I handle TDAC and everything. Done.", claim:"Zero effort from you. I do all forms and email you a ready-to-go travel pack.", gets:["Zero effort from you","TDAC + all forms done","Travel pack emailed"], donts:["No flight or hotel bookings","No immigration support"], price:"\u20B92,500", time:"Same day", play:"convenience", color:"#FFF7ED" },
    { id:"gatsby", name:"Gatsby", icon:"\u{1F37E}", channel:"Online / Concierge", promise:"{country} travel planned. TDAC + flights + hotels. Cancel anytime.", claim:"I handle TDAC, book refundable flights and hotels, arrange insurance.", gets:["TDAC handled","Refundable flight bookings","Refundable hotel bookings","Travel insurance","Cancel everything free if plans change"], donts:["I can't control immigration decisions","Processing takes time to coordinate bookings"], price:"\u20B96,000", time:"2-3 days", play:"premium", color:"#FEF3C7" }
  ],
  2: [ // Dubai (standard e-visa)
    { id:"rocket", name:"Rocket Singh", icon:"\u26A1", channel:"Online", promise:"{country} visa. All fees included. I help you submit.", claim:"I submit your application. Visa emailed. You prepare the documents.", gets:["Complete visa processing","All government fees included","Visa emailed to you","Track status online"], donts:["You prepare your own documents","No guaranteed delivery date"], price:"\u20B97,000", time:"3-5 days", play:"price", color:"#FEE2E2" },
    { id:"yoda", name:"Yoda", icon:"\u{1F9D9}", channel:"Online + WhatsApp", promise:"{country} visa? I check everything so nothing goes wrong.", claim:"I verify your photo, passport scan, and form details before submission.", gets:["Photo verified (size, background)","Passport scan quality checked","Form reviewed before submission","WhatsApp \u2014 ask me anything"], donts:["I guide you \u2014 you upload the documents","No guaranteed delivery date"], price:"\u20B98,500", time:"2 days", play:"guidance", color:"#E0F2FE" },
    { id:"sharma", name:"Sharma Ji", icon:"\u{1F468}\u200D\u{1F4BC}", channel:"Offline / WhatsApp", promise:"WhatsApp me your passport photo. Pay when visa is ready.", claim:"Hundreds of {country} visas done. Pay only when you get it.", gets:["Just WhatsApp \u2014 no app needed","I handle everything","Pay when visa is ready (not upfront)","Call me anytime"], donts:["No online tracking","No formal guarantee on timing"], price:"\u20B98,000", time:"2-3 days", play:"relationship", color:"#F3F0EB" },
    { id:"shield", name:"Captain Shield", icon:"\u{1F6E1}\uFE0F", channel:"Online", promise:"Visa guaranteed before your flight. Late by 1 hour? I pay you back.", claim:"On-time guarantee. If late, full refund + \u20B95,000 trip compensation.", gets:["On-time delivery guarantee","Full refund if late (even by 1 hour)","\u20B95,000 trip compensation if delayed","24/7 phone \u2014 real person","Free re-submission if any issue"], donts:["No flight or hotel bookings","I can't speed up government processing"], price:"\u20B99,000", time:"2 days", play:"guarantee", color:"#EDE9FE" },
    { id:"jarvis", name:"Jarvis", icon:"\u2728", channel:"Online", promise:"Send passport photo. Visa in inbox. That's your only job.", claim:"Zero forms for you. I handle the complete application.", gets:["Zero forms to fill","I handle complete application","24-hour processing","WhatsApp updates"], donts:["No guaranteed delivery date","No flight or hotel bookings"], price:"\u20B99,500", time:"24 hours", play:"convenience", color:"#FFF7ED" },
    { id:"gatsby", name:"Gatsby", icon:"\u{1F37E}", channel:"Online / Concierge", promise:"Visa + flights + hotel. Plans change? Cancel everything free.", claim:"I process your visa, book refundable flights, hotel, and travel insurance.", gets:["Visa processing","Refundable flight booking","Refundable hotel booking","Travel insurance","Cancel anything, full refund"], donts:["I can't guarantee government processing time","Processing takes time to coordinate bookings"], price:"\u20B914,000", time:"2 days", play:"premium", color:"#FEF3C7" }
  ],
  3: [ // South Korea / Japan (sticker visa)
    { id:"rocket", name:"Rocket Singh", icon:"\u26A1", channel:"Online", promise:"{country} visa. I help you submit. All fees included.", claim:"I prepare your application and submit to the embassy. You prepare the documents.", gets:["Application prep + embassy submission","All fees included in one price","Email updates when status changes"], donts:["You prepare your own documents","No guarantee if rejected"], price:"\u20B95,000", time:"10 days", play:"price", color:"#FEE2E2" },
    { id:"yoda", name:"Yoda", icon:"\u{1F9D9}", channel:"Online + WhatsApp", promise:"{country} embassy is specific. I know exactly what they accept.", claim:"I review every document before your passport goes in. I flag what needs fixing.", gets:["Embassy-specific checklist","I review every document before submission","WhatsApp support \u2014 ask me anything","I flag issues before submission"], donts:["I don't write your cover letter \u2014 I guide you","No guarantee if rejected"], price:"\u20B97,000", time:"12 days", play:"guidance", color:"#E0F2FE" },
    { id:"sharma", name:"Sharma Ji", icon:"\u{1F468}\u200D\u{1F4BC}", channel:"Offline / In-person", promise:"I personally submit your passport. 20 years in the visa business.", claim:"I know what the VFS staff expect. Come to my office, I'll handle it.", gets:["I personally submit your application","I've processed visas for 20 years","Phone calls with honest updates","Face-to-face meeting"], donts:["No online tracking","No formal guarantee"], price:"\u20B96,000", time:"12-18 days", play:"relationship", color:"#F3F0EB" },
    { id:"shield", name:"Captain Shield", icon:"\u{1F6E1}\uFE0F", channel:"Online", promise:"I pre-screen before your passport goes anywhere. Rejected? Every rupee back.", claim:"I check your application like an embassy officer would. If rejected, full refund.", gets:["Pre-screening before passport submission","If rejected: full refund of all fees","Free second attempt","24/7 phone during processing"], donts:["I don't create your dossier \u2014 you prepare documents","No flight or hotel bookings"], price:"\u20B98,000", time:"12 days", play:"guarantee", color:"#EDE9FE" },
    { id:"jarvis", name:"Jarvis", icon:"\u2728", channel:"Online", promise:"Give me your passport. I prepare everything, submit, track, and return it.", claim:"I write your cover letter, prepare the file, submit, track daily, and deliver back.", gets:["I write your cover letter and prepare the complete file","I submit and track your passport daily","Passport picked up from your home","Passport returned to your doorstep","WhatsApp updates every 2 days"], donts:["No refund if rejected","No flight or hotel bookings \u2014 you manage those"], price:"\u20B99,000", time:"12 days", play:"convenience", color:"#FFF7ED" },
    { id:"gatsby", name:"Gatsby", icon:"\u{1F37E}", channel:"Online / Concierge", promise:"I handle visa, book flights, book hotels. Rejected? Everything cancels free.", claim:"I write your cover letter, prepare the dossier, book refundable flights and hotels.", gets:["I write cover letter and prepare complete file","Refundable flight bookings","Refundable hotel bookings","Daily passport tracking","If rejected: all bookings cancelled, full refund"], donts:["I can't guarantee the embassy will approve","Processing takes time to coordinate bookings"], price:"\u20B912,000", time:"14 days", play:"premium", color:"#FEF3C7" }
  ],
  4: [ // Schengen (complex appointment)
    { id:"rocket", name:"Rocket Singh", icon:"\u26A1", channel:"Online", promise:"Schengen visa. All fees included. I help you submit.", claim:"I book your VFS appointment and prepare your application. You prepare the documents.", gets:["VFS appointment booking","Application form filled","All fees in one price (embassy + VFS + service)","Email status updates"], donts:["You prepare your own documents and cover letter","No guarantee if rejected"], price:"\u20B95,000", time:"15-20 days", play:"price", color:"#FEE2E2" },
    { id:"yoda", name:"Yoda", icon:"\u{1F9D9}", channel:"Online + WhatsApp", promise:"I've reviewed 3,000 Schengen apps. I know what each embassy rejects for.", claim:"I build your checklist, review every document, and flag issues before VFS.", gets:["Embassy-specific checklist (French vs German vs Italian)","I review every document: bank format, photo, insurance","I flag problems BEFORE VFS submission","WhatsApp support \u2014 response within 2 hours","VFS appointment booking"], donts:["I guide your cover letter \u2014 you write it","You gather all documents yourself","No guarantee if rejected"], price:"\u20B98,000", time:"18-22 days", play:"guidance", color:"#E0F2FE" },
    { id:"sharma", name:"Sharma Ji", icon:"\u{1F468}\u200D\u{1F4BC}", channel:"Offline / In-person", promise:"500 Schengen visas since 2008. I know what each embassy approves.", claim:"French wants X, German wants Y. I know the difference. Come to my office.", gets:["Face-to-face meeting \u2014 I review your specific situation","Dossier prepared from 15 years experience","VFS appointment + submission","Personal phone calls for updates","Flexible on tricky documents"], donts:["No online tracking","No formal guarantee"], price:"\u20B97,000", time:"22-30 days", play:"relationship", color:"#F3F0EB" },
    { id:"shield", name:"Captain Shield", icon:"\u{1F6E1}\uFE0F", channel:"Online", promise:"I only submit when I'm confident. Rejected? Every rupee back.", claim:"I pre-screen your application like an embassy officer. If rejected, full refund.", gets:["I evaluate your application before submission","I fix issues BEFORE they reach the embassy","If rejected: full refund of ALL fees (service + embassy + VFS)","Free reapplication","24/7 phone support"], donts:["You prepare your documents and cover letter","No flight or hotel bookings"], price:"\u20B912,000", time:"18-22 days", play:"guarantee", color:"#EDE9FE" },
    { id:"jarvis", name:"Jarvis", icon:"\u2728", channel:"Online", promise:"I create your entire Schengen dossier. You just review and sign.", claim:"I write your cover letter, build your itinerary, arrange hotel confirmations.", gets:["I write your cover letter (tailored to embassy)","I build your travel itinerary","I arrange hotel confirmations","Complete dossier formatted and organized","VFS appointment + submission"], donts:["No refund if rejected \u2014 I prepare the best file but can't control the embassy","You still provide bank statements, ITR, employment letter"], price:"\u20B910,000", time:"18-22 days", play:"convenience", color:"#FFF7ED" },
    { id:"gatsby", name:"Gatsby", icon:"\u{1F37E}", channel:"Online / Concierge", promise:"Complete dossier, real flights, real hotels. Rejected? Everything cancels.", claim:"I write your cover letter, prepare dossier, book refundable flights and hotels.", gets:["I write cover letter and prepare complete dossier","Real refundable flight bookings (not dummy tickets)","Real refundable hotel bookings","Schengen-compliant travel insurance","If rejected: all costs refunded including flights and hotels"], donts:["I can't guarantee the embassy will approve","Processing takes time to coordinate bookings"], price:"\u20B915,000", time:"20-25 days", play:"premium", color:"#FEF3C7" }
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

// ===================== BEFORE PAYING (replaces Crisis — conversion barrier) =====================
// Same question across all flows. Tests: what's the last barrier before payment?
const BEFORE_PAYING_OPTIONS = [
  {id:"reviews",icon:"\u2B50",text:"Read their reviews and ratings online"},
  {id:"refund_policy",icon:"\u{1F4CB}",text:"Check their refund and cancellation policy"},
  {id:"ask_friend",icon:"\u{1F4AC}",text:"Ask a friend or family member if they've used them"},
  {id:"website",icon:"\u{1F4F1}",text:"Browse their website to see if it looks professional and legit"},
  {id:"experience",icon:"\u{1F4CA}",text:"Check how many visas they've processed and their approval rate"},
  {id:"compare",icon:"\u{1F50D}",text:"Compare with 2-3 other options before deciding"},
  {id:"social",icon:"\u{25B6}\u{FE0F}",text:"Search for them on YouTube, Reddit, or social media"}
];
