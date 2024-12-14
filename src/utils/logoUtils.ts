export const getClearbitLogoUrl = (appName: string, websiteUrl?: string) => {
  if (websiteUrl) {
    try {
      const domain = new URL(websiteUrl).hostname;
      return `https://logo.clearbit.com/${domain}`;
    } catch (e) {
      console.log(`Invalid website URL for ${appName}:`, e);
    }
  }
  
  const specialCases: { [key: string]: string } = {
    'Figma': 'https://www.figma.com/favicon.ico',
    'Adobe': 'https://www.adobe.com/favicon.ico',
    'Canva': 'https://www.canva.com/favicon.ico'
  };
  
  if (specialCases[appName]) {
    return specialCases[appName];
  }
  
  const domain = `${appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  return `https://logo.clearbit.com/${domain}`;
};

export const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null) return 'Prix non disponible';
  if (price === 0) return 'Gratuit';
  return `${price}€/mois`;
};