"use client";
import styles from "./page.module.css";

export default function RegistrationPage() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const rePassword = formData.get("re-password") as string;
        const age = formData.get("age") as string;

        const formObject = {
            email,
            password,
            rePassword,
            age
        }

        console.log(formObject);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObject)
        })

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Failed to register user");
        }
    }
    
    return(
        <section className="flex flex-col justify-center mx-auto min-w-112">
            <h1 hidden>Страница для логина пользователя</h1>
            <p className="text-center text-lg font-bold mb-8">Заполните форму логина ниже</p>
            <form onSubmit={handleSubmit}>
                <div className={styles.fieldContainer}>
                    <label htmlFor="email">Your E-mail</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className={styles.fieldContainer}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div className={styles.fieldContainer}>
                    <label htmlFor="password">Retype Password</label>
                    <input type="password" id="re-password" />
                </div>
                <div className={styles.fieldContainer}>
                    <label htmlFor="age">Your Age</label>
                    <input type="text" id="age" name="age" />
                </div>
                <button type="submit" className={styles.submitBtn}>Login</button>
            </form>
        </section>
    )
}