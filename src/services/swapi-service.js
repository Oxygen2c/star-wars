export default class SwapiService {
  _api = "https://swapi.co/api";

  async getResource(url) {
    const res = await fetch(`${this._api}${url}`);

    if (!res.ok) {
      throw new Error(
        `Could not fetch ${this._api}${url}` + `, recieved ${res.status}`
      );
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource("/people/");
    return res.results;
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource("/planets/");
    return res.results.map(this._tranformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._tranformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource("/starships/");
    return res.results.map(this._transformStarship);
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }

  _extractId(item) {
    const regIdExp = /\/([0-9]*)\/$/;
    return item.url.match(regIdExp)[1];
  }
  _tranformPlanet(planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      climate: planet.climate,
      terrain: planet.terrain,
      diameter: planet.diameter,
      gravity: planet.gravity
    };
  }
  _transformStarship(starship) {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  }
  _transformPerson(person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    };
  }
}
