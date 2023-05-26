import getCurrentUser from '@/actions/getCurrentUser'
import getListingById from '@/actions/getListingById'
import getReservations from '@/actions/getReservations'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'

import ListingClient from './ListingClient'

interface IParams {
	listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params)
	const currentUser = await getCurrentUser()
	const reservations = await getReservations(params)

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		)
	}

	return (
		<div>
			<ClientOnly>
				<ListingClient
					listing={listing}
					currentUser={currentUser}
					reservations={reservations}
				/>
			</ClientOnly>
		</div>
	)
}

export default ListingPage
