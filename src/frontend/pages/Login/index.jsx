import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Input, Form, Button } from 'antd';
import { CenteredDiv, StyledSpan } from '../../components/Generic';
import { bigInputStyle } from './styles';

const { Item } = Form;

const StyledText = styled.span`
  font-weight: ${props => props.weight};
  font-family: Arial;
  font-size: 1.3em;
`;

const MiddleDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F6F9FC;
`;

const Card = styled.div`
  border-top: 4px solid #A8DADB;
  padding: 20px;
  background: white;
  box-shadow: 0 10px 30px rgba(51, 51, 51, .1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

@inject('AuthStore', 'Web3Store', 'UserStore')
@observer
class LoginComponent extends React.Component {
  submit = (e) => {
    const { form, AuthStore: { signup }, history } = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { fullName, homeAddress, governmentIdNumber } = values;
        await signup(fullName, homeAddress, governmentIdNumber);
        history.push('/');
      }
    });
  }

  render() {
    const { Web3Store, Web3Store: { web3 }, AuthStore: { isAuthenticated, isAuthenticating } } = this.props;
    const { getFieldDecorator } = this.props.form;

    if (!web3 || isAuthenticating) return null;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <MiddleDiv>
        <CenteredDiv>
          <Card>
            <Form>
              <StyledText weight="bolder"> It seems like this is your first time signing </StyledText>
              <br />
              <StyledText> Please fill in the details below </StyledText>
              <Item
                label={<StyledSpan> Address </StyledSpan>}
                hasFeedback
              >
                {getFieldDecorator('address', {
                initialValue: Web3Store.address, rules: [{ required: true, message: 'Please input your address!' }] })(<Input
                  style={bigInputStyle}
                  placeholder="0xca35b7d915458ef540ade6068dfe2f44e8fa733c"
                />)}
              </Item>
              <Item
                label={<StyledSpan> Full Name </StyledSpan>}
                hasFeedback
              >
                {getFieldDecorator('fullName', {
            rules: [{ required: true, message: 'Please input your full name' }] })(<Input
              style={bigInputStyle}
              placeholder="Brent Anthony Tudas"
            />)}

              </Item>
              <Item
                label={<StyledSpan> Home Address </StyledSpan>}
                hasFeedback
              >
                {getFieldDecorator('homeAddress', {
            rules: [{ required: true, message: 'Please input your home address' }] })(<Input
              style={bigInputStyle}
              placeholder="Tagum City, Davao del Norte"
            />)}
              </Item>
              <Item hasFeedback label={<StyledSpan> Government Id Number </StyledSpan>}>
                {getFieldDecorator('governmentIdNumber', {
            rules: [{ required: true, message: 'Please input your id number!' }] })(<Input
              style={bigInputStyle}
              placeholder="8001015009087"
            />)}
              </Item>
              <ButtonContainer onClick={this.submit}>
                <Button type="primary"> Proceed </Button>
              </ButtonContainer>
            </Form>
          </Card>
        </CenteredDiv>
      </MiddleDiv>
    );
  }
}

const LoginComponentForm = Form.create()(LoginComponent);
export default LoginComponentForm;
