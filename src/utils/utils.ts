import { FilesInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import * as path from "path";

export function importAllModule() {
  const paths = readFilesFromFolder(path.resolve(__dirname + "/../core/"), [
    "module.js",
    "module.ts",
  ]);

  const loadFileClasses = function (exported, allLoaded) {
    if (exported instanceof Function) {
      allLoaded.push(exported);
    } else if (exported instanceof Array) {
      exported.forEach((i) => loadFileClasses(i, allLoaded));
    } else if (exported instanceof Object || typeof exported === "object") {
      Object.keys(exported).forEach((key) =>
        loadFileClasses(exported[key], allLoaded)
      );
    }
    return allLoaded;
  };

  const modules = paths.reduce((allDirs, dir) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return allDirs.concat(require("glob").sync(path.normalize(dir)));
  }, []);

  const dirs = modules
    .filter((file) => {
      const dtsExtension = file.substring(file.length - 5, file.length);
      return (
        [".js", ".ts"].indexOf(path.extname(file)) !== -1 &&
        dtsExtension !== ".d.ts"
      );
    })
    ?.map((file) => {
      return require( file);
    });

  return loadFileClasses(dirs, []);
  // return modules;
}
export const readFilesFromFolder = (
  directory: string,
  filterFile: string[],
  allFiles?: string[]
): string[] => {
  const files = allFiles || [];
  const filesAndFolders: string[] = [];
  fs.readdirSync(directory).map((fileName) => {
    filesAndFolders.push(path.join(directory, fileName));
  });
  filesAndFolders.forEach((file: string) => {
    if (fs.statSync(file).isDirectory()) {
      // console.log(file, files, filterFile);
      readFilesFromFolder(file, filterFile, files);
    } else {
      for (const expectedName of filterFile) {
        if (file.endsWith(expectedName)) files.push(file);
      }
    }
  });
  return files;
};
