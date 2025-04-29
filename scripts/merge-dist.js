import fs from "fs";
import path from "path";
import fse from "fs-extra";

const apps = ["portfolio", "pixel-adventure"];
const rootDist = path.resolve("dist-root");

if (fs.existsSync(rootDist)) fse.removeSync(rootDist);
fse.ensureDirSync(rootDist);

apps.forEach((app) => {
	const appDist = path.resolve(`src/apps/${app}/dist`);
	if (fs.existsSync(appDist)) {
		fse.copySync(appDist, rootDist, { overwrite: true });
		console.log(`✅ Copied ${app} -> dist-root`);
	} else {
		console.warn(`⚠️ No dist found for ${app}`);
	}
});
