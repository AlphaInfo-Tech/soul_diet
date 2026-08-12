/**
 * Single source of truth for all marketing copy on the Soul Diet site.
 *
 * Event/ticket/payment facts live in `constants.ts` — do not duplicate them
 * here. Anything marked `TODO` is a placeholder awaiting real information
 * from Gayathri; search this file for "TODO" before going live.
 */

export const SITE = {
  name: "Soul Diet",
  tagline: "A Complete Diet Plan for Celebrating Life",
  shortPitch:
    "We eat for our body — but what do we feed our mind? Soul Diet is a guided practice in meditation, mental fitness and coming home to yourself.",
  founder: "Gayathri Guru Krishnan",
  founderRole: "Meditation Practitioner & Mental Fitness Guide",
  abundanceLine: "Abundance of love and light to you",
  motto:
    "Every human being is unique and has a purpose in life.",
} as const;

export const CONTACT = {
  phone: "+91 77599 88447",
  phoneHref: "tel:+917759988447",
  email: "info@souldiet.in",
  whatsapp: "https://wa.me/917759988447",
  // TODO: real value needed — confirm city / studio address
  city: "Salem, Tamil Nadu",
  addressLines: ["Salem", "Tamil Nadu, India"],
  instagram:
    "https://www.instagram.com/souldiet.adietinwhichugain?igsh=MWxtOGo0N3RxcWVsMg==",
  soundForSoul: "https://soundforsoul.in/",
  responseTime: "We usually reply within 1–2 days.",
} as const;

/** Nav shown in the header and mirrored in the footer. */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonial", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
] as const;

export type IconKey =
  | "leaf"
  | "sparkle"
  | "bowl"
  | "ice"
  | "handshake"
  | "briefcase";

/**
 * The one-to-one booking funnel — the homepage hero's and footer's booking CTA,
 * and the services page's one-to-one card. Declared up here because `SERVICES`
 * below references it.
 */
export const ONE_TO_ONE_HREF = "/one-to-one" as const;

export interface Service {
  id: string;
  title: string;
  /** Abbreviated title for tight spaces, e.g. the Experience Zone chips. */
  shortTitle?: string;
  format: string;
  duration: string;
  summary: string;
  /** Exactly three — the services page stepper renders one dot per entry. */
  details: [string, string, string];
  icon: IconKey;
  href?: string;
  /** Overrides the Experience Zone's default button wording for `href`. */
  ctaLabel?: string;
  featured?: boolean;
  /** Shown in the services Experience Zone. Reuses images from GALLERY_PHOTOS. */
  photo?: { src: string; alt: string };
}

export const SERVICES: Service[] = [
  {
    id: "soul-diet-21",
    title: "Soul Diet — 21 Day Programme",
    shortTitle: "Soul Diet 21",
    format: "Guided programme",
    duration: "21 days",
    summary:
      "Twenty-one days of guided practice and meditation, built around one question: we eat for our body, but what do we feed our mind?",
    details: [
      "A daily practice you can hold alongside work, home and children — no retreat required.",
      "Meditation taught from the ground up, so beginners are never left guessing what they should be feeling.",
      "Journalling prompts that turn vague discomfort into something you can name — a complete diet plan for celebrating life, not a set of rules to fail at.",
    ],
    icon: "sparkle",
    featured: true,
    photo: { src: "/gallery/7.jpg", alt: "A moment of stillness" },
  },
  {
    id: "mental-fitness",
    title: "Mental Fitness Series",
    shortTitle: "Mental Fitness",
    format: "Weekly guided series",
    duration: "5 weeks",
    summary:
      "Mental fitness is the ability to keep yourself happy, peaceful and conscious of your inner and outer world — while juggling every role you carry.",
    details: [
      "Weeks 1–2 — Where you are: define mental fitness in your own words, then identify the patterns affecting it and trace them back to where they were formed.",
      "Week 3 — Mind and body: how a thought becomes a headache, and how a habit becomes a mood.",
      "Weeks 4–5 — The practice: meditation and what to expect the first time you sit, then love, compassion and gratitude — the ingredient underneath everything else you do.",
    ],
    icon: "leaf",
    photo: {
      src: "/gallery/5.jpg",
      alt: "Participants connecting after a session",
    },
  },
  {
    id: "guided-meditation",
    title: "Guided Meditation",
    shortTitle: "Meditation",
    format: "Group or one-to-one",
    duration: "10–45 min",
    summary:
      "Breathing meditation taught step by step — the entry point to everything else, and the one practice that keeps improving on its own.",
    details: [
      "Close your eyes and bring your concentration to your nose. Inhale through the nose, exhale through the mouth.",
      "After five counts, relax and return your attention to your natural breath. Do not stop your thoughts — let them come and go, keeping the priority on the breath.",
      "To finish, bring your hands together, rub your palms, and rest them over your eyes.",
    ],
    icon: "bowl",
    photo: { src: "/gallery/1.jpg", alt: "Sound healing session in progress" },
  },
  {
    id: "sound-healing-ice-bath",
    title: "Sound Healing + Ice Bath Experience",
    shortTitle: "Sound Healing + Ice Bath",
    format: "In-person event",
    duration: "Full day",
    summary:
      "A day away from the hustle for business owners — sound healing, an optional ice bath, satvic lunch and real connection.",
    details: [
      "Sound healing, then an optional ice bath experience.",
      "A nourishing satvic lunch, shared with like-minded business owners.",
      "A wellness goodie kit to carry the day home with you.",
    ],
    icon: "ice",
    href: "/event",
    featured: true,
    photo: { src: "/gallery/2.jpg", alt: "Ice bath experience" },
  },
  {
    id: "one-to-one",
    // TODO: confirm this offering exists and what it is actually called
    title: "One-to-One Consultation",
    shortTitle: "One-to-One",
    format: "Online or in-person",
    duration: "45–60 min",
    summary:
      "A private session to work through what is specifically in your way, rather than what is in everyone's way.",
    details: [
      "Space to talk through what you are carrying, without a script.",
      "A practice chosen for your situation, not a generic routine.",
      "Follow-up guidance so the practice survives contact with a normal week.",
    ],
    icon: "handshake",
    href: ONE_TO_ONE_HREF,
    ctaLabel: "Book a session",
    photo: { src: "/gallery/6.jpg", alt: "The event venue" },
  },
];

