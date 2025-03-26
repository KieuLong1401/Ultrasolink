import SignupForm from '@/components/Organisms/SignupForm/SignupForm'
import styles from './page.module.css'

export default function SignUp() {
    return (
        <div>
            <h1 className={styles.header}>Create Account</h1>

            <SignupForm />
        </div>
    )
}
