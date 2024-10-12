'use client';
import React, { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { File, Image, Plus } from 'lucide-react';
import UploadImageDialog from './UploadImageDialog';
import { CldUploadWidget } from 'next-cloudinary';

export default function InputBarDialog() {
	const [openImageUpload, setOpenImageUpload] = useState<boolean>(false);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<Plus className='size-6 text-neutral-500 cursor-pointer' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<div>
						<CldUploadWidget uploadPreset='damkxve6'>
							{({ open }) => {
								return <div onClick={() => open?.()}>Upload Photo</div>;
							}}
						</CldUploadWidget>
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
					<File className='size-4' />
					<p>Upload Document</p>
				</DropdownMenuItem>
			</DropdownMenuContent>

			{/* Image Upload Dialog
			<UploadImageDialog
				isOpen={openImageUpload}
				setIsOpen={setOpenImageUpload}
			/> */}
		</DropdownMenu>
	);
}
