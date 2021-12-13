import { Draft } from '@reduxjs/toolkit';
import ISorting, { SortBy } from '../model/ISorting';
import ICard from '../model/ICard';

export default class Utils {
    static sortCriteria(sorting: ISorting) {
        return (a: Draft<ICard>, b: Draft<ICard>) => {
            const first = sorting.target === SortBy.TITLE ? a.title.toLocaleLowerCase() : a.createdAt;
            const second = sorting.target === SortBy.TITLE ? b.title.toLocaleLowerCase() : b.createdAt;
            return first === second ? 0 : (first < second ? -1 : 1) * (sorting.ascending ? 1 : -1);
        };
    }

    static isEmpty(str: string) {
        return (!str || str.length === 0);
    }
}

