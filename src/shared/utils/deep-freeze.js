export default function deepFreeze(obj) {
	Object.freeze(obj);

	if (Array.isArray(obj)) {
		for (const item of obj) {
			deepFreeze(item);
		}
	} else if (obj && typeof obj === "object") {
		for (const value of Object.values(obj)) {
			deepFreeze(value);
		}
	}

	return obj;
}
