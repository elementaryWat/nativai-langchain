import { render } from "@testing-library/react";
import Home from "@/pages/index";

jest.mock("next-auth/react", () => ({
  useSession: () => [
    { session: { user: { email: "test@example.com" } } },
    false,
  ],
}));
jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn(),
}));

it("renders homepage unchanged", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
