import styled from "styled-components"
import { colorBorder } from '../consts'

export const UserInfoContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  width: 1585px;
  padding-top: 36px;
  justify-content: space-between;
  align-items: center;

  && div:nth-child(2) img {
    width: 44px;
    clip-path: circle();
  }
  && div {
    display: flex;
    align-items: center;
  }
  && div:nth-child(1) img {
    width: 16px;
  }
  && div:nth-child(1) {
    padding-right: 32px;
    gap: 25px;
    border-right: 2px solid ${colorBorder};
  }
  && div:nth-child(2) {
    padding-left: 18px;
    gap: 14px;
  }
`;
