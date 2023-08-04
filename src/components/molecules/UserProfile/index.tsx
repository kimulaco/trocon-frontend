import React, { memo, FC } from 'react'
import { ChakraProps } from '@chakra-ui/react'
import { Flex, Box, Skeleton, SkeletonText } from '@/components/chakra/'
import { UserIcon } from '@/components/atoms/UserIcon/'
import { User } from '@/types/steam'

export type UserProfileProps = {
  user?: User
  isLoading?: boolean
  chakra?: ChakraProps
}

export const UserProfile: FC<UserProfileProps> = memo(function UserProfile({
  user,
  isLoading = false,
  chakra = {},
}: UserProfileProps) {
  return (
    <Flex w='100%' pt='50px' pb='50px' px='3' mx='auto' {...(chakra || {})}>
      {isLoading && (
        <Flex alignItems='center' data-testid='skeleton'>
          <Skeleton w='92px' h='92px' />
          <SkeletonText noOfLines={1} mt='4' />
        </Flex>
      )}

      {!isLoading && (
        <Flex alignItems='center'>
          <UserIcon
            src={user?.avatarFull || ''}
            isLoading={isLoading}
            chakra={{
              border: '1px solid',
              borderColor: 'gray.100',
              boxShadow: 'sm',
            }}
          />
          <Box fontSize='lg' ml='4' data-testid='user-name'>
            {user?.personaName || ''}
          </Box>
        </Flex>
      )}
    </Flex>
  )
})
