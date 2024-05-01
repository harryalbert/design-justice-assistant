import {Chat} from "./ChatWindow";

const ChatMessage = ({chat}: {chat: Chat}) => {
	return (
		<div
			className={`w-full flex ${
				chat.fromUser ? "justify-end" : "justify-start"
			}`}
		>
			<div className={`bg-blue-300 max-w-[60%] rounded-lg m-2 p-2 py-1`}>
				{chat.message}
			</div>
		</div>
	);
};

export default ChatMessage;
