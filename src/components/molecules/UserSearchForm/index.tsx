import React, { useState, useCallback, memo } from 'react'
import type { FC, FormEvent, ChangeEvent } from 'react'
import {
  Flex,
  Link,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { QuestionIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { isValidSteamId, STEAM_ID_HELP_URL } from './validate'

export type UserSearchFormProps = {
  onSubmit?: (value: string) => void
}

const ERROR_MESSAGES = {
  EMPTY: 'Steam IDを入力してください。',
  INVALID: 'Steam IDは17桁の数字である必要があります。',
} as const

export const UserSearchForm: FC<UserSearchFormProps> = memo(function UserSearchForm({
  onSubmit,
}: UserSearchFormProps) {
  const [searchValue, setSearchValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<keyof typeof ERROR_MESSAGES | ''>('')

  const handleSubmitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!searchValue) {
        setErrorMessage('EMPTY')
        return
      }

      if (!isValidSteamId(searchValue)) {
        setErrorMessage('INVALID')
        return
      }

      if (typeof onSubmit === 'function') {
        onSubmit(searchValue)
      }
    },
    [searchValue, errorMessage],
  )

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')
    setSearchValue(event.target.value)
  }, [])

  return (
    <form onSubmit={handleSubmitForm} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <FormControl isInvalid={!!errorMessage}>
        <Flex alignItems='center' justifyContent='center'>
          <FormLabel>Steam IDを入力して実績の達成状況を確認する</FormLabel>

          <Popover>
            <PopoverTrigger>
              <Flex as='button' type='button' aria-label='Steam IDとは' mb='2' data-testid='help'>
                <QuestionIcon />
              </Flex>
            </PopoverTrigger>
            <PopoverContent data-testid='popover-content'>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Steam IDとは</PopoverHeader>
              <PopoverBody>
                Steam IDはユーザー固有の17桁の数字です。
                <br />
                Steam IDの確認方法や詳細は
                <Link href={STEAM_ID_HELP_URL} color='teal.500' isExternal>
                  Steamのサポートページ <ExternalLinkIcon />
                </Link>
                を参照ください。
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>

        <Input
          type='text'
          placeholder='76561198#########'
          value={searchValue}
          onChange={handleChangeInput}
        />

        <FormErrorMessage data-testid='error-message'>
          {errorMessage ? ERROR_MESSAGES[errorMessage] : ' '}
        </FormErrorMessage>
      </FormControl>

      <Flex justifyContent='center' mt='6'>
        <Button type='submit' colorScheme='teal' data-testid='submit'>
          Search
        </Button>
      </Flex>
    </form>
  )
})
