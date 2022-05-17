import styled, { css } from "styled-components";

const buttons = css`
  height: 40px;
  width: 120px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 8px;
`;

export const InfoWrapper = styled.div`
  padding: 20px;
`;

export const SubText = styled.p`
  font-size: 18px;
`;

export const ScrapProfileButton = styled.button`
  ${buttons}
  background: #044a63;
  color: white;
  border: none;

  :hover {
    background: rgba(4, 74, 99, 0.7);
  }
`;

export const RedirectButtons = styled.button`
  ${buttons}
  background: transparent;
  color: #1093c2;
  border: 1px solid #1093c2;
  margin: 0 5px;

  :hover {
    border: 1x solid rgba(16, 147, 194, 0.7);
  }
`;

export const UserName = styled.p`
  font-weight: 700;
`;

export const Location = styled.p`
  font-size: 14px;
`;

export const Item = styled.div`
  text-align: left;
  font-size: 16px;
  padding: 5px 0;
`