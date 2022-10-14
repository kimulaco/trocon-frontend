import React, { memo, FC } from 'react'
import { Flex, Box, Link, Skeleton, ChakraProps } from '@chakra-ui/react'
import { UserIcon } from '@/components/atoms/UserIcon/'
import { User } from '@/types/steam'

export type UserProfileProps = {
  user?: User
  isLoading?: boolean
  chakra?: ChakraProps
}

export const UserProfile: FC<UserProfileProps> = memo(function UserProfile ({
  user,
  isLoading = false,
  chakra = {},
}: UserProfileProps) {
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      {...chakra || {}}
    >
      <Link
        as={isLoading ? 'div' : 'a'}
        target={isLoading ? undefined : '_blank'}
        href={user?.profileUrl || ''}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <UserIcon
          src={user?.avatarFull || ''}
          isLoading={isLoading}
        />

        <Skeleton
          display={isLoading ? 'block' : 'none'}
          h='20px'
          mt='2'
        />
        <Box
          display={isLoading ? 'none' : 'block'}
          fontSize='xl'
          mt='2'
        >{user?.personaName || ''}</Box>
      </Link>
    </Flex>
  )
})
