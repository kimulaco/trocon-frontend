import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { UserSearchForm } from '.'

const handleOnSubmit = vi.fn()

describe('<UserSearchForm>', () => {
  beforeEach(() => {
    handleOnSubmit.mockClear()
  })

  it('should submit if input value is valid', async () => {
    const TEST_VALUE = '12345678901234567'

    const { getByRole, getByTestId } = render(<UserSearchForm onSubmit={handleOnSubmit} />)

    const textbox = getByRole('textbox') as HTMLInputElement
    await fireEvent.change(textbox, { target: { value: TEST_VALUE } })
    expect(textbox.value).toBe(TEST_VALUE)

    const submit = getByTestId('submit')
    await fireEvent.click(submit)
    expect(textbox.getAttribute('aria-invalid')).toBeNull()
    expect(handleOnSubmit.mock.calls[0][0]).toBe(TEST_VALUE)
  })

  it('should show error if input value is empty', async () => {
    const TEST_VALUE = ''

    const { getByRole, getByTestId, queryByTestId } = render(
      <UserSearchForm onSubmit={handleOnSubmit} />,
    )

    const textbox = getByRole('textbox') as HTMLInputElement
    await fireEvent.change(textbox, { target: { value: TEST_VALUE } })
    expect(textbox.value).toBe(TEST_VALUE)

    const submit = getByTestId('submit')
    await fireEvent.click(submit)
    expect(textbox.getAttribute('aria-invalid')).toBe('true')
    expect(handleOnSubmit).not.toHaveBeenCalled()

    const errorMessage = getByTestId('error-message')
    expect(errorMessage.textContent).toBe('Steam IDを入力してください。')

    await fireEvent.change(textbox, { target: { value: '1' } })
    expect(queryByTestId('error-message')).toBeNull()
  })

  it('should show error if input value is invalid', async () => {
    const TEST_VALUE = 'xxxxxxxxxxxxxxxxx'

    const { getByRole, getByTestId } = render(<UserSearchForm onSubmit={handleOnSubmit} />)

    const textbox = getByRole('textbox') as HTMLInputElement
    await fireEvent.change(textbox, { target: { value: TEST_VALUE } })
    expect(textbox.value).toBe(TEST_VALUE)

    const submit = getByTestId('submit')
    await fireEvent.click(submit)
    expect(textbox.getAttribute('aria-invalid')).toBe('true')
    expect(handleOnSubmit).not.toHaveBeenCalled()

    const errorMessage = getByTestId('error-message')
    expect(errorMessage.textContent).toBe('Steam IDは17桁の数字である必要があります。')
  })

  it('should hide error if update input value', async () => {
    const TEST_VALUE = ''

    const { getByRole, getByTestId, queryByTestId } = render(
      <UserSearchForm onSubmit={handleOnSubmit} />,
    )

    const textbox = getByRole('textbox') as HTMLInputElement
    expect(textbox.getAttribute('aria-invalid')).toBeNull()
    await fireEvent.change(textbox, { target: { value: TEST_VALUE } })

    const submit = getByTestId('submit')
    await fireEvent.click(submit)
    expect(textbox.getAttribute('aria-invalid')).toBe('true')
    expect(queryByTestId('error-message')).not.toBeNull()

    await fireEvent.change(textbox, { target: { value: '1' } })
    expect(textbox.getAttribute('aria-invalid')).toBeNull()
    expect(queryByTestId('error-message')).toBeNull()
  })

  it('should show popover when clicked help button', async () => {
    const { getByTestId } = render(<UserSearchForm />)

    const help = getByTestId('help')
    expect(help.getAttribute('aria-expanded')).toBe('false')

    const popoverContent = getByTestId('popover-content')
    expect(popoverContent.style.visibility).toBe('hidden')

    await fireEvent.click(help)
    expect(help.getAttribute('aria-expanded')).toBe('true')

    await waitFor(() => {
      expect(popoverContent.style.visibility).toBe('visible')
    })
  })
})
