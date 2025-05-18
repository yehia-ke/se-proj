import * as React from 'react';
import { animated, useSpring } from '@react-spring/web';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { useTheme } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';

type Color = 'blue' | 'green';

interface TreeItemData {
  id: string;
  label: string;
  color?: Color;
  children?: TreeItemData[];
}

const ITEMS: TreeItemData[] = [
  {
    id: '1',
    label: 'Website',
    children: [
      { id: '1.1', label: 'Home', color: 'green' },
      { id: '1.2', label: 'Pricing', color: 'green' },
      { id: '1.3', label: 'About us', color: 'green' },
      {
        id: '1.4',
        label: 'Blog',
        children: [
          { id: '1.4.1', label: 'Announcements', color: 'blue' },
          { id: '1.4.2', label: 'April lookahead', color: 'blue' },
          { id: '1.4.3', label: "What's new", color: 'blue' },
          { id: '1.4.4', label: 'Meet the team', color: 'blue' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Store',
    children: [
      { id: '2.1', label: 'All products', color: 'green' },
      {
        id: '2.2',
        label: 'Categories',
        children: [
          { id: '2.2.1', label: 'Gadgets', color: 'blue' },
          { id: '2.2.2', label: 'Phones', color: 'blue' },
          { id: '2.2.3', label: 'Wearables', color: 'blue' },
        ],
      },
      { id: '2.3', label: 'Bestsellers', color: 'green' },
      { id: '2.4', label: 'Sales', color: 'green' },
    ],
  },
  { id: '3', label: 'Contact', color: 'blue' },
  { id: '4', label: 'Help', color: 'blue' },
];

const DotIcon = ({ color }: { color: string }) => (
  <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
    <svg width={6} height={6} aria-hidden="true">
      <circle cx={3} cy={3} r={3} fill={color} />
    </svg>
  </Box>
);

const AnimatedCollapse = animated(Collapse);

const TransitionComponent = React.forwardRef<
  HTMLDivElement,
  TransitionProps & { children?: React.ReactNode }
>((props, ref) => {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(0,20px,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
    config: {
      tension: 300,
      friction: 20,
    },
  });

  return <AnimatedCollapse style={style} ref={ref} {...props} />;
});

const CustomTreeItem = React.memo((props: TreeItemData) => {
  const theme = useTheme();
  const { id, label, color, children } = props;

  const getColor = () => {
    if (!color) return undefined;
    return color === 'blue' 
      ? (theme.vars || theme).palette.primary.main 
      : (theme.vars || theme).palette.success.main;
  };

  return (
    <TreeItem
      itemId={id}  // Changed from nodeId to itemId
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
          {color && <DotIcon color={getColor()!} />}
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {label}
          </Typography>
        </Box>
      }
      TransitionComponent={TransitionComponent}
      sx={{
        [`& .${treeItemClasses.content}`]: {
          padding: '4px 8px',
          borderRadius: '4px',
          margin: '2px 0',
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          '&.Mui-selected': {
            backgroundColor: (theme.vars || theme).palette.action.selected,
          },
          '&.Mui-focused': {
            backgroundColor: (theme.vars || theme).palette.action.focus,
          },
        },
        [`& .${treeItemClasses.group}`]: {
          marginLeft: '16px',
          paddingLeft: '8px',
          borderLeft: `1px dashed ${(theme.vars || theme).palette.divider}`,
        },
      }}
    >
      {children?.map((child) => (
        <CustomTreeItem key={child.id} {...child} />
      ))}
    </TreeItem>
  );
});

const CustomizedTreeView = () => {
  return (
    <Card
      variant="outlined"
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px', 
        flexGrow: 1,
        maxWidth: 400,
        mx: 'auto',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography component="h2" variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          Product Tree
        </Typography>
        <SimpleTreeView
          aria-label="customized tree view"
          multiSelect
          defaultExpandedItems={['1', '2']}  // Changed from defaultExpanded
          defaultSelectedItems={['1.1', '1.4.1']}  // Changed from defaultSelected
          sx={{
            height: 400,
            flexGrow: 1,
            overflowY: 'auto',
            p: 1,
            backgroundColor: (theme) => (theme.vars || theme).palette.background.paper,
            borderRadius: '8px',
            '&:focus-within': {
              outline: `2px solid ${(theme) => (theme.vars || theme).palette.primary.main}`,
              outlineOffset: 2,
            },
          }}
        >
          {ITEMS.map((item) => (
            <CustomTreeItem key={item.id} {...item} />
          ))}
        </SimpleTreeView>
      </CardContent>
    </Card>
  );
};

export default CustomizedTreeView;