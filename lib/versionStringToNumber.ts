/**
 * Function to convert the version string to a number tha represents the most recent major release.
 * @param {string }version The version string.
 * @returns {number} a number that represents the most recent major release.
 */
const versionStringToNumber = (version: string): number => {
  const versionStrArr: string[] = version.split(".");

  const versionArr: number[] = versionStrArr.map((str) => parseInt(str));

  if (versionArr[0] === 0 && versionArr[1] === 0 && versionArr[2] > 1) {
    versionArr[1] = 1;
  }

  const versionStr = `${versionArr[0]}` + "." + `${versionArr[1]}`;

  const versionNum: number = parseFloat(versionStr);

  return versionNum;
};

export default versionStringToNumber;
