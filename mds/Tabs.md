File: Tabs/Tabs.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Tabs,
  TabsVertical,
  TabList,
  TabListVertical,
  Tab,
  TabPanels,
  TabPanel,
  IconTab,
} from './Tabs';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';
import Button from '../Button';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import { Stack } from '../Stack';
import { Grid, Column } from '../Grid';
import { Layer } from '../Layer';
import mdx from './Tabs.mdx';

import TabsSkeleton from './Tabs.Skeleton';
import {
  Dashboard,
  Activity,
  CloudMonitoring,
  Settings,
  IbmWatsonDiscovery,
  Notification,
  Chat,
  Task,
  Restart,
  Icon,
} from '@carbon/icons-react';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: {
    TabsVertical,
    TabList,
    TabListVertical,
    Tab,
    TabPanels,
    TabPanel,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = (args) => {
  return (
    <Tabs onTabCloseRequest={() => {}}>
      <TabList {...args}>
        <Tab>Dashboard</Tab>
        <Tab>Monitoring</Tab>
        <Tab>Activity</Tab>
        <Tab>Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

Default.args = {
  contained: false,
  dismissable: false,
  scrollDebounceWait: 200,
};

Default.argTypes = {
  activation: {
    control: { type: 'select' },
    options: ['automatic', 'manual'],
  },
  contained: {
    control: {
      type: 'boolean',
    },
  },
  dismissable: {
    control: false,
  },
  iconSize: {
    control: { type: 'select' },
    options: ['default', 'lg'],
  },
  leftOverflowButtonProps: {
    control: {
      type: 'object',
    },
  },
  rightOverflowButtonProps: {
    control: {
      type: 'object',
    },
  },
  scrollDebounceWait: {
    control: {
      type: 'number',
    },
  },
  scrollIntoView: {
    control: {
      type: 'boolean',
    },
  },
};

export const Dismissable = () => {
  const tabs = [
    {
      label: 'Dashboard',
      panel: <TabPanel key={0}>Dashboard</TabPanel>,
    },
    {
      label: 'Monitoring',
      panel: <TabPanel key={1}>Monitoring</TabPanel>,
    },
    {
      label: 'Activity',
      panel: <TabPanel key={2}>Activity</TabPanel>,
    },
    {
      label: 'Settings',
      panel: <TabPanel key={3}>Settings</TabPanel>,
      disabled: true,
    },
  ];
  const [renderedTabs, setRenderedTabs] = React.useState(tabs);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleTabChange = (evt) => {
    setSelectedIndex(evt.selectedIndex);
  };

  const handleCloseTabRequest = (tabIndex) => {
    if (renderedTabs[tabIndex].disabled) {
      return;
    }
    const selectedTab = renderedTabs[selectedIndex];

    const filteredTabs = renderedTabs.filter((_, index) => index !== tabIndex);
    if (tabIndex === selectedIndex) {
      const defaultTabIndex = filteredTabs.findIndex((tab) => !tab.disabled);
      setSelectedIndex(defaultTabIndex);
    } else {
      setSelectedIndex(filteredTabs.indexOf(selectedTab));
    }
    setRenderedTabs(filteredTabs);
  };

  const resetTabs = () => {
    setRenderedTabs(tabs);
  };

  return (
    <>
      <Button style={{ marginBottom: '3rem' }} onClick={resetTabs}>
        Reset
      </Button>
      <Tabs
        selectedIndex={selectedIndex}
        onChange={handleTabChange}
        dismissable
        onTabCloseRequest={handleCloseTabRequest}>
        <TabList>
          {renderedTabs.map((tab, index) => (
            <Tab key={index} disabled={tab.disabled}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>{renderedTabs.map((tab) => tab.panel)}</TabPanels>
      </Tabs>
    </>
  );
};
export const DismissableContained = () => {
  const tabs = [
    {
      label: 'Dashboard',
      panel: <TabPanel key={0}>Dashboard</TabPanel>,
    },
    {
      label: 'Monitoring',
      panel: <TabPanel key={1}>Monitoring</TabPanel>,
    },
    {
      label: 'Activity',
      panel: <TabPanel key={2}>Activity</TabPanel>,
    },
    {
      label: 'Settings',
      panel: <TabPanel key={3}>Settings</TabPanel>,
      disabled: true,
    },
  ];
  const [renderedTabs, setRenderedTabs] = React.useState(tabs);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleTabChange = (evt) => {
    setSelectedIndex(evt.selectedIndex);
  };

  const handleCloseTabRequest = (tabIndex) => {
    if (renderedTabs[tabIndex].disabled) {
      return;
    }
    const selectedTab = renderedTabs[selectedIndex];

    const filteredTabs = renderedTabs.filter((_, index) => index !== tabIndex);
    if (tabIndex === selectedIndex) {
      const defaultTabIndex = filteredTabs.findIndex((tab) => !tab.disabled);
      setSelectedIndex(defaultTabIndex);
    } else {
      setSelectedIndex(filteredTabs.indexOf(selectedTab));
    }
    setRenderedTabs(filteredTabs);
  };

  const resetTabs = () => {
    setRenderedTabs(tabs);
  };

  return (
    <>
      <Button style={{ marginBottom: '3rem' }} onClick={resetTabs}>
        Reset
      </Button>
      <Tabs
        selectedIndex={selectedIndex}
        onChange={handleTabChange}
        dismissable
        onTabCloseRequest={handleCloseTabRequest}>
        <TabList contained>
          {renderedTabs.map((tab, index) => (
            <Tab key={index} disabled={tab.disabled}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>{renderedTabs.map((tab) => tab.panel)}</TabPanels>
      </Tabs>
    </>
  );
};

export const DismissableWithIcons = ({ contained }) => {
  const tabs = [
    {
      label: 'Dashboard',
      panel: <TabPanel key={0}>Dashboard</TabPanel>,
    },
    {
      label: 'Monitoring',
      panel: <TabPanel key={1}>Monitoring</TabPanel>,
    },
    {
      label: 'Activity',
      panel: <TabPanel key={2}>Activity</TabPanel>,
    },
    {
      label: 'Settings',
      panel: <TabPanel key={3}>Settings</TabPanel>,
      disabled: true,
    },
  ];
  const [renderedTabs, setRenderedTabs] = React.useState(tabs);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleTabChange = (evt) => {
    setSelectedIndex(evt.selectedIndex);
  };

  const handleCloseTabRequest = (tabIndex) => {
    if (renderedTabs[tabIndex].disabled) {
      return;
    }
    const selectedTab = renderedTabs[selectedIndex];

    const filteredTabs = renderedTabs.filter((_, index) => index !== tabIndex);
    if (tabIndex === selectedIndex) {
      const defaultTabIndex = filteredTabs.findIndex((tab) => !tab.disabled);
      setSelectedIndex(defaultTabIndex);
    } else {
      setSelectedIndex(filteredTabs.indexOf(selectedTab));
    }
    setRenderedTabs(filteredTabs);
  };

  const resetTabs = () => {
    setRenderedTabs(tabs);
  };

  const icons = [Dashboard, CloudMonitoring, Settings, Activity];

  return (
    <>
      <Button style={{ marginBottom: '3rem' }} onClick={resetTabs}>
        Reset
      </Button>
      <Tabs
        selectedIndex={selectedIndex}
        onChange={handleTabChange}
        dismissable
        onTabCloseRequest={handleCloseTabRequest}>
        <TabList contained={contained}>
          {renderedTabs.map((tab, index) => (
            <Tab key={index} disabled={tab.disabled} renderIcon={icons[index]}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>{renderedTabs.map((tab) => tab.panel)}</TabPanels>
      </Tabs>
    </>
  );
};

export const WithIcons = () => {
  return (
    <Tabs>
      <TabList activation="manual">
        <Tab renderIcon={Dashboard}>Dashboard</Tab>
        <Tab renderIcon={CloudMonitoring}>Monitoring</Tab>
        <Tab renderIcon={Activity}>Activity</Tab>
        <Tab renderIcon={IbmWatsonDiscovery}>Analyze</Tab>
        <Tab disabled renderIcon={Settings}>
          Settings
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <form style={{ margin: '2em' }}>
            <legend className={`cds--label`}>Validation example</legend>
            <Checkbox id="cb" labelText="Accept privacy policy" />
            <Button
              style={{ marginTop: '1rem', marginBottom: '1rem' }}
              type="submit">
              Submit
            </Button>
            <TextInput
              type="text"
              labelText="Text input label"
              helperText="Optional help text"
              id="text-input-1"
            />
          </form>
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const Manual = () => {
  return (
    <Tabs>
      <TabList activation="manual">
        <Tab>Dashboard</Tab>
        <Tab>Monitoring</Tab>
        <Tab title="Tab label 4">Activity</Tab>
        <Tab>Analyze</Tab>
        <Tab disabled>Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <form style={{ margin: '2em' }}>
            <legend className={`cds--label`}>Validation example</legend>
            <Checkbox id="cb" labelText="Accept privacy policy" />
            <Button
              style={{ marginTop: '1rem', marginBottom: '1rem' }}
              type="submit">
              Submit
            </Button>
            <TextInput
              type="text"
              labelText="Text input label"
              helperText="Optional help text"
              id="text-input-1"
            />
          </form>
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const Icon20Only = (args) => {
  return (
    <Tabs>
      <TabList iconSize="lg">
        <IconTab label="Analyze" disabled>
          <IbmWatsonDiscovery size={20} aria-label="Analyze" />
        </IconTab>
        <IconTab label="Activity">
          <Activity size={20} aria-label="Activity" />
        </IconTab>
        <IconTab label="New Notifications" {...args}>
          <Notification size={20} aria-label="Notification" />
        </IconTab>
        <IconTab label="Chat">
          <Chat size={20} aria-label="Chat" />
        </IconTab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

Icon20Only.argTypes = {
  badgeIndicator: {
    description: '**Experimental**: Display an empty dot badge on the Tab.',
    control: {
      type: 'boolean',
    },
  },
};

export const IconOnly = (args) => {
  return (
    <Tabs>
      <TabList iconSize="default">
        <IconTab label="Analyze" disabled>
          <IbmWatsonDiscovery aria-label="Analyze" />
        </IconTab>
        <IconTab label="Activity">
          <Activity aria-label="Activity" />
        </IconTab>
        <IconTab label="New Notifications" {...args}>
          <Notification aria-label="Notification" />
        </IconTab>
        <IconTab label="Chat">
          <Chat aria-label="Chat" />
        </IconTab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

IconOnly.argTypes = {
  badgeIndicator: {
    description: '**Experimental**: Display an empty dot badge on the Tab.',
    control: {
      type: 'boolean',
    },
  },
};

export const Contained = () => {
  return (
    <Tabs>
      <TabList contained>
        <Tab>Dashboard</Tab>
        <Tab>Monitoring</Tab>
        <Tab>Activity</Tab>
        <Tab>Analyze</Tab>
        <Tab disabled>Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <Layer>
            <form style={{ margin: '2em' }}>
              <legend className={`cds--label`}>Validation example</legend>
              <Checkbox id="cb" labelText="Accept privacy policy" />
              <Button
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
                type="submit">
                Submit
              </Button>
              <TextInput
                type="text"
                labelText="Text input label"
                helperText="Optional help text"
              />
            </form>
          </Layer>
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const ContainedWithIcons = () => {
  return (
    <Tabs>
      <TabList contained>
        <Tab renderIcon={Dashboard}>Dashboard</Tab>
        <Tab renderIcon={CloudMonitoring}>Monitoring</Tab>
        <Tab renderIcon={Activity}>Activity</Tab>
        <Tab renderIcon={IbmWatsonDiscovery}>Analyze</Tab>
        <Tab disabled renderIcon={Settings}>
          Settings
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <Layer>
            <form style={{ margin: '2em' }}>
              <legend className={`cds--label`}>Validation example</legend>
              <Checkbox id="cb" labelText="Accept privacy policy" />
              <Button
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
                type="submit">
                Submit
              </Button>
              <TextInput
                type="text"
                labelText="Text input label"
                helperText="Optional help text"
              />
            </form>
          </Layer>
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const ContainedWithSecondaryLabels = () => {
  return (
    <Tabs>
      <TabList contained>
        <Tab secondaryLabel="(21/25)">Engage</Tab>
        <Tab secondaryLabel="(12/16)">Analyze</Tab>
        <Tab secondaryLabel="(0/7)">Remediate</Tab>
        <Tab secondaryLabel="(4/12)">Assets</Tab>
        <Tab disabled secondaryLabel="(0/10)">
          Monitoring
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <Layer>
            <form style={{ margin: '2em' }}>
              <legend className={`cds--label`}>Validation example</legend>
              <Checkbox id="cb" labelText="Accept privacy policy" />
              <Button
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
                type="submit">
                Submit
              </Button>
              <TextInput
                type="text"
                labelText="Text input label"
                helperText="Optional help text"
              />
            </form>
          </Layer>
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const ContainedWithSecondaryLabelsAndIcons = () => {
  return (
    <Tabs>
      <TabList contained>
        <Tab renderIcon={Task} secondaryLabel="(21/25">
          Engage
        </Tab>
        <Tab renderIcon={IbmWatsonDiscovery} secondaryLabel="(12/16)">
          Analyze
        </Tab>
        <Tab renderIcon={Restart} disabled secondaryLabel="(0/7)">
          Remediate
        </Tab>
        <Tab renderIcon={Dashboard} secondaryLabel="(4/12)">
          Assets
        </Tab>
        <Tab renderIcon={CloudMonitoring} secondaryLabel="(1/23)">
          Monitoring
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <Layer>
            <form style={{ margin: '2em' }}>
              <legend className={`cds--label`}>Validation example</legend>
              <Checkbox id="cb" labelText="Accept privacy policy" />
              <Button
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
                type="submit">
                Submit
              </Button>
              <TextInput
                type="text"
                labelText="Text input label"
                helperText="Optional help text"
              />
            </form>
          </Layer>
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const ContainedFullWidth = () => {
  return (
    <Grid condensed>
      <Column lg={16} md={8} sm={4}>
        <Tabs>
          <TabList contained fullWidth>
            <Tab>TLS</Tab>
            <Tab>Origin</Tab>
            <Tab disabled>Rate limiting</Tab>
            <Tab>WAF</Tab>
            <Tab>IP Firewall</Tab>
            <Tab>Firewall rules</Tab>
            <Tab>Range</Tab>
            <Tab>Mutual TLS</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
            <TabPanel>
              <Layer>
                <form style={{ margin: '2em' }}>
                  <legend className={`cds--label`}>Validation example</legend>
                  <Checkbox id="cb" labelText="Accept privacy policy" />
                  <Button
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    type="submit">
                    Submit
                  </Button>
                  <TextInput
                    type="text"
                    labelText="Text input label"
                    helperText="Optional help text"
                  />
                </form>
              </Layer>
            </TabPanel>
            <TabPanel>Tab Panel 3</TabPanel>
            <TabPanel>Tab Panel 4</TabPanel>
            <TabPanel>Tab Panel 5</TabPanel>
            <TabPanel>Tab Panel 6</TabPanel>
            <TabPanel>Tab Panel 7</TabPanel>
            <TabPanel>Tab Panel 8</TabPanel>
          </TabPanels>
        </Tabs>
      </Column>
    </Grid>
  );
};

export const Vertical = (args) => {
  return (
    <TabsVertical {...args}>
      <TabListVertical>
        <Tab>Dashboard</Tab>
        <Tab>
          Extra long label that will go two lines then truncate when it goes
          beyond the Tab length
        </Tab>
        <Tab>Activity</Tab>
        <Tab>Analyze</Tab>
        <Tab>Investigate </Tab>
        <Tab>Learn</Tab>
        <Tab disabled>Settings</Tab>
      </TabListVertical>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <Layer>
            <form style={{ margin: '2em' }}>
              <Stack gap={7}>
                <TextInput id="one" labelText="First Name" />
                <TextInput id="three" labelText="Middle Initial" />
                <TextInput id="two" labelText="Last Name" />
                <RadioButtonGroup
                  legendText="Radio button heading"
                  name="formgroup-default-radio-button-group"
                  defaultSelected="radio-1">
                  <RadioButton
                    labelText="Option 1"
                    value="radio-1"
                    id="radio-1"
                  />
                  <RadioButton
                    labelText="Option 2"
                    value="radio-2"
                    id="radio-2"
                  />
                  <RadioButton
                    labelText="Option 3"
                    value="radio-3"
                    id="radio-3"
                  />
                </RadioButtonGroup>
                <Checkbox labelText={`Checkbox one`} id="checkbox-label-1" />
                <Checkbox labelText={`Checkbox two`} id="checkbox-label-2" />
                <Button>Submit</Button>
              </Stack>
            </form>
          </Layer>
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
        <TabPanel>Tab Panel 6</TabPanel>
        <TabPanel>Tab Panel 7</TabPanel>
      </TabPanels>
    </TabsVertical>
  );
};

Vertical.args = {
  height: '',
};

Vertical.argTypes = {
  height: {
    control: {
      type: 'text',
    },
  },
};

Vertical.parameters = {
  controls: {
    exclude: ['dismissable'],
  },
};

export const Skeleton = () => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <TabsSkeleton />
    </div>
  );
};

export const Icon20OnlyVisualSnapshots = (args) => {
  return (
    <Tabs>
      <TabList iconSize="lg">
        <IconTab label="Analyze" disabled>
          <IbmWatsonDiscovery size={20} aria-label="Analyze" />
        </IconTab>
        <IconTab label="Activity">
          <Activity size={20} aria-label="Activity" />
        </IconTab>
        <IconTab label="New Notifications" {...args}>
          <Notification size={20} aria-label="Notification" />
        </IconTab>
        <IconTab label="Chat">
          <Chat size={20} aria-label="Chat" />
        </IconTab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

Icon20OnlyVisualSnapshots.argTypes = {
  badgeIndicator: {
    description: '**Experimental**: Display an empty dot badge on the Tab.',
    control: {
      type: 'boolean',
    },
  },
};

Icon20OnlyVisualSnapshots.play = async ({ userEvent }) => {
  await userEvent.keyboard('{Tab}');
};

Icon20OnlyVisualSnapshots.tags = ['!dev', '!autodocs'];

export const IconOnlyVisualSnapshots = (args) => {
  return (
    <Tabs>
      <TabList iconSize="default">
        <IconTab label="Analyze" disabled>
          <IbmWatsonDiscovery aria-label="Analyze" />
        </IconTab>
        <IconTab label="Activity">
          <Activity aria-label="Activity" />
        </IconTab>
        <IconTab label="New Notifications" {...args}>
          <Notification aria-label="Notification" />
        </IconTab>
        <IconTab label="Chat">
          <Chat aria-label="Chat" />
        </IconTab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

IconOnlyVisualSnapshots.argTypes = {
  badgeIndicator: {
    description: '**Experimental**: Display an empty dot badge on the Tab.',
    control: {
      type: 'boolean',
    },
  },
};

IconOnlyVisualSnapshots.play = async ({ userEvent }) => {
  await userEvent.keyboard('{Tab}');
};

IconOnlyVisualSnapshots.tags = ['!dev', '!autodocs'];



File: Tabs/usePressable.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState, type RefObject } from 'react';

type UsePressableState = { longPress: boolean };

type UsePressableOptions = {
  onPress?: (state: UsePressableState) => void;
  onPressIn?: () => void;
  onPressOut?: (state: UsePressableState) => void;
  onLongPress?: () => void;
  delayLongPressMs?: number;
};

export const usePressable = (
  ref: RefObject<HTMLElement | null>,
  {
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPressMs = 500,
  }: UsePressableOptions = {}
) => {
  const savedOnPress = useRef(onPress);
  const savedOnPressIn = useRef(onPressIn);
  const savedOnPressOut = useRef(onPressOut);
  const savedOnLongPress = useRef(onLongPress);
  const [pendingLongPress, setPendingLongPress] = useState(false);
  const [longPress, setLongPress] = useState(false);
  const state = useRef<UsePressableState>({ longPress: false });

  useEffect(() => {
    savedOnPress.current = onPress;
  }, [onPress]);

  useEffect(() => {
    savedOnPressIn.current = onPressIn;
  }, [onPressIn]);

  useEffect(() => {
    savedOnPressOut.current = onPressOut;
  }, [onPressOut]);

  useEffect(() => {
    savedOnLongPress.current = onLongPress;
  }, [onLongPress]);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    // Fired when a pointer becomes active buttons state.
    const onPointerDown = (event: globalThis.PointerEvent) => {
      setPendingLongPress(true);
      savedOnPressIn.current?.();
      event.preventDefault();
    };

    // Fired when a pointer is no longer active buttons state.
    const onPointerUp = () => {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut.current?.(state.current);
    };

    // A browser fires this event if it concludes the pointer
    // will no longer be able to generate events (for example
    // the related device is deactivated).
    const onPointerCancel = () => {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut.current?.(state.current);
      state.current.longPress = false;
    };

    // Fired when a pointer is moved out of the hit test
    // boundaries of an element. For pen devices, this event
    // is fired when the stylus leaves the hover range
    // detectable by the digitizer.
    const onPointerLeave = () => {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut.current?.(state.current);
      state.current.longPress = false;
    };

    const onClick = () => {
      setLongPress(false);
      setPendingLongPress(false);
      savedOnPress.current?.(state.current);
      state.current.longPress = false;
    };

    // Certain devices treat long press events as context menu triggers
    const onContextMenu = (event: globalThis.MouseEvent) => {
      event.preventDefault();
    };

    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerCancel);
    element.addEventListener('pointerleave', onPointerLeave);
    element.addEventListener('click', onClick);
    element.addEventListener('contextmenu', onContextMenu);

    return () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerCancel);
      element.removeEventListener('pointerleave', onPointerLeave);
      element.removeEventListener('click', onClick);
      element.removeEventListener('contextmenu', onContextMenu);
    };
  }, [ref]);

  useEffect(() => {
    if (pendingLongPress) {
      const timeoutId = setTimeout(() => {
        setPendingLongPress(false);
        setLongPress(true);
      }, delayLongPressMs);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [pendingLongPress, delayLongPressMs]);

  useEffect(() => {
    if (longPress) {
      state.current.longPress = true;
      return savedOnLongPress.current?.();
    }
  }, [longPress]);
};



File: Tabs/Tabs.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronLeft, ChevronRight } from '@carbon/icons-react';
import { breakpoints } from '@carbon/layout';
import cx from 'classnames';
import { debounce } from 'es-toolkit/compat';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  createContext,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  type HTMLAttributes,
  type RefObject,
  type ComponentType,
  type HTMLElementType,
  type ElementType,
  isValidElement,
  ReactElement,
} from 'react';
import { Grid } from '../Grid';
import { isElement } from 'react-is';
import { Tooltip } from '../Tooltip';
import { useControllableState } from '../../internal/useControllableState';
import { useId } from '../../internal/useId';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match, matches } from '../../internal/keyboard';
import { usePressable } from './usePressable';
import { deprecate } from '../../prop-types/deprecate';
import { Close } from '@carbon/icons-react';
import { useEvent } from '../../internal/useEvent';
import { useMatchMedia } from '../../internal/useMatchMedia';
import { Text } from '../Text';
import BadgeIndicator from '../BadgeIndicator';

const verticalTabHeight = 64;

// Used to manage the overall state of the Tabs
type TabsContextType = {
  baseId: string;
  activeIndex: number;
  defaultSelectedIndex: number;
  dismissable?: boolean;
  onTabCloseRequest?(index: number): void;
  setActiveIndex(index: number): void;
  selectedIndex: number;
  setSelectedIndex(index: number): void;
};
const TabsContext = React.createContext<TabsContextType>({
  baseId: '',
  activeIndex: 0,
  defaultSelectedIndex: 0,
  dismissable: false,
  onTabCloseRequest() {},
  setActiveIndex() {},
  selectedIndex: 0,
  setSelectedIndex() {},
});

// Used to keep track of position in a tablist
const TabContext = React.createContext<{
  contained?: boolean;
  index: number;
  hasSecondaryLabel: boolean;
}>({
  index: 0,
  hasSecondaryLabel: false,
});

const lgMediaQuery = `(min-width: ${breakpoints.lg.width})`;
const smMediaQuery = `(max-width: ${breakpoints.md.width})`;

// Used to keep track of position in a list of tab panels
const TabPanelContext = React.createContext<number>(0);

type DivAttributes = HTMLAttributes<HTMLDivElement>;

/**
 * Tabs
 */

export interface TabsProps {
  /**
   * Provide child elements to be rendered inside the `Tabs`.
   * These elements should render either `TabsList` or `TabsPanels`
   */
  children?: ReactNode;

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex?: number;

  /**
   * Whether the rendered Tab children should be dismissable.
   */
  dismissable?: boolean;

  /**
   * Provide an optional function which is called
   * whenever the state of the `Tabs` changes
   */
  onChange?(state: { selectedIndex: number }): void;

  /**
   * If specifying the `onTabCloseRequest` prop, provide a callback function
   * responsible for removing the tab when close button is pressed on one of the Tab elements
   */
  onTabCloseRequest?(tabIndex: number): void;

  /**
   * Control which content panel is currently selected. This puts the component
   * in a controlled mode and should be used along with `onChange`
   */
  selectedIndex?: number;
}

function Tabs({
  children,
  defaultSelectedIndex = 0,
  onChange,
  selectedIndex: controlledSelectedIndex,
  dismissable,
  onTabCloseRequest,
}: TabsProps) {
  const baseId = useId('ccs');
  if (dismissable && !onTabCloseRequest) {
    // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
    console.error(
      'dismissable property specified without also providing an onTabCloseRequest property.'
    );
  }
  // The active index is used to track the element which has focus in our tablist
  const [activeIndex, setActiveIndex] = useState(defaultSelectedIndex);
  // The selected index is used for the tab/panel pairing which is "visible"
  const [selectedIndex, setSelectedIndex] = useControllableState({
    value: controlledSelectedIndex,
    defaultValue: defaultSelectedIndex,
    onChange: (value) => onChange?.({ selectedIndex: value }),
  });

  const value: TabsContextType = {
    baseId,
    activeIndex,
    defaultSelectedIndex,
    dismissable,
    onTabCloseRequest,
    setActiveIndex,
    selectedIndex,
    setSelectedIndex,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

Tabs.propTypes = {
  /**
   * Provide child elements to be rendered inside the `Tabs`.
   * These elements should render either `TabsList` or `TabsPanels`
   */
  children: PropTypes.node,

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex: PropTypes.number,

  /**
   * Whether the render Tab children should be dismissable.
   */
  dismissable: PropTypes.bool,

  /**
   * Provide an optional function which is called whenever the state of the
   * `Tabs` changes
   */
  onChange: PropTypes.func,

  /**
   * If specifying the `onTabCloseRequest` prop, provide a callback function
   * responsible for removing the tab when close button is pressed on one of the Tab elements
   */
  onTabCloseRequest: (props) => {
    if (props.dismissable && !props.onTabCloseRequest) {
      return new Error(
        'dismissable property specified without also providing an onTabCloseRequest property.'
      );
    }
    return undefined;
  },

  /**
   * Control which content panel is currently selected. This puts the component
   * in a controlled mode and should be used along with `onChange`
   */
  selectedIndex: PropTypes.number,
};

export interface TabsVerticalProps {
  /**
   * Provide child elements to be rendered inside the `TabsVertical`.
   * These elements should render either `TabsListVertical` or `TabsPanels`
   */
  children?: ReactNode;

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex?: number;

  /**
   * Option to set a height style only if using vertical variation
   */
  height?: string;

  /**
   * Provide an optional function which is called
   * whenever the state of the `Tabs` changes
   */
  onChange?(state: { selectedIndex: number }): void;

  /**
   * Control which content panel is currently selected. This puts the component
   * in a controlled mode and should be used along with `onChange`
   */
  selectedIndex?: number;
}

function TabsVertical({
  children,
  height,
  defaultSelectedIndex = 0,
  onChange,
  selectedIndex: controlledSelectedIndex,
  ...rest
}: TabsVerticalProps) {
  const [selectedIndex, setSelectedIndex] = useControllableState({
    value: controlledSelectedIndex,
    defaultValue: defaultSelectedIndex,
    onChange: (value) => onChange?.({ selectedIndex: value }),
  });

  const props = {
    ...rest,
    selectedIndex,
    onChange: ({ selectedIndex }) => setSelectedIndex(selectedIndex),
  };

  const isSm = useMatchMedia(smMediaQuery);

  if (!isSm) {
    return (
      <Grid style={{ height: height }}>
        <Tabs {...props}>{children}</Tabs>
      </Grid>
    );
  }
  return <Tabs {...props}>{children}</Tabs>;
}

TabsVertical.propTypes = {
  /**
   * Provide child elements to be rendered inside the `TabsVertical`.
   * These elements should render either `TabsListVertical` or `TabsPanels`
   */
  children: PropTypes.node,

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex: PropTypes.number,

  /**
   * Option to set a height style only if using vertical variation
   */
  height: PropTypes.string,

  /**
   * Provide an optional function which is called whenever the state of the
   * `Tabs` changes
   */
  onChange: PropTypes.func,

  /**
   * Control which content panel is currently selected. This puts the component
   * in a controlled mode and should be used along with `onChange`
   */
  selectedIndex: PropTypes.number,
};

/**
 * Get the next index for a given keyboard event
 * given a count of the total items and the current index
 */
function getNextIndex(
  event: KeyboardEvent,
  total: number,
  index: number
): number {
  switch (true) {
    case match(event, keys.ArrowRight):
      return (index + 1) % total;

    case match(event, keys.ArrowLeft):
      return (total + index - 1) % total;

    case match(event, keys.Home):
      return 0;

    case match(event, keys.End):
      return total - 1;

    default:
      return index;
  }
}

/**
 * Get the next index for a given keyboard event
 * given a count of the total items and the current index
 */
function getNextIndexVertical(
  event: KeyboardEvent,
  total: number,
  index: number
): number {
  switch (true) {
    case match(event, keys.ArrowDown):
      return (index + 1) % total;

    case match(event, keys.ArrowUp):
      return (total + index - 1) % total;

    case match(event, keys.Home):
      return 0;

    case match(event, keys.End):
      return total - 1;

    default:
      return index;
  }
}

/**
 * TabList
 */

export interface TabListProps extends DivAttributes {
  /**
   * Specify whether the content tab should be activated automatically or
   * manually
   */
  activation?: 'automatic' | 'manual';

  /**
   * Provide an accessible label to be read when a user interacts with this
   * component
   */
  'aria-label'?: string;

  /**
   * Provide child elements to be rendered inside `ContentTabs`.
   * These elements should render a `ContentTab`
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to the container node
   */
  className?: string;

  /**
   * Specify whether component is contained type
   */
  contained?: boolean;

  /**
   * Used for tabs within a grid, this makes it so tabs span the full container width and have the same width. Only available on contained tabs with <9 children
   */
  fullWidth?: boolean;

  /**
   * If using `IconTab`, specify the size of the icon being used.
   */
  iconSize?: 'default' | 'lg';

  /**
   * Provide the props that describe the left overflow button
   */
  leftOverflowButtonProps?: HTMLAttributes<HTMLButtonElement>;

  /**
   * Specify whether to use the light component variant
   */
  light?: boolean;

  /**
   * Provide the props that describe the right overflow button
   */
  rightOverflowButtonProps?: HTMLAttributes<HTMLButtonElement>;

  /**
   * Optionally provide a delay (in milliseconds) passed to the lodash
   * debounce of the onScroll handler. This will impact the responsiveness
   * of scroll arrow buttons rendering when scrolling to the first or last tab.
   */
  scrollDebounceWait?: number;

  /**
   * Choose whether to automatically scroll to newly selected tabs
   * on component rerender
   */
  scrollIntoView?: boolean;
}
type TabElement = HTMLElement & { disabled?: boolean };

function TabList({
  activation = 'automatic',
  'aria-label': label,
  children,
  className: customClassName,
  contained = false,
  fullWidth = false,
  iconSize,
  leftOverflowButtonProps,
  light,
  rightOverflowButtonProps,
  scrollDebounceWait = 200,
  scrollIntoView,
  ...rest
}: TabListProps) {
  const {
    activeIndex,
    selectedIndex,
    setSelectedIndex,
    setActiveIndex,
    dismissable,
  } = React.useContext(TabsContext);
  const prefix = usePrefix();
  const ref = useRef<HTMLDivElement>(null);
  const previousButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  let hasSecondaryLabelTabs = false;
  if (contained) {
    hasSecondaryLabelTabs = React.Children.toArray(children).some((child) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      const _child = child as React.ReactElement<any>;
      return React.isValidElement(child) && !!_child.props.secondaryLabel;
    });
  }

  const isLg = useMatchMedia(lgMediaQuery);

  const distributeWidth =
    fullWidth &&
    contained &&
    isLg &&
    React.Children.toArray(children).length < 9;

  const className = cx(
    `${prefix}--tabs`,
    {
      [`${prefix}--tabs--contained`]: contained,
      [`${prefix}--tabs--light`]: light,
      [`${prefix}--tabs__icon--default`]: iconSize === 'default',
      [`${prefix}--tabs__icon--lg`]: iconSize === 'lg', // TODO: V12 - Remove this class
      [`${prefix}--layout--size-lg`]: iconSize === 'lg',
      [`${prefix}--tabs--tall`]: hasSecondaryLabelTabs,
      [`${prefix}--tabs--full-width`]: distributeWidth,
      [`${prefix}--tabs--dismissable`]: dismissable,
    },
    customClassName
  );

  // Previous Button
  // VISIBLE IF:
  //   SCROLLABLE
  //   AND SCROLL_LEFT > 0
  const buttonWidth = 44;
  // Next Button
  // VISIBLE IF:
  //   SCROLLABLE
  //   AND SCROLL_LEFT + CLIENT_WIDTH < SCROLL_WIDTH
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(
    ref.current
      ? scrollLeft + buttonWidth + ref.current.clientWidth <
          ref.current.scrollWidth
      : false
  );

  const isPreviousButtonVisible = ref.current
    ? isScrollable && scrollLeft > 0
    : false;
  const previousButtonClasses = cx(
    `${prefix}--tab--overflow-nav-button`,
    `${prefix}--tab--overflow-nav-button--previous`,
    {
      [`${prefix}--tab--overflow-nav-button--hidden`]: !isPreviousButtonVisible,
    }
  );
  const nextButtonClasses = cx(
    `${prefix}--tab--overflow-nav-button`,
    `${prefix}--tab--overflow-nav-button--next`,
    {
      [`${prefix}--tab--overflow-nav-button--hidden`]: !isNextButtonVisible,
    }
  );

  const tabs = useRef<TabElement[]>([]);
  const debouncedOnScroll = useCallback(() => {
    const updateScroll = debounce(() => {
      if (ref.current) {
        setScrollLeft(ref.current.scrollLeft);
      }
    }, scrollDebounceWait);
    updateScroll();
  }, [scrollDebounceWait]);

  function onKeyDown(event: KeyboardEvent) {
    if (
      matches(event, [keys.ArrowRight, keys.ArrowLeft, keys.Home, keys.End])
    ) {
      event.preventDefault();

      const filteredTabs = tabs.current.filter((tab) => tab !== null);

      const activeTabs: TabElement[] = filteredTabs.filter(
        (tab) => !tab.disabled
      );

      const currentIndex = activeTabs.indexOf(
        tabs.current[activation === 'automatic' ? selectedIndex : activeIndex]
      );
      const nextIndex = tabs.current.indexOf(
        activeTabs[getNextIndex(event, activeTabs.length, currentIndex)]
      );

      if (activation === 'automatic') {
        setSelectedIndex(nextIndex);
      } else if (activation === 'manual') {
        setActiveIndex(nextIndex);
      }
      tabs.current[nextIndex]?.focus();
    }
  }

  function handleBlur({
    relatedTarget: currentActiveNode,
  }: React.FocusEvent<HTMLDivElement>) {
    if (ref.current?.contains(currentActiveNode)) {
      return;
    }
    // reset active index to selected tab index for manual activation
    if (activation === 'manual') {
      setActiveIndex(selectedIndex);
    }
  }

  /**
   * Scroll the tab into view if it is not already visible
   * @param tab - The tab to scroll into view
   * @returns {void}
   */
  function scrollTabIntoView(tab) {
    if (!isScrollable || !ref.current) {
      return;
    }
    if (tab) {
      // The width of the "scroll buttons"
      const { width: tabWidth } = tab.getBoundingClientRect();

      // The start and end position of the selected tab
      const start = tab.offsetLeft;
      const end = tab.offsetLeft + tabWidth;

      // The start and end of the visible area for the tabs
      const visibleStart = ref.current.scrollLeft + buttonWidth;
      const visibleEnd =
        ref.current.scrollLeft + ref.current.clientWidth - buttonWidth;

      // The beginning of the tab is clipped and not visible
      if (start < visibleStart) {
        setScrollLeft(start - buttonWidth);
      }

      // The end of the tab is clipped and not visible
      if (end > visibleEnd) {
        setScrollLeft(end + buttonWidth - ref.current.clientWidth);
      }
    }
  }

  useEffect(() => {
    const tab = tabs.current[selectedIndex];
    if (scrollIntoView && tab) {
      tab.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, []);

  useEffect(() => {
    //adding 1 in calculation for firefox support
    setIsNextButtonVisible(
      ref.current
        ? scrollLeft + buttonWidth + ref.current.clientWidth + 1 <
            ref.current.scrollWidth
        : false
    );

    if (dismissable) {
      if (ref.current) {
        setIsScrollable(ref.current.scrollWidth > ref.current.clientWidth);
      }
    }
  }, [scrollLeft, children, dismissable, isScrollable]);

  useEffect(() => {
    if (tabs.current[selectedIndex]?.disabled) {
      const activeTabs = tabs.current.filter((tab) => {
        return !tab.disabled;
      });

      if (activeTabs.length > 0) {
        const tab = activeTabs[0];
        setSelectedIndex(tabs.current.indexOf(tab));
      }
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, []);

  useIsomorphicEffect(() => {
    if (ref.current) {
      // adding 1 in calculation for firefox support
      setIsScrollable(ref.current.scrollWidth > ref.current.clientWidth + 1);
    }

    function handler() {
      if (ref.current) {
        // adding 1 in calculation for firefox support
        setIsScrollable(ref.current.scrollWidth > ref.current.clientWidth + 1);
      }
    }

    const debouncedHandler = debounce(handler, 200);
    window.addEventListener('resize', debouncedHandler);
    return () => {
      debouncedHandler.cancel();
      window.removeEventListener('resize', debouncedHandler);
    };
  }, []);

  // updates scroll location for all scroll behavior.
  useIsomorphicEffect(() => {
    if (scrollLeft !== null && ref.current) {
      ref.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);

  // scroll manual tabs when active index changes (focus outline movement)
  useIsomorphicEffect(() => {
    const tab =
      activation === 'manual'
        ? tabs.current[activeIndex]
        : tabs.current[selectedIndex];

    scrollTabIntoView(tab);
  }, [activation, activeIndex]);

  // scroll tabs when selected index changes
  useIsomorphicEffect(() => {
    const tab = tabs.current[selectedIndex];
    scrollTabIntoView(tab);
  }, [selectedIndex, isScrollable, children]);

  usePressable(previousButton, {
    onPress({ longPress }) {
      if (!longPress && ref.current) {
        setScrollLeft(
          Math.max(
            scrollLeft - (ref.current.scrollWidth / tabs.current.length) * 1.5,
            0
          )
        );
      }
    },
    onLongPress() {
      return createLongPressBehavior(ref, 'backward', setScrollLeft);
    },
  });

  usePressable(nextButton, {
    onPress({ longPress }) {
      if (!longPress && ref.current) {
        setScrollLeft(
          Math.min(
            scrollLeft + (ref.current.scrollWidth / tabs.current.length) * 1.5,
            ref.current.scrollWidth - ref.current.clientWidth
          )
        );
      }
    },
    onLongPress() {
      return createLongPressBehavior(ref, 'forward', setScrollLeft);
    },
  });

  return (
    <div className={className}>
      <button
        aria-hidden="true"
        tabIndex={-1}
        aria-label="Scroll left"
        ref={previousButton}
        className={previousButtonClasses}
        type="button"
        {...leftOverflowButtonProps}>
        <ChevronLeft />
      </button>
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        {...rest}
        aria-label={label}
        ref={ref}
        role="tablist"
        className={`${prefix}--tab--list`}
        onScroll={debouncedOnScroll}
        onKeyDown={onKeyDown}
        onBlur={handleBlur}>
        {React.Children.map(children, (child, index) => {
          return !isElement(child) ? null : (
            <TabContext.Provider
              value={{
                index,
                hasSecondaryLabel: hasSecondaryLabelTabs,
                contained,
              }}>
              {React.cloneElement(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                child as React.ReactElement<{ ref?: React.Ref<any> }>,
                {
                  ref: (node) => {
                    tabs.current[index] = node;
                  },
                }
              )}
            </TabContext.Provider>
          );
        })}
      </div>
      <button
        aria-hidden="true"
        tabIndex={-1}
        aria-label="Scroll right"
        ref={nextButton}
        className={nextButtonClasses}
        type="button"
        {...rightOverflowButtonProps}>
        <ChevronRight />
      </button>
    </div>
  );
}

TabList.propTypes = {
  /**
   * Specify whether the content tab should be activated automatically or
   * manually
   */
  activation: PropTypes.oneOf(['automatic', 'manual']),

  /**
   * Provide an accessible label to be read when a user interacts with this
   * component
   */
  'aria-label': PropTypes.string,

  /**
   * Provide child elements to be rendered inside `ContentTabs`.
   * These elements should render a `ContentTab`
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether component is contained type
   */
  contained: PropTypes.bool,

  /**
   * Used for tabs within a grid, this makes it so tabs span the full container width and have the same width. Only available on contained tabs with <9 children
   */
  fullWidth: PropTypes.bool,

  /**
   * If using `IconTab`, specify the size of the icon being used.
   */
  iconSize: PropTypes.oneOf(['default', 'lg']),

  /**
   * Provide the props that describe the left overflow button
   */
  leftOverflowButtonProps: PropTypes.object,

  /**
   * Specify whether to use the light component variant
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `TabList` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Provide the props that describe the right overflow button
   */
  rightOverflowButtonProps: PropTypes.object,

  /**
   * Optionally provide a delay (in milliseconds) passed to the lodash
   * debounce of the onScroll handler. This will impact the responsiveness
   * of scroll arrow buttons rendering when scrolling to the first or last tab.
   */
  scrollDebounceWait: PropTypes.number,

  /**
   * Choose whether to automatically scroll
   * to newly selected tabs on component rerender
   */
  scrollIntoView: PropTypes.bool,
};

/**
 * TabListVertical
 */

export interface TabListVerticalProps extends DivAttributes {
  /**
   * Specify whether the content tab should be activated automatically or
   * manually
   */
  activation?: 'automatic' | 'manual';

  /**
   * Provide an accessible label to be read when a user interacts with this
   * component
   */
  'aria-label'?: string;

  /**
   * Provide child elements to be rendered inside `ContentTabs`.
   * These elements should render a `ContentTab`
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to the container node
   */
  className?: string;

  /**
   * Choose whether to automatically scroll to newly selected tabs
   * on component rerender
   */
  scrollIntoView?: boolean;
}
// type TabElement = HTMLElement & { disabled?: boolean };

function TabListVertical({
  activation = 'automatic',
  'aria-label': label,
  children,
  className: customClassName,
  scrollIntoView,
  ...rest
}: TabListVerticalProps) {
  const { activeIndex, selectedIndex, setSelectedIndex, setActiveIndex } =
    React.useContext(TabsContext);
  const prefix = usePrefix();
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflowingBottom, setIsOverflowingBottom] = useState(false);
  const [isOverflowingTop, setIsOverflowingTop] = useState(false);

  const isSm = useMatchMedia(smMediaQuery);

  const className = cx(
    `${prefix}--tabs`,
    `${prefix}--tabs--vertical`,
    `${prefix}--tabs--contained`,
    customClassName
  );

  const tabs = useRef<TabElement[]>([]);

  function onKeyDown(event: KeyboardEvent) {
    if (matches(event, [keys.ArrowDown, keys.ArrowUp, keys.Home, keys.End])) {
      event.preventDefault();

      const filteredTabs = tabs.current.filter((tab) => tab !== null);

      const activeTabs: TabElement[] = filteredTabs.filter(
        (tab) => !tab.disabled
      );

      const currentIndex = activeTabs.indexOf(
        tabs.current[activation === 'automatic' ? selectedIndex : activeIndex]
      );
      const nextIndex = tabs.current.indexOf(
        activeTabs[getNextIndexVertical(event, activeTabs.length, currentIndex)]
      );

      if (activation === 'automatic') {
        setSelectedIndex(nextIndex);
      } else if (activation === 'manual') {
        setActiveIndex(nextIndex);
      }
      tabs.current[nextIndex]?.focus();
    }
  }

  function handleBlur({
    relatedTarget: currentActiveNode,
  }: React.FocusEvent<HTMLDivElement>) {
    if (ref.current?.contains(currentActiveNode)) {
      return;
    }
    // reset active index to selected tab index for manual activation
    if (activation === 'manual') {
      setActiveIndex(selectedIndex);
    }
  }

  useEffect(() => {
    if (tabs.current[selectedIndex]?.disabled) {
      const activeTabs = tabs.current.filter((tab) => {
        return !tab.disabled;
      });

      if (activeTabs.length > 0) {
        const tab = activeTabs[0];
        setSelectedIndex(tabs.current.indexOf(tab));
      }
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, []);

  useEffect(() => {
    function handler() {
      const containerHeight = ref.current?.offsetHeight;
      const containerTop = ref.current?.getBoundingClientRect().top;
      const selectedPositionTop =
        tabs.current[selectedIndex]?.getBoundingClientRect().top;

      const halfTabHeight = verticalTabHeight / 2;
      if (containerTop && containerHeight) {
        // scrolls so selected tab is in view
        if (
          selectedPositionTop - halfTabHeight < containerTop ||
          selectedPositionTop -
            containerTop +
            verticalTabHeight +
            halfTabHeight >
            containerHeight
        ) {
          // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
          ref.current &&
            ref.current.scrollTo({
              top: (selectedIndex - 1) * verticalTabHeight,
              behavior: 'smooth',
            });
        }
      }
    }

    window.addEventListener('resize', handler);

    handler();

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [selectedIndex, scrollIntoView]);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const handler = () => {
      const halfTabHeight = verticalTabHeight / 2;
      setIsOverflowingBottom(
        element.scrollTop + element.clientHeight + halfTabHeight <=
          element.scrollHeight
      );
      setIsOverflowingTop(element.scrollTop > halfTabHeight);
    };

    const resizeObserver = new ResizeObserver(() => handler());
    resizeObserver.observe(element);
    element.addEventListener('scroll', handler);

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener('scroll', handler);
    };
  });

  if (isSm) {
    return (
      <TabList {...rest} aria-label={label} contained>
        {children}
      </TabList>
    );
  }

  return (
    <div className={className}>
      {isOverflowingTop && (
        <div className={`${prefix}--tab--list-gradient_top`}></div>
      )}
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        {...rest}
        aria-label={label}
        ref={ref}
        role="tablist"
        className={`${prefix}--tab--list`}
        onKeyDown={onKeyDown}
        onBlur={handleBlur}>
        {React.Children.map(children, (child, index) => {
          return !isElement(child) ? null : (
            <TabContext.Provider
              value={{
                index,
                hasSecondaryLabel: false,
              }}>
              {React.cloneElement(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                child as React.ReactElement<{ ref?: React.Ref<any> }>,
                {
                  ref: (node) => {
                    tabs.current[index] = node;
                  },
                }
              )}
            </TabContext.Provider>
          );
        })}
      </div>
      {isOverflowingBottom && (
        <div className={`${prefix}--tab--list-gradient_bottom`}></div>
      )}
    </div>
  );
}

TabListVertical.propTypes = {
  /**
   * Specify whether the content tab should be activated automatically or
   * manually
   */
  activation: PropTypes.oneOf(['automatic', 'manual']),

  /**
   * Provide an accessible label to be read when a user interacts with this
   * component
   */
  'aria-label': PropTypes.string,

  /**
   * Provide child elements to be rendered inside `ContentTabs`.
   * These elements should render a `ContentTab`
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the container node
   */
  className: PropTypes.string,
};

/**
 * Helper function to set up the behavior when a button is "long pressed".
 * This function will take a ref to the tablist, a direction, and a setter
 * for scrollLeft and will update the scroll position within a requestAnimationFrame.
 *
 * It returns a cleanup function to be run
 * when the long press is deactivated
 */
function createLongPressBehavior(
  ref: RefObject<HTMLElement | null>,
  direction: 'forward' | 'backward',
  setScrollLeft
) {
  const node = ref.current;
  if (!node) {
    return () => {};
  }

  // We manually override the scroll behavior to be "auto".
  // If it is set as smooth, this animation does not update correctly
  const defaultScrollBehavior = node?.style['scroll-behavior'];
  node.style['scroll-behavior'] = 'auto';

  const scrollDelta = direction === 'forward' ? 5 : -5;
  let frameId: number | null = null;

  function tick() {
    if (!node) {
      return;
    }

    node.scrollLeft = node.scrollLeft + scrollDelta;
    frameId = requestAnimationFrame(tick);
  }

  frameId = requestAnimationFrame(tick);

  return () => {
    // Restore the previous scroll behavior
    node.style['scroll-behavior'] = defaultScrollBehavior;

    // Make sure that our `scrollLeft` value is in sync with the existing
    // `ref` after our requestAnimationFrame loop above
    setScrollLeft(node.scrollLeft);

    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Tab
 */

export interface TabProps extends HTMLAttributes<HTMLElement> {
  /**
   * Provide a custom element to render instead of the default button
   */
  as?: HTMLElementType | ComponentType;

  /**
   * Provide child elements to be rendered inside `Tab`.
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to your Tab
   */
  className?: string;

  /**
   * Whether your Tab is disabled.
   */
  disabled?: boolean;

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick?(event: MouseEvent): void;

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown?(event: KeyboardEvent): void;

  /**
   * An optional parameter to allow overriding the anchor rendering.
   * Useful for using Tab along with react-router or other client
   * side router libraries.
   */
  renderButton?(): ReactNode;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * An optional label to render under the primary tab label.
   * Only useful for contained tabs.
   */
  secondaryLabel?: string;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const Tab = forwardRef<HTMLElement, TabProps>(
  (
    {
      as = 'button',
      children,
      className: customClassName,
      disabled,
      onClick,
      onKeyDown,
      secondaryLabel,
      renderIcon: Icon,
      ...rest
    },
    forwardRef
  ) => {
    const prefix = usePrefix();
    const {
      selectedIndex,
      setSelectedIndex,
      baseId,
      dismissable,
      onTabCloseRequest,
    } = React.useContext(TabsContext);
    const { index, hasSecondaryLabel, contained } =
      React.useContext(TabContext);
    const { badgeIndicator } = React.useContext(IconTabContext) || {};
    const dismissIconRef = useRef<HTMLButtonElement>(null);
    const tabRef = useRef<HTMLElement>(null);
    const ref = useMergedRefs([forwardRef, tabRef]);
    const [ignoreHover, setIgnoreHover] = useState(false);
    const id = `${baseId}-tab-${index}`;
    const panelId = `${baseId}-tabpanel-${index}`;
    const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const isEllipsisActive = (element: any) => {
      setIsEllipsisApplied(element.offsetHeight < element.scrollHeight);
      return element.offsetHeight < element.scrollHeight;
    };

    const className = cx(
      `${prefix}--tabs__nav-item`,
      `${prefix}--tabs__nav-link`,
      {
        [`${prefix}--tabs__nav-item--selected`]: selectedIndex === index,
        [`${prefix}--tabs__nav-item--disabled`]: disabled,
        [`${prefix}--tabs__nav-item--hover-off`]: ignoreHover,
      },
      customClassName
    );

    const BaseComponent = as as ElementType;

    const onDismissIconMouseEnter = (evt) => {
      if (contained && tabRef.current) {
        evt.stopPropagation();
        setIgnoreHover(true);
        tabRef.current.classList.add(`${prefix}--tabs__nav-item--hover-off`);
      }
    };

    const onDismissIconMouseLeave = () => {
      if (contained && tabRef.current) {
        tabRef.current.classList.remove(`${prefix}--tabs__nav-item--hover-off`);
        setIgnoreHover(false);
      }
    };

    useEvent(dismissIconRef, 'mouseover', onDismissIconMouseEnter);
    useEvent(dismissIconRef, 'mouseleave', onDismissIconMouseLeave);

    useIsomorphicEffect(() => {
      function handler() {
        const elementTabId = document.getElementById(`${id}`) || tabRef.current;
        if (elementTabId?.closest(`.${prefix}--tabs--vertical`)) {
          const newElement = elementTabId?.getElementsByClassName(
            `${prefix}--tabs__nav-item-label`
          )[0];
          isEllipsisActive(newElement);
        }
      }
      handler();
      window.addEventListener('resize', handler);
      return () => {
        window.removeEventListener('resize', handler);
      };
    }, [prefix, id]);

    const handleClose = (evt) => {
      evt.stopPropagation();
      onTabCloseRequest?.(index);

      // set focus after removing tab
      if (tabRef.current && tabRef.current.parentElement) {
        // determine number of tabs, excluding disabled
        const tabCount = Array.from(
          tabRef.current.parentElement.childNodes
        ).filter((node) => {
          const element = node as HTMLElement;
          return (
            element.classList.contains(`${prefix}--tabs__nav-link`) &&
            !element.classList.contains(`${prefix}--tabs__nav-item--disabled`)
          );
        }).length;

        // if not removing last tab focus on next tab
        if (tabRef.current && index + 1 !== tabCount) {
          tabRef.current.focus();
        }
        // if removing last tab focus on previous tab
        else {
          const prevTabIndex = (tabCount - 2) * 2;
          (
            tabRef.current.parentElement.childNodes[prevTabIndex] as HTMLElement
          )?.focus();
        }
      }
    };

    const handleKeyDown = (event) => {
      if (dismissable && match(event, keys.Delete)) {
        handleClose(event);
      }
      onKeyDown?.(event);
    };

    const DismissIcon = (
      <div
        className={cx({
          [`${prefix}--tabs__nav-item--close`]: dismissable,
          [`${prefix}--tabs__nav-item--close--hidden`]: !dismissable,
        })}>
        <button
          type="button"
          tabIndex={selectedIndex === index && dismissable ? 0 : -1}
          aria-disabled={disabled}
          aria-hidden={
            selectedIndex === index && dismissable ? 'false' : 'true'
          }
          disabled={disabled}
          className={cx({
            [`${prefix}--tabs__nav-item--close-icon`]: dismissable,
            [`${prefix}--visually-hidden`]: !dismissable,
            [`${prefix}--tabs__nav-item--close-icon--selected`]:
              selectedIndex === index,
            [`${prefix}--tabs__nav-item--close-icon--disabled`]: disabled,
          })}
          onClick={handleClose}
          title={`Remove ${typeof children === 'string' ? children : ''} tab`}
          ref={dismissIconRef}>
          <Close
            aria-hidden={
              selectedIndex === index && dismissable ? 'false' : 'true'
            }
            aria-label={`Press delete to remove ${
              typeof children === 'string' ? children : ''
            } tab`}
          />
        </button>
      </div>
    );

    const hasIcon = Icon ?? dismissable;

    // should only happen for vertical variation, so no dismissable icon is needed here
    if (isEllipsisApplied) {
      return (
        <Tooltip
          label={children}
          align="top"
          leaveDelayMs={0}
          autoAlign
          onMouseEnter={() => false}
          closeOnActivation>
          <BaseComponent
            {...rest}
            aria-controls={panelId}
            aria-disabled={disabled}
            aria-selected={selectedIndex === index}
            ref={ref}
            id={id}
            role="tab"
            className={className}
            disabled={disabled}
            title={children}
            onClick={(evt) => {
              if (disabled) {
                return;
              }
              setSelectedIndex(index);
              onClick?.(evt);
            }}
            onKeyDown={handleKeyDown}
            tabIndex={selectedIndex === index ? '0' : '-1'}
            type="button">
            <div className={`${prefix}--tabs__nav-item-label-wrapper`}>
              <Text className={`${prefix}--tabs__nav-item-label`}>
                {children}
              </Text>
            </div>
            {hasSecondaryLabel && secondaryLabel && (
              <Text
                as="div"
                className={`${prefix}--tabs__nav-item-secondary-label`}
                title={secondaryLabel}>
                {secondaryLabel}
              </Text>
            )}
          </BaseComponent>
        </Tooltip>
      );
    }

    return (
      <>
        <BaseComponent
          {...rest}
          aria-controls={panelId}
          aria-disabled={disabled}
          aria-selected={selectedIndex === index}
          ref={ref}
          id={id}
          role="tab"
          className={className}
          disabled={disabled}
          onClick={(evt) => {
            if (disabled) {
              return;
            }
            setSelectedIndex(index);
            onClick?.(evt);
          }}
          onKeyDown={handleKeyDown}
          tabIndex={selectedIndex === index ? '0' : '-1'}
          type="button">
          <div className={`${prefix}--tabs__nav-item-label-wrapper`}>
            {dismissable && Icon && (
              <div className={`${prefix}--tabs__nav-item--icon-left`}>
                {<Icon size={16} />}
              </div>
            )}
            <Text className={`${prefix}--tabs__nav-item-label`}>
              {children}
            </Text>
            {!dismissable && Icon && (
              <div
                className={cx(`${prefix}--tabs__nav-item--icon`, {
                  [`${prefix}--visually-hidden`]: !hasIcon,
                })}>
                {!dismissable && Icon && <Icon size={16} />}
              </div>
            )}
          </div>
          {hasSecondaryLabel && secondaryLabel && (
            <Text
              as="div"
              className={`${prefix}--tabs__nav-item-secondary-label`}
              title={secondaryLabel}>
              {secondaryLabel}
            </Text>
          )}
          {!disabled && badgeIndicator && <BadgeIndicator />}
        </BaseComponent>
        {/* always rendering dismissIcon so we don't lose reference to it, otherwise events do not work when switching from/to dismissable state */}
        {DismissIcon}
      </>
    );
  }
);
Tab.propTypes = {
  /**
   * Provide a custom element to render instead of the default button
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Provide child elements to be rendered inside `Tab`.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Tab
   */
  className: PropTypes.string,

  /**
   * Whether your Tab is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown: PropTypes.func,

  /**
   * An optional parameter to allow overriding the anchor rendering.
   * Useful for using Tab along with react-router or other client
   * side router libraries.
   */
  renderButton: PropTypes.func,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * An optional label to render under the primary tab label.
   * Only useful for contained tabs.
   */
  secondaryLabel: PropTypes.string,
};

/**
 * IconTab
 */

const IconTabContext = createContext<{ badgeIndicator?: boolean } | false>(
  false
);

export interface IconTabProps extends DivAttributes {
  /**
   * **Experimental**: Display an empty dot badge on the Tab.
   */
  badgeIndicator?: boolean;
  /**
   * Provide an icon to be rendered inside `IconTab` as the visual label for Tab.
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to your Tab
   */
  className?: string;

  /**
   * Specify whether the tooltip for the icon should be open when it first renders
   */
  defaultOpen?: boolean;

  /**
   *  Specify whether your IconTab is disabled.
   */
  disabled?: boolean;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip for the icon.
   */
  enterDelayMs?: number;

  /**
   * Provide the label to be rendered inside the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader. If using the badgeIndicator then provide a
   * label with describing that there is a new notification.
   */
  label: ReactNode;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs?: number;
}
// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const IconTab = React.forwardRef<HTMLDivElement, IconTabProps>(
  (
    {
      badgeIndicator,
      children,
      className: customClassName,
      defaultOpen = false,
      enterDelayMs,
      leaveDelayMs,
      label,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const value = useMemo(() => ({ badgeIndicator }), [badgeIndicator]);

    const hasSize20 =
      isValidElement(children) &&
      (children as ReactElement<{ size?: number }>).props.size === 20;

    const classNames = cx(
      `${prefix}--tabs__nav-item--icon-only`,
      customClassName,
      { [`${prefix}--tabs__nav-item--icon-only__20`]: hasSize20 }
    );
    return (
      <IconTabContext.Provider value={value}>
        <Tooltip
          align="bottom"
          defaultOpen={defaultOpen}
          className={`${prefix}--icon-tooltip`}
          enterDelayMs={enterDelayMs}
          label={label}
          leaveDelayMs={leaveDelayMs}>
          <Tab className={classNames} ref={ref} {...rest}>
            {children}
          </Tab>
        </Tooltip>
      </IconTabContext.Provider>
    );
  }
);

IconTab.propTypes = {
  /**
   * **Experimental**: Display an empty dot badge on the Tab.
   */
  badgeIndicator: PropTypes.bool,
  /**
   * Provide an icon to be rendered inside `IconTab` as the visual label for Tab.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Tab
   */
  className: PropTypes.string,

  /**
   * Specify whether the tooltip for the icon should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip for the icon.
   */
  enterDelayMs: PropTypes.number,

  /**
   * Provide the label to be rendered inside the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader. If using the badgeIndicator then provide a
   * label with describing that there is a new notification.
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,
};

/**
 * TabPanel
 */

export interface TabPanelProps extends DivAttributes {
  /**
   * Provide child elements to be rendered inside `TabPanel`.
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to TabPanel.
   */
  className?: string;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, className: customClassName, ...rest }, forwardRef) => {
    const prefix = usePrefix();

    const { selectedIndex, baseId } = React.useContext(TabsContext);
    const index = React.useContext(TabPanelContext);
    const id = `${baseId}-tabpanel-${index}`;
    const tabId = `${baseId}-tab-${index}`;
    const className = cx(`${prefix}--tab-content`, customClassName);

    return (
      <div
        {...rest}
        aria-labelledby={tabId}
        id={id}
        className={className}
        ref={forwardRef}
        role="tabpanel"
        hidden={selectedIndex !== index}>
        {children}
      </div>
    );
  }
);

TabPanel.propTypes = {
  /**
   * Provide child elements to be rendered inside `TabPanel`.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to TabPanel.
   */
  className: PropTypes.string,
};

/**
 * TabPanels
 */

export interface TabPanelsProps {
  /**
   * Provide child elements to be rendered inside `TabPanels`.
   */
  children?: ReactNode;
}

function TabPanels({ children }: TabPanelsProps) {
  const prefix = usePrefix();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const hiddenStates = useRef<boolean[]>([]);

  useIsomorphicEffect(() => {
    const tabContainer = refs.current[0]?.previousElementSibling;
    const isVertical = tabContainer?.classList.contains(
      `${prefix}--tabs--vertical`
    );
    const parentHasHeight = tabContainer?.parentElement?.style.height;

    // Should only apply same height to vertical Tab Panels without a given height
    if (isVertical && !parentHasHeight) {
      hiddenStates.current = refs.current.map((ref) => ref?.hidden || false);

      // un-hide hidden Tab Panels to get heights
      refs.current.forEach((ref) => {
        if (ref) {
          ref.hidden = false;
        }
      });

      // set max height to TabList
      const heights = refs.current.map((ref) => ref?.offsetHeight || 0);
      const max = Math.max(...heights);
      (tabContainer as HTMLElement).style.height = max + 'px';

      // re-hide hidden Tab Panels
      refs.current.forEach((ref, index) => {
        if (ref) {
          ref.hidden = hiddenStates.current[index];
        }
      });
    }
  });

  return (
    <>
      {React.Children.map(children, (child, index) => {
        return !isElement(child) ? null : (
          <TabPanelContext.Provider value={index}>
            {/*eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452 */}
            {React.cloneElement(child as React.ReactElement<any>, {
              ref: (element: HTMLDivElement) => {
                refs.current[index] = element;
              },
            })}
          </TabPanelContext.Provider>
        );
      })}
    </>
  );
}

TabPanels.propTypes = {
  /**
   * Provide child elements to be rendered inside `TabPanels`.
   */
  children: PropTypes.node,
};

export {
  Tabs,
  TabsVertical,
  Tab,
  IconTab,
  TabPanel,
  TabPanels,
  TabList,
  TabListVertical,
};



File: Tabs/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-tabs--default'
    },
    {
      label: 'Contained',
      variant: 'components-tabs--contained'
    },
    {
      label: 'Icon 20 only',
      variant: 'components-tabs--icon-20-only'
    },
    {
      label: 'Icon only',
      variant: 'components-tabs--icon-only'
    },
    {
      label: 'Manual',
      variant: 'components-tabs--manual'
    }
  ]}
/>


File: Tabs/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Tabs } from './Tabs';

export default Tabs;

export { default as TabsSkeleton } from './Tabs.Skeleton';

export {
  TabPanels,
  type TabPanelsProps,
  TabPanel,
  type TabPanelProps,
  TabList,
  type TabListProps,
  TabListVertical,
  type TabListVerticalProps,
  IconTab,
  type IconTabProps,
  Tabs,
  type TabsProps,
  TabsVertical,
  type TabsVerticalProps,
} from './Tabs';



File: Tabs/Tabs.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

function Tab() {
  const prefix = usePrefix();
  return (
    <li className={`${prefix}--tabs__nav-item`}>
      <div className={`${prefix}--tabs__nav-link`}>
        <span></span>
      </div>
    </li>
  );
}

export interface TabsSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Provide the type of Tab
   */
  contained?: boolean;
}

function TabsSkeleton({ className, contained, ...rest }: TabsSkeletonProps) {
  const prefix = usePrefix();
  const tabClasses = cx(className, `${prefix}--tabs`, `${prefix}--skeleton`, {
    [`${prefix}--tabs--contained`]: contained,
  });
  return (
    <div className={tabClasses} {...rest}>
      <ul className={`${prefix}--tabs__nav`}>
        <Tab />
        <Tab />
        <Tab />
        <Tab />
        <Tab />
      </ul>
    </div>
  );
}

TabsSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Provide the type of Tab
   */
  contained: PropTypes.bool,
};

export default TabsSkeleton;
export { TabsSkeleton };



File: Tabs/Tabs.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';
import * as TabsStories from './Tabs.stories';
import { Grid, Column } from '../Grid';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Tabs

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Tabs)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/tabs/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/tabs/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Line Tabs](#line-tabs)
  - [Contained Tabs](#contained-tabs)
  - [Contained Full Width](#contained-full-width)
  - [Contained With Icons](#contained-with-icons)
  - [Contained With Second Labels](#contained-with-second-labels)
  - [Contained With Second Labels and Icons](#contained-with-second-labels-and-icons)
  - [Icon Tabs Only](#icon-tabs-only)
  - [Dismissable Tabs](#dismissable-tabs)
  - [Manual](#manual)
  - [Skeleton](#skeleton)
  - [With Icons](#with-icons)
  - [Vertical tabs](#vertical-tabs)
  - [Tab - tab activation modes](#tab---tab-activation-modes)
  - [Tabs and the Grid - fullWidth prop](#tabs-and-the-grid---fullwidth-prop)
- [V11](#v11)
  - [Tabs composition](#tabs-composition)
  - [Various updates](#various-updates)
  - [Max width](#max-width)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Use tabs to allow users to navigate easily between views within the same
context. Tabs are now more composable, meaning that you have more flexibility in
what is in rendered inside of `Tab` and `TabPanel`.

### Line Tabs

<Canvas
  of={TabsStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.Default),
    },
  ]}
/>

### Contained Tabs

<Canvas
  of={TabsStories.Contained}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.Contained),
    },
  ]}
/>

### Contained Full Width

<Canvas
  of={TabsStories.ContainedFullWidth}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.ContainedFullWidth),
    },
  ]}
/>

### Contained With Icons

<Canvas
  of={TabsStories.ContainedWithIcons}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.ContainedWithIcons),
    },
  ]}
/>

### Contained With Second Labels

<Canvas
  of={TabsStories.ContainedWithSecondaryLabels}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.ContainedWithSecondaryLabels),
    },
  ]}
/>

### Contained With Second Labels and Icons

<Canvas
  of={TabsStories.ContainedWithSecondaryLabelsAndIcons}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.ContainedWithSecondaryLabelsAndIcons),
    },
  ]}
/>

### Icon Tabs Only

<Canvas
  of={TabsStories.IconOnly}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.IconOnly),
    },
  ]}
/>

<Canvas
  of={TabsStories.Icon20Only}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.Icon20Only),
    },
  ]}
/>

### Dismissable Tabs

You can implement dismissable tabs in your project using Carbon's `Tabs`
components. In order to put this in place, there are some events and props we'll
need to forward through the component's API that have been outlined here.

First, we'll want to import the components from the react package.

```js
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
```

In order to be able to "close" or "remove" tabs, we'll need to access and render
your tabs programmatically. For such purposes we'll need to store your tabs in
an array variable and put them in the state

```js
const tabs = [
  {
    label: 'Tab label 1',
    panel: <TabPanel>Tab Panel 1</TabPanel>,
  },
  {
    label: 'Tab label 2',
    panel: <TabPanel>Tab Panel 2</TabPanel>,
  },
  {
    label: 'Tab label 3',
    panel: <TabPanel>Tab Panel 3</TabPanel>,
    disabled: true,
  },
  {
    label: 'Tab label 4',
    panel: <TabPanel>Tab Panel 4</TabPanel>,
  },
];
const [renderedTabs, setRenderedTabs] = useState(tabs);
```

The `Tabs` component accepts an `onTabCloseRequest` prop function that will
forward us the index of the requested tab to be closed. You may use this
function to open up a confirmation modal previous to deleting the tab; in our
case, we'll just go ahead and remove that tab directly from the `renderedTab`s
array and cover for some `selectedIndex` edge cases (i.e., when a tab is removed
from the array, the selectedIndex might need to be updated to point to a new tab
or index).

In order to be able to modify the `selectedIndex` on our end we'll need to use
the `Tabs` component in a controlled state, which means we'll also have to
implement the `Tabs`' `onChange` function, which we are calling
`handleTabChange`.

```js
const [selectedIndex, setSelectedIndex] = useState(0);

const handleTabChange = (evt) => {
  setSelectedIndex(evt.selectedIndex);
};

const handleCloseTabRequest = (tabIndex) => {
  // ignore close requests on disabled tabs
  if (renderedTabs[tabIndex].disabled) {
    return;
  }

  const selectedTab = renderedTabs[selectedIndex];

  const filteredTabs = renderedTabs.filter((_, index) => index !== tabIndex);
  // if the tab being deleted is the currently selected tab, we're re-setting the selectedIndex
  // to the first tab available that isn't disabled
  if (tabIndex === selectedIndex) {
    const defaultTabIndex = filteredTabs.findIndex((tab) => !tab.disabled);
    setSelectedIndex(defaultTabIndex);
  } else {
    // we're re-calculating the selectedIndex since the selected tab's index might have shifted
    // due to a tab element being removed from the array
    setSelectedIndex(filteredTabs.indexOf(selectedTab));
  }
  setRenderedTabs(filteredTabs);
};
```

Finally, we'll use a `resetTabs` function to demonstrate how you can re-render
tabs after they've been removed

```js
const resetTabs = () => {
  setRenderedTabs(tabs);
};
```

Now we're ready to render our `Tabs`, remember to pass the `dismissable` prop in
as well as your `handleCloseTabRequest` function

```jsx
return (
  <>
    <Button style={{ marginBottom: '3rem' }} onClick={resetTabs}>
      Reset
    </Button>
    <Tabs
      selectedIndex={selectedIndex}
      onChange={handleTabChange}
      dismissable
      onTabCloseRequest={handleCloseTabRequest}>
      <TabList aria-label="List of tabs">
        {renderedTabs.map((tab, index) => (
          <Tab key={index} disabled={tab.disabled}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>{renderedTabs.map((tab) => tab.panel)}</TabPanels>
    </Tabs>
  </>
);
```

And there you have it! Working dismissable tabs.

<Canvas
  of={TabsStories.Dismissable}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.Dismissable),
    },
  ]}
/>

Dismissable With Icons: 

<Canvas
  of={TabsStories.DismissableWithIcons}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.DismissableWithIcons),
    },
  ]}
/>
### Manual

<Canvas
  of={TabsStories.Manual}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.Manual),
    },
  ]}
