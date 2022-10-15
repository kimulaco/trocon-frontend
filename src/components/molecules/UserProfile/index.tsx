import React, { memo, FC } from 'react'
import { Link, ChakraProps } from '@chakra-ui/react'
import { Flex, Box, Skeleton, SkeletonText } from '@/components/chakra/'
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
      w='100%'
      pt={4}
      flexDirection='column'
      justify='center'
      alignItems='center'
      {...chakra || {}}
    >
      {isLoading && (
        <Box>
          <Skeleton w='92px' h='92px' />
          <SkeletonText noOfLines={1} mt='4' />
        </Box>
      )}

      {!isLoading && (
        <Link
          target='_blank'
          href={user?.profileUrl || ''}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <UserIcon
            src={user?.avatarFull || ''}
            isLoading={isLoading}
          />
          <Box
            fontSize='md'
            mt='2'
          >{user?.personaName || ''}</Box>
        </Link>
      )}
    </Flex>
  )
})
