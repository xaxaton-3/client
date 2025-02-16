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
    latitude: 6266521.59457689,
    longitude: 6868838.02903055,
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

export const districtsWithNormalCoords = [
  {
    name: 'Адамовский район',
    latitude: 51.51975,
    longitude: 59.93582,
  },
  {
    name: 'Акбулакский район',
    latitude: 50.7928,
    longitude: 55.6025,
  },
  {
    name: 'Александровский район',
    latitude: 52.678964,
    longitude: 54.417523,
  },
  {
    name: 'Асекеевский район',
    latitude: 53.574797,
    longitude: 52.805479,
  },
  {
    name: 'Беляевский район',
    latitude: 51.398411,
    longitude: 56.408549,
  },
  {
    name: 'Бугурусланский район',
    latitude: 53.6523,
    longitude: 52.432606,
  },
  {
    name: 'Бузулукский район',
    latitude: 52.7808,
    longitude: 52.2625,
  },
  {
    name: 'Грачёвский район',
    latitude: 52.920742,
    longitude: 52.868046,
  },
  {
    name: 'Домбаровский район',
    latitude: 50.758997,
    longitude: 59.528704,
  },
  {
    name: 'Илекский район',
    latitude: 51.52374,
    longitude: 53.373439,
  },
  {
    name: 'Кваркенский район',
    latitude: 52.084131,
    longitude: 59.723477,
  },
  {
    name: 'Красногвардейский район',
    latitude: 52.845213,
    longitude: 53.488926,
  },
  {
    name: 'Курманаевский район',
    latitude: 52.509452,
    longitude: 52.067405,
  },
  {
    name: 'Матвеевский район',
    latitude: 53.508265,
    longitude: 53.480626,
  },
  {
    name: 'Новоорский район',
    latitude: 51.382956,
    longitude: 58.986337,
  },
  {
    name: 'Новосергиевский район',
    latitude: 52.085514,
    longitude: 53.649455,
  },
  {
    name: 'Октябрьский район',
    latitude: 52.351092,
    longitude: 55.499508,
  },
  {
    name: 'Оренбургский район',
    latitude: 51.768205,
    longitude: 55.097,
  },
  {
    name: 'Первомайский район',
    latitude: 51.903798,
    longitude: 51.641055,
  },
  {
    name: 'Переволоцкий район',
    latitude: 51.87555,
    longitude: 54.190465,
  },
  {
    name: 'Пономарёвский район',
    latitude: 53.316816,
    longitude: 54.123756,
  },
  {
    name: 'Сакмарский район',
    latitude: 51.991757,
    longitude: 55.325262,
  },
  {
    name: 'Саракташский район',
    latitude: 51.7897,
    longitude: 56.3606,
  },
  {
    name: 'Светлинский район',
    latitude: 50.820301,
    longitude: 60.861489,
  },
  {
    name: 'Северный район',
    latitude: 54.093055,
    longitude: 52.541033,
  },
  {
    name: 'Ташлинский район',
    latitude: 52.408676,
    longitude: 56.236262,
  },
  {
    name: 'Тоцкий район',
    latitude: 52.529782,
    longitude: 52.748256,
  },
  {
    name: 'Тюльганский район',
    latitude: 52.341509,
    longitude: 56.160147,
  },
  {
    name: 'Шарлыкский район',
    latitude: 52.925998,
    longitude: 54.741348,
  },
  {
    name: 'Абдулинский городской округ',
    latitude: 53.666667,
    longitude: 53.633333,
  },
  {
    name: 'Бугуруслан',
    latitude: 53.6523,
    longitude: 52.432606,
  },
  {
    name: 'Бузулук',
    latitude: 52.7808,
    longitude: 52.2625,
  },
  {
    name: 'Гайский городской округ',
    latitude: 51.467686,
    longitude: 58.454191,
  },
  {
    name: 'ЗАТО «Комаровский»',
    latitude: 51.575944,
    longitude: 58.059938,
  },
  {
    name: 'Кувандыкский городской округ',
    latitude: 51.4782,
    longitude: 57.3551,
  },
  {
    name: 'Медногорск',
    latitude: 51.4032,
    longitude: 57.5953,
  },
  {
    name: 'Новотроицк',
    latitude: 51.196167,
    longitude: 58.326167,
  },
  {
    name: 'Оренбург',
    latitude: 51.768205,
    longitude: 55.097,
  },
  {
    name: 'Орск',
    latitude: 51.2295,
    longitude: 58.4752,
  },
  {
    name: 'Сорочинский городской округ',
    latitude: 52.426667,
    longitude: 53.154722,
  },
  {
    name: 'Соль-Илецкий городской округ',
    latitude: 51.163056,
    longitude: 54.989167,
  },
  {
    name: 'Ясненский городской округ',
    latitude: 51.0347,
    longitude: 59.8742,
  },
];

export const districtsWithNormalCoordsMap = districtsWithNormalCoords.reduce<
  Record<string, (typeof districtsWithNormalCoords)[number]>
>((acc, district) => {
  acc[district.name] = district;
  return acc;
}, {});
