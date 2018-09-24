import styled from 'styled-components';

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: ${props => props.margin};
`;

export const GridColDiv = styled.div`
  display: grid;
  grid-template-columns: ${props => props.col};
  grid-gap: ${props => props.gap};
`;

export const GridRowDiv = styled.div`
  display: grid;
  grid-template-rows: ${props => props.row};
  grid-gap: ${props => props.gap};
`;

export const StyledSpan = styled.span`
  // font-weight: 700;
  font-family: Arial, Gadget, sans-serif;
  color: ${props => props.color};
  font-weight: ${props => props.weight};
`;

export const ConfirmationSpan = styled.span`
  font-weight: 500;
  font-family: Arial, Gadget, sans-serif;
  display: flex;
  justify-content: center;
`;
