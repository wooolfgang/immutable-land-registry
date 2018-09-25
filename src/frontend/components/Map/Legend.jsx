import React from 'react';
import styled from 'styled-components';

const ColoredDiv = styled.div`
  background-color: ${props => props.color};
  width: 30px;
  height: 30px;
`;

const LandLabel = styled.b`
  position: absolute;
  bottom: 0.35em;
  user-select: none;
  font-size: 1.2em;
  right: 2.4em;
  z-index: 2;
  white-space: nowrap;
  font-weight: 900;
`;

const LegendContainer = styled.div`
  position: absolute;
  bottom: ${props => props.bottom};
  right: 1em;
  z-index: 2;
`;

const LandLegend = () => (
  <div>
    <LegendContainer bottom="14em">
      <LandLabel> Registered Lands </LandLabel>
      <ColoredDiv color="#ea9da3" />
    </LegendContainer>
    <LegendContainer bottom="17em">
      <LandLabel> Pending Lands </LandLabel>
      <ColoredDiv color="green" />
    </LegendContainer>
  </div>
);

export default LandLegend;
