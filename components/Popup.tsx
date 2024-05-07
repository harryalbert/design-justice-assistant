import Link from "next/link";
import {Dispatch, SetStateAction, useRef} from "react";
import {IoCloseSharp} from "react-icons/io5";

const Popup = ({
	showSelf,
	setShowSelf,
}: {
	showSelf: boolean;
	setShowSelf: Dispatch<SetStateAction<boolean>>;
}) => {
	const innerWindowRef = useRef<HTMLDivElement>(null);

	const onOuterWindowClick = (event: React.MouseEvent) => {
		if (showSelf && !innerWindowRef.current?.contains(event.target as Node))
			setShowSelf(false);
	};

	return (
		<>
			{showSelf && (
				<div
					onClick={onOuterWindowClick}
					className="fixed inset-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
				>
					<div
						ref={innerWindowRef}
						className="flex flex-col w-[80%] text-black bg-blue-200 p-2"
					>
						<IoCloseSharp
							className="text-3xl cursor-pointer"
							onClick={() => setShowSelf(false)}
						/>
						<div className="flex justify-center items-center w-full flex-grow text-xl px-10 pb-5">
							<h1 className="text-center">
								On this page you can interact with an AI
								assistant dedicated to helping programmers and
								designers think critically about how their
								projects align with ethical and
								community-centric design practices, specifically
								those outlined by the{" "}
								<Link
									className="text-blue-700 underline"
									target="_blank"
									href="https://designjustice.org/read-the-principles"
								>
									Design Justice Network
								</Link>
								. The main goals of this site are to foster
								discussions that prioritize the needs and inputs
								of community members affected by design
								outcomes, to encourage collaborative and
								accountable design processes, and to promote
								sustainable and non-exploitative solutions. By
								questioning and guiding through these
								principles, we can help create technology that
								is responsible, inclusive, and beneficial to
								all, particularly those often marginalized in
								traditional design processes.
							</h1>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Popup;
