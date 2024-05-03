import {Chat} from "./ChatWindow";

const ChatMessage = ({chat}: {chat: Chat}) => {
	return (
		<div
			className={`w-full flex flex-col px-3 py-2 ${
				chat.fromUser ? "items-end" : "items-start"
			}`}
		>
			<div className="pb-1 text-gray-600">
				{chat.fromUser ? "you" : "design-justice assistant"}
			</div>
			<div
				className={`${
					chat.fromUser ? "bg-blue-100" : "bg-blue-400"
				} max-w-[60%] rounded-lg p-2 py-1`}
			>
				{chat.message}
			</div>
		</div>
	);
};

export default ChatMessage;
