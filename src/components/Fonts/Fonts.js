import styled from "styled-components"
import { fontMd, fontLg, fontSm, fontXl, colorTittlePage, colorTittle, colorActiveMenu } from '../../consts'

export const Tittle = styled.h1(({color, paddingBottom}) => ({
  fontSize: fontXl,
  color: color ? color : colorTittlePage,
  paddingBottom: paddingBottom ? paddingBottom : ''
}));

export const Subtitle = styled.h2(({color, paddingBottom}) => ({
  fontSize: fontLg,
  color: color ? color : colorTittle,
  paddingBottom: paddingBottom ? paddingBottom : ''
}));

export const Text = styled.p(({color}) => ({
  fontSize: fontMd,
  color: color ? color : colorActiveMenu,
}));

export const TextSm = styled.span(({color, fontSize}) => ({
  fontSize: fontSize ? fontSize : fontSm,
  color: color ? color : colorTittlePage,
  fontWeight: 500,
}));



