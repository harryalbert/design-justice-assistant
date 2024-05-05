"use client";

import {useEffect, useRef, useState} from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadingChatMessage from "./LoadingChatMessage";
import Image from "next/image";

export type Chat = {
	fromUser: boolean;
	message: string;
};

const ChatWindow = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [chats, setChats] = useState<Chat[]>([
		{
			fromUser: false,
			message:
				"Hi! I'm here to help you answer any questions about design justice, have a conversation about how to design ethically, or to help you think about how your project might (or might not be) in line with design justice guidelines.",
		},
	]);
	let messageEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messageEndRef.current?.scrollIntoView();
	}, [chats]);

	return (
		<div className="flex flex-col w-full h-full items-center">
			<div className="flex align-center justify-center m-2 text-blue-100">
				<Image src="/logo.png" alt="logo" width="30" height="30" />
				<h1 className="text-2xl pl-2">Design Justice Assistant</h1>
			</div>
			<div className="flex flex-col w-11/12 h-[90%] border-2 rounded-lg bg-white">
				<div className="flex flex-col flex-1 overflow-y-auto justify-end">
					<div className="w-ful max-h-full overflow-auto">
						{chats.map((chat, index) => (
							<ChatMessage key={index} chat={chat} />
						))}
						{isLoading && <LoadingChatMessage />}
						<div ref={messageEndRef} />
					</div>
				</div>
				<div className="flex flex-row justify-center h-[50px] max-h-[100px] m-2 mb-3">
					<ChatInput
						chats={chats}
						setChats={setChats}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChatWindow;
