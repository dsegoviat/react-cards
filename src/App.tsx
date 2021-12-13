import React, { useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { add, edit, remove, removeAll, selectCards, sort } from './slices/boardSlice';
import CardComponent from './components/card/CardComponent';
import { Button, ButtonGroup, Col, Container, Form, Modal, Row, ToggleButton } from 'react-bootstrap';
import ISorting, { SortBy } from './model/ISorting';
import ICard from './model/ICard';


const App = () => {
    const dispatch = useAppDispatch();
    const cards: ICard[] = useAppSelector(selectCards);

    // Sorting section
    const [sortingType, setSortingType] = React.useState(SortBy.CREATION_DATE);
    const [sortingAscending, setSortingAscending] = React.useState(1);
    const sortingTypes = [
        { name: 'Creation date', value: SortBy.CREATION_DATE },
        { name: 'Title', value: SortBy.TITLE }
    ];
    const sortingDirections = [
        { name: 'Ascending', value: 1 },
        { name: 'Descending', value: 2 }
    ];

    const sortCards = () => {
        const sorting: ISorting = {
            target: sortingType,
            ascending: sortingAscending === 1
        };
        dispatch(sort(sorting));
    };

    const renderSortingPanel = () => {
        return (
            <Row xs="auto" className="sorting-panel">
                <Col>
                    <ButtonGroup>
                        {sortingTypes.map((radio, idx) => (
                            <ToggleButton
                                key={`st-${idx}`}
                                id={`sorting-type-${idx}`}
                                type="radio"
                                variant="outline-success"
                                name="radio"
                                value={radio.value}
                                checked={sortingType === radio.value}
                                active={sortingType === radio.value}
                                onClick={() => setSortingType(radio.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col>
                    <ButtonGroup>
                        {sortingDirections.map((radio, idx) => (
                            <ToggleButton
                                key={`sa-${idx}`}
                                id={`sorting-ascending-${idx}`}
                                type="radio"
                                variant="outline-success"
                                name="radio"
                                value={radio.value}
                                checked={sortingAscending === radio.value}
                                active={sortingAscending === radio.value}
                                onClick={() => setSortingAscending(radio.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col>
                    <Button variant="success" onClick={sortCards}>
                        Sort
                    </Button>
                </Col>
            </Row>
        );
    };

    // Create/Update modal section
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [id, setId] = useState(cards.length);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');


    const deleteCard = (cardId: number) => {
        return dispatch(remove(cardId));
    };

    const openCreateModal = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setCreateModalOpen(true);
    };

    const openEditModal = (card: ICard) => {
        setId(card.id);
        setTitle(card.title);
        setDescription(card.description);
        setUrl(card.url);
        setEditModalOpen(true);
    };

    const handleCreateSubmit = (event: any) => {
        dispatch(add({ id, title, description, url }));
        setCreateModalOpen(false);
    };

    const handleEditSubmit = (event: any) => {
        dispatch(edit({ id, title, description, url }));
        setEditModalOpen(false);
    };

    const renderCreateModal = () => {
        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setCreateModalOpen(false)}
                show={createModalOpen}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="create-card-form">

                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                onChange={(event => setTitle(event.target.value))}
                                value={title}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder="Enter description"
                                onChange={(event => setDescription(event.target.value))}
                                value={description}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="https://imgur.com/gallery/Sh3e6oT (Optional)"
                                onChange={(event => setUrl(event.target.value))}
                                value={url}
                            />
                            <Form.Text className="text-muted">
                                If not set, a default cover image will be used instead.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        variant="primary"
                        type="submit"
                        className="center-btn pull-right"
                        onClick={handleCreateSubmit}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const renderEditModal = () => {
        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setEditModalOpen(false)}
                show={editModalOpen}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="create-card-form">

                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                onChange={(event => setTitle(event.target.value))}
                                value={title}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder="Enter description"
                                onChange={(event => setDescription(event.target.value))}
                                value={description}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="https://imgur.com/gallery/Sh3e6oT (Optional)"
                                onChange={(event => setUrl(event.target.value))}
                                value={url}
                            />
                            <Form.Text className="text-muted">
                                If not set, a default cover image will be used instead.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        variant="primary"
                        type="submit"
                        className="center-btn pull-right"
                        onClick={handleEditSubmit}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };


    const renderActions = () => {
        return (
            <div className="buttons">
                <Button variant="primary" onClick={openCreateModal}>Create</Button>
                <Button variant="danger" className="mx-2" onClick={() => dispatch(removeAll())}>Delete all</Button>
            </div>
        );
    };

    return (
        <Container fluid>
            <h1 className="main-title">Board</h1>
            <Container className="board" fluid>
                {renderActions()}
                {renderSortingPanel()}
            </Container>

            <Container className="board" fluid>
                {cards.length === 0 && renderNoCards()}
                {cards.map(card => <CardComponent
                    key={`card-${card.id}`}
                    card={card}
                    onEdit={() => openEditModal(card)}
                    onDelete={() => deleteCard(card.id)}/>)}
            </Container>
            {renderCreateModal()}
            {renderEditModal()}
        </Container>
    );
};
export default App;

export const renderNoCards = () => {
    return (
        <div className="no-cards">
            <i>You don't have any card...</i>
        </div>
    );
};
