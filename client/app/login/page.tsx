"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const formObject = {
            email,
            password,
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formObject),
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const loginResult = await response.json();
        console.log(loginResult);

        const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
            credentials: 'include',
        });

        if (profileResponse.ok) {
            const profile = await profileResponse.json();
            console.log('Profile', profile);
            router.push('/profile');
        }
    };

    return(
        <section className="flex flex-col justify-center mx-auto min-w-96">
            <h1 hidden>Страница для логина пользователя</h1>
            <p className="text-center text-lg font-bold mb-8">Заполните форму логина ниже</p>
            <form onSubmit={handleLogin}>
                <div className={styles.fieldContainer}>
                    <label htmlFor="email">Your E-mail</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className={styles.fieldContainer}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit" className={styles.submitBtn}>Login</button>
            </form>
        </section>
    )
}