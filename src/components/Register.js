import { Button, Form, Input, message, Modal } from 'antd';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { register } from '../utils';

class Register extends React.Component {
    state = {
        displayModal: false
    }

    handleCancel = () => {
        this.setState({
            displayModal: false,
        });
    }

    signupOnClick = () => {
        this.setState({
            displayModal: true,
        });
    }


    onFinish = (data) => {
        register(data).then(
            () => {
                this.setState({
                    displayModal: false,
                })

                message.success(`Successfully signed up`);
            }
        ).catch(
            (error) => {
                message.error(error.message);
            }
        )
    }


    render = () => {
        return (
            <React.Fragment>
                <Button shape="round" type="primary" onClick={this.signupOnClick} >
                Register</Button>

                <Modal
                    title="Register"
                    visible={this.state.displayModal}
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <Form
                        name="normal_register"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        preserve={false}
                    >
                        <Form.Item
                            name="user_id"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input 
                                prefix={<UserOutlined />} // Sign before the placeholder.
                                placeholder="Username" 
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="nickname"
                            rules={[{ required: true, message: 'Please input your Nickname!' }]}
                        >
                            <Input
                                placeholder="nickname"
                            />
                        </Form.Item>
                        

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>

                    </Form>

                </Modal>
            </React.Fragment>
        )
    }

}
export default Register;