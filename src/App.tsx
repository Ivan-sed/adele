import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ICatalogProps, CardAdResponse } from './interfaces/Interfaces.js'
import './App.css'
import MainPage from './Components/buildPages/mainPage/MainPage.js'
import CardDetails from './Components/buildPages/cardinner/cardDetails.js'
import Catalog from './Components/buildPages/catalog/Catalog.js'
import Layout from './Components/buildPages/Layout.js'
import NewCard from './Components/buildPages/newCard/NewCard.js'
import Profile from './Components/buildPages/profileSetup/Profile.js'
import Summary from './Components/buildPages/summary/Summary.js'
import Settings from './Components/buildPages/settingsProfile/Settings.js'
import Defence from './Components/buildPages/profileDefence/defence.js'
import InfoProfile from './Components/buildPages/infoProfile/infoProfile.js'
import MyAds from './Components/buildPages/myAds/myAds.js'
import Worker from './Components/buildPages/worker/worker.js'
import Moderation from './Components/buildPages/moderation/moderation.js'
import Error401 from './Components/buildPages/401Error/401.js'
import ProfileMob from './Components/buildPages/profilePopupMob/ProfilePopupMob.js'

function App() {
	const [modalType, setModalType] = useState<'auth' | 'reg' | ''>('')
	const [isOpen, setIsOpen] = useState(false)
	const [citys, setCitys] = useState([])
	const [cardsArray, setCardsArray] = useState<ICatalogProps>()
	const [cards, setCards] = useState<CardAdResponse>()
	const [categoryForNewCard, setCategoryForNewCard] = useState('')
	const [underCategoryForNewCard, setUnderCategoryForNewCard] = useState('')
	const [page, setPage] = useState(1)
	const isLoggin = localStorage.getItem('status')
	useEffect(() => {
		console.log(isLoggin)
	}, [])

	useEffect(() => {
		fetch('http://31.129.105.19/api/v1/citys')
			.then((response) => response.json())
			.then((data) => setCitys(data.city))
			.catch((error) => console.log(error))

		fetch('http://31.129.105.19/api/v1/index-page')
			.then((responce) => responce.json())
			.then((data: CardAdResponse) => setCards(data))
	}, [])

	useEffect(() => {
		fetch('http://31.129.105.19/api/v1/index-category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				category: categoryForNewCard,
				sub_category: underCategoryForNewCard,
				page: page,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setCardsArray(data)
			})
			.catch((error) => {
				console.error('Ошибка:', error)
			})
	}, [categoryForNewCard, underCategoryForNewCard])

	useEffect(() => {
		console.log(cardsArray)
	}, [cardsArray])

	return (
		<Router>
			<div>
				<Layout
					citys={citys}
					setModalType={setModalType}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					modalType={modalType}
					setCategory={setCategoryForNewCard}
					setUnderCategory={setUnderCategoryForNewCard}
				>
					<Routes>
						<Route
							path='/'
							element={
								cards && (
									<MainPage
										card_ads_1={cards.card_ads_1}
										card_ads_2={cards.card_ads_2}
										card_no_ads_1={cards.card_no_ads_1}
										card_no_ads_2={cards.card_no_ads_2}
										status={cards.status}
									/>
								)
							}
						/>

						<Route
							path='/card/:id'
							element={
								cards && (
									<CardDetails
										card_ads_1={cards.card_ads_1 || []}
										card_ads_2={cards.card_ads_2 || []}
										card_no_ads_1={
											cards.card_no_ads_1 || []
										}
										card_no_ads_2={
											cards.card_no_ads_2 || []
										}
									/>
								)
							}
						/>
						<Route
							path='/catalog/'
							element={
								cardsArray && (
									<Catalog
										card_ads={cardsArray.card_ads}
										card_noads={cardsArray.card_noads}
										has_next_ads={cardsArray.has_next_ads}
										categorys_index={
											cardsArray.categorys_index
										}
										has_next_noads={
											cardsArray.has_next_noads
										}
										setPage={setPage}
										page_ads={cardsArray.page_ads}
										page_noads={cardsArray.page_noads}
										stasus={cardsArray.stasus}
										sub_category_all={
											cardsArray.sub_category_all
										}
										total_pages_ads={
											cardsArray.total_pages_ads
										}
										total_pages_noads={
											cardsArray.total_pages_noads
										}
									/>
								)
							}
						/>

						<Route
							path='/new-card/'
							element={
								isLoggin ? (
									<NewCard
										category={categoryForNewCard}
										underCategory={underCategoryForNewCard}
									/>
								) : (
									<Error401 />
								)
							}
						/>

						<Route
							path='/profile/'
							element={
								isLoggin ? (
									<Profile citys={citys} />
								) : (
									<Error401 />
								)
							}
						/>

						<Route
							path='/summary/'
							element={isLoggin ? <Summary /> : <Error401 />}
						/>
						<Route
							path='/settings/'
							element={isLoggin ? <Settings /> : <Error401 />}
						/>
						{/* Дима */}
						<Route
							path='/defence/'
							element={isLoggin ? <Defence /> : <Error401 />}
						/>
						{/* Стили и город */}
						<Route
							path='/info-profile'
							element={isLoggin ? <InfoProfile /> : <Error401 />}
						/>
						<Route
							path='/my-ads/'
							element={isLoggin ? <MyAds /> : <Error401 />}
						/>
						<Route
							path='/worker/'
							element={isLoggin ? <Worker /> : <Error401 />}
						/>
						<Route
							path='/moderation/'
							element={isLoggin ? <Moderation /> : <Error401 />}
						/>
						<Route
							path='/profile-mob/'
							element={<ProfileMob/>}
						/>
					</Routes>
				</Layout>
			</div>
		</Router>
	)
}
export default App
