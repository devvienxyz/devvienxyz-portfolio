export default function SpinningLoader() {
	return (
		<div
			className="border-4 border-t-4 border-blue-500 border-gray-200 rounded-full h-12 w-12 animate-spin-custom"
			style={{ animation: "spin 1s linear infinite" }}
		/>
	);
}
