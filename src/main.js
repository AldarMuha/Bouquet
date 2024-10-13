import BouquetsPresenter from "./presenter/bouquets-presenter.js";
import BouquetModel from "./model/bouquet-model.js";
import BouquetsApiService from "./api/bouquets-api-service.js";

const AUTHORIZATION = 'Basic Oruel1984';
const END_POINT = 'https://grading.objects.htmlacademy.pro';

const bouquetsModel = new BouquetModel(new BouquetsApiService(END_POINT, AUTHORIZATION));
const bodyElement = document.querySelector('body');
const siteMainElement = bodyElement.querySelector('main');
const bouquetsPresenter = new BouquetsPresenter(siteMainElement, bouquetsModel);
bouquetsPresenter.init();
bouquetsModel.init();

