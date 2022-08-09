import styled from "styled-components";
import { colorActiveMenu } from '../../consts'

export const NavSideBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  && li {
    display: flex;
    height: 56px;
    align-items: center;
    padding-left: 32px;
  }
  && li:hover {
    background-color: #9fa2b413;
    border-left: 3px solid ${colorActiveMenu};
  }
`;