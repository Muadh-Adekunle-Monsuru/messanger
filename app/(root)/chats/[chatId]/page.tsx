export default function Page({ params }: { params: { chatId: string } }) {
	return <div className='w-full'>My Chat: {params.chatId}</div>;
}
