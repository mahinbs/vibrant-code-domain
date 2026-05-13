-- Seed flagship fintech portfolios: Fastnaire (Nigeria crypto exchange) + Finnly (multicurrency wallet)
-- These rows surface on the fintech industry landing page (service_id / industry both keyed to fintech)
-- and on the generic Portfolio component, which orders by created_at desc and slices the top items.

-- ---------- Fastnaire ----------
INSERT INTO public.portfolios (
  title, client, service_id, description, challenge, solution, image, link,
  technologies, industry, timeline, team, detailed_metrics, extended_testimonial, gallery
) VALUES (
  'Fastnaire — Crypto Exchange & Gift Card Trading',
  'Fastnaire',
  'fintech-development',
  'We designed and engineered Fastnaire, a Nigeria-first crypto exchange that turns unused gift cards into BTC, USDT, or NGN in minutes. Users can deposit and withdraw across BTC/USDT/NGN wallets, borrow against crypto, and trade with a manual review desk that clears most quotes in under five minutes — wrapped in a polished iOS + Android experience.',
  'Build a regulated-grade crypto trading platform for the Nigerian market that supports gift-card-to-crypto conversion across 12+ global brands, instant NGN on/off ramps via local bank rails, crypto-collateralised borrowing, and per-user wallet generation — all while keeping a manual operator desk in the loop for compliance, fraud review, and fast settlement.',
  'Delivered a native React Native iOS + Android app, a Node.js + TypeScript settlement backbone, and an internal operator console. Built a real-time quote engine with OCR-assisted gift-card uploads (Amazon, Steam, Apple, Google Play, and more), BTC/USDT/NGN ledger with rotating deposit addresses, withdrawal risk-scoring, tiered KYC/AML, role-based admin permissions, and WhatsApp + email + push notifications. Settlement is wired to local Nigerian bank rails with reconciliation hooks and an audit-friendly transaction log.',
  '/portfolios/fastnaire/cover.png',
  'https://fastnaire.com',
  ARRAY[
    'React Native','TypeScript','Node.js','PostgreSQL','Redis',
    'AWS','BTC / USDT integrations','KYC / AML providers','WebSockets','Stripe-grade webhooks'
  ],
  'Fintech',
  '9 months',
  '8 specialists (product, mobile, backend, design, QA, ops)',
  '[
    {"label":"Trades cleared / month","value":"28,000+","description":"Manual + automated settlement on a single review desk"},
    {"label":"Median time-to-payout","value":"< 5 min","description":"From accepted quote to wallet credit"},
    {"label":"Gift card brands supported","value":"12+","description":"Amazon, Steam, Apple, Google Play, eBay, Sephora, and more"},
    {"label":"Platform uptime","value":"99.95%","description":"AWS multi-AZ deployment with health checks and observability"}
  ]'::jsonb,
  '{"quote":"Boostmysites shipped Fastnaire end-to-end — mobile, ops desk, and the settlement engine. They were the team that finally made our crypto + gift-card flow feel fast, safe, and audit-ready.","author":"Founder","position":"Founder & CEO","company":"Fastnaire"}'::jsonb,
  ARRAY[
    '/portfolios/fastnaire/gift-card.png',
    '/portfolios/fastnaire/withdraw.png',
    '/portfolios/fastnaire/deposit.png'
  ]
);

-- ---------- Finnly ----------
INSERT INTO public.portfolios (
  title, client, service_id, description, challenge, solution, image, link,
  technologies, industry, timeline, team, detailed_metrics, extended_testimonial, gallery
) VALUES (
  'Finnly — Multicurrency Crypto Wallet & Exchange',
  'Finnly',
  'fintech-development',
  'Finnly is a multicurrency crypto wallet and exchange we designed and engineered as a unified consumer surface: 20+ cryptocurrencies and stablecoins, in-app BTC/USDT swap, an NFT browser, a Earn module for staking yield, and a Buy/Sell flow connected to fiat debit cards — all in a dark, motion-led product system.',
  'Design a consumer crypto wallet that consolidates BTC, USDT, 20+ altcoins, stablecoins, NFTs, and fiat purchases without overwhelming new users, and pair it with a backend that supports realtime price feeds, address generation per coin, in-app swap quotes, and secure key handling on device.',
  'Built non-custodial seed-phrase wallets per user, an in-app swap engine with sub-second BTC ↔ USDT quoting, an NFT browser surface, an Earn module for staking yield, and a fiat Buy/Sell flow tied to debit-card processors. The visual system is a dark-mode, isometric, motion-led interface designed for onboarding new crypto users without sacrificing power-user depth. 60+ screens, full design system, plus a backend with realtime feeds and secure key handling.',
  '/portfolios/finnly/cover.webp',
  NULL,
  ARRAY[
    'React Native','TypeScript','Node.js','GraphQL','PostgreSQL',
    'Redis','WalletConnect','Web3.js','AWS','Figma design system'
  ],
  'Fintech',
  '6 months',
  '6 specialists (mobile, backend, web3, design, QA)',
  '[
    {"label":"Cryptocurrencies supported","value":"20+","description":"BTC, ETH, USDT, USDC, and major altcoins"},
    {"label":"In-app swap latency","value":"< 1s","description":"Quoting BTC ↔ USDT and major pairs"},
    {"label":"Surfaces shipped","value":"60+ screens","description":"Wallet, NFT, Swap, Earn, Buy/Sell, settings"},
    {"label":"Design system","value":"Full kit","description":"Dark-mode, isometric, motion-led component library"}
  ]'::jsonb,
  '{"quote":"Finnly was the first time a vendor delivered both the product design and the engineering for our wallet. The team treated it like a real fintech build, not a UI experiment.","author":"Product Lead","position":"Product Lead","company":"Finnly"}'::jsonb,
  ARRAY[
    '/portfolios/finnly/onboarding.webp',
    '/portfolios/finnly/screens.webp'
  ]
);
