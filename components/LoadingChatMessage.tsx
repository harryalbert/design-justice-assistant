import {useEffect, useState} from "react";
import LoadingDot from "./LoadingDot";

const LoadingChatMessage = () => {
	const [cDot, setCDot] = useState<number>(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCDot((prevCDot) => (prevCDot + 1) % 3);
		}, 800);

		// Clear the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="px-3 py-2 w-full flex flex-col align-start">
			<div className="pb-1 text-gray-600">design justice assistant</div>
			<div className="flex justify-between items-center bg-blue-400 w-[70px] h-[30px] rounded-lg p-2 py-1">
				<LoadingDot isOpaque={cDot === 0} />
				<LoadingDot isOpaque={cDot === 1} />
				<LoadingDot isOpaque={cDot === 2} />
			</div>
		</div>
	);
};

export default LoadingChatMessage;
