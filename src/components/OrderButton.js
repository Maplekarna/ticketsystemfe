import {Button, Form, InputNumber, message} from 'antd';
import { useState } from 'react';
import {makeOrder} from "../utils";


const validatePrimeCount = (count, remaining) => {
  if (count <= remaining) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }

  return {
    validateStatus: 'error',
    errorMsg: 'The input should be smaller that ' + {remaining},
  };
};

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 12,
  },
};


const OrderButton = (props) => {
  const [count, setCount] = useState({
    value: 0,
  });

  const onCountChange = (count) => {
    setCount({
      ...validatePrimeCount(count, props.remaining),
      count,
    });
  };

  const updateMovie = (page) => {
    props.updatMovie(page);
  }


  const onFinish = (data) => {
    const info = {
      'showing_id': props.showing_id,
      'count': data.count,
      'version': props.version,
    }

    makeOrder(info).then(() => {
      updateMovie(props.page - 1);
    }).catch(err => {
      message.error(err.message)
    });
  }


  return (
      <Form
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
      >
        <Form.Item
            name="count"
            {...formItemLayout}
            validateStatus={count.validateStatus}
            help={count.errorMsg}
        >
          <InputNumber min={0} max={props.remaining} value={count.value} onChange={onCountChange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

      </Form>
  );
};
export default OrderButton;