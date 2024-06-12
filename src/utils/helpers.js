const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const path = require('path');
const fs = require('fs');

module.exports.getArgvs = () => {
  return yargs(hideBin(process.argv)).parse();
};

module.exports.getFilepath = (dirname, output, fileType = 'json') => {
  return path.resolve(dirname, `${output}.${fileType}`);
};

module.exports.checkFileExist = async (filePath, defaultWrite = '[]') => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    await fs.promises.writeFile(filePath, defaultWrite, 'utf8');
  } catch (err) {
    console.log('err', err.message);
    await fs.promises.writeFile(filePath, defaultWrite, 'utf8');
  }
};

const saveJson = async (filePath, jsonData) => {
  let existingData = [];
  try {
    existingData = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
  } catch (err) {
    console.log('run err', err);
  }
  existingData.push(...jsonData);

  await fs.promises.writeFile(filePath, JSON.stringify(existingData), 'utf8');
};

const delay = (time = 300) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

module.exports.loopSaveData = ({ limited, initPage = 1 }, getData) => {
  let page = initPage;
  return async () => {
    while (page++ <= limited) {
      await saveJson(await getData(page));
      await delay(500);
    }
  };
};

module.exports.saveJson = saveJson;
module.exports.delay = delay;
