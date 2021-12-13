import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import CardComponent from './components/card/CardComponent';
import ICard from './model/ICard';

test('renders app component', () => {
    const { getByText } = render(
        <Provider store={store}>
            <App/>
        </Provider>
    );

    expect(getByText(/Create/i)).toBeInTheDocument();
    expect(getByText(/Board/i)).toBeInTheDocument();
});

test('renders card component', () => {
    const card: ICard = {
        id: 0,
        title: 'Card title',
        description: 'Card description',
        url: 'https://i.imgur.com/Sh3e6oT.jpeg',
        createdAt: new Date().toISOString()
    }
    const { getByText } = render(
        <CardComponent
            card={card}
            onDelete={() => {}}
            onEdit={() => {}}
        />
    )
    expect(getByText(/Card title/i)).toBeInTheDocument();
    expect(getByText(/Card description/i)).toBeInTheDocument();
})
