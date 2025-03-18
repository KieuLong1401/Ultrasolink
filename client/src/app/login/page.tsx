import styles from './page.module.css'

import LoginForm from '@/components/Organisms/LoginForm/LoginForm'

export default function Home() {
    return (
        <div>
            <h1 className={styles.header}>Welcome Back!</h1>

            <LoginForm />
        </div>
    )
}
