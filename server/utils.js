import path from 'path';
import YAML from 'yamljs';
import fs from 'fs';
import os from 'os';

export function expandPath(strPath) {
  if (strPath[0] === '~') {
    return path.join(process.env.HOME, strPath.slice(1));
  }

  return strPath;
}

export function getPath(config, ...paths) {
  const expandedRoot = expandPath(config.root);
  return path.join(expandedRoot, ...paths);
}

export function replaceString(string, search) {
  return string.replace(new RegExp(`.*${search}`), '');
}

export function getCourseInfo(config, courseName) {
  const coursePath = path.join(
    os.homedir(),
    config.root.replace(/^~[\/\\]?/, ''),
    courseName,
  );
  return YAML.load(path.join(coursePath, 'info.yaml'));
}

export async function getItemsInFolder(directoryPath, getFiles = true) {
  const files = await fs.promises.readdir(directoryPath);

  const notesList = files
    .filter((file) => {
      const fullPath = path.join(directoryPath, file);
      if (getFiles)
        return fs.statSync(fullPath).isFile() && file !== 'README.md';
      return fs.statSync(fullPath).isDirectory() && file !== 'README.md';
    })
    .map((file) => path.join(directoryPath, file));

  return notesList;
}

export function getFigurePath(config, courseName, figureName, week) {
  const coursePath = getPath(config, courseName);

  const courseSearchString = 'current-course/';
  const incompleteFigurePath = path.join(
    coursePath,
    replaceString(config.figures_dir, courseSearchString),
  );

  let figureDirectoryPath;
  const courseConfig = getCourseInfo(config, courseName);
  if (courseConfig.notes_type === 'lectures')
    figureDirectoryPath = path.join(incompleteFigurePath, `lec-${week}`);
  else figureDirectoryPath = path.join(incompleteFigurePath, `chap-${week}`);

  return path.join(figureDirectoryPath, figureName);
}

export function beautifyFileName(base) {
  const name = base.replace(/-/gi, ' ').replace(/_/gi, ' ');
  const uppercaseName = name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase(),
  );
  const title = uppercaseName.replace(/\b\w/g, (match) => match.toUpperCase());

  return title;
}

export function getNumFolders(fullPath, numFolders = 2) {
  const pathComponents = fullPath.split('/');
  const numComponents = Math.max(0, pathComponents.length - numFolders);
  const resultPath = pathComponents.slice(numComponents).join('/');

  return resultPath;
}

export function processFileList(
  fileList,
  type,
  numFolders = 2,
  numbered = false,
) {
  return fileList.map((file) => {
    const currentFile = file.replace(/\.[^/.]+$/, '');
    const tex = fs.existsSync(currentFile + '.tex');
    const pdf = fs.existsSync(currentFile + '.pdf');
    const yaml = fs.existsSync(currentFile + '.yaml');
    const texPath = getNumFolders(currentFile + '.tex', numFolders);
    const pdfPath = getNumFolders(currentFile + '.pdf', numFolders);
    const yamlPath = getNumFolders(currentFile + '.yaml', numFolders);

    let name = '';
    if (tex) {
      const texContent = fs
        .readFileSync(currentFile + '.tex', 'utf8')
        .split('\n')[0];
      const match = texContent.match(/\\nte\[[^\]]*\]{[^}]*}{([^}]*)}/);
      name = match ? match[1] : '';
    }

    let strNoteNumber = texPath.match(/\d+/g);
    const noteNumber = strNoteNumber ? Number(strNoteNumber[0]) : '';

    return {
      name: name,
      tex,
      texPath: tex ? texPath : '',
      pdf,
      pdfPath: pdf ? pdfPath : '',
      yaml,
      yamlPath: yaml ? yamlPath : '',
      type: type,
      number: numbered ? noteNumber : '',
    };
  });
}

export function getTrashDir(config, courseName, weekNumber, folder) {
  const courseConfig = getCourseInfo(config, courseName);

  let lecOrChap;
  if (courseConfig.notes_type === 'lectures')
    lecOrChap = `lec-${weekNumber}`;
  else lecOrChap = `chap-${weekNumber}`;

  const nonExpandedTrashDir = path.join(
    config.trash_dir,
    courseName,
    folder,
    lecOrChap,
  );
  return expandPath(nonExpandedTrashDir);
}
