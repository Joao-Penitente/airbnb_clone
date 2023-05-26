/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const LoginModal = () => {
	const router = useRouter()
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)
		signIn('credentials', {
			...data,
			redirect: false
		}).then((callback) => {
			setIsLoading(false)
			if (callback?.ok) {
				toast.success('Logged in successfully!')
				router.refresh()
				loginModal.onClose()
			}
			if (callback?.error) {
				toast.error(callback.error)
			}
		})
	}

	const toggleModal = useCallback(() => {
		loginModal.onClose()
		registerModal.onOpen()
	}, [loginModal, registerModal])

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back" subtitle="Login to your account!" />
			<Input
				id="email"
				label="Email"
				type="email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)
	const footerContent = (
		<div className="flex flex-col gap-3 mt-3">
			<hr />
			<Button
				outline
				label="Continue with google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div
				className="
                text-neutral-500
                text-center
                mt-4
                font-light
                "
			>
				<div className="flex flex-row items-center gap-2 justify-center">
					<div>First time using Airbnb?</div>
					<div
						onClick={toggleModal}
						className="text-neutral-800 cursor-pointer hover:underline"
					>
						Create an account
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default LoginModal
