import { Character, CharacterLinks, CharacterMeta } from "../models/Character";
import CharacterRepository from "../repositories/CharacterRepository";
import { getCharacter } from "./getCharacter";

it('should return Character object when repository successfully retrieves data for valid page number', async () => {
  // Arrange
  const mockRepository: CharacterRepository = {
    getCharacterList: jest.fn(),
    getCharacterFiltered: jest.fn()
  };

  const mockCharacter: Character = {
    links: {} as CharacterLinks,
    meta: {} as CharacterMeta,
    items: []
  };

  (mockRepository.getCharacterList as jest.Mock).mockResolvedValue(mockCharacter);

  const page = 1;

  // Act
  const result = await getCharacter(mockRepository, page);

  // Assert
  expect(mockRepository.getCharacterList).toHaveBeenCalledWith(page);
  expect(result).toEqual(mockCharacter);
});

// Handles page number 0 or negative page numbers
it('should handle zero or negative page numbers by passing them to repository', async () => {
  // Arrange
  const mockRepository: CharacterRepository = {
    getCharacterList: jest.fn(),
    getCharacterFiltered: jest.fn()
  };

  const mockCharacter: Character = {
    links: {} as CharacterLinks,
    meta: {} as CharacterMeta,
    items: []
  };

  (mockRepository.getCharacterList as jest.Mock).mockResolvedValue(mockCharacter);

  const page = -1;

  // Act
  const result = await getCharacter(mockRepository, page);

  // Assert
  expect(mockRepository.getCharacterList).toHaveBeenCalledWith(page);
  expect(result).toEqual(mockCharacter);
});