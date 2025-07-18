import { Yugioh } from "../../domain/models/YuGiOh";

export const fetchYugiOhList = async (): Promise<Yugioh[]> => {
  try {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validar que la respuesta tenga la estructura esperada
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid API response structure");
    }
    
    const dataSlice = data.data.slice(0, 100);
    return dataSlice;
  } catch (error) {
    console.error("Error fetching YugiOh list:", error);
    throw new Error("Failed to fetch YogiOhList");
  }
}

export const fetchYugiOhFiltered = async (query: string): Promise<Yugioh[]> => {
  try {
    // Validar que el query no esté vacío
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    // Encodear el query para evitar problemas con caracteres especiales
    const encodedQuery = encodeURIComponent(query.trim());
    
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodedQuery}`);
    
    if (!response.ok) {
      // Si es 400, probablemente no se encontraron resultados (comportamiento normal)
      if (response.status === 400) {
        // Solo log en development para debugging
        if (process.env.NODE_ENV === 'development') {
          console.info(`No YugiOh cards found for: "${query}"`);
        }
        return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validar que la respuesta tenga la estructura esperada
    if (!data.data || !Array.isArray(data.data)) {
      console.warn("Invalid API response structure for filtered search");
      return [];
    }
    
    return data.data;
  } catch (error) {
    // Solo log errores reales, no 400s que son normales
    if (error instanceof Error && !error.message.includes('400')) {
      console.error("Error fetching YugiOh filtered:", error);
    }
    return [];
  }
}