/>

### Skeleton

<Canvas
  of={TabsStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.Skeleton),
    },
  ]}
/>

### With Icons

<Canvas
  of={TabsStories.WithIcons}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.WithIcons),
    },
  ]}
/>

### Vertical tabs

<Canvas
  of={TabsStories.Vertical}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TabsStories.Vertical),
    },
  ]}
/>
### Tab - tab activation modes

**Tabs With Automatic Activation**: A tabs widget where tabs are automatically
activated and their panel is displayed when they receive focus.

**Tabs With Manual Activation**: A tabs widget where users activate a tab and
display its panel by pressing Space or Enter.

In v11, to do this, you can this by setting `activation` to `manual`:

```jsx
<Tabs>
  <TabList aria-label="List of tabs" activation="manual">
    <Tab>Tab Label 1</Tab>
    <Tab>Tab Label 2</Tab>
    <Tab>Tab Label 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Tab Panel 1</TabPanel>
    <TabPanel>Tab Panel 2</TabPanel>
    <TabPanel>Tab Panel 3</TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs and the Grid - fullWidth prop

By default, a `Tab` component is only as wide as it's content. This posses
difficulties when trying to align tabs to the grid. Alternatively, you may
choose to use the `fullWidth` prop to allow `Tab` elements to grow as wide as
their container allows.

Note that this feature is _only available_ for `contained` tabs in large and
extra large screen sizes. The prop is a no-op for smaller screens and will also
be ignored for `TabList`s with more than 8 tabs. `fullWidth` paired up with a
wrapping `Grid` component will allow for "grid-aware" tabs:

<Canvas>
  <Grid condensed>
    <Column lg={16} md={8} sm={4}>
      <Tabs>
        <TabList aria-label="List of tabs" contained fullWidth>
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab disabled>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    </Column>
  </Grid>
</Canvas>

```jsx
<Grid condensed>
  <Column lg={16} md={8} sm={4}>
    <Tabs>
      <TabList aria-label="List of tabs" contained fullWidth>
        <Tab>Tab Label 1</Tab>
        <Tab>Tab Label 2</Tab>
        <Tab disabled>Tab Label 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
      </TabPanels>
    </Tabs>
  </Column>
