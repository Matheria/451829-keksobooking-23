import {Feature, HousingType} from './enums.js';
import {pluralize} from './utils.js';

const featureName = {
  [Feature.wifi]: 'Wi-Fi',
  [Feature.dishwasher]: 'Посудомоечная машина',
  [Feature.parking]: 'Парковка',
  [Feature.washer]: 'Стиральная машина',
  [Feature.elevator]: 'Лифт',
  [Feature.conditioner]: 'Кондиционер',
};

const housingTypeName = {
  [HousingType.palace]: 'Дворец',
  [HousingType.flat]: 'Квартира',
  [HousingType.house]: 'Дом',
  [HousingType.bungalow]: 'Бунгало',
  [HousingType.hotel]: 'Отель',
};

const createAdCardOfferFeature = (feature) => {
  const adCardOfferFeature = document.createElement('li');
  adCardOfferFeature.classList.add('popup__feature', `popup__feature--${feature}`);

  const adCardOfferFeatureTitle = featureName[feature];
  if (adCardOfferFeatureTitle === undefined) {
    throw new Error ('Не удалось извлечь значение из featureName');
  }

  adCardOfferFeature.title = adCardOfferFeatureTitle;
  return adCardOfferFeature;
};

const createAdCardOfferFeatures = (features) => {
  const adCardOfferFeatures = document.createElement('ul');
  adCardOfferFeatures.classList.add('popup__features');

  features.forEach((feature) => {
    const adCardOfferFeature = createAdCardOfferFeature(feature);
    adCardOfferFeatures.appendChild(adCardOfferFeature);
  });
  return adCardOfferFeatures;
};

const createAdCardOfferPhoto = (photo) => {
  const adCardOfferPhoto = document.createElement('img');

  adCardOfferPhoto.classList.add('popup__photo');
  adCardOfferPhoto.src = photo;
  adCardOfferPhoto.width = 45;
  adCardOfferPhoto.height = 40;
  adCardOfferPhoto.alt = 'Фотография жилья';

  return adCardOfferPhoto;
};

const createAdCardOfferPhotos = (photos) => {
  const adCardOfferPhotos = document.createElement('div');
  adCardOfferPhotos.classList.add('popup__photos');

  photos.forEach((photo) => {
    const adCardOfferPhoto = createAdCardOfferPhoto(photo);
    adCardOfferPhotos.appendChild(adCardOfferPhoto);
  });
  return adCardOfferPhotos;
};

const createAdCardOfferPrice = (price) => {
  const adCardOfferPrice = document.createElement('p');
  adCardOfferPrice.textContent = `${price} `;

  const adCardOfferPriceRate = document.createElement('span');
  adCardOfferPriceRate.textContent = '₽/ночь';

  adCardOfferPrice.appendChild(adCardOfferPriceRate);

  return adCardOfferPrice;
};

const getAdCardOfferGuestsText = (rooms, guests) => {
  const pluralizedRooms = pluralize(rooms, ['комната', 'комнаты', 'комнат']);
  const pluralizedGuests = pluralize(guests, ['гостя', 'гостей', 'гостей']);

  return `${rooms} ${pluralizedRooms} для ${guests} ${pluralizedGuests}`;
};

const getAdCardOfferCheckinCheckoutTimeText = (checkin, checkout) => (
  checkin === checkout
    ? `Заезд и выезд в ${checkin}`
    : `Заезд после ${checkin}, выезд до ${checkout}`
);

const getAdCardOfferTypeText = (type) => {
  const adCardOfferTypeText = housingTypeName[type];

  if (adCardOfferTypeText === undefined) {
    throw new Error('Не удалось извлечь значение из housingTypeName');
  }

  return adCardOfferTypeText;
};

export const createAdCard = (ad) => {
  const adCardTemplate = document.querySelector('#card');

  if (adCardTemplate === null) {
    throw new Error('Не найден adCardTemplate');
  }

  const adCardTemplateContent = adCardTemplate.content.querySelector('.popup');

  if (adCardTemplateContent === null) {
    throw new Error('Не найден adCardTemplateContent');
  }

  const adCard = adCardTemplateContent.cloneNode(true);

  const adCardAuthorAvatar = adCard.querySelector('.popup__avatar');
  const adCardOfferTitle = adCard.querySelector('.popup__title');
  const adCardOfferAddress = adCard.querySelector('.popup__text.popup__text--address');
  const adCardOfferPrice = adCard.querySelector('.popup__text.popup__text--price');
  const adCardOfferType = adCard.querySelector('.popup__type');
  const adCardOfferGuests = adCard.querySelector('.popup__text.popup__text--capacity');
  const adCardOfferCheckinCheckoutTime = adCard.querySelector('.popup__text.popup__text--time');
  const adCardOfferFeatures = adCard.querySelector('.popup__features');
  const adCardOfferDescription = adCard.querySelector('.popup__description');
  const adCardOfferPhotos = adCard.querySelector('.popup__photo');

  if (
    adCardAuthorAvatar === null ||
    adCardOfferTitle === null ||
    adCardOfferAddress === null ||
    adCardOfferPrice === null ||
    adCardOfferType === null ||
    adCardOfferGuests === null ||
    adCardOfferCheckinCheckoutTime === null ||
    adCardOfferFeatures === null ||
    adCardOfferDescription === null ||
    adCardOfferPhotos === null
  ) {
    throw new Error('В adCard отсутствуют необходимые элементы');
  }

  if(ad.author.avatar === undefined) {
    adCardAuthorAvatar.remove();
  } else {
    adCardAuthorAvatar.src = ad.author.avatar;
  }

  if(ad.offer.title === undefined) {
    adCardOfferTitle.remove();
  } else {
    adCardOfferTitle.textContent = ad.offer.title;
  }

  if(ad.offer.address === undefined) {
    adCardOfferAddress.remove();
  } else {
    adCardOfferAddress.textContent = ad.offer.address;
  }

  if(ad.offer.price === undefined) {
    adCardOfferPrice.remove();
  } else {
    adCardOfferPrice.replaceWith(createAdCardOfferPrice(ad.offer.price));
  }

  if(ad.offer.type === undefined) {
    adCardOfferType.remove();
  } else {
    adCardOfferType.textContent = getAdCardOfferTypeText(ad.offer.type);
  }

  if(ad.offer.rooms === undefined, ad.offer.guests === undefined) {
    adCardOfferGuests.remove();
  } else {
    adCardOfferGuests.textContent = getAdCardOfferGuestsText(ad.offer.rooms, ad.offer.guests);
  }

  if(ad.offer.checkin === undefined, ad.offer.checkout === undefined) {
    adCardOfferCheckinCheckoutTime.remove();
  } else {
    adCardOfferCheckinCheckoutTime.textContent = getAdCardOfferCheckinCheckoutTimeText(ad.offer.checkin, ad.offer.checkout);
  }

  if(ad.offer.features === undefined || ad.offer.features.length === 0) {
    adCardOfferFeatures.remove();
  } else {
    adCardOfferFeatures.replaceWith(createAdCardOfferFeatures(ad.offer.features));
  }

  if(ad.offer.description === undefined) {
    adCardOfferDescription.remove();
  } else {
    adCardOfferDescription.textContent = ad.offer.description;
  }

  if(ad.offer.photos === undefined || ad.offer.photos.length === 0) {
    adCardOfferPhotos.remove();
  } else {
    adCardOfferPhotos.replaceWith(createAdCardOfferPhotos(ad.offer.photos));
  }

  return adCard;
};
