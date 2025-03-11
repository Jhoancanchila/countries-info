import { characterRepositoryImp } from "./CharacterRepositoryImp";
import { fetchCharacterList } from '../api/CharacterApi'; // Importa la función real para tipado

// Mock de la API
jest.mock('../api/CharacterApi', () => ({
  fetchCharacterList: jest.fn(), // Mockea fetchCharacterList
}));

describe('CharacterRepositoryImp', () => {
  const mockCharacterData = {
    info: { count: 10 },
    results: [{ id: 1, name: 'Goku' }],
  };

  beforeEach(() => {
    // Limpia los mocks antes de cada test
    jest.clearAllMocks();
  });

  it('should return character data when fetchCharacterList succeeds', async () => {
    // Arrange
    (fetchCharacterList as jest.Mock).mockResolvedValue(mockCharacterData); // Simula una respuesta exitosa

    const repository = characterRepositoryImp();

    // Act
    const result = await repository.getCharacterList(1);

    // Assert
    expect(fetchCharacterList).toHaveBeenCalledWith(1); // Verifica que se llamó con el parámetro correcto
    expect(result).toEqual(mockCharacterData); // Verifica que el resultado es el esperado
  });

  it('should throw an error when fetchCharacterList fails', async () => {
    // Arrange
    const mockError = new Error('API Error');
    (fetchCharacterList as jest.Mock).mockRejectedValue(mockError); // Simula un error

    const repository = characterRepositoryImp();

    // Act & Assert
    await expect(repository.getCharacterList(1)).rejects.toThrow('API Error'); // Verifica que se lanza el error
  });
});