</Grid>
```

Using the `fullWidth` prop alone within a `Grid` makes it so that the `Tabs`
container aligns to the `Grid`, but not the individual `Tab` items; to have each
individual `Tab` take up exactly one or many columns within the `Grid`, you must
specify the number of columns as a multiple of the number of `Tab` items within
the `TabList`.

For example, to have 5 tabs and each tab span exactly two columns:

<Canvas>
  <Grid condensed>
    <Column lg={10}>
      <Tabs>
        <TabList aria-label="List of tabs" contained fullWidth>
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab disabled>Tab Label 3</Tab>
          <Tab>Tab Label 4</Tab>
          <Tab>Tab Label 5</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
          <TabPanel>Tab Panel 4</TabPanel>
          <TabPanel>Tab Panel 5</TabPanel>
        </TabPanels>
      </Tabs>
    </Column>
  </Grid>
</Canvas>

```jsx
<Grid condensed>
  <Column lg={10}>
    <Tabs>
      <TabList aria-label="List of tabs" contained fullWidth>
        <Tab>Tab Label 1</Tab>
        <Tab>Tab Label 2</Tab>
        <Tab disabled>Tab Label 3</Tab>
        <Tab>Tab Label 4</Tab>
        <Tab>Tab Label 5</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  </Column>
