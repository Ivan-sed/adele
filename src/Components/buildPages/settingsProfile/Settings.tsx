import { NavLink } from 'react-router-dom'
import s from './Settings.module.css'
import { useState, useEffect } from 'react'
interface settingsFetch {
	username: string
	phone: string
	status: boolean
}
function Settings() {
	const [line, setLine] = useState(false)
	const [settingsData, setSettingsData] = useState<settingsFetch>()
	

	useEffect(() => {
		fetch(
			`http://31.129.105.19/api/v1/profile-management?jwt=${localStorage.getItem(
				'token'
			)}`
		)
			.then((response) => response.json())
			.then((data:settingsFetch) => setSettingsData(data))
	}, [])

	return (
		<div className={s.settingsSection}>
			<h1 className={s.mainTitle}>Управление профилем</h1>
			<div className={s.selectorBox}>
				<div className={`${s.slider} ${s.sliderOptions}`}>
					<div className={s.selectContainer}>
						<h2
							onClick={() => setLine(false)}
							className={s.sliderTextItem}
						>
							Основные данные
						</h2>
						{line ? (
							<div className={s.lineUnActive}></div>
						) : (
							<div className={s.lineActive} />
						)}
					</div>
					<div className={s.selectContainer}>
						<h3
							onClick={() => setLine(true)}
							className={`${s.sliderTextItem} ${s.sliderMargin}`}
						>
							Вид профиля
						</h3>
						{line ? (
							<div className={s.lineActive} />
						) : (
							<div className={s.lineUnActive}></div>
						)}
					</div>
				</div>
			</div>
			<div className={s.sectionBox}>
				<div className={`${s.firstLineContainer} ${s.lineContainer}`}>
					<p className={s.lineInfo}>Номер в профиле:</p>
					<p className={s.lineInfo}>Имя в профиле:</p>
				</div>
				<div className={`${s.firstLineContainer} ${s.lineContainer}`}>
					<p className={s.lineInfo}>{settingsData?.phone}</p>
					<p className={s.lineInfo}>{settingsData?.username}</p>
				</div>
				<div className={`${s.firstLineContainer} ${s.lineContainer}`}>
					<NavLink to={'/profile/'}>
						<p className={s.lineLink}>Посмотреть</p>
					</NavLink>
					<NavLink to={'/profile/'}>
						<p className={s.lineLink}>Изменить профиль</p>
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Settings
