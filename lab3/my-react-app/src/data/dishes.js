import { images } from '../assets/dishes/dish_import';

const dishes = [
  // --- ПІЦА ---
  {
    id: 1,
    name: "Піца Маргарита",
    category: "піца",
    price: 250,
    description: "Класична піца з томатами, моцарелою та базиліком",
    image: images.pizza_marg
  },
  {
    id: 2,
    name: "Піца Кватро Формаджі",
    category: "піца",
    price: 320,
    description: "Чотири види сиру: моцарела, пармезан, дорблю та чедер",
    image: images.pizza_kvatro
  },
  {
    id: 3,
    name: "Піца Пепероні",
    category: "піца",
    price: 285,
    description: "Гостра піца з ковбасками пепероні та подвійною порцією сиру",
    image: images.pizza_paperonni
  },
  {
    id: 4,
    name: "Піца М'ясна",
    category: "піца",
    price: 350,
    description: "Бекон, шинка, салямі та соковита яловичина",
    image: images.pizza_meat
  },

  // --- СУШІ ---
  {
    id: 5,
    name: "Рол Філадельфія",
    category: "суші",
    price: 450,
    description: "Ніжний лосось, вершковий сир, огірок та авокадо",
    image: images.roll_phil
  },
  {
    id: 6,
    name: "Рол Каліфорнія",
    category: "суші",
    price: 380,
    description: "М'ясо краба, ікра тобіко, авокадо та майонез",
    image: images.roll_calif
  },
  {
    id: 7,
    name: "Дракон Зелений",
    category: "суші",
    price: 490,
    description: "Вугор, крем-сир, огірок, зверху обгорнутий авокадо",
    image: images.roll_dragon_green
  },
  {
    id: 8,
    name: "Сет Самурай",
    category: "суші",
    price: 1200,
    description: "Великий набір: 32 шматочки найпопулярніших ролів",
    image: images.roll_samurai
  },

  // --- НАПОЇ ---
  {
    id: 9,
    name: "Пепсі",
    category: "напої",
    price: 45,
    description: "Охолоджений напій, 0.5л",
    image: images.pepsi
  },
  {
    id: 10,
    name: "Лимонад Домашній",
    category: "напої",
    price: 65,
    description: "Натуральний лимонад із цитрусовими та м'ятою",
    image: images.lemonade
  },
  {
    id: 11,
    name: "Апельсиновий сік",
    category: "напої",
    price: 55,
    description: "Свіжовижатий сік, 0.3л",
    image: images.orange_juice
  },
  {
    id: 12,
    name: "Кава Лате",
    category: "напої",
    price: 60,
    description: "Ніжна кава з великою кількістю молока",
    image: images.late
  }
];

export default dishes;
