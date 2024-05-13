import React, { useState } from 'react';
import {
  wuiPaletteColorBlind,
  wuiPaletteForStatus,
  wuiPaletteForTemperature,
} from '../../../../src/services';
import { WuiSwitch } from '../../../../src/components/form';
import { WuiSpacer } from '../../../../src/components/spacer';
import { WuiCode } from '../../../../src/components/code';
import {
  WuiColorPalettePicker,
  WuiColorPalettePickerPaletteProps,
} from '../../../../src/components/color_picker/color_palette_picker';
// @ts-ignore importing from a JS file
import { DisplayToggles } from '../form_controls/display_toggles';

const palettes: WuiColorPalettePickerPaletteProps[] = [
  {
    value: 'pallette_1',
    title: 'WUI color blind (fixed)',
    palette: wuiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'pallette_2',
    title: 'WUI palette for temperature (fixed)',
    palette: wuiPaletteForTemperature(5),
    type: 'fixed',
  },
  {
    value: 'pallette_3',
    title: 'Grayscale (gradient with stops)',
    palette: [
      {
        stop: 100,
        color: 'white',
      },
      {
        stop: 250,
        color: 'gray',
      },
      {
        stop: 350,
        color: 'dimgray',
      },
      {
        stop: 470,
        color: 'black',
      },
    ],
    type: 'gradient',
  },
  {
    value: 'pallette_4',
    title: 'WUI palette for status (gradient)',
    palette: wuiPaletteForStatus(5),
    type: 'gradient',
  },
  {
    value: 'custom',
    title: 'Plain text as a custom option',
    type: 'text',
  },
];

export const ColorPalettePicker = () => {
  const [selectionDisplay, setSelectionDisplay] = useState(false);
  const [pallette, setPallette] = useState('pallette_1');

  return (
    <>
      <WuiSwitch
        label={
          <span>
            Display selected item as a <WuiCode>title</WuiCode>
          </span>
        }
        checked={selectionDisplay}
        onChange={() => setSelectionDisplay(!selectionDisplay)}
      />
      <WuiSpacer />
      <DisplayToggles canPrepend={true} canAppend={true} canReadOnly={false}>
        <WuiColorPalettePicker
          palettes={palettes}
          onChange={setPallette}
          valueOfSelected={pallette}
          selectionDisplay={selectionDisplay ? 'title' : 'palette'}
        />
      </DisplayToggles>
    </>
  );
};
