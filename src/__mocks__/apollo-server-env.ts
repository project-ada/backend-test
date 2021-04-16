/// <reference types="jest" />

// COPIED FROM https://github.com/apollographql/apollo-server/blob/master/__mocks__/apollo-server-env.ts
// hoping that it works...

import {
  Body,
  BodyInit,
  fetch,
  Headers,
  HeadersInit,
  Request,
  Response,
  URL,
  URLSearchParams,
} from "apollo-server-env";

// manually adjusting the type of Fetch
type FetchType = (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

interface FetchMock extends jest.Mock<FetchType> {
  mockResponseOnce(data?: any, headers?: HeadersInit, status?: number): this;
  mockJSONResponseOnce(data?: Record<string, unknown> | Record<string, unknown>[], headers?: HeadersInit): this;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockFetch = jest.fn<FetchType>(fetch) as FetchMock;

mockFetch.mockResponseOnce = (data?: BodyInit, headers?: Headers, status = 200) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mockFetch.mockImplementationOnce(async () => {
    return new Response(data, {
      status,
      headers,
    });
  });
};

mockFetch.mockJSONResponseOnce = (data = {}, headers?: Headers, status?: number) => {
  return mockFetch.mockResponseOnce(
    JSON.stringify(data),
    Object.assign({ "Content-Type": "application/json" }, headers),
    status
  );
};

const env = {
  fetch: mockFetch,
  Request,
  Response,
  Body,
  Headers,
  URL,
  URLSearchParams,
};

jest.doMock("apollo-server-env", () => env);

export = env;
