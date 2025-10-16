export const CATEGORY_MAP = {
    "9bb293e1-285d-4a28-846f-46e8c1d55ef7": "پیراهن کوتاه",
    "87d187eb-2cf5-4875-aab1-fad320fef6fa": "تاپ و کراپ",
    "a7a6e495-32ec-4f61-a8b3-d8e25ce9721c": "شومیز",
    "4840fca4-41eb-4aa5-b914-7ebdb5daa21d": "شلوار",
};

export const FILTERS_CONFIG = [
    { id: 1, title: "نوع لباس", options: Object.values(CATEGORY_MAP), type: "clothes", isOpen: false },
    { id: 2, title: "رنگ‌بندی", options: ["#8B0000", "#006400", "#808080", "#000000"], type: "color", isOpen: false },
    { id: 3, title: "سایزبندی", options: ["XS", "S", "M", "L", "XL"], type: "size", isOpen: false },
    { id: 4, title: "محصولات تخفیف‌دار", options: ["دارد", "ندارد"], type: "isDiscounted", isOpen: false },
];