</Grid>
```

Or, to have 5 tabs and each tab span exactly three columns:

<Canvas>
  <Grid condensed>
    <Column lg={15}>
      <Tabs>
        <TabList aria-label="List of tabs" contained fullWidth>
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab disabled>Tab Label 3</Tab>
          <Tab>Tab Label 4</Tab>
          <Tab>Tab Label 5</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
          <TabPanel>Tab Panel 4</TabPanel>
          <TabPanel>Tab Panel 5</TabPanel>
        </TabPanels>
      </Tabs>
    </Column>
  </Grid>
</Canvas>

```jsx
<Grid condensed>
  <Column lg={15}>
    <Tabs>
      <TabList aria-label="List of tabs" contained fullWidth>
        <Tab>Tab Label 1</Tab>
        <Tab>Tab Label 2</Tab>
        <Tab disabled>Tab Label 3</Tab>
        <Tab>Tab Label 4</Tab>
        <Tab>Tab Label 5</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  </Column>
</Grid>
```

## V11

### Tabs composition

Tabs got a big revamp in v11! Tabs are now more composable than ever before,
meaning that you have the flexibility and control on your end to make them look
and act how you want. The biggest difference is that the Tab label and the Tab
content are now separate components.

Example of Tabs in v10:

```js
<Tabs>
  <Tab label="Tab label 1">
    <p>Content for first tab goes here.</p>
  </Tab>
  <Tab label="Tab label 2">
    <p>Content for second tab goes here.</p>
  </Tab>
  <Tab label="Tab label 3" disabled>
    <p>Content for third tab goes here.</p>
  </Tab>
  <Tab
    label="Tab label 4 shows truncation"
    title="Tab label 4 shows truncation">
    <p>Content for fourth tab goes here.</p>
  </Tab>
