import { create } from 'zustand';
import { CardEntity } from '../../domain/models/CardEntity';
import { ModalContent } from '../../domain/models/ModalContent';

interface ModalData {
  contentType: ModalContent;
  data: CardEntity; // This should be a union of all possible data types
}

interface StoreState {
  modalData: ModalData | null;
  isModalOpen: boolean;
  openModal: (contentType: ModalContent, data: CardEntity) => void;
  closeModal: () => void;
}

export const useModalStore = create<StoreState>((set) => ({
  modalData: null,
  isModalOpen: false,
  openModal: (contentType, data) => set({ modalData: { contentType, data }, isModalOpen: true }),
  closeModal: () => set({ modalData: null, isModalOpen: false }),
}));