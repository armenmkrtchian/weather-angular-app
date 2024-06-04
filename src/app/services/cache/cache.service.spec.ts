import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;
  const testWeather = {
    weather: [
      {
        main: 'string',
        icon: 'string',
      },
    ],
    main: {
      temp: 11,
      pressure: 11,
      humidity: 11,
    },
    wind: {
      speed: 11,
    },
    sys: {
      country: 'Armenia',
    },
    name: 'string',
    id: '1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get cache', () => {
    const key = 'testKey';
    const data = {};
    service.setCache(key, testWeather);

    const cachedData = service.getCache(key);
    expect(cachedData).toEqual(testWeather);
  });

  it('should return null for expired cache', (done) => {
    const key = 'testKey';
    const testWeather = {
      weather: [
        {
          main: 'string',
          icon: 'string',
        },
      ],
      main: {
        temp: 11,
        pressure: 11,
        humidity: 11,
      },
      wind: {
        speed: 11,
      },
      sys: {
        country: 'Armenia',
      },
      name: 'string',
      id: '1',
    };
    service.setCache(key, testWeather, 100);

    setTimeout(() => {
      const cachedData = service.getCache(key);
      expect(cachedData).toBeNull();
      done();
    }, 150);
  });

  it('should clear cache by key', () => {
    const key = 'testKey';
    const data = {
      weather: [
        {
          main: 'string',
          icon: 'string',
        },
      ],
      main: {
        temp: 11,
        pressure: 11,
        humidity: 11,
      },
      wind: {
        speed: 11,
      },
      sys: {
        country: 'Armenia',
      },
      name: 'string',
      id: '1',
    };
    service.setCache(key, data);

    service.clearCache(key);
    const cachedData = service.getCache(key);
    expect(cachedData).toBeNull();
  });

  it('should clear all cache', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const data = {
      weather: [
        {
          main: 'string',
          icon: 'string',
        },
      ],
      main: {
        temp: 11,
        pressure: 11,
        humidity: 11,
      },
      wind: {
        speed: 11,
      },
      sys: {
        country: 'Armenia',
      },
      id: '1',
      name: 'string',
    };
    service.setCache(key1, data);
    service.setCache(key2, data);

    service.clearAllCache();
    expect(service.getCache(key1)).toBeNull();
    expect(service.getCache(key2)).toBeNull();
  });
});
