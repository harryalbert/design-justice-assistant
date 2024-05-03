import {Dispatch, SetStateAction, useState} from "react";
import {Chat} from "./ChatWindow";

const ChatInput = ({
	chats,
	setChats,
	isLoading,
	setIsLoading,
}: {
	chats: Chat[];
	setChats: Dispatch<SetStateAction<Chat[]>>;
	isLoading: boolean;
	setIsLoading: Dispatch<boolean>;
}) => {
	const [userInput, setUserInput] = useState<string>("");

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			if (isLoading) {
				event.preventDefault;
				return;
			}

			const newChats = [
				...chats,
				{
					fromUser: true,
					message: userInput,
				},
			];
			setChats(newChats);

			setUserInput("");
			setIsLoading(true);

			fetch("/api", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newChats),
			})
				.then((response) => response.json())
				.then((data: {res: string | null}) => {
					setChats([
						...newChats,
						{
							message:
								data.res ??
								"I'm sorry, it seems like there was an error. Please wait a bit and then try sending another message",
							fromUser: false,
						},
					]);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error("Error:", error);
					setChats([
						...chats,
						{
							message:
								"I'm sorry, it seems like there was an error. Please wait a bit and then try sending another message",
							fromUser: false,
						},
					]);
					setIsLoading(false);
				});
		}
	};

	return (
		<input
			type="text"
			id="first_name"
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
			placeholder="message design-justice assistant..."
			value={userInput}
			onKeyDown={handleKeyDown}
			disabled={isLoading}
			onChange={(e) => setUserInput(e.target.value)}
		/>
	);
};

export default ChatInput;
