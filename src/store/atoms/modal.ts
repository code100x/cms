import { atom } from 'recoil';

export type ModalType = 'CreateVideoBookmark';

export interface ModalData {
  bookmarkedTime: number;
  contentId: number;
}
interface ModalStore {
  type: ModalType | null;
  data: ModalData | {};
  open: boolean;
}

export const modalState = atom<ModalStore>({
  key: 'modalOpener',
  default: {
    open: false,
    type: null,
    data: {},
  },
});
