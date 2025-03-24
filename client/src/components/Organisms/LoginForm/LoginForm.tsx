'use client'

import styles from './LoginForm.module.css'
import { cormorantGaramond } from '@/utils/fonts'

import Input from '@/components/Molecules/Input/Input'
import Button from '@/components/Atoms/Button/Button'
import NavigateLink from '@/components/Atoms/NavigateLink/NavigateLink'
import RememberMeCheckBox from '@/components/Molecules/RememberMeCheckBox/RememberMeCheckBox'

import { use, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

import { cn } from '@/utils/cn'
import { login } from '@/actions/authentication'
import { useRouter } from 'next/navigation'

const initialState = {
    errors: {
        email: undefined,
        password: undefined,
        general: undefined,
    },
    success: undefined,
}

const LoginForm: React.FC = () => {
    const [state, formAction] = useFormState(login, initialState)
    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            router.push('/dashboard')
        }

        console.log(state)
    }, [state])

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
                    type="text"
                    placeholder="Email"
                    name="email"
                    error={state.errors?.email}
                />
                <div>
                    <Input
                        description="Password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        error={state.errors?.password}
                    />

                    <div className={styles.rememberForgotPassword}>
                        <RememberMeCheckBox />

                        <NavigateLink href="/forgot-password" color="primary">
                            Forgot password?
                        </NavigateLink>
                    </div>
                </div>
                {state?.errors?.general && (
                    <span className={styles.errorMessage}>
                        {state.errors.general}
                    </span>
                )}
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
