'use client'

import styles from './LoginForm.module.css'
import { cormorantGaramond } from '@/utils/fonts'

import Input from '@/components/Molecules/Input/Input'
import Button from '@/components/Atoms/Button/Button'
import NavigateLink from '@/components/Atoms/NavigateLink/NavigateLink'
import RememberMeCheckBox from '@/components/Molecules/RememberMeCheckBox/RememberMeCheckBox'

import { useState } from 'react'
import { useFormState } from 'react-dom'

import { cn } from '@/utils/cn'
import { login } from '@/actions/authentication'

const initialState = {
    errors: {
        email: undefined,
        password: undefined,
    },
    success: undefined,
    data: undefined,
}

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [state, formAction] = useFormState(login, initialState)

    return (
        <>
            <div
                className={cn(
                    styles.createAccount,
                    cormorantGaramond.className
                )}
            >
                <span>No account yet?</span>
                <NavigateLink href="/signup" color="primary">
                    Create new account
                </NavigateLink>
            </div>

            <form className={styles.formContainer} action={formAction}>
                <Input
                    description="Email"
                    setValue={setEmail}
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    error={state?.errors?.email}
                />
                <div>
                    <Input
                        description="Password"
                        setValue={setPassword}
                        type="password"
                        placeholder="Password"
                        value={password}
                        name="password"
                        error={state?.errors?.password}
                    />

                    <div className={styles.rememberForgotPassword}>
                        <RememberMeCheckBox />

                        <NavigateLink href="/forgot-password" color="primary">
                            Forgot password?
                        </NavigateLink>
                    </div>
                </div>

                <Button
                    shape="square"
                    color="primary"
                    type="submit"
                    className={cn(
                        cormorantGaramond.className,
                        styles.submitButton
                    )}
                >
                    Login
                </Button>
            </form>
        </>
    )
}

export default LoginForm
