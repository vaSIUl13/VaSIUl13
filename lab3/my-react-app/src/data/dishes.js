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
  },

  // --- БУРГЕРИ ---
  {
    id: 13,
    name: "Класик Бургер",
    category: "бургери",
    price: 210,
    description: "Яловича котлета, чедер, маринований огірок та фірмовий соус",
    image: images.burger_classic
  },
  {
    id: 14,
    name: "BBQ Бургер",
    category: "бургери",
    price: 245,
    description: "Бекон, карамелізована цибуля, яловичина та соус барбекю",
    image: images.burger_bbq
  },
  {
    id: 15,
    name: "Чікен Бургер",
    category: "бургери",
    price: 195,
    description: "Хрустке куряче філе, листя салату та майонезний соус",
    image: images.burger_chicken
  },

  {
    id: 16,
    name: "Дабл Чізбургер",
    category: "бургери",
    price: 275,
    description: "Дві соковиті яловичі котлети, подвійний чедер та фірмовий гірчичний соус",
    image: images.burger_double_cheese
  },

  // --- БОУЛИ ---
  {
    id: 17,
    name: "Боул з Лососем",
    category: "боули",
    price: 320,
    description: "Рис, слабосолений лосось, боби едамаме, чука та авокадо",
    image: images.bowl_salmon
  },
  {
    id: 18,
    name: "Кіноа Боул",
    category: "боули",
    price: 280,
    description: "Кіноа, запечений гарбуз, шпинат, фета та насіння льону",
    image: images.bowl_quinoa
  },
  {
    id: 19,
    name: "Боул з Тунцем",
    category: "боули",
    price: 310,
    description: "Тунець татакі, манго, рис, огірок та кунжутний соус",
    image: images.bowl_tuna
  },
  {
    id: 20,
    name: "Веган Боул",
    category: "боули",
    price: 265,
    description: "Нут, тофу, броколі, свіжий шпинат та насіння гарбуза з горіховим соусом",
    image: images.bowl_vegan
  },

  // --- ПАСТА ---
  {
    id: 21,
    name: "Карбонара",
    category: "паста",
    price: 260,
    description: "Спагеті, бекон, вершки, пармезан та яєчний жовток",
    image: images.pasta_carbonara
  },
  {
    id: 22,
    name: "Паста з морепродуктами",
    category: "паста",
    price: 340,
    description: "Мідії, креветки, кальмари у томатному соусі",
    image: images.pasta_seafood
  },
  {
    id: 23,
    name: "Фетучіні Альфредо",
    category: "паста",
    price: 240,
    description: "Класична паста з ніжним курячим філе та грибами у вершковому соусі",
    image: images.pasta_alfredo
  },
  {
    id: 24,
    name: "Паста Болоньєзе",
    category: "паста",
    price: 255,
    description: "Класична італійська паста з густим м'ясним рагу та томатами",
    image: images.pasta_bolognese
  }
];

export default dishes;
