import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCountries } from "./useCountries";

// Mock de CountryRepositoryImp como una clase
jest.mock('../../infrastructure/repositories/CountryRepositoryImp', () => {
  return jest.fn().mockImplementation(() => ({
    getCountryList: jest.fn().mockResolvedValue(['country1', 'country2']),
    getCountryFiltered: jest.fn().mockResolvedValue(['filteredCountry']),
  }));
});

// Mock de useQuery
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'), // Mantén las implementaciones reales excepto las que mockeas
  useQuery: jest.fn(),
}));

// Mock de CountryStore
jest.mock('../../infrastructure/stores/CountryStore', () => ({
  useCountryStore: () => ({
    setCountries: jest.fn(),
    setFilteredCountries: jest.fn(),
  }),
}));

describe('useCountries', () => {
  // Crea un QueryClient para las pruebas
  const queryClient = new QueryClient();

  // Envuelve el hook en un QueryClientProvider
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    // Limpia los mocks antes de cada test
    jest.clearAllMocks();
  });

  it('should return allCountries and countriesFiltered query objects', async () => {
    // Arrange
    const mockQuery = "test";

    // Mock de useQuery para devolver datos simulados
    const useQueryMock = require('@tanstack/react-query').useQuery as jest.Mock;
    useQueryMock.mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'countries' && !queryKey[1]) {
        return { data: ['country1', 'country2'], isLoading: false };
      }
      if (queryKey[0] === 'countries' && queryKey[1] === 'filtered') {
        return { data: ['filteredCountry'], isLoading: false };
      }
      return {};
    });

    // Act
    const { result } = renderHook(() => useCountries({ query: mockQuery }), { wrapper });

    // Assert
    await waitFor(() => {
      expect(result.current).toHaveProperty('allCountries');
      expect(result.current).toHaveProperty('countriesFiltered');
      expect(result.current.allCountries).toEqual({ data: ['country1', 'country2'], isLoading: false });
      expect(result.current.countriesFiltered).toEqual({ data: ['filteredCountry'], isLoading: false });
    });
  });
});