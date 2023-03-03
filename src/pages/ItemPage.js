import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Modal, Form, Input, message, Select } from 'antd';

const ItemPage = () => {
  const [dispatch] = useDispatch();
  const [itemData, setItemData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllItems = async () => {
    try {
      dispatch({
        type: 'LOADING',
      });
      const { data } = await axios.get('/api/items/get-item');
      setItemData(data);
      dispatch({ type: 'HIDE_LOADING' });
    } catch (error) {
      console.log(error);
    }
  };
  getAllItems();
  //useEffect
  useEffect(() => {
    getAllItems();
    //eslint-disable-next-line
  }, []);

  //handle deleet
  const handleDelete = async (record) => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      await axios.post('/api/items/delete-item', { itemId: record._id });
      message.success('Item Deleted Succesfully');
      getAllItems();
      setPopModal(false);
      dispatch({ type: 'HIDE_LOADING' });
    } catch (error) {
      dispatch({ type: 'HIDE_LOADING' });
      message.error('Something Went Wrong');
      console.log(error);
    }
  };
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: 'Price', dataIndex: 'price' },

    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setEditItem(record);
              setPopModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: 'LOADING',
      });
      const res = await axios.post('/api/items/get-item');
      message.success('Item added succesfully');
      getAllItems();
      setPopModal(false);
      dispatch({ type: 'HIDE_LOADING' });
    } catch (error) {
      dispatch({ type: 'HIDE_LOADING' });
      message.error('something went wrong');
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>ItemPage</h1>
        <Button type="primary" onClick={() => setPopModal(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemData} bordered />

      {popModal && (
        <Modal
          title="Basic Modal"
          open={popModal}
          onCancel={() => setPopModal(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Name">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodels</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
