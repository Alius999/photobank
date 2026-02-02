"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function RegistrationPage() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const rePassword = formData.get("re-password") as string;
        const age = formData.get("age") as string;
        const nickname = formData.get("nickname") as string;

        const formObject = {
            email,
            password,
            rePassword,
            age,
            nickname: nickname || undefined
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObject)
        })

        if (response.ok) {
            setShowModal(true);
        } else {
            console.error("Failed to register user");
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        router.push('/login');
    }
    
    return(
        <>
            <section className="flex flex-col justify-center mx-auto min-w-112">
                <h1 hidden>Страница для регистрации пользователя</h1>
                <p className="text-center text-lg font-bold mb-8">Заполните форму регистрации ниже</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="email">Your E-mail</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="nickname">Nickname</label>
                        <input type="text" id="nickname" name="nickname" />
                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="re-password">Retype Password</label>
                        <input type="password" id="re-password" name="re-password" required />
                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="age">Your Age</label>
                        <input type="text" id="age" name="age" required />
                    </div>
                    <button type="submit" className={styles.submitBtn}>Register</button>
                </form>
            </section>

            {showModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Регистрация успешна!</h2>
                        <p>Теперь вы зарегистрированы, перейдите на страницу логина, чтобы попасть в свой профиль и начать загружать фотографии.</p>
                        <button onClick={handleCloseModal} className={styles.modalButton}>Перейти на страницу логина</button>
                    </div>
                </div>
            )}
        </>
    )
}