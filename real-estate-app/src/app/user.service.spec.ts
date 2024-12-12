import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve properties from the API via GET', () => {
    const dummyProperties = [
      {
        id: 1,
        title: 'House 1',
        description: 'Description 1',
        price: 100000,
        location: 'Location 1',
        picture: 'picture1.jpg',
      },
      {
        id: 2,
        title: 'House 2',
        description: 'Description 2',
        price: 200000,
        location: 'Location 2',
        picture: 'picture2.jpg',
      },
    ];

    service.getProperties().subscribe((properties) => {
      expect(properties.length).toBe(2);
      expect(properties).toEqual(dummyProperties);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/properties`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyProperties);
  });

  it('should retrieve a property by ID from the API via GET', () => {
    const dummyProperty = {
      id: 1,
      title: 'House 1',
      description: 'Description 1',
      price: 100000,
      location: 'Location 1',
      picture: 'picture1.jpg',
    };

    service.getProperty(1).subscribe((property) => {
      expect(property).toEqual(dummyProperty);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/properties/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyProperty);
  });

  it('should create a house via POST', () => {
    const dummyHouse = {
      id: 1,
      title: 'House 1',
      description: 'Description 1',
      price: 100000,
      location: 'Location 1',
      picture: 'picture1.jpg',
    };
    const formData = new FormData();
    formData.append('title', dummyHouse.title);
    formData.append('description', dummyHouse.description);
    formData.append('price', dummyHouse.price.toString());
    formData.append('location', dummyHouse.location);
    formData.append('picture', dummyHouse.picture);

    service.createHouse(formData).subscribe((house) => {
      expect(house).toEqual(dummyHouse);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/properties`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyHouse);
  });

  it('should update a house via PUT', () => {
    const dummyHouse = {
      id: 1,
      title: 'Updated House',
      description: 'Updated Description',
      price: 150000,
      location: 'Updated Location',
      picture: 'updated_picture.jpg',
    };
    const formData = new FormData();
    formData.append('title', dummyHouse.title);
    formData.append('description', dummyHouse.description);
    formData.append('price', dummyHouse.price.toString());
    formData.append('location', dummyHouse.location);
    formData.append('picture', dummyHouse.picture);

    service.updateHouse(1, formData).subscribe((house) => {
      expect(house).toEqual(dummyHouse);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/properties/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(dummyHouse);
  });

  it('should delete a house via DELETE', () => {
    service.deleteHouse(1).subscribe((response) => {
      expect(response).toEqual({ message: 'Property deleted' });
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/properties/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush({ message: 'Property deleted' });
  });
});
