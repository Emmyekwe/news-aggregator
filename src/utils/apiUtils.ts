export const fetchAPI = async <T>(url: string, errorMessage: string): Promise<T> => {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data as T;
  };
  