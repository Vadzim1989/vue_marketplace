const CATEGORY_NAME = {
    all: 'All',
    electrics: 'Electrics',
    zoo: 'Zoo',
    toys: 'Toys',
    foods: 'Foods',
    beauty: 'Beauty',
    clothes: 'Clothes'
}

export const CATEGORY_VALES = [
    {
        value: '',
        name: CATEGORY_NAME.all
    },
    {
        value: 'electrics',
        name: CATEGORY_NAME.electrics
    },
    {
        value: 'zoo',
        name: CATEGORY_NAME.zoo
    },
    {
        value: 'toys',
        name: CATEGORY_NAME.toys
    },
    {
        value: 'foods',
        name: CATEGORY_NAME.foods
    },
    {
        value: 'beauty',
        name: CATEGORY_NAME.beauty
    },
    {
        value: 'clothes',
        name: CATEGORY_NAME.clothes
    }
];

export const SORT_VALUES = [
    {
        value: 'title',
        name: 'Name'
    },
    {
        value: 'price',
        name: 'Price(low)'
    },
    {
        value: '-price',
        name: 'Price(high)'
    }
];