/**
 * Verbatim from the source material — the benefits list Gayathri uses.
 */
export const MEDITATION_BENEFITS = [
  "Getting better at managing your emotions",
  "Thinking effectively — being more rational and logical",
  "Understanding yourself better — knowing your strengths and weaknesses",
  "Working out your meaning and purpose in life",
  "Building positive relationships with others",
  "Helping other people",
  "Ensuring your personal safety",
  "Caring for your body",
  "Changing aspects of your environment for wellbeing",
  "Being good at learning",
  "Building skills for the workforce",
  "Financial control",
  "Establishing new habits",
  "Having fun and unwinding",
] as const;

export const PULL_QUOTES = {
  windlessSky: {
    text: "The mind should behave like the windless sky crossed by a flight of birds. The birds come and go, but the sky is not affected. In the same way, let the thoughts come and go — but the mind should stay the same.",
    attribution: null,
  },
  harmony: {
    text: "Meditation is being in a state where your mind, body and soul are in harmony with each other.",
    attribution: SITE.founder,
  },
  loveIsYou: {
    text: "Love is the main ingredient of what you are made up of.",
    attribution: SITE.founder,
  },
} as const;

/** The coin-in-the-pond analogy, used on the "Why meditation" section. */
export const POND_ANALOGY = [
  "A coin is dropped in a pond, and you have to read what is written on it. There are ducks in the pond. As they see you they splash their wings and move, leaving turbulence and small waves in the water.",
  "Can you read what is written on the coin? No.",
  "So you wait a while, sitting near the pond, enjoying the view. Now the water is still — and you can read the coin. You can also see stunning small fishes and tiny green plants inside the pond.",
  "Meditation does this to your life. It brings that stillness within, and lets you see what was always there.",
] as const;

export const ABOUT_PARAGRAPHS = [
  "Hello, I am Gayathri Guru Krishnan. I am an engineer, and I was working as a lecturer in a college before I took a little break for my baby.",
  "During that break I learnt a great deal about life. I am a meditation practitioner, and that practice helped me face a lot of situations in a very stable and sane way. I had peaks of emotion and roller-coaster rides of change — mental, physical and social. But what I observed was that I could bounce back to normal within half an hour. That is the best part of knowing yourself.",
  "It was going to be almost a year inside the house. I was on bed rest for eight months, pregnant with my second child and diagnosed with cervix incompetency. The first month I had frequent emergency visits to the hospital, because the rest was very unrest for me. I was emotionally, physically and mentally disturbed.",
  "After the last emergency visit I realised it was my own fear reflecting back at me, again and again. In that moment I took everything happening to me as a blessing — and it became one. I emerged from that bed rest stronger, wiser, with a deep insight into mental control and its power over me. The mind, body and soul connection was not a theory any more. It was experienced.",
  "So here I am — working, handling a newborn and a toddler, running a household, with mental peace and a smile. I want to reach out to every mother and shout out loud: if I can come over it, you can do it.",
] as const;

/** The practices Gayathri lists as what she personally follows. */
export const PRACTICES = [
  { title: "Accept yourself", body: "Your body, your mind, your actions — everything." },
  {
    title: "Change your mind vocabulary",
    body: 'We speak a lot inside our own heads. Change "it is so difficult" to "it is going to teach me something in life to grow."',
  },
  {
    title: "Give yourself some time",
    body: "Once you enhance your knowledge of self development, do not rush for results. Ardent aspiration to grow.",
  },
  {
    title: "Spend time in introspection",
    body: "There is always some space for improvement in ourselves.",
  },
  {
    title: "Become a learner",
    body: "You get so busy learning in life that you leave behind the tiny unnecessary chatter.",
  },
  {
    title: "Make a routine",
    body: "Routine helps you spend time hassle free — and remake it whenever life changes.",
  },
  { title: "Indulge in yoga and meditation", body: "Ten minutes daily is enough to begin." },
  { title: "Clean eating habits", body: "What you put in the body shows up in the mind." },
  {
    title: "Make love, gratitude and power the main ingredient",
    body: "Add it when you cook, eat, drink, walk — everything you do.",
  },
] as const;

