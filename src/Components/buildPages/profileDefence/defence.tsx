import { useState } from 'react'
import s from './defence.module.css'

const Defence = () => {
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')

	const submitPasswordChange = () => {
		// Проверяем, что оба поля заполнены
		if (oldPassword && newPassword) {
			fetch(
				`http://31.129.105.19/api/v1/replace-password?jwt=${localStorage.getItem(
					'token'
				)}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						old_password: oldPassword,
						new_password: newPassword,
					}),
				}
			).then((response) => {
				if (response.ok) {
					alert('Password has been changed!')
				} else {
					alert('An error occurred')
				}
			})
		} else {
			alert('Please complete all fields')
		}
	}

	return (
		<div className={s.pageContainer}>
			<h1 className={s.mainTitle}>Защита профиля</h1>
			<div className={s.passwordBox}>
				<h2 className={s.secondTitle}>Смена пароля</h2>
				<input
					className={s.input}
					type='password'
					placeholder='Старый пароль'
					onChange={(e) => setOldPassword(e.target.value)}
				/>
				<input
					className={s.input}
					type='password'
					placeholder='Новый пароль'
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<button className={s.btn} onClick={submitPasswordChange}>
					Сохранить
				</button>
			</div>
		</div>
	)
}

export default Defence
