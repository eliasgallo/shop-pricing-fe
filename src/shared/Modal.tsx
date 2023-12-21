import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: fit-content;
  max-width: 80%;
`

interface ModalProps {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

export const Modal = ({
  open,
  onClose,
  children,
}: ModalProps): JSX.Element | null => {
  if (!open) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>{children}</ModalContainer>
    </ModalOverlay>
  )
}

// ConfirmationModal
const Title = styled.h2`
  margin: 0;
`

const ConfirmationsContainer = styled.div`
  display: flex;
  gap: 10px;
`

const ConfirmationButtons = styled.button`
  flex: 1 1 0px;
  width: 0;
`

type ConfirmationModalProps = {
  open: boolean
  onClose: () => void
  title: string
  confirm: () => void
}

export const ConfirmationModal = ({
  open,
  onClose,
  title,
  confirm,
}: ConfirmationModalProps): JSX.Element | null => {
  if (!open) return null
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Title>{title}</Title>
      <p>Are you sure?</p>
      <ConfirmationsContainer>
        <ConfirmationButtons onClick={onClose}>Cancel</ConfirmationButtons>
        <ConfirmationButtons onClick={confirm}>Yes</ConfirmationButtons>
      </ConfirmationsContainer>
    </Modal>
  )
}
