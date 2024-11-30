export function extractAmount(text: string): number | null {
  if (!text) return null;
  
  const patterns = [
    /Total\s*:\s*(\d+(?:[.,]\d{2})?)\s*(?:€|EUR)/i,
    /Montant\s*(?:total|TTC)?\s*:\s*(\d+(?:[.,]\d{2})?)\s*(?:€|EUR)/i,
    /(\d+(?:[.,]\d{2})?)\s*(?:€|EUR)/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const amount = match[1].replace(',', '.');
      return parseFloat(amount);
    }
  }
  
  return null;
}

export function extractDate(text: string): string | null {
  if (!text) return null;

  const patterns = [
    /(\d{1,2})\s*(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s*(\d{4})/i,
    /(\d{1,2})[/-](\d{1,2})[/-](\d{4})/,
    /(\d{4})-(\d{1,2})-(\d{1,2})/
  ];

  const monthMap: { [key: string]: string } = {
    'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
    'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
    'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
  };

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      if (match[2] in monthMap) {
        const day = match[1].padStart(2, '0');
        const month = monthMap[match[2].toLowerCase()];
        const year = match[3];
        return `${year}-${month}-${day}`;
      } else if (match[0].includes('-') || match[0].includes('/')) {
        const parts = match[0].split(/[-/]/);
        if (parts[0].length === 4) {
          return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
        } else {
          return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
      }
    }
  }
  
  return null;
}

export function extractMerchantName(text: string): string | null {
  if (!text) return null;

  const lines = text.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && 
        trimmed.length > 2 && 
        !trimmed.match(/^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/) && 
        !trimmed.match(/^\d+(?:[.,]\d{2})?\s*(?:€|EUR)$/i)) {
      return trimmed;
    }
  }
  
  return null;
}