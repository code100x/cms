import { atom } from 'recoil';

export type ModalType = 'AllTimestampBookmark';

export interface ModalData {
  bookmarkedTime: number;
  contentId: number;
}
interface ModalStore {
  type: ModalType | null;
  data: any;
  open: boolean;
  bookmarkData: any;
}

export const DrawerState = atom<ModalStore>({
  key: 'drawerOpener',
  default: {
    open: false,
    type: null,
    data: {},
    bookmarkData: {},
  },
});