</Tabs>
```

Those same Tabs, now in v11:

```js
<Tabs>
  <TabList>
    <Tab>Tab Label 1</Tab>
    <Tab>Tab Label 2</Tab>
    <Tab disabled>Tab Label 3</Tab>
    <Tab title="Tab Label 4 shows truncation">Tab Label 4 shows truncation</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content for first tab goes here.</TabPanel>
    <TabPanel>Content for second tab goes here.</TabPanel>
    <TabPanel>Content for third tab goes here.</TabPanel>
    <TabPanel>Content for fourth tab goes here.</TabPanel>
  </TabPanels>
</Tabs>
```

### Various updates

All the same functionality for Tabs is available in v11 and more! Below are the
minor tweaks in naming or implementation.

- the `type` prop is deprecated. Both "container" and "default" tabs still exist
  but now can be called by adding the prop `contained` to the `TabList`. See the
  above "Contained Tabs" for an example.
- Default tabs are now referred to as line tabs in our documentation here and on
  our website.
- `hidden` prop is no longer needed with the new composable Tabs. You have full
  control over tab content and when it's hidden through the `TabPanel` and
  `TabPanels` components.
- `selected` prop is now named `selectedIndex`.
- `tabContentClassName` is no longer needed. `TabPanel` (equivalent to tab
  content) takes in a className prop on its outermost node.
- For `Tab`, `label` is no longer needed. `children` of `Tab` are now the label.
- Due to its composability, `renderAnchor`, `renderButton`, `renderContent` are
  no longer needed on `Tab`.
- `selected` on `Tab` is deprecated in favor or `selectedIndex`, now placed on
  `Tabs` instead.
- Because `renderButton` is no longer needed, the associated `tabIndex` prop has
  also been deprecated.

### Max width

In V11, tabs no longer have a max-width property set. Which means a tab title
can span as wide as its title is long. To override this behavior, you may use
some style rules:

```css
.cds--tabs__nav-link {
  max-width: 10rem;
}
```

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Tabs/Tabs.mdx).



