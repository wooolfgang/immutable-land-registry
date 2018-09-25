import React from 'react';
import { inject, observer } from 'mobx-react';
import { Steps, Icon, Col } from 'antd';
import { CenteredDiv } from '../Generic';
import FirstStepComponent from './FirstStep';
import SecondStepComponent from './SecondStep';
import ThirdStepComponent from './ThirdStep';
import { containerDivStyle } from './styles';

const { Step } = Steps;

@inject('LandStore') @observer
class NewLand extends React.Component {
  render() {
    const { currentNewLandStep } = this.props.LandStore;
    const steps = [{
      title: 'Landowner Information',
      content: <FirstStepComponent />,
      status: 'process',
      icon: <Icon type="user" />,
    }, {
      title: 'Land Information',
      content: <SecondStepComponent />,
      status: 'wait',
      icon: <Icon type="solution" />,
    }, {
      title: 'Confirmation',
      content: <ThirdStepComponent />,
      status: 'wait',
      icon: <Icon type="solution" />,
    }];
    return (
      <div style={containerDivStyle}>
        <CenteredDiv>
          <Col span="16">
            <Steps current={currentNewLandStep}>
              {steps.map(item => <Step key={item.title} icon={item.icon} title={item.title} />)}
            </Steps>
            <div>
              {steps[currentNewLandStep].content}
            </div>
          </Col>
        </CenteredDiv>
      </div>
    );
  }
}

export default NewLand;
