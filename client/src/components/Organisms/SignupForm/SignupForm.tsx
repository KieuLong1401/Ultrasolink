'use client'

import styles from './SingupForm.module.css'
import { cormorantGaramond } from '@/utils/fonts'

import Input from '@/components/Molecules/Input/Input'
import Button from '@/components/Atoms/Button/Button'
import NavigateLink from '@/components/Atoms/NavigateLink/NavigateLink'

import { useEffect } from 'react'
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

const SignupForm: React.FC = () => {
    const [state, formAction] = useFormState(login, initialState)
    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            router.push('/dashboard')
        }
    }, [state])

    return (
        <>
            <div className={cn(styles.login, cormorantGaramond.className)}>
                <span>Already have account?</span>
                <NavigateLink href="/login" color="primary">
                    Login!
                </NavigateLink>
            </div>

            <form className={styles.formContainer} action={formAction}>
                <Input
                    description="Email"
                    type="text"
                    placeholder="Email"
                    name="signup[email]"
                    error={state.errors?.email}
                />
                <div>
                    <Input
                        description="Password"
                        type="password"
                        placeholder="Password"
                        name="signup[password]"
                        error={state.errors?.password}
                    />
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
                    Sign up
                </Button>
            </form>
        </>
    )
}

export default SignupForm
