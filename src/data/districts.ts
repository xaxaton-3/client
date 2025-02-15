export const districts = [
  {
    name: 'Адамовский район',
    latitude: 6659236.4,
    longitude: 7521236.6,
  },
  {
    name: 'Акбулакский район',
    latitude: 6193810.4,
    longitude: 7459457.8,
  },
  {
    name: 'Александровский район',
    latitude: 6069820.7,
    longitude: 7563662.3,
  },
  {
    name: 'Асекеевский район',
    latitude: 5938271.3,
    longitude: 7647791.2,
  },
  {
    name: 'Беляевский район',
    latitude: 6272534.3,
    longitude: 7502737.1,
  },
  {
    name: 'Бугурусланский район',
    latitude: 5931976.1,
    longitude: 7643258.6,
  },
  {
    name: 'Бузулукский район',
    latitude: 5913695.1,
    longitude: 7557267.0,
  },
  {
    name: 'Грачёвский район',
    latitude: 5938038.6,
    longitude: 7602973.6,
  },
  {
    name: 'Домбаровский район',
    latitude: 6644208.4,
    longitude: 7453144.2,
  },
  {
    name: 'Илекский район',
    latitude: 6036700.3,
    longitude: 7505726.1,
  },
  {
    name: 'Кваркенский район',
    latitude: 6665141.4,
    longitude: 7527564.6,
  },
  {
    name: 'Красногвардейский район',
    latitude: 6049693.8,
    longitude: 7567741.6,
  },
  {
    name: 'Курманаевский район',
    latitude: 5901006.3,
    longitude: 7536000.0,
  },
  {
    name: 'Матвеевский район',
    latitude: 6058395.2,
    longitude: 7640193.5,
  },
  {
    name: 'Новоорский район',
    latitude: 6613197.4,
    longitude: 7501491.7,
  },
  {
    name: 'Новосергиевский район',
    latitude: 6069597.1,
    longitude: 7568204.8,
  },
  {
    name: 'Октябрьский район',
    latitude: 6244493.0,
    longitude: 7498597.1,
  },
  {
    name: 'Оренбургский район',
    latitude: 6201810.4,
    longitude: 7525966.5,
  },
  {
    name: 'Первомайский район',
    latitude: 6140535.7,
    longitude: 7512104.6,
  },
  {
    name: 'Переволоцкий район',
    latitude: 6054194.5,
    longitude: 7533935.6,
  },
  {
    name: 'Пономарёвский район',
    latitude: 6062361.2,
    longitude: 7632875.5,
  },
  {
    name: 'Сакмарский район',
    latitude: 6199135.6,
    longitude: 7539160.5,
  },
  {
    name: 'Саракташский район',
    latitude: 6228778.1,
    longitude: 7549064.5,
  },
  {
    name: 'Светлинский район',
    latitude: 6661583.4,
    longitude: 7442684.3,
  },
  {
    name: 'Северный район',
    latitude: 5949750.1,
    longitude: 7647514.7,
  },
  {
    name: 'Ташлинский район',
    latitude: 6222398.5,
    longitude: 7553475.6,
  },
  {
    name: 'Тоцкий район',
    latitude: 5908028.4,
    longitude: 7539933.5,
  },
  {
    name: 'Тюльганский район',
    latitude: 6211097.6,
    longitude: 7551066.3,
  },
  {
    name: 'Шарлыкский район',
    latitude: 6092194.8,
    longitude: 7580046.7,
  },
  {
    name: 'Абдулинский городской округ',
    latitude: 6215128.5,
    longitude: 7642420.4,
  },
  {
    name: 'Бугуруслан',
    latitude: 5931976.1,
    longitude: 7643258.6,
  },
  {
    name: 'Бузулук',
    latitude: 5913695.1,
    longitude: 7557267.0,
  },
  {
    name: 'Гайский городской округ',
    latitude: 6220553.1,
    longitude: 7495362.3,
  },
  {
    name: 'ЗАТО «Комаровский»',
    latitude: 6205372.4,
    longitude: 7490107.8,
  },
  {
    name: 'Кувандыкский городской округ',
    latitude: 6221540.2,
    longitude: 7488551.7,
  },
  {
    name: 'Медногорск',
    latitude: 6225805.4,
    longitude: 7491992.2,
  },
  {
    name: 'Новотроицк',
    latitude: 6205461.3,
    longitude: 7467396.6,
  },
  {
    name: 'Оренбург',
    latitude: 6201810.4,
    longitude: 7525966.5,
  },
  {
    name: 'Орск',
    latitude: 6208478.0,
    longitude: 7490731.3,
  },
  {
    name: 'Сорочинский городской округ',
    latitude: 5915515.18,
    longitude: 6868608.53,
  },
  {
    name: 'Соль-Илецкий городской округ',
    latitude: 6124883.56,
    longitude: 6749580.32,
  },
  {
    name: 'Ясненский городской округ',
    latitude: 6666220.78,
    longitude: 6710992.98,
  },
];

export const districtsMap = districts.reduce<Record<string, (typeof districts)[number]>>(
  (acc, district) => {
    acc[district.name] = district;
    return acc;
  },
  {},
);
