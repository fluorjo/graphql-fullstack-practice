import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
  Avatar,
  useColorModeValue,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { useMeQuery, useLogoutMutation } from '../../generated/graphql'
import { useMemo } from 'react'
import { idText } from 'typescript'
import { useApolloClient } from '@apollo/client'

const LoggedInNavbarItem = (): JSX.Element => {
  const client = useApolloClient()
  const [logout, { loading: logoutLoading }] = useLogoutMutation()

  async function onLogoutClick() {
    try {
      await logout()
      localStorage.removeItem('access_token')
      await client.resetStore()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Stack
      justify="flex-end"
      alignItems={'center'}
      direction={'row'}
      spacing={3}
    >
      <ColorModeSwitcher />
      <Menu>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
        >
          <Avatar size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem isDisabled={logoutLoading} onClick={onLogoutClick}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  )
}

export default function Navbar(): JSX.Element {
  const accessToken = localStorage.getItem('access_token')
  const { data } = useMeQuery({ skip: !accessToken })
  const isLoggedIn = useMemo(() => {
    if (accessToken) return data?.me?.id
    return false
  }, [accessToken, data?.me?.id])
  return (
    <Box
      zIndex={10}
      position={'fixed'}
      w="100%"
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      py={{ base: 2 }}
      px={{ base: 4 }}
    >
      <Flex
        maxW={960}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        align="center"
        m="auto"
      >
        <Flex flex={{ base: 1, md: 'auto' }}>
          <Link
            as={RouterLink}
            to="/"
            fontFamily="heading"
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'white')}
          >
            지브리 베스트 컷
          </Link>
        </Flex>

        {isLoggedIn ? (
          <LoggedInNavbarItem />
        ) : (
          <Stack justify={'flex-end'} direction={'row'} spacing={6}>
            <ColorModeSwitcher />
            <Button
              fontSize={'sm'}
              fontWeight={'400'}
              variant={'link'}
              as={RouterLink}
              to="/login"
            >
              로그인
            </Button>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={'600'}
              as={RouterLink}
              colorScheme={'teal'}
              to="/signup"
            >
              시작하기
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  )
}
