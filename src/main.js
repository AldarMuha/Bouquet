import BouquetsPresenter from "./presenter/bouquets-presenter.js";
import HeaderPresenter from "./presenter/header-presenter.js";
import BouquetModel from "./model/bouquet-model.js";
import FilterModel from "./model/filter-model.js";
import BouquetsApiService from "./api/bouquets-api-service.js";
//import HeaderCountView from "./view/header-count-view.js";
import FilterPresenter from "./presenter/filter-presenter.js";

const AUTHORIZATION = 'Basic Oruel1984';
const END_POINT = 'https://grading.objects.htmlacademy.pro';

const bouquetsModel = new BouquetModel(new BouquetsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const bodyElement = document.querySelector('body');
const siteMainElement = bodyElement.querySelector('main');
const siteHeaderElement = bodyElement.querySelector('.header__container');
//const filterPresenter = new FilterPresenter(siteMainElement, filterModel, bouquetsModel);
const bouquetsPresenter = new BouquetsPresenter(siteMainElement, bouquetsModel, filterModel);
const defferedBouquetsPresenter = new HeaderPresenter(siteHeaderElement, siteMainElement, bouquetsModel, bouquetsPresenter);
defferedBouquetsPresenter.init();
//filterPresenter.init();
bouquetsPresenter.init();
bouquetsModel.init();

