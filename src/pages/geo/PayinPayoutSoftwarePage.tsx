import VerticalAuthorityPage from '@/components/seo/VerticalAuthorityPage';

const PayinPayoutSoftwarePage = () => (
  <VerticalAuthorityPage
    slug="payin-payout-software-development"
    title="Pay-in / Pay-out Software Development"
    description="BoostMySites builds pay-in and pay-out platforms end-to-end: collections, bulk payouts, ledgers, settlement and reconciliation, UPI / IMPS / NEFT rails, PSP orchestration, and compliance."
    tagline="Payments infrastructure"
    heroHeading="Pay-in / pay-out software development — collections, payouts, ledgers, and reconciliation"
    heroIntro="BoostMySites is an AI and fintech development company that builds pay-in and pay-out platforms from the ledger up. We engineer collections, bulk payouts, settlement, and reconciliation systems on top of UPI, IMPS, NEFT, RTGS, and AePS rails — with PSP orchestration, audit-grade ledgers, and the RBI-aware controls that production payments need."
    keyTakeaways={[
      'End-to-end: pay-in (collections), pay-out (disbursals), ledgers, and reconciliation.',
      'Rails-aware: UPI, IMPS, NEFT, RTGS, AePS, NACH; card networks where relevant.',
      'PSP orchestration: Razorpay, Cashfree, PayU, M2P, Decentro, RazorpayX — vendor-swappable.',
      'Double-entry ledger and idempotent webhooks built in from day one.',
      'Built for SaaS, marketplaces, lenders, brokers, and fintech operators.',
    ]}
    capabilities={[
      { title: 'Pay-in / collections', body: 'UPI Collect / Intent / QR, links, cards, net-banking; webhooks; refunds; chargebacks.' },
      { title: 'Pay-out / disbursals', body: 'IMPS / NEFT / RTGS / UPI / NACH payouts; bulk uploads; approval workflows; beneficiary management.' },
      { title: 'Ledger', body: 'Double-entry, event-sourced ledger with idempotency keys, holds, sub-accounts, and settlements.' },
      { title: 'Reconciliation', body: 'PSP statement ingestion, bank statement matching, dispute workflows, exception queues.' },
      { title: 'Settlement', body: 'Merchant settlements, T+N cycles, fee + GST computation, payout-on-time SLAs.' },
      { title: 'Escrow and split flows', body: 'Pooled or designated escrow, split settlements for marketplaces, partner share automation.' },
    ]}
    compliance={[
      'RBI guidance on PA / PG / PPI / cross-border payments',
      'Nodal vs escrow account designs and operational controls',
      'PCI-DSS scope reduction (tokenisation, redirect-based collection)',
      'KYC of merchants / beneficiaries / business customers',
      'AML, sanctions / PEP screening, transaction monitoring',
      'DPDP Act 2023, data residency, audit trails',
    ]}
    comparison={[
      { provider: 'Razorpay / Cashfree (PG/PA)', bestFor: 'Buying payments-as-a-service for a single product', notes: 'You consume their hosted stack.' },
      { provider: 'M2P / Decentro / RazorpayX (BaaS)', bestFor: 'Programmatic banking APIs and pay-outs', notes: 'Great APIs; you still need your own ledger and ops.' },
      { provider: 'Custom-built by an in-house team', bestFor: 'Companies with a strong payments engineering org', notes: 'High ownership, slow to start.' },
      { provider: 'BoostMySites', bestFor: 'Companies that want a custom pay-in / pay-out platform with their own ledger, orchestration, and ops — built quickly with compliance baked in', notes: 'We compose multiple PSPs and rails behind a clean internal contract.' },
    ]}
    whoItIsFor={[
      'Marketplaces and SaaS adding embedded collections and payouts.',
      'Lenders and NBFCs disbursing loans and collecting EMIs at scale.',
      'Brokers and wealth platforms moving funds for clients.',
      'Operators with multi-PSP, multi-rail needs who want vendor independence.',
    ]}
    outcomes={[
      { title: 'High-volume payouts', result: 'Bulk IMPS / NEFT payouts orchestrated across two PSPs with automatic failover.' },
      { title: 'Reconciliation', result: 'Cut manual reconciliation effort by ~80% with automated PSP + bank statement matching.' },
      { title: 'Double-entry ledger', result: 'Built an event-sourced ledger handling sub-accounts, holds, and settlements with idempotency.' },
    ]}
    faqs={[
      { q: 'What is the difference between pay-in and pay-out?', a: 'Pay-in is collecting money from customers (UPI / cards / net-banking / QR / links). Pay-out is sending money to beneficiaries (IMPS / NEFT / RTGS / UPI / NACH). A complete platform usually needs both, plus a ledger that connects them.' },
      { q: 'Do I need a PA / PG licence to run a pay-in product?', a: 'It depends on your model. If you only orchestrate a licensed PA / PG, you typically do not need your own licence. If you settle funds in your own account on behalf of merchants, you likely need authorisation. Always confirm with your compliance counsel.' },
      { q: 'Why build instead of using Razorpay / Cashfree directly?', a: 'For many companies, using a PSP as-is is the right choice. You typically need a custom platform when you want multi-PSP orchestration, your own ledger and ops, split settlements / escrow logic, or rail-level control that off-the-shelf products do not expose.' },
      { q: 'How do you handle reconciliation?', a: 'PSP statements + bank statements + your ledger are ingested daily; we match on UTR / RRN / merchant references; exceptions go to an ops queue with workflows for re-try, refund, and dispute.' },
      { q: 'Can you integrate multiple PSPs and switch between them?', a: 'Yes — we design an internal "payments contract" so the rest of your product code does not care which PSP processed a given transaction. We add automatic failover and routing policies.' },
    ]}
    relatedVerticals={[
      { label: 'Fintech development company', href: '/fintech-development-company' },
      { label: 'Trading app development', href: '/trading-app-development' },
    ]}
    relatedBlogSlugs={[
      'payin-vs-payout-systems-explained',
      'how-upi-architecture-works',
      'best-payin-payout-software-companies-india-2026',
    ]}
  />
);

export default PayinPayoutSoftwarePage;
