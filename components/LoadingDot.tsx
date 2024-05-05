const LoadingDot = ({isOpaque}: {isOpaque: boolean}) => (
	<div
		className={`transition-opacity ease-linear delay-300 rounded-full w-[12px] h-[12px] bg-white ${
			isOpaque ? "opacity-100" : "opacity-25"
		}`}
	/>
);

export default LoadingDot;
