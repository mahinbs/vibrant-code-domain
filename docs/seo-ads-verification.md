# SEO + Reshab Ads verification (post-deploy)

## SEO

1. Open `https://www.boostmysites.com/sitemap.xml`
   - Must include: `/business-automation`, `/automation-case-studies`, `/automation-score`
   - Must not include: `/thank-you`, `/signup`, `/new-homepage-preview`, founder landings (`/rsb-*`, etc.), UUID `/case-study/{uuid}` URLs
2. Open `https://www.boostmysites.com/robots.txt`
   - Disallows `/thank-you`, `/ai-freelancing/thank-you`, `/signup`, `/new-homepage-preview`, `/automation-score/report`, founder landings
3. Visit a known UUID case-study URL from GSC → should land on `/case-study/{seo-slug}` with matching `<link rel="canonical">`
4. In Google Search Console, request indexing only for priority URLs:
   - `/`, `/business-automation`, `/automation-case-studies`, top `/work/*`
5. After a few days, Validate fix on the “Duplicate, Google chose different canonical” report

## Google Ads tags (no conflicts)

| Tag | Where it loads | Conversion |
|---|---|---|
| `AW-18249809652` (BMS) | Sitewide (`index.html`) | Homepage / BMS lead submit |
| `AW-18294430151` (Reshab) | `/business-automation` + `/thank-you` only (`ReshabGoogleAds.tsx`) | `/thank-you` when return path is `/business-automation` |
| `AW-10794572231` | Sitewide (legacy) | Unchanged |
| `G-6RG271FTBN` | Sitewide | GA4 pageviews |
| `GTM-PVFCC7LB` | Sitewide | Do not duplicate Reshab Ads conversion here |

### Tag Assistant checks

1. `/business-automation` → shows `AW-18294430151` config
2. `/` (homepage) → no Reshab config hit
3. Submit BA form → `/thank-you` → one Reshab conversion (`DwI_CJ7i2MscEMezu5NE`)
4. Submit homepage form → BMS conversion only; no Reshab conversion
5. Unlock `/automation-score/report` → no Reshab conversion

### GTM (manual)

In container `GTM-PVFCC7LB`: if any tag fires `AW-18294430151` or label `DwI_CJ7i2MscEMezu5NE`, remove it (keep the code path). One Conversion Linker is fine.
