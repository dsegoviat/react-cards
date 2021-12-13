import { store } from '../app/store';
import ICard from '../model/ICard';
import { add, edit, remove, sort } from './boardSlice';
import { SortBy } from '../model/ISorting';

test('Adds new card', () => {
    let cards: ICard[] = store.getState().cards;
    const initialCardsCount = cards.length;
    const cardTitle = 'Card Title';
    const cardDescription = 'Card Description';
    store.dispatch(add({
        title: cardTitle,
        description: cardDescription,
        url: ''
    }))
    cards = store.getState().cards;
    const currentCardsCount = cards.length;
    const newlyAddedCard = cards.find((card) => card.title === cardTitle);
    expect(newlyAddedCard?.title).toBe(cardTitle);
    expect(newlyAddedCard?.description).toBe(cardDescription);
    expect(newlyAddedCard?.url).toBe('https://picsum.photos/id/1016/500/300?grayscale');
    expect(currentCardsCount).toBeGreaterThan(initialCardsCount);
})

test('Updates a card', () => {
    const newTitle = 'New Title';
    const newDescription = 'New Description';
    const newUrl = 'https://i.imgur.com/Sh3e6oT.jpeg';

    store.dispatch(edit({
        id: 0,
        title: newTitle,
        description: newDescription,
        url: newUrl
    }))

    const cards: ICard[] = store.getState().cards;
    const targetCard = cards.find((c) => c.id === 0);
    expect(targetCard?.title).toBe(newTitle)
    expect(targetCard?.description).toBe(newDescription)
    expect(targetCard?.url).toBe(newUrl)
})

test('Deletes a card', () => {
    let cards: ICard[] = store.getState().cards;
    const initialCardsCount = cards.length;
    store.dispatch(remove(0))
    cards = store.getState().cards;
    const currentCardsCount = cards.length;
    expect(currentCardsCount).toBeLessThan(initialCardsCount);
})

test('Removes all', () => {
    store.dispatch(add({
        title: 'A',
        description: 'a',
        url: ''
    }))
    store.dispatch(add({
        title: 'B',
        description: 'b',
        url: ''
    }))
    let cards: ICard[] = store.getState().cards;
    const initialCardsCount = cards.length;
    expect(initialCardsCount).toBe(2)
    store.dispatch(remove(0))
    store.dispatch(remove(1))
    cards = store.getState().cards;
    const currentCardsCount = cards.length;
    expect(currentCardsCount).toBe(0)
})

const createCard = (title: string, description: string, url: string) => {
    store.dispatch(add({ title, description, url }))
}

test('Sort cards', () => {
    createCard('C title', 'foo', '')
    createCard('B title', 'foo', '')
    createCard('A title', 'foo', '')
    store.dispatch(sort({ target: SortBy.CREATION_DATE, ascending: true }))
    let cards: ICard[] = store.getState().cards;
    expect(cards[0]?.title).toBe('C title')
    expect(cards[1]?.title).toBe('B title')
    expect(cards[2]?.title).toBe('A title')
    store.dispatch(sort({ target: SortBy.TITLE, ascending: true }))
    cards = store.getState().cards;
    expect(cards[0]?.title).toBe('A title')
    expect(cards[1]?.title).toBe('B title')
    expect(cards[2]?.title).toBe('C title')
})