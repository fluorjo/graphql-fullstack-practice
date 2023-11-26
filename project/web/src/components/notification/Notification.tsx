import {
  NewNotificationDocument,
  NewNotificationSubscription,
  useNotificationsQuery,
} from '../../generated/graphql'
import {
  IconButton,
  Menu,
  MenuButton,
  Box,
  MenuList,
  Text,
  MenuDivider,
  CircularProgress,
  useToast,
} from '@chakra-ui/react'
import { FaBell } from 'react-icons/fa'
import NotificationItem from './NotificationItem'
import { useEffect } from 'react'
function Notification(): React.ReactElement {
  const { data, loading, subscribeToMore } = useNotificationsQuery()

  const toast = useToast({
    position: 'top-right',
    isClosable: true,
    status: 'info',
  })
  useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore<NewNotificationSubscription>({
        document: NewNotificationDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const newNoti = subscriptionData.data.newNotification
          toast({
            title: `새 알림이 도착했습니다`,
            description:
              newNoti.text.length > 30
                ? `${newNoti.text.slice(0, 30)}...`
                : newNoti.text,
          })
          return {
            __typename: 'Query',
            notifications: [newNoti, ...prev.notifications],
          }
        },
      })
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeToMore])

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
