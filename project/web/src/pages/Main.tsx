import CommonLayout from '../components/CommonLayout'
import FilmList from '../components/film/FilmList'
import { Heading } from '@chakra-ui/react'
export default function Main(): React.ReactElement {
  return (
    <CommonLayout>
      <Heading>와!!!</Heading>

      <FilmList />
    </CommonLayout>
  )
}
