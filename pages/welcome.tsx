// pages/welcome.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/Welcome.module.css';

const Welcome = () => {
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        const user = sessionStorage.getItem('username');
        if (user) {
            setUsername(user);
        } else {
            router.push('/login'); // Redirect to login if username not found
        }
    }, [router]);

    const handleLogout = async () => {
        // Clear username from session storage
        sessionStorage.removeItem('username'); 
        // Redirect to the register page
        router.push('/register'); 
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.welcomeTitle}>Welcome, {username}!</h1>
            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Welcome;