/** Questions to ask yourself, repeatedly. */
export const SELF_QUESTIONS = [
  "Who am I?",
  "What is my purpose?",
  "What am I doing in my life?",
  "Where am I leading?",
  "How connected am I to the supreme power?",
] as const;

export interface Testimonial {
  quote: string;
  name: string;
  /** Short hook shown above the quote, as on souldiet.online. */
  headline?: string;
  /** Omitted where the source did not state one — never invent a city. */
  location?: string;
  programme: string;
}

/**
 * Written reviews carried over verbatim from souldiet.online.
 *
 * These are real, named people. Keep the quotes exactly as written — including
 * the ellipses and the original grammar.
 *
 * The `programme` labels are curated to map onto the current SERVICES rather
 * than taken from what each person said; use the exact `title` strings from
 * SERVICES so the bylines match the services page.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "You are superb...each thing you told was amazing...feeling fresh, relaxed and happy. Thank you so much for the wonderful session!",
    name: "Chandini Hemanth Sharma",
    headline: "Feeling fresh and amazing!",
    programme: "One-to-One Consultation",
  },
  {
    quote:
      "It's very helpful...even when there are negative thoughts I am able to quickly bounce back. I feel Happy, Positive and less stressed.",
    name: "Nandini",
    headline: "Positive and less stressed",
    programme: "Mental Fitness Series",
  },
  {
    quote:
      "Gratitude is magical... things change so quickly... it is changing the way I used to perceive things. I see more of good things now... feel much more happier than before.",
    name: "Sneha",
    headline: "Gratitude is magical!",
    programme: "Soul Diet — 21 Day Programme",
  },
  {
    quote:
      "I rediscovered myself and I feel so calm inside that I can understand others situation and stopped getting angry even for small things. That's where my peace and happiness lies.",
    name: "Nazreen",
    headline: "Rediscovered myself",
    programme: "One-to-One Consultation",
  },
  {
    quote:
      "I feel so light, not getting angry as before, don't consider negative things around me. It makes me so refreshing and so light.",
    name: "Padma",
    headline: "So light and refreshing",
    programme: "Soul Diet — 21 Day Programme",
  },
  {
    quote:
      "The meditation is indeed very powerful... I can already experience small changes in my day to day life... there is much more peace now.",
    name: "Arunodaya",
    headline: "Powerful meditation",
    programme: "Mental Fitness Series",
  },
];

export const FAQS = [
  {
    q: "I have never meditated before. Is this for me?",
    a: "Yes — most people start here. You will feel heaviness near the head, and every possible and impossible thing in the universe will come to your mind the moment you close your eyes. That happens to everyone. Keep doing it.",
  },
  {
    q: "How much time do I need each day?",
    a: "Ten minutes daily, a journal or a notes app, and a pen. That is the whole list.",
  },
  {
    q: "What if I feel nothing is happening?",
    a: "That feeling is part of it. Sit with your eyes closed for a while anyway. Fix a time in your daily schedule and keep the appointment — the calm follows practice, not the other way round.",
  },
  {
    q: "Are there any precautions?",
    a: "Yes. If you are pregnant, a heart patient, have a breathing problem, or have had any kind of surgery, please ask your doctor before doing any breathing exercise. While you inhale and exhale, never strain your nose or your body — do it with ease, and a smile on your face.",
  },
  {
    q: "Do you work with people who are not mothers?",
    a: "Yes. Much of the writing is addressed to mothers because that is where it began, but the practice is not gendered and the sessions are open to everyone.",
  },
];

export const ONE_TO_ONE_SUBJECT = "One-to-One Consultation" as const;

/** Subject options offered in the contact form. */
export const CONTACT_SUBJECTS = [
  "Soul Diet — 21 Day Programme",
  "Mental Fitness Series",
  "Guided Meditation",
  "Sound Healing + Ice Bath Event",
  ONE_TO_ONE_SUBJECT,
  "Something else",
] as const;


export interface GalleryPhoto {
  src: string;
  alt: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: "/gallery/1.jpg", alt: "Sound healing session in progress" },
  { src: "/gallery/2.jpg", alt: "Ice bath experience" },
  { src: "/gallery/3.jpg", alt: "Satvic lunch spread" },
  { src: "/gallery/4.jpg", alt: "Wellness goodie kit" },
  { src: "/gallery/5.jpg", alt: "Participants connecting after a session" },
  { src: "/gallery/6.jpg", alt: "The event venue" },
  { src: "/gallery/7.jpg", alt: "A moment of stillness" },
];
