import styled from 'styled-components';
import { colorBorder, colorWhite } from '../../consts'

export const Lista = styled.ul(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: colorWhite,
  borderTop: `2px solid ${colorBorder}`
}));

export const Item = styled.li(({}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '10px 32px',
  backgroundColor: colorWhite,
  borderBottom: `1px solid ${colorBorder}`
}));

export const TitleList = styled.div`
  display: flex;
  justify-content: start !important;
  width: 1200px;

  span:nth-child(1) {
    padding-right: 322px;
  }

  span:nth-child(2) {
    padding-right: 233px;
  }
`;

