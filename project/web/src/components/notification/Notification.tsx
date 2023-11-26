import { useNotificationsQuery } from '../../generated/graphql'
import {
  IconButton,
  Menu,
  MenuButton,
  Box,
  MenuList,
  Text,
  MenuDivider,
  CircularProgress,
} from '@chakra-ui/react'
import { FaBell } from 'react-icons/fa'
import NotificationItem from './NotificationItem'
function Notification(): React.ReactElement {
  const { data, loading } = useNotificationsQuery()
  return (
    <Menu placement="bottom-end" closeOnSelect={false} isLazy>
      <Box position="relative">
        <MenuButton
          as={IconButton}
          size={'md'}
          fontSize={'lg'}
          variant={'ghost'}
          color={'current'}
          icon={<FaBell />}
          aria-label="open notification popover"
        />
      </Box>
      <MenuList maxH={350} maxW={400} overflow={'auto'} w={'100%'}>
        <Text px={4} py={2}>
          notification list
        </Text>
        <MenuDivider />

        {loading ? (
          <CircularProgress isIndeterminate />
        ) : (
          <>
            {!data || data?.notifications.length === 0 ? (
              <Text px={4} py={2}>
                No notifications
              </Text>
            ) : (
              data?.notifications.map((noti) => (
                <NotificationItem key={noti.id} notification={noti} />
              ))
            )}
          </>
        )}
      </MenuList>
    </Menu>
  )
}

export default Notification
