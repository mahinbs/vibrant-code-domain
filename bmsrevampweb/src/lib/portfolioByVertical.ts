import { portfolio, type PortfolioItem } from "../data/portfolio";

const HEALTHCARE_KEYWORDS = ["health", "clinic", "medical", "patient"];

export function getFintechPortfolio(): PortfolioItem[] {
  return portfolio.filter((item) => {
    const haystack = `${item.industry} ${item.title}`.toLowerCase();
    return haystack.includes("fintech") || haystack.includes("bank");
  });
}

export function getHealthcarePortfolio(): PortfolioItem[] {
  return portfolio.filter((item) => {
    const haystack = `${item.industry} ${item.title}`.toLowerCase();
    return HEALTHCARE_KEYWORDS.some((keyword) => haystack.includes(keyword));
  });
}
