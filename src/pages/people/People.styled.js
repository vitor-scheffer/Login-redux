import styled from "styled-components";
import { colorBgSection } from '../../consts'

export const ContainerPeople = styled.div`
  width: 100%;

  div:nth-child(1) {
    display: flex;
    padding: 10px 32px;
    justify-content: space-between
  }

  li span {
    width: 150px;
  }

  li:hover {
    cursor: pointer;
    background-color: ${colorBgSection}
  }
`;