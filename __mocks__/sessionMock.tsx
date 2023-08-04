import * as ReactTesting from "@testing-library/react";

jest.mock("next-auth/react", () => ({
  useSession: () => jest.fn(),
}));
