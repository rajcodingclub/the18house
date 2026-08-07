// =========================================================
// THE 18 HOUSE — MENU SEED DATA
// Converted from the original static data.js into MongoDB
// seed documents. Run `npm run seed` to load these into
// the `categories` collection.
// =========================================================
module.exports = [
  {
    id: 'starters',
    name: 'STARTERS',
    description:
      'Begin your dining experience with our handcrafted starters, prepared fresh and bursting with irresistible flavors.',
    imagePosition: 'right',
    featuredImage: '/images/starters-featured.svg',
    order: 1,
    dishes: [
      { title: 'CHICKEN TANGDI', description: 'Juicy chicken drumsticks marinated in aromatic spices and grilled to perfection for a smoky, flavorful taste.' },
      { title: 'CHILLI CHICKEN DRY', description: 'Crispy chicken tossed with bell peppers, onions, and spicy sauces for a bold Indo-Chinese flavor.' },
      { title: 'TANDOORI CHICKEN', description: 'Succulent chicken marinated in classic tandoori spices and yogurt, char-grilled for a juicy and bold flavor.' },
      { title: 'AFGHANI CHICKEN', description: 'Juicy chicken marinated in a rich, creamy blend of spices, grilled to perfection for a mild & flavourful taste.' },
      { title: 'PANEER TIKKA', description: 'Soft cubes of fresh paneer marinated in a flavorful blend of yogurt and aromatic Indian spices, grilled to perfection with onions and capsicum for a smoky, delicious taste.' },
      { title: 'SOYA MASALA CHAAP', description: 'Succulent soya chaap pieces marinated in a rich blend of yogurt and aromatic Indian spices, grilled to perfection with onions and capsicum for flavorfulness & satisfying taste.' }
    ]
  },
  {
    id: 'chinese',
    name: 'CHINESE',
    description:
      'Savor a delicious selection of Chinese favorites, expertly prepared with rich sauces, vibrant vegetables, and aromatic seasonings.',
    imagePosition: 'left',
    featuredImage: '/images/chinese-featured.svg',
    order: 2,
    dishes: [
      { title: 'CHILLI CHICKEN DRY', description: 'Crispy chicken tossed with bell peppers, onions, and spicy sauces for a bold Indo-Chinese flavor.' },
      { title: 'CHICKEN WINGS', description: 'Crispy, juicy chicken wings seasoned with flavorful spices and cooked to perfection for a deliciously satisfying bite.' },
      { title: 'FRENCH FRIES', description: 'Golden, crispy potato fries perfectly seasoned for a crunchy, delicious snack.' },
      { title: 'HONEY CHILLI POTATO', description: 'Crispy potato strips tossed in a sweet, spicy honey chilli glaze for the perfect balance of crunch and flavor.' },
      { title: 'CHILLI POTATO', description: 'Crispy potato strips tossed in a spicy, tangy chilli sauce with fresh vegetables for a bold and flavorful bite.' },
      { title: 'CHILLI PANEER DRY', description: 'Soft paneer cubes tossed with crunchy vegetables in a spicy, tangy chilli sauce for a bold Indo-Chinese flavor.' }
    ]
  },
  {
    id: 'fried-rice',
    name: 'FRIED RICE AND NOODLES',
    description:
      'Enjoy perfectly cooked fried rice and sizzling noodles, crafted with fresh ingredients and delicious Chinese seasonings.',
    imagePosition: 'right',
    featuredImage: '/images/fried-rice-featured.svg',
    order: 3,
    dishes: [
      { title: 'CHICKEN NOODLES', description: 'Stir-fried noodles with tender chicken, fresh vegetables, and savory seasonings.' },
      { title: 'VEG HAKKA NOODLES', description: 'Stir-fried noodles tossed with fresh vegetables and flavorful sauces for a delicious Indo-Chinese favorite.' },
      { title: 'VEG NOODLES', description: 'Perfectly stir-fried noodles tossed with fresh vegetables and savory seasonings for a flavorful, satisfying meal.' },
      { title: 'VEG SINGAPURI NOODLES', description: 'Stir-fried noodles tossed with fresh vegetables, aromatic spices, and signature Singapore-style flavors.' },
      { title: 'VEG GARLIC FRIED RICE', description: 'Fragrant rice stir-fried with fresh vegetables and roasted garlic for a rich, aromatic, and flavorful bite.' },
      { title: 'CHICKEN FRIED RICE', description: 'Fragrant rice stir-fried with tender chicken and savory seasonings for a flavorful and satisfying classic.' }
    ]
  },
  {
    id: 'main-course',
    name: 'MAIN COURSE',
    description:
      'Savor a delicious selection of flavorful curries, aromatic gravies, and wholesome dishes made with the finest ingredients.',
    imagePosition: 'left',
    featuredImage: '/images/main-course-featured.svg',
    order: 4,
    dishes: [
      { title: 'SOYA CHAAP MASALA', description: 'Tender soya chaap cooked in a rich, creamy, and flavorful masala gravy.' },
      { title: 'MALAI KOFTA', description: 'Soft vegetable and paneer dumplings served in a rich, creamy tomato gravy.' },
      { title: 'PANEER TIKKA MASALA', description: 'Grilled paneer cubes cooked in a rich, creamy tomato-based masala gravy.' },
      { title: 'EGG CURRY', description: 'Boiled eggs simmered in a rich, aromatic onion-tomato gravy with traditional spices.' },
      { title: 'BUTTER CHICKEN', description: 'Tender chicken cooked in a rich, creamy tomato gravy with aromatic spices.' },
      { title: 'PHADHI MUTTON CURRY', description: 'Tender mutton cooked in a rustic, aromatic gravy with traditional hill spices.' }
    ]
  },
  {
    id: 'drinks',
    name: 'DRINKS',
    description:
      'From refreshing soft drinks to chilled beverages, find the perfect drink to complete your dining experience.',
    imagePosition: 'left',
    featuredImage: '/images/drinks-featured.svg',
    order: 5,
    dishes: [
      { title: 'SWEET LASSI', description: 'Traditional sweet yogurt drink blended until smooth and refreshing.' },
      { title: 'NAMKEEN LASSI', description: 'Salted yogurt drink seasoned with roasted cumin and fresh mint.' },
      { title: 'COLD COFFEE', description: 'Rich, creamy chilled espresso blended with milk and ice.' },
      { title: 'HOT COFFEE', description: 'Freshly brewed aromatic hot coffee.' },
      { title: 'MASALA TEA', description: 'Aromatic Indian spiced tea brewed with ginger, cardamom, and milk.' },
      { title: 'VEG RAITA', description: 'Cooling yogurt mixed with finely chopped cucumbers, tomatoes, and spices.' }
    ]
  }
];
