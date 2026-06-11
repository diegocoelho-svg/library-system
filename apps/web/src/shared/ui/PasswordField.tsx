import { useState } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon } from './icons'
import { TextField, type TextFieldProps } from './TextField'

type PasswordFieldProps = Omit<
  TextFieldProps,
  'type' | 'leadingIcon' | 'trailingSlot'
>

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <TextField
      {...props}
      leadingIcon={<LockIcon />}
      trailingSlot={
        <button
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          className="grid w-11 cursor-pointer place-items-center self-stretch rounded-r-field text-faint hover:text-ink-soft"
          onClick={() => setVisible(current => !current)}
          type="button"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
      type={visible ? 'text' : 'password'}
    />
  )
}
