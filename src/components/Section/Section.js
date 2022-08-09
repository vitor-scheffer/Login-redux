import { colorBgSection } from '../../consts'
import styled from "styled-components"

export const Section = styled.section(({}) => ({
  maxWidth: '100vw',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  paddingRight: '33px',
  paddingBottom: '30px',
  paddingLeft: '285px',
  paddingTop: '128px',
  backgroundColor: colorBgSection
}));