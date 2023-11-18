import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

export interface FilmCutReviewRegiModalProps {
  cutId: number
  isOpen: boolean
  onClose: () => void
}

export function FilmCutReviewRegiModal({
  cutId,
  isOpen,
  onClose,
}: FilmCutReviewRegiModalProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cutReviewInput: { cutId, contents: '' },
    },
  })
  function onSubmit(formData: any): void {
    console.log(formData)
  }
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>write review</ModalHeader>
        <ModalBody>
          <FormControl isInvalid={!!errors.cutReviewInput?.contents}>
            <Textarea
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('cutReviewInput.contents', {
                required: { value: true, message: 'review' },
                maxLength: {
                  value: 500,
                  message: 'limit:500',
                },
              })}
              placeholder="cut review"
            />
            <FormErrorMessage>
              {errors.cutReviewInput?.contents?.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button colorScheme="teal" type="submit">
              submit
            </Button>
            <Button onClick={onClose}>cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
