'use client';
import { CldUploadWidget } from 'next-cloudinary';
import React, { Dispatch, SetStateAction } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Image } from 'lucide-react';

export default function UploadImageDialog({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Image</DialogTitle>
				</DialogHeader>
				<CldUploadWidget uploadPreset='lhdsrf26'>
					{({ open }) => {
						return (
							<div
								onClick={() => open?.()}
								className='size-52 border mx-auto flex flex-col items-center justify-center cursor-pointer bg-neutral-100 border-dashed rounded-lg'
							>
								<Image className='size-6' />
								Click to Upload
							</div>
						);
					}}
				</CldUploadWidget>
			</DialogContent>
		</Dialog>
	);
}
