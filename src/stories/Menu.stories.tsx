import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Menu } from "../Components/Menu";

export default {
  title: "Example/Menu",
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = () => <Menu />;

export const MenuDragAnDrop = Template.bind({});
