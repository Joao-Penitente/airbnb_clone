import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const body = await request.json()
	const {
		title,
		description,
		imageSrc,
		category,
		roomCount,
		bathroomCount,
		guestCount,
		location,
		price
	} = body

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			NextResponse.error()
		}
	})

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			imageSrc,
			category,
			roomCount,
			bathroomCount,
			guestCount,
			locationValue: location.value,
			price: parseInt(price, 10),
			userId: currentUser.id
		}
	})

	return NextResponse.json(listing)
}
