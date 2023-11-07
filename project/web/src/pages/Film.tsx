import { useParams } from 'react-router-dom'
import CommonLayout from '../components/CommonLayout'
import React from 'react'
import { useFilmQuery } from '../generated/graphql'
import { Box, Spinner, Text } from '@chakra-ui/react'

interface FilmPageParams {
  //  filmId: string;
  [key: string]: string | undefined;
}

function Film(): React.ReactElement {
  const { filmId } = useParams<FilmPageParams>()
  const { data, loading, error } = useFilmQuery({
    variables: { filmId: Number(filmId) },
  })
  return (
    <CommonLayout>
      {loading && <Spinner />}
      {error && <Text>페이지를 표시할 수 없습니다</Text>}
      <Box>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </CommonLayout>
  )
}

export default Film
