import { Nunito } from 'next/font/google'

import './globals.css'
import getCurrentUser from '@/actions/getCurrentUser'
import ClientOnly from '@/components/ClientOnly'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import RentModal from '@/components/modals/RentModal'
import SearchModal from '@/components/modals/SearchModal'
import Navbar from '@/components/navbar/Navbar'
import ToasterProvider from '@/providers/ToasterProvider'

const fonts = Nunito({ subsets: ['latin'] })

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone'
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const currentUser = await getCurrentUser()
	return (
		<html lang="pt-br">
			<body className={fonts.className}>
				<ClientOnly>
					<ToasterProvider />
					<SearchModal />
					<RegisterModal />
					<RentModal />
					<LoginModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	)
}
