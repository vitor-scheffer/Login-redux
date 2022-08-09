import styled from "styled-components";
import { colorPrimary, colorWhite } from '../../consts'

export const Button = styled.button(({width, backgroundColor, border, padding, marginLeft}) => ({
  width: width ? width : 130,
  padding: padding ? padding : 13,
  marginLeft: marginLeft ? marginLeft : '',
  color: colorWhite,
  backgroundColor: backgroundColor ? backgroundColor : colorPrimary,
  borderRadius: 8,
  border: border ? border : `1px solid ${colorPrimary}`
}));