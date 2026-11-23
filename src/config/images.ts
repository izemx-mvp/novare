// All photo paths, served from /public/images. Never import photos from src:
// a missing file must never break the build (SmartImage renders a branded fallback).

export const images = {
  logo: "/images/logo.png",
  og: "/images/og-image.webp",
  homeHero: "/images/home/hero-bg.webp",
  trades: {
    climatisation: "/images/trades/climatisation.webp",
    plomberieChauffage: "/images/trades/plomberie-chauffage.webp",
    froidCuisine: "/images/trades/froid-cuisine.webp",
    maintenance: "/images/trades/maintenance.webp",
    electricite: "/images/trades/electricite.webp",
  },
  sectors: {
    hotellerie: "/images/sectors/hotellerie.webp",
    restaurationChr: "/images/sectors/restauration-chr.webp",
    residentiel: "/images/sectors/residentiel.webp",
    tertiaireBureaux: "/images/sectors/tertiaire-bureaux.webp",
    industrie: "/images/sectors/industrie.webp",
  },
  aboutHero: "/images/about/hero.webp",
  maintenanceHero: "/images/maintenance/hero.webp",
  depannageHero: "/images/depannage/hero.webp",
  carrieresHero: "/images/carrieres/hero.webp",
} as const;
