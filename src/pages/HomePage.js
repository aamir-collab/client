import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';
const HomePage = () => {
  const [itemData, setItemData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('drinks');
  const categories = [
    {
      name: 'drinks',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/430/430561.png',
    },
    {
      name: 'rice',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3174/3174880.png',
    },
    {
      name: 'noodles',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1471/1471262.png',
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
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
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && 'category-active'
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col xs={24} lg={16} md={12} sm={6}>
              <ItemList item={item} key={item.id} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default HomePage;
