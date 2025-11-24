export type DeleteModalProps = {
  handleCloseModal: () => void;
  handleAction: () => void;
  title: string;
  subtitle: string;
  actiontitle: string;
  isDeleting?: boolean;
};
