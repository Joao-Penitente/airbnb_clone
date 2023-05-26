'use client'

import { ReactNode, useEffect, useState } from 'react'

interface ClientOnlyProps {
	children: ReactNode
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) {
		return null
	}

	return <>{children}</>
}

export default ClientOnly
