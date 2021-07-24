import { FC } from "react";
import styled from "styled-components";

import Icon from '../../assets/yousound-icon.png'

export const Logo: FC = () => {
  return <Img src={Icon} />;
};

const Img = styled.img`
  max-width: 200px;
  width: 100%;
`;
