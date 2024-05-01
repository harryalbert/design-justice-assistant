"use client";

import {useEffect, useRef, useState} from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export type Chat = {
	fromUser: boolean;
	message: string;
};

const ChatWindow = () => {
	const [chats, setChats] = useState<Chat[]>([
		{
			fromUser: false,
			message:
				"Hi! I'm here to help you answer any questions about design justice, have a conversation about how to design ethically, or to help you brainstorm about how your project might (or might not be) in line with design justice guidelines.",
		},
	]);
	let messageEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messageEndRef.current?.scrollIntoView();
	}, [chats]);

	return (
		<div className="flex flex-col w-11/12 h-[90%] border-2 rounded-lg border-cyan-200">
			<div className="flex flex-col flex-1 overflow-y-auto justify-end">
				<div className="w-ful max-h-full overflow-auto">
					{chats.map((chat, index) => (
						<ChatMessage key={index} chat={chat} />
					))}
					<div ref={messageEndRef} />
				</div>
			</div>
			<div className="flex flex-row justify-center h-[50px] max-h-[100px] m-2 mb-3">
				<ChatInput chats={chats} setChats={setChats} />
			</div>
		</div>
	);
};

export default ChatWindow;
