import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/Register.module.css'; // Ensure the path is correct

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

   // Modify the handleSubmit function in Register component
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        sessionStorage.setItem('username', username); // Save username in session storage
        router.push('/welcome'); // Redirect to welcome page
    } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
    }
};

    return (
        <div className={styles.container}>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <h1 className={styles.registerTitle}>Register</h1>
                {error && <p className={styles.error}>{error}</p>}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className={styles.registerButton}>Register</button>
            </form>
        </div>
    );
};

export default Register;
