import { useParams } from 'react-router-dom'
import CommonLayout from '../components/CommonLayout'
import React, { useState } from 'react'

import { useFilmQuery } from '../generated/graphql'
import { Box, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import FilmDetail from '../components/film/FilmDetail'
import FilmCutList from '../components/film-cut/FilmCutList'
import FilmCutModal from '../components/film-cut/FilmCutModal'

interface FilmPageParams {
  //  filmId: string;
  [key: string]: string | undefined
}

function Film(): React.ReactElement {
  const { filmId } = useParams<FilmPageParams>()
  const { data, loading, error } = useFilmQuery({
    variables: { filmId: Number(filmId) },
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCutId, setSelectedCutId] = useState<number>()
  const handleCutSelect = (cutId: number) => {
    setSelectedCutId(cutId)
    onOpen()
  }
  return (
    <CommonLayout>
      {loading && <Spinner />}
      {error && <Text>페이지를 표시할 수 없습니다</Text>}
      {filmId && data?.film ? (
        <>
          <FilmDetail film={data.film} />
          <Box mt={12}>
            <FilmCutList filmId={data.film.id} onClick={handleCutSelect} />
          </Box>
        </>
      ) : (
        <Text>페이지를 표시할 수 없습니다</Text>
      )}
      {!selectedCutId ? null : (
        <FilmCutModal open={isOpen} onClose={onClose} cutId={selectedCutId} />
      )}
    </CommonLayout>
  )
}

export default Film
