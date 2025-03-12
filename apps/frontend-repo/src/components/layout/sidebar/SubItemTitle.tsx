"use client"
import { Theme } from "@emotion/react";
import { styled, ListSubheader } from "@mui/material";

const SubItemTitle = styled((props: Theme) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );

  export default SubItemTitle