import { useState, FormEvent } from 'react';
import styles from './styles/Login.module.css';
import { useRouter } from 'next/router'; // Import useRouter

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem('username', username); // Store username in sessionStorage
            router.push('/welcome'); // Redirect to welcome page
        } else {
            alert(data.message); // Alert the error message
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className={styles.button} type="submit">Login</button>
            </form>
            <div className={styles.footer}>
                <p>Don't have an account? <a href="/register" style={{ color: 'aliceblue' }}>Register</a></p>
            </div>
        </div>
    );
};

export default Login;
