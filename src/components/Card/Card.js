import { colorWhite, colorBorder } from '../../consts'
import styled from "styled-components"

export const Card = styled.div(({width, height}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: width ? width : 1420,
  height: height,
  paddingTop: 32,
  paddingBottom: 32,
  backgroundColor: colorWhite,
  borderRadius: 8,
  border: `1px solid ${colorBorder}`
}));