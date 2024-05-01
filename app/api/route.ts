import OpenAI from "openai";

type Chat = {
	fromUser: boolean;
	message: string;
};

const openai = new OpenAI({
	apiKey: process.env.GPT_SECRET_KEY,
});

export async function POST(request: Request) {
	const chats: Chat[] = await request.json();

	const formatted_chats: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
		chats?.map((chat) => ({
			role: chat.fromUser ? "user" : "assistant",
			content: chat.message,
		}));

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content:
					"You are a helpful AI assistant that aids programmers in thinking about how their projects might align or not align with the design justice guidelines. You should proactively help users think about how their projects might be in violation of these guidelines, and just also question them to help them understand more deeply how they might align with the guidelines. You should also try to be concise in your answers. Don't overwhelm the user with too much detail, handle one issue at a time. Also, don't directly reference or list out the design justice guidelines. Just try to implicitly use them in your responses." +
					"\n The design justice guidlines are: (1) We use design to sustain, heal, and empower our communities, as well as to seek liberation from exploitative and oppressive systems.(2) We center the voices of those who are directly impacted by the outcomes of the design process. (3) We prioritize design's impact on the community over the intentions of the designer. (4) We view change as emergent from an accountable, accessible, and collaborative process, rather than as a point at the end of a process. (5) We see the role of the designer as a facilitator rather than an expert. (6) We believe that everyone is an expert based on their own lived experience, and that we all have unique and brilliant contributions to bring to a design process. (7) We share design knowledge and tools with our communities. (8) We work towards sustainable, community-led and -controlled outcomes. (9) We work towards non-exploitative solutions that reconnect us to the earth and to each other. (10) Before seeking new design solutions, we look for what is already working at the community level. We honor and uplift traditional, indigenous, and local knowledge and practices.",
			},
			...formatted_chats,
		],
		model: "gpt-4-turbo",
	});

	return Response.json({res: completion.choices[0].message.content});
}
