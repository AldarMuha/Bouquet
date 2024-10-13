import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class BouquetsApiService extends ApiService {
  get bouquets() {
    return this._load({ url: 'flowers-shop/products' })
      .then(ApiService.parseResponse);
  }

  get defferedBouquets() {
    return this._load({ url: 'flowers-shop/cart' })
      .then(ApiService.parseResponse);
  }

  updateDefferedBouquet = async (bouquet) => {
    const response = await this._load({
      url: `flowers-shop/products/${bouquet.id}`,
      method: Method.PUT,
      body: JSON.stringify(bouquet),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  addDefferedBouquet = async (bouquet) => {
    const response = await this._load({
      url: `flowers-shop/products/${bouquet.id}`,
      method: Method.POST,
      body: JSON.stringify(bouquet),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  deleteDefferedBouquet = async (bouquet) => {
    const response = await this._load({
      url: `flowers-shop/products/${bouquet.id}`,
      method: Method.DELETE,
    });
    return response;
  };

}
