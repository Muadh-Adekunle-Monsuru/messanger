'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { File, Plus } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

export default function InputBarDialog() {
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
