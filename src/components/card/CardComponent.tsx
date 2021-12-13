import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import './CardComponent.css';
import ICard from '../../model/ICard';

export interface CardComponentProps {
    card: ICard,
    onDelete: any,
    onEdit: any
}

const cardImageStyle = (url: string) => ({
    width: '100%',
    height: 300,
    background: `url(${url}) 0% 0% / cover no-repeat`
});

export default function CardComponent(props: CardComponentProps) {

    const { card } = props;
    const [visible, setVisible] = useState(false);

    const renderActions = (props: CardComponentProps) => {
        return (
            <Card.Body className="card-body" key={`card-${props.card.id}`}>
                <Row className="align-items-center actions-row">
                    <Col className="d-flex justify-content-center">
                        <Button
                            variant="outline-primary"
                            onClick={() => props.onEdit()}
                            className="card-btn"
                        >
                            Edit
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button
                            variant="outline-danger"
                            className="card-btn"
                            onClick={() => props.onDelete()}
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        );
    };

    const renderCardBody = (card: ICard) => {
        return (
            <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text bsPrefix="card-description">
                    {card.description}
                </Card.Text>
            </Card.Body>
        );
    };

    return (
        <Card
            key={`card-${card.id}`}
            className="card-item shadow-lg mb-5 bg-white rounded"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <div style={cardImageStyle(card.url)} className="rounded-top-corners"/>

            {visible ? renderActions(props) : renderCardBody(card)}
        </Card>
    );
}