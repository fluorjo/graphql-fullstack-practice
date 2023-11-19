import React, { useRef } from 'react'
import { CutQuery, useDeleteCutReviewMutation } from '../../generated/graphql'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

interface FilmCutReviewDeleteAlertProps {
  target?: CutQuery['cutReviews'][0]
  isOpen: boolean
  onClose: () => void
}

function FilmCutReviewDeleteAlert({
  target,
  isOpen,
  onClose,
}: FilmCutReviewDeleteAlertProps): React.ReactElement {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [deleteCutReview] = useDeleteCutReviewMutation()
  async function handleDelete() {
    if (target) {
      await deleteCutReview({
        variables: { id: target.id },
        update: (cache) => {
          cache.evict({ id: `cutReview:${target.id}` })
        },
      })
      onClose()
    }
  }
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize={'1g'} fontWeight={'bold'}>
            {' '}
            delete review
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this review?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              cancel
            </Button>
            <Button colorScheme={'red'} onClick={handleDelete} ml={3}>
              delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
export default FilmCutReviewDeleteAlert
