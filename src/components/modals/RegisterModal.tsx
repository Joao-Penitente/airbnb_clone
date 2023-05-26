/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'

import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const RegisterModal = () => {
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)
		axios
			.post('/api/register', data)
			.then(() => {
				toast.success('Account created!')
				registerModal.onClose()
				loginModal.onOpen()
			})
			.catch((error) => {
				toast.error('Something went wrong!')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const toggleModal = useCallback(() => {
		loginModal.onOpen()
		registerModal.onClose()
	}, [loginModal, registerModal])

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to Airbnb" subtitle="Create an account!" />
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
				id="name"
				label="Name"
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
					<div>Already have an account?</div>
					<div
						onClick={toggleModal}
						className="text-neutral-800 cursor-pointer hover:underline"
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default RegisterModal
