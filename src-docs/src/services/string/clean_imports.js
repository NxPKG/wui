export const hasDisplayToggles = code => {
  return /DisplayToggles/.test(code);
};

export const cleanWuiImports = code => {
  return code
    .replace(/(from )'(..\/)+src\/components(\/?';)/, "from '@wazuh/wui';")
    .replace(
      /(from )'(..\/)+src\/services(\/?';)/,
      "from '@wazuh/wui/lib/services';"
    );
};

export const listExtraDeps = code => {
  return code
    .match(
      // Match anything not directly calling wui (like lib dirs)
      /import(?!.*(wazuh\/wui|\.))\s.*?'(@[^.]+?\/)?[^.]+?['\/]/g
    )
    .map(match => match.match(/'(.+)['\/]/)[1])
    .reduce((deps, dep) => {
      // Make sure that we are using the latest version of a dep
      deps[dep] = 'latest';
      return deps;
    }, {});
};
